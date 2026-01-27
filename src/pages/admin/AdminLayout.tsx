import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  FolderOpen, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Layers, 
  Mail, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: User, label: 'Hero Section', path: '/admin/hero' },
  { icon: FileText, label: 'About', path: '/admin/about' },
  { icon: FolderOpen, label: 'Projects', path: '/admin/projects' },
  { icon: Briefcase, label: 'Experience', path: '/admin/experience' },
  { icon: GraduationCap, label: 'Education', path: '/admin/education' },
  { icon: Award, label: 'Certificates', path: '/admin/certificates' },
  { icon: Layers, label: 'Tech Stack', path: '/admin/skills' },
  { icon: Mail, label: 'Contact', path: '/admin/contact' },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">Portfolio CMS</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userProfile?.email}
                </p>
                <p className="text-xs text-primary capitalize">{userProfile?.role}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="flex-1" />

            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                View Site
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
