import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Image as ImageIcon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { getHero, updateHero, createHero, uploadFile, type HeroData } from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';

const AdminHero = () => {
  const [heroData, setHeroData] = useState<HeroData>({
    name: 'Ahmad Fauzi',
    title: 'IoT Engineer | Embedded Systems | Robotics Integration',
    tagline: 'Building intelligent connected devices that bridge the physical and digital worlds.',
    profileImage: '',
    cvUrl: '/cv/CV_New.pdf',
    published: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroId, setHeroId] = useState<string | null>(null);
  const { toast } = useToast();
  const { canWrite } = useAuth();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getHero();
        if (data) {
          setHeroData(data);
          setHeroId(data.id || null);
        }
      } catch (error) {
        console.log('Using default hero data');
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  const handleSave = async () => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to edit.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      if (heroId) {
        await updateHero(heroId, heroData);
      } else {
        const newId = await createHero(heroData);
        setHeroId(newId);
      }
      toast({ title: 'Saved!', description: 'Hero section updated successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save changes.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadFile(file, `hero/profile-${Date.now()}`);
      setHeroData({ ...heroData, profileImage: url });
      toast({ title: 'Uploaded!', description: 'Profile image uploaded successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to upload image.', variant: 'destructive' });
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadFile(file, `hero/cv-${Date.now()}`);
      setHeroData({ ...heroData, cvUrl: url });
      toast({ title: 'Uploaded!', description: 'CV uploaded successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to upload CV.', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">Hero Section</h1>
        <p className="text-muted-foreground">Manage the main hero section of your portfolio.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-elevated p-6 space-y-6"
      >
        {/* Profile Image */}
        <div>
          <label className="form-label">Profile Image</label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center overflow-hidden border border-border">
              {heroData.profileImage ? (
                <img src={heroData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-upload"
              />
              <Button variant="outline" asChild>
                <label htmlFor="profile-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </label>
              </Button>
            </div>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="form-label">Name</label>
          <Input
            value={heroData.name}
            onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
            placeholder="Your Name"
          />
        </div>

        {/* Title */}
        <div>
          <label className="form-label">Title</label>
          <Input
            value={heroData.title}
            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
            placeholder="IoT Engineer | Embedded Systems"
          />
        </div>

        {/* Tagline */}
        <div>
          <label className="form-label">Tagline</label>
          <Textarea
            value={heroData.tagline}
            onChange={(e) => setHeroData({ ...heroData, tagline: e.target.value })}
            placeholder="A short description about yourself..."
            rows={3}
          />
        </div>

        {/* CV Upload */}
        <div>
          <label className="form-label">CV / Resume</label>
          <div className="flex items-center gap-4">
            <div className="flex-1 p-3 rounded-lg bg-muted flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground truncate">
                {heroData.cvUrl || 'No CV uploaded'}
              </span>
            </div>
            <div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCVUpload}
                className="hidden"
                id="cv-upload"
              />
              <Button variant="outline" asChild>
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CV
                </label>
              </Button>
            </div>
          </div>
        </div>

        {/* Published */}
        <div className="flex items-center justify-between">
          <div>
            <label className="form-label mb-0">Published</label>
            <p className="text-sm text-muted-foreground">Show this section on the public site</p>
          </div>
          <Switch
            checked={heroData.published}
            onCheckedChange={(checked) => setHeroData({ ...heroData, published: checked })}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving || !canWrite} className="btn-primary-glow">
            {saving ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHero;
