import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { getAbout, updateAbout, createAbout, type AboutData } from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';

const AdminAbout = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    content: `I am a dedicated IoT Engineer and Embedded Systems Developer with extensive experience in designing and implementing smart connected devices. My expertise spans from low-level firmware development to cloud-based IoT platforms, enabling me to deliver end-to-end solutions for industrial and consumer applications.

My technical proficiency includes working with microcontrollers such as ESP32, Arduino, and STM32, combined with expertise in communication protocols like MQTT, HTTP, and Modbus. I specialize in creating robust, scalable IoT architectures that integrate seamlessly with cloud platforms including Firebase, AWS IoT, and custom solutions.

I am passionate about leveraging technology to solve real-world problems, from environmental monitoring systems to industrial automation. My approach combines rigorous engineering principles with innovative thinking to deliver solutions that are both reliable and future-proof.`,
    published: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aboutId, setAboutId] = useState<string | null>(null);
  const { toast } = useToast();
  const { canWrite } = useAuth();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await getAbout();
        if (data) {
          setAboutData(data);
          setAboutId(data.id || null);
        }
      } catch (error) {
        console.log('Using default about data');
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleSave = async () => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to edit.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      if (aboutId) {
        await updateAbout(aboutId, aboutData);
      } else {
        const newId = await createAbout(aboutData);
        setAboutId(newId);
      }
      toast({ title: 'Saved!', description: 'About section updated successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save changes.', variant: 'destructive' });
    } finally {
      setSaving(false);
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
        <h1 className="text-2xl font-bold text-foreground mb-2">About Section</h1>
        <p className="text-muted-foreground">Write about yourself in a professional engineering tone.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-elevated p-6 space-y-6"
      >
        {/* Content */}
        <div>
          <label className="form-label">About Content</label>
          <Textarea
            value={aboutData.content}
            onChange={(e) => setAboutData({ ...aboutData, content: e.target.value })}
            placeholder="Write about yourself, your experience, and what you specialize in..."
            rows={15}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Separate paragraphs with double line breaks. Write in English with a professional engineering tone.
          </p>
        </div>

        {/* Published */}
        <div className="flex items-center justify-between">
          <div>
            <label className="form-label mb-0">Published</label>
            <p className="text-sm text-muted-foreground">Show this section on the public site</p>
          </div>
          <Switch
            checked={aboutData.published}
            onCheckedChange={(checked) => setAboutData({ ...aboutData, published: checked })}
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

export default AdminAbout;
