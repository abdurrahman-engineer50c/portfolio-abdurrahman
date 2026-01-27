import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { getContact, updateContact, createContact, type ContactInfo } from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';

const defaultContact: ContactInfo = {
  email: 'contact@example.com',
  phone: '+6281234567890',
  whatsapp: '6281234567890',
  location: 'Indonesia',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
  ],
  published: true,
};

const platformIcons = ['github', 'linkedin', 'instagram', 'twitter', 'youtube', 'facebook'];

const AdminContact = () => {
  const [contactData, setContactData] = useState<ContactInfo>(defaultContact);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contactId, setContactId] = useState<string | null>(null);
  const { toast } = useToast();
  const { canWrite } = useAuth();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContact();
        if (data) {
          setContactData(data);
          setContactId(data.id || null);
        }
      } catch (error) {
        console.log('Using default contact data');
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const handleSave = async () => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to edit.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      if (contactId) {
        await updateContact(contactId, contactData);
      } else {
        const newId = await createContact(contactData);
        setContactId(newId);
      }
      toast({ title: 'Saved!', description: 'Contact information updated successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save changes.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const addSocialLink = () => {
    setContactData({
      ...contactData,
      socialLinks: [...contactData.socialLinks, { platform: '', url: '', icon: 'github' }],
    });
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const newLinks = [...contactData.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setContactData({ ...contactData, socialLinks: newLinks });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = contactData.socialLinks.filter((_, i) => i !== index);
    setContactData({ ...contactData, socialLinks: newLinks });
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
        <h1 className="text-2xl font-bold text-foreground mb-2">Contact Information</h1>
        <p className="text-muted-foreground">Manage your contact details and social links.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-elevated p-6 space-y-6"
      >
        {/* Email */}
        <div>
          <label className="form-label">Email</label>
          <Input
            type="email"
            value={contactData.email}
            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
            placeholder="your@email.com"
          />
          <p className="text-xs text-muted-foreground mt-1">Clicking email will open mailto:</p>
        </div>

        {/* Phone */}
        <div>
          <label className="form-label">Phone Number</label>
          <Input
            value={contactData.phone}
            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
            placeholder="+6281234567890"
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="form-label">WhatsApp Number</label>
          <Input
            value={contactData.whatsapp}
            onChange={(e) => setContactData({ ...contactData, whatsapp: e.target.value })}
            placeholder="6281234567890"
          />
          <p className="text-xs text-muted-foreground mt-1">Without + sign. Will open wa.me/number</p>
        </div>

        {/* Location */}
        <div>
          <label className="form-label">Location</label>
          <Input
            value={contactData.location}
            onChange={(e) => setContactData({ ...contactData, location: e.target.value })}
            placeholder="Indonesia"
          />
        </div>

        {/* Social Links */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="form-label mb-0">Social Links</label>
            <Button variant="outline" size="sm" onClick={addSocialLink}>
              <Plus className="w-4 h-4 mr-1" />
              Add Link
            </Button>
          </div>
          <div className="space-y-3">
            {contactData.socialLinks.map((link, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <Input
                    value={link.platform}
                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    placeholder="Platform name"
                  />
                  <Input
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <select
                  value={link.icon}
                  onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                  className="form-input w-32"
                >
                  {platformIcons.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <Button variant="ghost" size="icon" onClick={() => removeSocialLink(index)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Published */}
        <div className="flex items-center justify-between">
          <div>
            <label className="form-label mb-0">Published</label>
            <p className="text-sm text-muted-foreground">Show contact section on the public site</p>
          </div>
          <Switch
            checked={contactData.published}
            onCheckedChange={(checked) => setContactData({ ...contactData, published: checked })}
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

export default AdminContact;
