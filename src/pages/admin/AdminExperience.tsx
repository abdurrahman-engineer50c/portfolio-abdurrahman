import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  getExperiences, 
  createExperience, 
  updateExperience, 
  deleteExperience,
  type Experience 
} from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';

const emptyExperience: Omit<Experience, 'id'> = {
  company: '',
  position: '',
  description: '',
  startDate: '',
  endDate: '',
  current: false,
  published: true,
  order: 0,
};

const AdminExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>(emptyExperience);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { canWrite } = useAuth();

  const fetchExperiences = async () => {
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (error) {
      console.log('Error fetching experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openCreateDialog = () => {
    setEditingExp(null);
    setFormData({ ...emptyExperience, order: experiences.length + 1 });
    setDialogOpen(true);
  };

  const openEditDialog = (exp: Experience) => {
    setEditingExp(exp);
    setFormData(exp);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to edit.', variant: 'destructive' });
      return;
    }

    if (!formData.company || !formData.position) {
      toast({ title: 'Error', description: 'Company and position are required.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      if (editingExp?.id) {
        await updateExperience(editingExp.id, formData);
        toast({ title: 'Updated!', description: 'Experience updated successfully.' });
      } else {
        await createExperience(formData);
        toast({ title: 'Created!', description: 'Experience created successfully.' });
      }
      setDialogOpen(false);
      fetchExperiences();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save experience.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to delete.', variant: 'destructive' });
      return;
    }

    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteExperience(id);
        toast({ title: 'Deleted!', description: 'Experience deleted successfully.' });
        fetchExperiences();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete experience.', variant: 'destructive' });
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Experience</h1>
          <p className="text-muted-foreground">Manage your work experience.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="btn-primary-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingExp ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="form-label">Company</label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="TechCorp Industries"
                />
              </div>
              <div>
                <label className="form-label">Position</label>
                <Input
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Senior IoT Engineer"
                />
              </div>
              <div>
                <label className="form-label">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Start Date</label>
                  <Input
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">End Date</label>
                  <Input
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="form-label mb-0">Current Position</label>
                  <p className="text-sm text-muted-foreground">I currently work here</p>
                </div>
                <Switch
                  checked={formData.current}
                  onCheckedChange={(checked) => setFormData({ ...formData, current: checked, endDate: checked ? '' : formData.endDate })}
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
        className="card-elevated"
      >
        {experiences.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No experience added yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div>
                  <h3 className="font-medium text-foreground">{exp.position}</h3>
                  <p className="text-sm text-primary">{exp.company}</p>
                  <p className="text-xs text-muted-foreground">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(exp)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => exp.id && handleDelete(exp.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminExperience;
