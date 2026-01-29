// 

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/firestore";

interface PortfolioSectionProps {
  projects: Project[];
}

export const PortfolioSection = ({ projects }: PortfolioSectionProps) => {
  // 🔒 Filter safety
  const publishedProjects = projects
    ?.filter((p) => p.published)
    ?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    ?.slice(0, 6);

  if (!publishedProjects || publishedProjects.length === 0) {
    return null; // atau ganti loader / empty state
  }

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="section-container">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle mx-auto mt-4">
            A showcase of IoT and embedded systems projects I've designed and
            developed
          </p>
          <div className="glow-line w-24 mx-auto mt-6" />
        </motion.div>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/portfolio/${project.slug}`}>
                <div className="group card-elevated card-glow h-full p-6 hover:border-primary/50 transition-all duration-300">
                  {/* IMAGE */}
                  <div className="aspect-video rounded-lg bg-muted/50 mb-4 overflow-hidden flex items-center justify-center border border-border">
                    {project.images?.[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-4xl">🔌</div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* HARDWARE */}
                  {project.hardware && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.hardware.slice(0, 3).map((hw) => (
                        <span key={hw} className="tech-badge text-xs">
                          {hw}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    View Project
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* VIEW ALL */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-primary/50 hover:bg-primary/10"
          >
            <Link to="/portfolio">
              View All Projects
              <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
