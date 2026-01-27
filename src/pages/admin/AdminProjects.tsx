import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
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
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  uploadFile,
  type Project 
} from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';

const emptyProject: Omit<Project, 'id'> = {
  slug: '',
  title: '',
  shortDescription: '',
  description: '',
  techStack: [],
  iotPlatform: [],
  hardware: [],
  images: [],
  videoUrl: '',
  externalUrl: '',
  featured: false,
  published: true,
  order: 0,
};

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>(emptyProject);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { canWrite } = useAuth();

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.log('Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateDialog = () => {
    setEditingProject(null);
    setFormData({ ...emptyProject, order: projects.length + 1 });
    setDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editingProject ? formData.slug : generateSlug(title),
    });
  };

  const handleArrayInput = (field: keyof Project, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData({ ...formData, [field]: items });
  };

  const handleSave = async () => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to edit.', variant: 'destructive' });
      return;
    }

    if (!formData.title || !formData.slug) {
      toast({ title: 'Error', description: 'Title and slug are required.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      if (editingProject?.id) {
        await updateProject(editingProject.id, formData);
        toast({ title: 'Updated!', description: 'Project updated successfully.' });
      } else {
        await createProject(formData);
        toast({ title: 'Created!', description: 'Project created successfully.' });
      }
      setDialogOpen(false);
      fetchProjects();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save project.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!canWrite) {
      toast({ title: 'Error', description: 'You do not have permission to delete.', variant: 'destructive' });
      return;
    }

    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        toast({ title: 'Deleted!', description: 'Project deleted successfully.' });
        fetchProjects();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete project.', variant: 'destructive' });
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls: string[] = [...formData.images];
    for (const file of Array.from(files)) {
      try {
        const url = await uploadFile(file, `projects/${formData.slug || 'new'}-${Date.now()}`);
        urls.push(url);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to upload image.', variant: 'destructive' });
      }
    }
    setFormData({ ...formData, images: urls });
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="btn-primary-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Create Project'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="form-label">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Smart Doorlock System"
                />
              </div>
              <div>
                <label className="form-label">Slug</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="smart-doorlock-system"
                />
              </div>
              <div>
                <label className="form-label">Short Description</label>
                <Textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="A brief description for the project card..."
                  rows={2}
                />
              </div>
              <div>
                <label className="form-label">Full Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed project description..."
                  rows={6}
                />
              </div>
              <div>
                <label className="form-label">Tech Stack (comma separated)</label>
                <Input
                  value={formData.techStack.join(', ')}
                  onChange={(e) => handleArrayInput('techStack', e.target.value)}
                  placeholder="C++, Firebase, Flutter"
                />
              </div>
              <div>
                <label className="form-label">IoT Platform (comma separated)</label>
                <Input
                  value={formData.iotPlatform.join(', ')}
                  onChange={(e) => handleArrayInput('iotPlatform', e.target.value)}
                  placeholder="Firebase RTDB, MQTT"
                />
              </div>
              <div>
                <label className="form-label">Hardware (comma separated)</label>
                <Input
                  value={formData.hardware.join(', ')}
                  onChange={(e) => handleArrayInput('hardware', e.target.value)}
                  placeholder="ESP32, RFID RC522, Relay Module"
                />
              </div>
              <div>
                <label className="form-label">Project Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="project-images"
                />
                <Button variant="outline" asChild>
                  <label htmlFor="project-images" className="cursor-pointer">
                    Upload Images
                  </label>
                </Button>
                {formData.images.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {formData.images.map((img, i) => (
                      <div key={i} className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="form-label">Video URL (optional)</label>
                <Input
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/embed/..."
                />
              </div>
              <div>
                <label className="form-label">External Link (optional)</label>
                <Input
                  value={formData.externalUrl}
                  onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="form-label mb-0">Featured</label>
                  <p className="text-sm text-muted-foreground">Show on homepage</p>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="form-label mb-0">Published</label>
                  <p className="text-sm text-muted-foreground">Make publicly visible</p>
                </div>
                <Switch
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Project'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Projects List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-elevated"
      >
        {projects.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No projects yet. Create your first project!</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {projects.map((project) => (
              <div key={project.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {project.images[0] ? (
                      <img src={project.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">🔌</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{project.shortDescription}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {project.published ? (
                        <span className="flex items-center gap-1 text-xs text-primary">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(project)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => project.id && handleDelete(project.id)}>
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

export default AdminProjects;
