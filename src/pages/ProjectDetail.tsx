import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Play, Cpu, Wifi, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProjectBySlug, type Project } from "@/lib/firestore";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // State untuk gambar aktif
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      try {
        const projectData = await getProjectBySlug(slug);
        if (projectData) {
          setProject(projectData);
          // Set gambar pertama jika tersedia
          if (projectData.images && projectData.images.length > 0) {
            setActiveImage(projectData.images[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
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
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
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
            <Button
              variant="ghost"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/#portfolio">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back 
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {project.shortDescription}
              </p>

              {/* Image Highlight Area */}
              <div className="aspect-video rounded-xl bg-muted/50 mb-6 overflow-hidden flex items-center justify-center border border-border relative">
                <AnimatePresence mode="wait">
                  {activeImage ? (
                    <motion.img
                      key={activeImage}
                      src={activeImage}
                      alt={project.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">🔌</div>
                  )}
                </AnimatePresence>
              </div>

              {/* Thumbnails Swiper */}
              {project.images && project.images.length > 1 && (
                <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                  {project.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-24 h-24 rounded-lg flex-shrink-0 overflow-hidden border-2 transition-all ${
                        activeImage === img
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Description Section */}
              <div className="prose prose-invert max-w-none">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.description.split("\n").map((paragraph, index) => {
                    if (paragraph.startsWith("## "))
                      return (
                        <h2
                          key={index}
                          className="text-xl font-semibold text-foreground mt-8 mb-4"
                        >
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    if (paragraph.startsWith("- "))
                      return (
                        <li key={index} className="ml-4">
                          {paragraph.replace("- ", "")}
                        </li>
                      );
                    if (paragraph.trim())
                      return (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      );
                    return null;
                  })}
                </div>
              </div>

              {/* Video Player */}
              {project.videoUrl && (
                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5 text-primary" /> Project Demo
                  </h3>
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted/50 border border-border">
                    <iframe
                      src={project.videoUrl}
                      title="Demo"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar with Stats */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="card-elevated p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-primary" />{" "}
                  <h3 className="font-semibold">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-elevated p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wifi className="w-5 h-5 text-primary" />{" "}
                  <h3 className="font-semibold">IoT Platform</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.iotPlatform.map((p) => (
                    <span key={p} className="tech-badge">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-elevated p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-5 h-5 text-primary" />{" "}
                  <h3 className="font-semibold">Hardware</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.hardware.map((h) => (
                    <span key={h} className="tech-badge">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {project.externalUrl && (
                <Button className="w-full btn-primary-glow" asChild>
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> View Live Project
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
