import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  getCertificates, 
  createCertificate, 
  updateCertificate, 
  deleteCertificate,
  uploadFile,
  type Certificate 
} from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';

const emptyCertificate: Omit<Certificate, 'id'> = {
  name: '',
  issuer: '',
  year: '',
  imageUrl: '',
  certificateUrl: '',
  published: true,
  order: 0,
};

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState<Omit<Certificate, 'id'>>(emptyCertificate);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { canWrite } = useAuth();

  const fetchCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (error) {
      console.log('Error fetching certificates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const openCreateDialog = () => {
    setEditingCert(null);
    setFormData({ ...emptyCertificate, order: certificates.length + 1 });
    setDialogOpen(true);
  };

  const openEditDialog = (cert: Certificate) => {
    setEditingCert(cert);
    setFormData(cert);
    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadFile(file, `certificates/cert-${Date.now()}`);
      setFormData({ ...formData, imageUrl: url });
      toast({ title: 'Uploaded!', description: 'Certificate image uploaded successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to upload image.', variant: 'destructive' });
    }
  };

  const handleSave = async () => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to edit.', variant: 'destructive' });
      return;
    }

    if (!formData.name || !formData.issuer) {
      toast({ title: 'Error', description: 'Name and issuer are required.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      if (editingCert?.id) {
        await updateCertificate(editingCert.id, formData);
        toast({ title: 'Updated!', description: 'Certificate updated successfully.' });
      } else {
        await createCertificate(formData);
        toast({ title: 'Created!', description: 'Certificate created successfully.' });
      }
      setDialogOpen(false);
      fetchCertificates();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save certificate.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to delete.', variant: 'destructive' });
      return;
    }

    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificate(id);
        toast({ title: 'Deleted!', description: 'Certificate deleted successfully.' });
        fetchCertificates();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete certificate.', variant: 'destructive' });
      }
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
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Certificates</h1>
          <p className="text-muted-foreground">Manage your certifications and achievements.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="btn-primary-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingCert ? 'Edit Certificate' : 'Add Certificate'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="form-label">Certificate Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="AWS IoT Core Specialist"
                />
              </div>
              <div>
                <label className="form-label">Issuer</label>
                <Input
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div>
                <label className="form-label">Year</label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2023"
                />
              </div>
              <div>
                <label className="form-label">Certificate Image</label>
                <div className="flex items-center gap-4">
                  {formData.imageUrl && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img src={formData.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="cert-image"
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="cert-image" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </label>
                  </Button>
                </div>
              </div>
              <div>
                <label className="form-label">Certificate URL (optional)</label>
                <Input
                  value={formData.certificateUrl}
                  onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="form-label mb-0">Published</label>
                </div>
                <Switch
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {certificates.length === 0 ? (
          <div className="col-span-full p-12 text-center card-elevated">
            <p className="text-muted-foreground">No certificates added yet.</p>
          </div>
        ) : (
          certificates.map((cert) => (
            <div key={cert.id} className="card-elevated p-4 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(cert)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => cert.id && handleDelete(cert.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
              <div className="aspect-[4/3] rounded-lg bg-muted mb-3 overflow-hidden">
                {cert.imageUrl ? (
                  <img src={cert.imageUrl} alt={cert.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🏆</div>
                )}
              </div>
              <h3 className="font-medium text-foreground text-sm">{cert.name}</h3>
              <p className="text-xs text-muted-foreground">{cert.issuer}</p>
              <p className="text-xs text-primary">{cert.year}</p>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default AdminCertificates;
