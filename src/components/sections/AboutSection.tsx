import { motion } from 'framer-motion';
import { Cpu, Code, Wifi, Zap } from 'lucide-react';

interface AboutSectionProps {
  data?: {
    content: string;
  };
}

const defaultContent = `I am a dedicated IoT Engineer and Embedded Systems Developer with extensive experience in designing and implementing smart connected devices. My expertise spans from low-level firmware development to cloud-based IoT platforms, enabling me to deliver end-to-end solutions for industrial and consumer applications.

My technical proficiency includes working with microcontrollers such as ESP32, Arduino, and STM32, combined with expertise in communication protocols like MQTT, HTTP, and Modbus. I specialize in creating robust, scalable IoT architectures that integrate seamlessly with cloud platforms including Firebase, AWS IoT, and custom solutions.

I am passionate about leveraging technology to solve real-world problems, from environmental monitoring systems to industrial automation. My approach combines rigorous engineering principles with innovative thinking to deliver solutions that are both reliable and future-proof.`;

const highlights = [
  { icon: Cpu, label: "Embedded Systems", description: "ESP32, Arduino, STM32" },
  { icon: Code, label: "Firmware Development", description: "C/C++, MicroPython" },
  { icon: Wifi, label: "IoT Protocols", description: "MQTT, HTTP, Modbus" },
  { icon: Zap, label: "Rapid Prototyping", description: "PCB Design, 3D Printing" },
];

export const AboutSection = ({ data }: AboutSectionProps) => {
  const content = data?.content || defaultContent;
  const paragraphs = content.split('\n\n');

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <div className="glow-line w-24 mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Highlights */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                className="card-elevated p-4 flex items-center gap-4 hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="icon-container">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
