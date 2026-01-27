import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderOpen, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  Plus, 
  Eye,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  getProjects, 
  getExperiences, 
  getEducation, 
  getSkillCategories,
  type Project,
  type Experience,
  type Education,
  type SkillCategory
} from '@/lib/firestore';

interface StatCard {
  title: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatCard[]>([
    { title: 'Projects', count: 0, icon: FolderOpen, href: '/admin/projects' },
    { title: 'Experience', count: 0, icon: Briefcase, href: '/admin/experience' },
    { title: 'Education', count: 0, icon: GraduationCap, href: '/admin/education' },
    { title: 'Tech Categories', count: 0, icon: Layers, href: '/admin/skills' },
  ]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projects, experiences, education, skills] = await Promise.all([
          getProjects(),
          getExperiences(),
          getEducation(),
          getSkillCategories(),
        ]);

        setStats([
          { title: 'Projects', count: projects.length, icon: FolderOpen, href: '/admin/projects' },
          { title: 'Experience', count: experiences.length, icon: Briefcase, href: '/admin/experience' },
          { title: 'Education', count: education.length, icon: GraduationCap, href: '/admin/education' },
          { title: 'Tech Categories', count: skills.length, icon: Layers, href: '/admin/skills' },
        ]);

        setRecentProjects(projects.slice(0, 5));
      } catch (error) {
        console.log('Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const quickActions = [
    { label: 'Add Project', icon: FolderOpen, href: '/admin/projects' },
    { label: 'Update Tech Stack', icon: Layers, href: '/admin/skills' },
    { label: 'View Live Site', icon: Eye, href: '/', external: true },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated p-6"
      >
        <div className="flex items-center gap-4">
          <div className="icon-container-lg">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
            <p className="text-muted-foreground">Manage your portfolio content from this dashboard.</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={stat.href}>
              <div className="stat-card group">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="icon-container group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.count}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-elevated p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto py-6 flex-col gap-2"
              asChild
            >
              {action.external ? (
                <a href={action.href} target="_blank" rel="noopener noreferrer">
                  <action.icon className="w-6 h-6 text-primary" />
                  <span>{action.label}</span>
                </a>
              ) : (
                <Link to={action.href}>
                  <action.icon className="w-6 h-6 text-primary" />
                  <span>{action.label}</span>
                </Link>
              )}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-elevated p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Projects</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/projects" className="text-primary">
              View All
            </Link>
          </Button>
        </div>
        <div className="space-y-3">
          {loading ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted rounded-lg" />
              ))}
            </div>
          ) : recentProjects.length > 0 ? (
            recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{project.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {project.hardware.slice(0, 3).join(', ')}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {project.published ? '✓ Published' : 'Draft'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No projects yet. Create your first project!
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
