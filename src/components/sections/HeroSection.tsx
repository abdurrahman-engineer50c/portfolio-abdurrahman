// import { motion } from 'framer-motion';
// import { Download, Mail, ChevronDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import heroProfile from '@/assets/hero-profile.png';

// interface HeroSectionProps {
//   data?: {
//     name: string;
//     title: string;
//     tagline: string;
//     profileImage?: string;
//     cvUrl?: string;
//   };
// }

// const defaultData = {
//   name: "Abdurrahman",
//   title: "IoT Engineer | Embedded Systems | Robotics Integration",
//   tagline: "Building intelligent connected devices that bridge the physical and digital worlds. Specialized in ESP32, Arduino, and industrial IoT solutions.",
//   profileImage: heroProfile,
//   cvUrl: "/cv/CV_New.pdf"
// };

// export const HeroSection = ({ data = defaultData }: HeroSectionProps) => {
//   const scrollToAbout = () => {
//     document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const scrollToContact = () => {
//     document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern">
//       {/* Background Effects */}
//       <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
//       <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse-slow" />

//       <div className="section-container relative z-10 py-20">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//           {/* Text Content */}
//           <motion.div
//             className="flex-1 text-center lg:text-left"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
//             >
//               <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
//               Available for Projects
//             </motion.div>

//             <motion.h1
//               className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               Hi, I'm{' '}
//               <span className="text-gradient">{data.name}</span>
//             </motion.h1>

//             <motion.p
//               className="text-xl md:text-2xl text-muted-foreground font-medium mb-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               {data.title}
//             </motion.p>

//             <motion.p
//               className="text-muted-foreground text-lg max-w-xl mb-8"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//             >
//               {data.tagline}
//             </motion.p>

//             <motion.div
//               className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <Button
//                 size="lg"
//                 className="btn-primary-glow"
//                 asChild
//               >
//                 <a href={data.cvUrl || defaultData.cvUrl} download>
//                   <Download className="mr-2 h-5 w-5" />
//                   Download CV
//                 </a>
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 onClick={scrollToContact}
//                 className="border-primary/50 text-foreground hover:bg-primary/10"
//               >
//                 <Mail className="mr-2 h-5 w-5" />
//                 Contact Me
//               </Button>
//             </motion.div>
//           </motion.div>

//           {/* Profile Image */}
//           <motion.div
//             className="flex-shrink-0"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <div className="relative">
//               {/* Glow Effect */}
//               <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl scale-110" />

//               {/* Image Container */}
//               <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-glow-lg">
//                 <img
//                   src={data.profileImage || defaultData.profileImage}
//                   alt={data.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Floating Elements */}
//               <motion.div
//                 className="absolute -top-4 -right-4 w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center shadow-lg"
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ duration: 3, repeat: Infinity }}
//               >
//                 <span className="text-2xl">🔧</span>
//               </motion.div>
//               <motion.div
//                 className="absolute -bottom-4 -left-4 w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center shadow-lg"
//                 animate={{ y: [0, 10, 0] }}
//                 transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
//               >
//                 <span className="text-2xl">⚡</span>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.button
//           onClick={scrollToAbout}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//         >
//           <ChevronDown className="w-8 h-8 animate-bounce" />
//         </motion.button>
//       </div>
//     </section>
//   );
// };

import { motion } from "framer-motion";
import { Download, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HeroData {
  name: string;
  title: string;
  tagline: string;
  profileImage?: string;
  cvUrl?: string;
}

interface HeroSectionProps {
  data: HeroData;
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  if (!data) return null;

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="section-container relative z-10 py-20">
        {/* MENGGUNAKAN flex-col-reverse: 
            - Mobile: Foto (elemen bawah di kode) muncul di ATAS.
            - Desktop (lg): Kembali ke flex-row, Foto muncul di KANAN.
        */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* --- TEXT CONTENT --- */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-gradient">{data.name}</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              {data.title}
            </p>

            <p className="text-muted-foreground text-lg max-w-xl mb-8 mx-auto lg:mx-0">
              {data.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {data.cvUrl && (
                <Button size="lg" asChild>
                  <a
                    href={data.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </a>
                </Button>
              )}

              <Button size="lg" variant="outline" onClick={scrollToContact}>
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </div>
          </motion.div>

          {/* --- IMAGE CONTENT --- */}
          {data.profileImage && (
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Ditambahkan mb-8 agar ada jarak dengan teks saat di mobile */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg mb-4 lg:mb-0">
                <img
                  src={data.profileImage}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* SCROLL INDICATOR */}
        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          aria-label="Scroll to About section"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
};