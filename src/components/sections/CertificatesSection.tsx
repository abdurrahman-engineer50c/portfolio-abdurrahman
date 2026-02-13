// import { motion } from 'framer-motion';
// import { Award, ExternalLink } from 'lucide-react';
// import type { Certificate } from '@/lib/firestore';

// interface CertificatesSectionProps {
//   certificates?: Certificate[];
// }

// const defaultCertificates: Certificate[] = [
//   {
//     id: '1',
//     name: 'AWS IoT Core Specialist',
//     issuer: 'Amazon Web Services',
//     year: '2023',
//     imageUrl: '',
//     certificateUrl: '#',
//     published: true,
//     order: 1,
//   },
//   {
//     id: '2',
//     name: 'Embedded C Programming',
//     issuer: 'Coursera',
//     year: '2022',
//     imageUrl: '',
//     certificateUrl: '#',
//     published: true,
//     order: 2,
//   },
//   {
//     id: '3',
//     name: 'Industrial IoT Foundations',
//     issuer: 'Udemy',
//     year: '2021',
//     imageUrl: '',
//     certificateUrl: '#',
//     published: true,
//     order: 3,
//   },
// ];

// export const CertificatesSection = ({ certificates = defaultCertificates }: CertificatesSectionProps) => {
//   const displayCertificates = certificates.length > 0 ? certificates : defaultCertificates;

//   return (
//     <section id="certificates" className="py-24 relative">
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
//       <div className="section-container relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="section-title">Certifications</h2>
//           <p className="section-subtitle mx-auto mt-4">
//             Professional certifications and achievements
//           </p>
//           <div className="glow-line w-24 mx-auto mt-6" />
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
//           {displayCertificates.map((cert, index) => (
//             <motion.div
//               key={cert.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="group"
//             >
//               <div className="card-elevated card-glow h-full p-6 hover:border-primary/50 transition-all duration-300">
//                 {/* Certificate Image or Placeholder */}
//                 <div className="aspect-[4/3] rounded-lg bg-muted/50 mb-4 overflow-hidden flex items-center justify-center border border-border">
//                   {cert.imageUrl ? (
//                     <img 
//                       src={cert.imageUrl} 
//                       alt={cert.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <Award className="w-16 h-16 text-primary/50" />
//                   )}
//                 </div>

//                 <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
//                   {cert.name}
//                 </h3>
//                 <p className="text-muted-foreground text-sm mb-1">{cert.issuer}</p>
//                 <p className="text-primary text-sm font-medium mb-4">{cert.year}</p>

//                 {cert.certificateUrl && (
//                   <a 
//                     href={cert.certificateUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center text-sm text-primary hover:underline"
//                   >
//                     View Certificate
//                     <ExternalLink className="ml-1 w-3 h-3" />
//                   </a>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import type { Certificate } from "@/lib/firestore";

interface CertificatesSectionProps {
  certificates: Certificate[] | null;
}

/**
 * Fallback data (dipakai hanya jika Firestore kosong / gagal load)
 */
const fallbackCertificates: Certificate[] = [
  {
    id: "fallback-1",
    name: "Embedded Systems Fundamentals",
    issuer: "Internal Training",
    year: "2024",
    imageUrl: "",
    certificateUrl: "#",
    published: true,
    order: 1,
  },
];

export const CertificatesSection = ({
  certificates,
}: CertificatesSectionProps) => {
  const displayCertificates =
    certificates && certificates.length > 0
      ? certificates
          .filter((cert) => cert.published)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : fallbackCertificates;

  if (!displayCertificates.length) return null;

  return (
    <section id="certificates" className="py-24 relative">
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
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle mx-auto mt-4">
            Professional certifications and achievements
          </p>
          <div className="glow-line w-24 mx-auto mt-6" />
        </motion.div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {displayCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group card-elevated card-glow h-full p-6 hover:border-primary/50 transition-all duration-300">
                {/* IMAGE */}
                <div className="aspect-[4/3] rounded-lg bg-muted/50 mb-4 overflow-hidden flex items-center justify-center border border-border">
                  {cert.imageUrl ? (
                    <img
                      src={cert.imageUrl}
                      alt={cert.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Award className="w-14 h-14 text-primary/40" />
                  )}
                </div>

                {/* TEXT */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cert.name}
                </h3>

                <p className="text-muted-foreground text-sm">{cert.issuer}</p>

                <p className="text-primary text-sm font-medium mb-4">
                  {cert.year}
                </p>

                {/* LINK */}
                {cert.certificateUrl && cert.certificateUrl !== "#" && (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    {/* View Certificate
                    <ExternalLink className="ml-1 w-3 h-3" /> */}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
