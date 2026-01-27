import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

// Types
export interface HeroData {
  id?: string;
  name: string;
  title: string;
  tagline: string;
  profileImage: string;
  cvUrl: string;
  published: boolean;
}

export interface AboutData {
  id?: string;
  content: string;
  published: boolean;
}

export interface Project {
  id?: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  techStack: string[];
  iotPlatform: string[];
  hardware: string[];
  images: string[];
  videoUrl?: string;
  externalUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  published: boolean;
  order: number;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  current: boolean;
  description?: string;
  published: boolean;
  order: number;
}

export interface Certificate {
  id?: string;
  name: string;
  issuer: string;
  year: string;
  imageUrl: string;
  certificateUrl?: string;
  published: boolean;
  order: number;
}

export interface SkillCategory {
  id?: string;
  name: string;
  skills: string[];
  icon: string;
  published: boolean;
  order: number;
}

export interface ContactInfo {
  id?: string;
  email: string;
  phone: string;
  whatsapp: string;
  location?: string;
  socialLinks: { platform: string; url: string; icon: string }[];
  published: boolean;
}

export interface FooterData {
  id?: string;
  copyright: string;
  tagline?: string;
  published: boolean;
}

// Generic CRUD helpers
const getCollection = async <T extends DocumentData>(
  collectionName: string, 
  orderField: string = 'order'
): Promise<T[]> => {
  const q = query(collection(db, collectionName), orderBy(orderField));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as unknown as T));
};

const getPublishedCollection = async <T extends DocumentData>(
  collectionName: string,
  orderField: string = 'order'
): Promise<T[]> => {
  const q = query(
    collection(db, collectionName), 
    where('published', '==', true),
    orderBy(orderField)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as unknown as T));
};

const getSingleDoc = async <T extends DocumentData>(
  collectionName: string
): Promise<T | null> => {
  const snapshot = await getDocs(collection(db, collectionName));
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...d.data() } as unknown as T;
};

const createDocument = async <T extends DocumentData>(
  collectionName: string, 
  data: Omit<T, 'id'>
): Promise<string> => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

const updateDocument = async <T extends DocumentData>(
  collectionName: string, 
  id: string, 
  data: Partial<T>
): Promise<void> => {
  await updateDoc(doc(db, collectionName, id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

const deleteDocument = async (collectionName: string, id: string): Promise<void> => {
  await deleteDoc(doc(db, collectionName, id));
};

// File upload helper
export const uploadFile = async (
  file: File, 
  path: string
): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};

// Hero
export const getHero = () => getSingleDoc<HeroData>('hero');
export const updateHero = (id: string, data: Partial<HeroData>) => 
  updateDocument('hero', id, data);
export const createHero = (data: Omit<HeroData, 'id'>) => 
  createDocument('hero', data);

// About
export const getAbout = () => getSingleDoc<AboutData>('about');
export const updateAbout = (id: string, data: Partial<AboutData>) => 
  updateDocument('about', id, data);
export const createAbout = (data: Omit<AboutData, 'id'>) => 
  createDocument('about', data);

// Projects
export const getProjects = () => getCollection<Project>('projects');
export const getPublishedProjects = () => getPublishedCollection<Project>('projects');
export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  const q = query(collection(db, 'projects'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Project;
};
export const createProject = (data: Omit<Project, 'id'>) => 
  createDocument('projects', data);
export const updateProject = (id: string, data: Partial<Project>) => 
  updateDocument('projects', id, data);
export const deleteProject = (id: string) => deleteDocument('projects', id);

// Experience
export const getExperiences = () => getCollection<Experience>('experiences');
export const getPublishedExperiences = () => getPublishedCollection<Experience>('experiences');
export const createExperience = (data: Omit<Experience, 'id'>) => 
  createDocument('experiences', data);
export const updateExperience = (id: string, data: Partial<Experience>) => 
  updateDocument('experiences', id, data);
export const deleteExperience = (id: string) => deleteDocument('experiences', id);

// Education
export const getEducation = () => getCollection<Education>('education');
export const getPublishedEducation = () => getPublishedCollection<Education>('education');
export const createEducation = (data: Omit<Education, 'id'>) => 
  createDocument('education', data);
export const updateEducation = (id: string, data: Partial<Education>) => 
  updateDocument('education', id, data);
export const deleteEducation = (id: string) => deleteDocument('education', id);

// Certificates
export const getCertificates = () => getCollection<Certificate>('certificates');
export const getPublishedCertificates = () => getPublishedCollection<Certificate>('certificates');
export const createCertificate = (data: Omit<Certificate, 'id'>) => 
  createDocument('certificates', data);
export const updateCertificate = (id: string, data: Partial<Certificate>) => 
  updateDocument('certificates', id, data);
export const deleteCertificate = (id: string) => deleteDocument('certificates', id);

// Skills
export const getSkillCategories = () => getCollection<SkillCategory>('skills');
export const getPublishedSkillCategories = () => getPublishedCollection<SkillCategory>('skills');
export const createSkillCategory = (data: Omit<SkillCategory, 'id'>) => 
  createDocument('skills', data);
export const updateSkillCategory = (id: string, data: Partial<SkillCategory>) => 
  updateDocument('skills', id, data);
export const deleteSkillCategory = (id: string) => deleteDocument('skills', id);

// Contact
export const getContact = () => getSingleDoc<ContactInfo>('contact');
export const updateContact = (id: string, data: Partial<ContactInfo>) => 
  updateDocument('contact', id, data);
export const createContact = (data: Omit<ContactInfo, 'id'>) => 
  createDocument('contact', data);

// Footer
export const getFooter = () => getSingleDoc<FooterData>('footer');
export const updateFooter = (id: string, data: Partial<FooterData>) => 
  updateDocument('footer', id, data);
export const createFooter = (data: Omit<FooterData, 'id'>) => 
  createDocument('footer', data);
