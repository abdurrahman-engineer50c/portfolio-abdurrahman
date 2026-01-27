import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  getSkillCategories, 
  createSkillCategory, 
  updateSkillCategory, 
  deleteSkillCategory,
  type SkillCategory 
} from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';

const iconOptions = [
  { value: 'Cpu', label: 'Hardware (Cpu)' },
  { value: 'Code', label: 'Code' },
  { value: 'Wifi', label: 'Networking (Wifi)' },
  { value: 'Cloud', label: 'Cloud' },
  { value: 'Server', label: 'Server' },
  { value: 'Layers', label: 'Layers' },
];

const emptyCategory: Omit<SkillCategory, 'id'> = {
  name: '',
  skills: [],
  icon: 'Cpu',
  published: true,
  order: 0,
};

const AdminSkills = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<SkillCategory | null>(null);
  const [formData, setFormData] = useState<Omit<SkillCategory, 'id'>>(emptyCategory);
  const [skillsInput, setSkillsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { canWrite } = useAuth();

  const fetchCategories = async () => {
    try {
      const data = await getSkillCategories();
      setCategories(data);
    } catch (error) {
      console.log('Error fetching skill categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateDialog = () => {
    setEditingCat(null);
    setFormData({ ...emptyCategory, order: categories.length + 1 });
    setSkillsInput('');
    setDialogOpen(true);
  };

  const openEditDialog = (cat: SkillCategory) => {
    setEditingCat(cat);
    setFormData(cat);
    setSkillsInput(cat.skills.join(', '));
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to edit.', variant: 'destructive' });
      return;
    }

    if (!formData.name) {
      toast({ title: 'Error', description: 'Category name is required.', variant: 'destructive' });
      return;
    }

    const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const dataToSave = { ...formData, skills };

    setSaving(true);
    try {
      if (editingCat?.id) {
        await updateSkillCategory(editingCat.id, dataToSave);
        toast({ title: 'Updated!', description: 'Skill category updated successfully.' });
      } else {
        await createSkillCategory(dataToSave);
        toast({ title: 'Created!', description: 'Skill category created successfully.' });
      }
      setDialogOpen(false);
      fetchCategories();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save skill category.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to delete.', variant: 'destructive' });
      return;
    }

    if (confirm('Are you sure you want to delete this skill category?')) {
      try {
        await deleteSkillCategory(id);
        toast({ title: 'Deleted!', description: 'Skill category deleted successfully.' });
        fetchCategories();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete skill category.', variant: 'destructive' });
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Tech Stack</h1>
          <p className="text-muted-foreground">Manage your skills and technologies.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="btn-primary-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingCat ? 'Edit Category' : 'Add Category'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="form-label">Category Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Hardware"
                />
              </div>
              <div>
                <label className="form-label">Icon</label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="form-label">Skills (comma separated)</label>
                <Input
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="ESP32, Arduino, Raspberry Pi, STM32"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter skills separated by commas
                </p>
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
        {categories.length === 0 ? (
          <div className="col-span-full p-12 text-center card-elevated">
            <p className="text-muted-foreground">No skill categories added yet.</p>
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="card-elevated p-4 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(cat)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => cat.id && handleDelete(cat.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
              <h3 className="font-medium text-foreground mb-3">{cat.name}</h3>
              <div className="flex flex-wrap gap-1">
                {cat.skills.map((skill) => (
                  <span key={skill} className="tech-badge text-xs">{skill}</span>
                ))}
              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default AdminSkills;
