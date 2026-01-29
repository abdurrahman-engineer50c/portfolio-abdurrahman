// import { motion } from 'framer-motion';
// import { Mail, Phone, MapPin, Send } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import type { ContactInfo } from '@/lib/firestore';

// interface ContactSectionProps {
//   contactInfo?: ContactInfo;
// }

// const defaultContactInfo: ContactInfo = {
//   id: '1',
//   email: 'rahmanabdur15689@gmail.com',
//   phone: '+6285601667853',
//   whatsapp: '6285601667853',
//   location: 'Indonesia',
//   socialLinks: [
//     { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
//     { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
//     { platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
//   ],
//   published: true,
// };

// const SocialIcon = ({ platform }: { platform: string }) => {
//   const icons: Record<string, JSX.Element> = {
//     github: (
//       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//       </svg>
//     ),
//     linkedin: (
//       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
//       </svg>
//     ),
//     instagram: (
//       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//       </svg>
//     ),
//   };
//   return icons[platform.toLowerCase()] || null;
// };

// export const ContactSection = ({ contactInfo = defaultContactInfo }: ContactSectionProps) => {
//   const contact = contactInfo || defaultContactInfo;

//   const handleWhatsApp = () => {
//     window.open(`https://wa.me/${contact.whatsapp}`, '_blank');
//   };

//   const handleEmail = () => {
//     window.location.href = `mailto:${contact.email}`;
//   };

//   return (
//     <section id="contact" className="py-24 relative">
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
//       <div className="section-container relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="section-title">Get In Touch</h2>
//           <p className="section-subtitle mx-auto mt-4">
//             Have a project in mind? Let's work together
//           </p>
//           <div className="glow-line w-24 mx-auto mt-6" />
//         </motion.div>

//         <div className="max-w-4xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Contact Info */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="space-y-6"
//             >
//               <div className="card-elevated p-6">
//                 <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                
//                 <div className="space-y-4">
//                   <button
//                     onClick={handleEmail}
//                     className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
//                   >
//                     <div className="icon-container">
//                       <Mail className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">Email</p>
//                       <p className="text-foreground">{contact.email}</p>
//                     </div>
//                   </button>

//                   <button
//                     onClick={handleWhatsApp}
//                     className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
//                   >
//                     <div className="icon-container">
//                       <Phone className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">WhatsApp</p>
//                       <p className="text-foreground">{contact.phone}</p>
//                     </div>
//                   </button>

//                   {contact.location && (
//                     <div className="flex items-center gap-4 p-3">
//                       <div className="icon-container">
//                         <MapPin className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <p className="text-sm text-muted-foreground">Location</p>
//                         <p className="text-foreground">{contact.location}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Social Links */}
//                 <div className="mt-6 pt-6 border-t border-border">
//                   <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
//                   <div className="flex gap-3">
//                     {contact.socialLinks.map((link) => (
//                       <a
//                         key={link.platform}
//                         href={link.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
//                       >
//                         <SocialIcon platform={link.platform} />
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* CTA */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="card-elevated card-glow p-8 flex flex-col justify-center items-center text-center"
//             >
//               <div className="icon-container-lg mb-6">
//                 <Send className="w-7 h-7" />
//               </div>
//               <h3 className="text-2xl font-bold text-foreground mb-4">
//                 Ready to Start Your Project?
//               </h3>
//               <p className="text-muted-foreground mb-8">
//                 I'm always excited to work on new IoT and embedded systems projects. 
//                 Let's discuss how we can bring your ideas to life.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button 
//                   size="lg" 
//                   className="btn-primary-glow"
//                   onClick={handleWhatsApp}
//                 >
//                   <Phone className="mr-2 h-5 w-5" />
//                   WhatsApp Me
//                 </Button>
//                 <Button 
//                   size="lg" 
//                   variant="outline"
//                   onClick={handleEmail}
//                   className="border-primary/50 hover:bg-primary/10"
//                 >
//                   <Mail className="mr-2 h-5 w-5" />
//                   Send Email
//                 </Button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactInfo } from "@/lib/firestore";

interface ContactSectionProps {
  contactInfo: ContactInfo | null;
}

/**
 * Fallback (dipakai hanya jika Firestore kosong / gagal load)
 */
const fallbackContactInfo: ContactInfo = {
  id: "fallback",
  email: "hello@example.com",
  phone: "",
  whatsapp: "",
  location: "Indonesia",
  socialLinks: [],
  published: true,
};

const SocialIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, JSX.Element> = {
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
      </svg>
    ),
  };

  return icons[platform.toLowerCase()] || null;
};

export const ContactSection = ({ contactInfo }: ContactSectionProps) => {
  const contact =
    contactInfo && contactInfo.published ? contactInfo : fallbackContactInfo;

  if (!contact) return null;

  const handleWhatsApp = () => {
    if (!contact.whatsapp) return;
    window.open(`https://wa.me/${contact.whatsapp}`, "_blank");
  };

  const handleEmail = () => {
    if (!contact.email) return;
    window.location.href = `mailto:${contact.email}`;
  };

  return (
    <section id="contact" className="py-24 relative">
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
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle mx-auto mt-4">
            Have a project in mind? Let's work together
          </p>
          <div className="glow-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-elevated p-6"
          >
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-4">
              {contact.email && (
                <button
                  onClick={handleEmail}
                  className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                >
                  <Mail className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{contact.email}</p>
                  </div>
                </button>
              )}

              {contact.phone && (
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                >
                  <Phone className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <p>{contact.phone}</p>
                  </div>
                </button>
              )}

              {contact.location && (
                <div className="flex items-center gap-4 p-3">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p>{contact.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* SOCIAL */}
            {contact.socialLinks?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Follow me</p>
                <div className="flex gap-3">
                  {contact.socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition"
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-elevated card-glow p-8 flex flex-col items-center text-center"
          >
            <Send className="w-8 h-8 mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-8">
              Let’s build impactful IoT & embedded solutions together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {contact.whatsapp && (
                <Button size="lg" onClick={handleWhatsApp}>
                  <Phone className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              )}
              {contact.email && (
                <Button size="lg" variant="outline" onClick={handleEmail}>
                  <Mail className="mr-2 h-5 w-5" />
                  Email
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
