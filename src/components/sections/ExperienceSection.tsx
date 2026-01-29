// import { motion } from 'framer-motion';
// import { Briefcase, Calendar } from 'lucide-react';
// import type { Experience } from '@/lib/firestore';

// interface ExperienceSectionProps {
//   experiences?: Experience[];
// }

// const defaultExperiences: Experience[] = [
//   {
//     id: "1",
//     company: "IDN Boarding School",
//     position: "Embedded System and IoT Teacher",
//     description:
//       "Led the development of industrial IoT solutions for manufacturing automation. Designed and implemented sensor networks, real-time monitoring systems, and predictive maintenance algorithms.",
//     startDate: "2024-06",
//     current: true,
//     published: true,
//     order: 1,
//   },
//   {
//     id: "2",
//     company: "Dibimbing.id",
//     position: "Technical mentor at Samsung innovation campus",
//     description:
//       "Developed firmware for ESP32 and STM32-based products. Created communication protocols for BLE and WiFi connectivity. Integrated cloud platforms for data analytics.",
//     startDate: "2025-08",
//     endDate: "2025-12",
//     current: false,
//     published: true,
//     order: 2,
//   },
//   {
//     id: "3",
//     company: "Freelance",
//     position: "Trainer IoT dan Robotika",
//     description:
//       "teaching teachers to improve their competence in IoT and robotics in several schools using the project-based learning teaching method",
//     startDate: "2023-11",
//     endDate: "2024-02",
//     current: false,
//     published: true,
//     order: 3,
//   },
// ];

// const formatDate = (dateStr: string) => {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
// };

// export const ExperienceSection = ({ experiences = defaultExperiences }: ExperienceSectionProps) => {
//   const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences;

//   return (
//     <section id="experience" className="py-24 relative">
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
//       <div className="section-container relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="section-title">Work Experience</h2>
//           <p className="section-subtitle mx-auto mt-4">
//             My professional journey in IoT and embedded systems development
//           </p>
//           <div className="glow-line w-24 mx-auto mt-6" />
//         </motion.div>

//         <div className="relative max-w-3xl mx-auto">
//           {/* Timeline Line */}
//           <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

//           {displayExperiences.map((exp, index) => (
//             <motion.div
//               key={exp.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
//                 index % 2 === 0 ? 'md:flex-row-reverse' : ''
//               }`}
//             >
//               {/* Timeline Dot */}
//               <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1.5 md:-translate-x-2 shadow-glow" />

//               {/* Content */}
//               <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
//                 <div className="card-elevated p-6 hover:border-primary/50 transition-all duration-300">
//                   <div className="flex items-center gap-2 text-primary mb-2">
//                     <Briefcase className="w-4 h-4" />
//                     <span className="text-sm font-medium">{exp.company}</span>
//                   </div>
//                   <h3 className="text-xl font-semibold text-foreground mb-2">{exp.position}</h3>
//                   <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
//                     <Calendar className="w-4 h-4" />
//                     <span>
//                       {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate!)}
//                     </span>
//                   </div>
//                   <p className="text-muted-foreground">{exp.description}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import type { Experience } from "@/lib/firestore";

interface ExperienceSectionProps {
  experiences: Experience[] | null;
}

/**
 * Fallback data (dipakai hanya jika Firestore kosong)
 */
const fallbackExperiences: Experience[] = [
  {
    id: "fallback",
    company: "IDN Boarding School",
    position: "Embedded System and IoT Teacher",
    description:
      "Teaching embedded systems, IoT, and industrial automation using project-based learning.",
    startDate: "2024-06",
    current: true,
    published: true,
    order: 1,
  },
];

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const displayExperiences =
    experiences && experiences.length > 0
      ? experiences
          .filter((exp) => exp.published)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : fallbackExperiences;

  if (!displayExperiences.length) return null;

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="section-container relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle mx-auto mt-4">
            My professional journey in IoT and embedded systems
          </p>
          <div className="glow-line w-24 mx-auto mt-6" />
        </motion.div>

        {/* TIMELINE */}
        <div className="relative max-w-3xl mx-auto">
          {/* Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {displayExperiences.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1.5 md:-translate-x-2 shadow-glow" />

                {/* Content */}
                <div
                  className={`ml-8 md:ml-0 md:w-1/2 ${
                    isEven ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="card-elevated p-6 hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm font-medium">{exp.company}</span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">
                      {exp.position}
                    </h3>

                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(exp.startDate)} –{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
