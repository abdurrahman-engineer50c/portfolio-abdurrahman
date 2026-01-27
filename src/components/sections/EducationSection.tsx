import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import type { Education } from '@/lib/firestore';

interface EducationSectionProps {
  education?: Education[];
}

const defaultEducation: Education[] = [
  {
    id: '1',
    institution: 'Institut Teknologi Bandung',
    degree: 'Bachelor of Engineering',
    field: 'Electrical Engineering',
    startYear: '2014',
    endYear: '2018',
    current: false,
    description: 'Specialized in embedded systems and microcontroller programming. Thesis on IoT-based environmental monitoring systems.',
    published: true,
    order: 1,
  },
];

export const EducationSection = ({ education = defaultEducation }: EducationSectionProps) => {
  const displayEducation = education.length > 0 ? education : defaultEducation;

  return (
    <section id="education" className="py-24 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle mx-auto mt-4">
            Academic background and qualifications
          </p>
          <div className="glow-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {displayEducation.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="icon-container-lg flex-shrink-0">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{edu.institution}</h3>
                  <p className="text-primary font-medium mb-2">{edu.degree} in {edu.field}</p>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.startYear} - {edu.current ? 'Present' : edu.endYear}</span>
                  </div>
                  {edu.description && (
                    <p className="text-muted-foreground">{edu.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
