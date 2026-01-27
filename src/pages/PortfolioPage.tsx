import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getPublishedProjects, type Project } from '@/lib/firestore';

const defaultProjects: Project[] = [
  {
    id: '1',
    slug: 'smart-doorlock-system',
    title: 'Smart Doorlock System',
    shortDescription: 'RFID-based smart door lock with mobile app integration and real-time access logging.',
    description: '',
    techStack: ['C++', 'Firebase', 'Flutter'],
    iotPlatform: ['Firebase RTDB'],
    hardware: ['ESP32', 'RFID RC522', 'Solenoid Lock'],
    images: [],
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: '2',
    slug: 'smart-trash-bin',
    title: 'Smart Trash Bin',
    shortDescription: 'Automatic waste sorting bin with ultrasonic sensors and IoT monitoring dashboard.',
    description: '',
    techStack: ['Arduino', 'Python', 'MQTT'],
    iotPlatform: ['Thinger.io'],
    hardware: ['Arduino Nano', 'Ultrasonic Sensor', 'Servo Motor'],
    images: [],
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: '3',
    slug: 'environmental-monitoring',
    title: 'Environmental Monitoring Station',
    shortDescription: 'Real-time air quality and weather monitoring system with web dashboard.',
    description: '',
    techStack: ['MicroPython', 'React', 'InfluxDB'],
    iotPlatform: ['MQTT', 'Grafana'],
    hardware: ['NodeMCU', 'DHT22', 'MQ135'],
    images: [],
    featured: true,
    published: true,
    order: 3,
  },
];

const PortfolioPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getPublishedProjects();
        setProjects(data.length > 0 ? data : defaultProjects);
      } catch {
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="section-title">All Projects</h1>
            <p className="section-subtitle mx-auto mt-4">
              Explore my complete collection of IoT and embedded systems projects
            </p>
            <div className="glow-line w-24 mx-auto mt-6" />
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/portfolio/${project.slug}`}>
                    <div className="group card-elevated card-glow h-full p-6 hover:border-primary/50 transition-all duration-300">
                      <div className="aspect-video rounded-lg bg-muted/50 mb-4 overflow-hidden flex items-center justify-center border border-border">
                        {project.images && project.images[0] ? (
                          <img 
                            src={project.images[0]} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="text-4xl">🔌</div>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.hardware.slice(0, 3).map((hw) => (
                          <span key={hw} className="tech-badge text-xs">
                            {hw}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        View Project
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
