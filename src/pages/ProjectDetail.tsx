import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Play, Cpu, Wifi, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProjectBySlug, type Project } from '@/lib/firestore';

const defaultProject: Project = {
  id: '1',
  slug: 'smart-doorlock-system',
  title: 'Smart Doorlock System',
  shortDescription: 'RFID-based smart door lock with mobile app integration and real-time access logging.',
  description: `This project implements a comprehensive smart door lock system using ESP32 microcontroller and RFID technology. The system provides secure access control with real-time monitoring and mobile app integration.

## Features
- RFID card authentication with RC522 module
- Real-time access logging to Firebase
- Mobile app for remote monitoring and control
- Guest access management
- Access history and analytics dashboard

## Technical Implementation
The system uses an ESP32 as the main controller, interfacing with an RFID-RC522 module for card reading. Access events are logged to Firebase Realtime Database, allowing real-time synchronization across all connected devices.

The solenoid lock is controlled through a relay module, with a fail-safe mechanism that defaults to locked state in case of power failure. The firmware implements watchdog timers and error recovery routines for maximum reliability.`,
  techStack: ['C++', 'Firebase', 'Flutter', 'Node.js'],
  iotPlatform: ['Firebase RTDB', 'Firebase Cloud Functions'],
  hardware: ['ESP32', 'RFID RC522', 'Solenoid Lock', '12V Relay Module', '3.3V Regulator'],
  images: [],
  videoUrl: '',
  externalUrl: '',
  featured: true,
  published: true,
  order: 1,
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (slug) {
        try {
          const projectData = await getProjectBySlug(slug);
          setProject(projectData || defaultProject);
        } catch (error) {
          console.log('Using default project data');
          setProject(defaultProject);
        }
      }
      setLoading(false);
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="section-container py-32 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="section-container">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <Link to="/#portfolio">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Header */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {project.shortDescription}
              </p>

              {/* Image Gallery */}
              <div className="aspect-video rounded-xl bg-muted/50 mb-8 overflow-hidden flex items-center justify-center border border-border">
                {project.images && project.images[0] ? (
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl">🔌</div>
                )}
              </div>

              {/* Image Thumbnails */}
              {project.images && project.images.length > 1 && (
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                  {project.images.map((img, index) => (
                    <div 
                      key={index}
                      className="w-24 h-24 rounded-lg bg-muted/50 flex-shrink-0 overflow-hidden border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <img src={img} alt={`${project.title} ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="prose prose-invert max-w-none">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.description.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-xl font-semibold text-foreground mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <li key={index} className="ml-4">
                          {paragraph.replace('- ', '')}
                        </li>
                      );
                    }
                    if (paragraph.trim()) {
                      return <p key={index} className="mb-4">{paragraph}</p>;
                    }
                    return null;
                  })}
                </div>
              </div>

              {/* Video */}
              {project.videoUrl && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5 text-primary" />
                    Project Demo
                  </h3>
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted/50 border border-border">
                    <iframe
                      src={project.videoUrl}
                      title="Project Demo"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Tech Stack */}
              <div className="card-elevated p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>

              {/* IoT Platform */}
              <div className="card-elevated p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wifi className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">IoT Platform</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.iotPlatform.map((platform) => (
                    <span key={platform} className="tech-badge">{platform}</span>
                  ))}
                </div>
              </div>

              {/* Hardware */}
              <div className="card-elevated p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Hardware</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.hardware.map((hw) => (
                    <span key={hw} className="tech-badge">{hw}</span>
                  ))}
                </div>
              </div>

              {/* External Link */}
              {project.externalUrl && (
                <Button className="w-full btn-primary-glow" asChild>
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Project
                  </a>
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
