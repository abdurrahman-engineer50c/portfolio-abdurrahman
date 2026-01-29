// import { motion } from 'framer-motion';
// import { Cpu, Code, Wifi, Cloud, Server, Layers } from 'lucide-react';
// import type { SkillCategory } from '@/lib/firestore';

// interface SkillsSectionProps {
//   skillCategories?: SkillCategory[];
// }

// const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
//   Cpu, Code, Wifi, Cloud, Server, Layers
// };

// const defaultSkillCategories: SkillCategory[] = [
//   {
//     id: '1',
//     name: 'Hardware',
//     skills: ['ESP32', 'Arduino', 'Raspberry Pi', 'STM32', 'NodeMCU', 'Micro:bit'],
//     icon: 'Cpu',
//     published: true,
//     order: 1,
//   },
//   {
//     id: '2',
//     name: 'Embedded Firmware',
//     skills: ['C/C++', 'MicroPython', 'PlatformIO', 'Arduino IDE', 'FreeRTOS'],
//     icon: 'Code',
//     published: true,
//     order: 2,
//   },
//   {
//     id: '3',
//     name: 'IoT Platforms',
//     skills: ['Thinger.io', 'Blynk', 'Firebase', 'AWS IoT', 'ThingsBoard'],
//     icon: 'Cloud',
//     published: true,
//     order: 3,
//   },
//   {
//     id: '4',
//     name: 'Networking & Protocols',
//     skills: ['WiFi', 'BLE', 'MQTT', 'HTTP/REST', 'Modbus', 'LoRa'],
//     icon: 'Wifi',
//     published: true,
//     order: 4,
//   },
//   {
//     id: '5',
//     name: 'Cloud Services',
//     skills: ['Firebase', 'AWS', 'Google Cloud', 'InfluxDB', 'Grafana'],
//     icon: 'Server',
//     published: true,
//     order: 5,
//   },
//   {
//     id: '6',
//     name: 'Tools & Others',
//     skills: ['Git', 'KiCad', 'Fusion 360', 'Node-RED', 'Docker'],
//     icon: 'Layers',
//     published: true,
//     order: 6,
//   },
// ];

// export const SkillsSection = ({ skillCategories = defaultSkillCategories }: SkillsSectionProps) => {
//   const displayCategories = skillCategories.length > 0 ? skillCategories : defaultSkillCategories;

//   return (
//     <section id="skills" className="py-24 relative">
//       <div className="section-container">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="section-title">Tech Stack</h2>
//           <p className="section-subtitle mx-auto mt-4">
//             Technologies and tools I work with
//           </p>
//           <div className="glow-line w-24 mx-auto mt-6" />
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {displayCategories.map((category, index) => {
//             const IconComponent = iconMap[category.icon] || Cpu;
            
//             return (
//               <motion.div
//                 key={category.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="card-elevated p-6 hover:border-primary/50 transition-all duration-300"
//               >
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="icon-container">
//                     <IconComponent className="w-5 h-5" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {category.skills.map((skill) => (
//                     <span key={skill} className="tech-badge">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };


import { motion } from "framer-motion";
import { Cpu, Code, Wifi, Cloud, Server, Layers } from "lucide-react";
import type { SkillCategory } from "@/lib/firestore";

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Code,
  Wifi,
  Cloud,
  Server,
  Layers,
};

export const SkillsSection = ({ skillCategories }: SkillsSectionProps) => {
  const displayCategories = skillCategories
    .filter((cat) => cat.published)
    .sort((a, b) => a.order - b.order);

  if (displayCategories.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="py-24 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Tech Stack</h2>
          <p className="section-subtitle mx-auto mt-4">
            Technologies and tools I work with
          </p>
          <div className="glow-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Cpu;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="icon-container">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="tech-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
