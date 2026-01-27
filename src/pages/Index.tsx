import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { CertificatesSection } from '@/components/sections/CertificatesSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { 
  getHero, 
  getAbout, 
  getPublishedProjects, 
  getPublishedExperiences, 
  getPublishedEducation, 
  getPublishedCertificates, 
  getPublishedSkillCategories, 
  getContact,
  getFooter,
  type HeroData,
  type AboutData,
  type Project,
  type Experience,
  type Education,
  type Certificate,
  type SkillCategory,
  type ContactInfo,
  type FooterData
} from '@/lib/firestore';

const Index = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          hero,
          about,
          projectsData,
          experiencesData,
          educationData,
          certificatesData,
          skillsData,
          contact,
          footer
        ] = await Promise.all([
          getHero(),
          getAbout(),
          getPublishedProjects(),
          getPublishedExperiences(),
          getPublishedEducation(),
          getPublishedCertificates(),
          getPublishedSkillCategories(),
          getContact(),
          getFooter()
        ]);

        setHeroData(hero);
        setAboutData(about);
        setProjects(projectsData);
        setExperiences(experiencesData);
        setEducation(educationData);
        setCertificates(certificatesData);
        setSkillCategories(skillsData);
        setContactInfo(contact);
        setFooterData(footer);
      } catch (error) {
        console.log('Using default data - Firebase not configured yet');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection data={heroData || undefined} />
        <AboutSection data={aboutData || undefined} />
        <PortfolioSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <EducationSection education={education} />
        <CertificatesSection certificates={certificates} />
        <SkillsSection skillCategories={skillCategories} />
        <ContactSection contactInfo={contactInfo || undefined} />
      </main>
      <Footer footerData={footerData || undefined} contactInfo={contactInfo || undefined} />
    </div>
  );
};

export default Index;
