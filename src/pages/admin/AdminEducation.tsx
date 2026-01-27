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
  getEducation, 
  createEducation, 
  updateEducation, 
  deleteEducation,
  type Education 
} from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';

const emptyEducation: Omit<Education, 'id'> = {
  institution: '',
  degree: '',
  field: '',
  startYear: '',
  endYear: '',
  current: false,
  description: '',
  published: true,
  order: 0,
};

const AdminEducation = () => {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>(emptyEducation);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { canWrite } = useAuth();

  const fetchEducation = async () => {
    try {
      const data = await getEducation();
      setEducationList(data);
    } catch (error) {
      console.log('Error fetching education');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const openCreateDialog = () => {
    setEditingEdu(null);
    setFormData({ ...emptyEducation, order: educationList.length + 1 });
    setDialogOpen(true);
  };

  const openEditDialog = (edu: Education) => {
    setEditingEdu(edu);
    setFormData(edu);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to edit.', variant: 'destructive' });
      return;
    }

    if (!formData.institution || !formData.degree) {
      toast({ title: 'Error', description: 'Institution and degree are required.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      if (editingEdu?.id) {
        await updateEducation(editingEdu.id, formData);
        toast({ title: 'Updated!', description: 'Education updated successfully.' });
      } else {
        await createEducation(formData);
        toast({ title: 'Created!', description: 'Education created successfully.' });
      }
      setDialogOpen(false);
      fetchEducation();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save education.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to delete.', variant: 'destructive' });
      return;
    }

    if (confirm('Are you sure you want to delete this education entry?')) {
      try {
        await deleteEducation(id);
        toast({ title: 'Deleted!', description: 'Education deleted successfully.' });
        fetchEducation();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete education.', variant: 'destructive' });
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Education</h1>
          <p className="text-muted-foreground">Manage your educational background.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="btn-primary-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingEdu ? 'Edit Education' : 'Add Education'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="form-label">Institution</label>
                <Input
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="Institut Teknologi Bandung"
                />
              </div>
              <div>
                <label className="form-label">Degree</label>
                <Input
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="Bachelor of Engineering"
                />
              </div>
              <div>
                <label className="form-label">Field of Study</label>
                <Input
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  placeholder="Electrical Engineering"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Start Year</label>
                  <Input
                    type="number"
                    value={formData.startYear}
                    onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                    placeholder="2014"
                  />
                </div>
                <div>
                  <label className="form-label">End Year</label>
                  <Input
                    type="number"
                    value={formData.endYear}
                    onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                    disabled={formData.current}
                    placeholder="2018"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Description (optional)</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Notable achievements, thesis topic, etc..."
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="form-label mb-0">Currently Studying</label>
                </div>
                <Switch
                  checked={formData.current}
                  onCheckedChange={(checked) => setFormData({ ...formData, current: checked, endYear: checked ? '' : formData.endYear })}
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
        {educationList.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No education added yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {educationList.map((edu) => (
              <div key={edu.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div>
                  <h3 className="font-medium text-foreground">{edu.institution}</h3>
                  <p className="text-sm text-primary">{edu.degree} in {edu.field}</p>
                  <p className="text-xs text-muted-foreground">
                    {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(edu)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => edu.id && handleDelete(edu.id)}>
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

export default AdminEducation;
