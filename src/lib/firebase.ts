import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC0nQr9xtHwA67B1mqpdx554GCbJ-mz8W8",
  authDomain: "personal-porfolio-151a7.firebaseapp.com",
  projectId: "personal-porfolio-151a7",
  storageBucket: "personal-porfolio-151a7.firebasestorage.app",
  messagingSenderId: "727407794244",
  appId: "1:727407794244:web:fcce5c8f27b3d98a404411",
  measurementId: "G-ZN0LC6FF86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser)
export const initAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
