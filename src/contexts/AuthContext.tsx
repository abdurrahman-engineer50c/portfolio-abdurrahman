import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export type UserRole = 'superuser' | 'write' | 'read';

interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  canWrite: boolean;
  isSuperuser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        setUser(firebaseUser);
        if (firebaseUser && db) {
          // Tambahkan pengecekan db
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            const defaultProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || "",
              role: "read",
            };
            await setDoc(doc(db, "users", firebaseUser.uid), defaultProfile);
            setUserProfile(defaultProfile);
          }
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false); // PINDAHKAN KE FINALLY: Agar loading pasti berhenti
      }
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
  //     setUser(firebaseUser);
      
  //     if (firebaseUser) {
  //       // Fetch user profile from Firestore
  //       const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  //       if (userDoc.exists()) {
  //         setUserProfile(userDoc.data() as UserProfile);
  //       } else {
  //         // Create default profile for new users
  //         const defaultProfile: UserProfile = {
  //           uid: firebaseUser.uid,
  //           email: firebaseUser.email || '',
  //           role: 'read',
  //         };
  //         await setDoc(doc(db, 'users', firebaseUser.uid), defaultProfile);
  //         setUserProfile(defaultProfile);
  //       }
  //     } else {
  //       setUserProfile(null);
  //     }
      
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return {};
    } catch (error: any) {
      return { error: error.message || 'Failed to sign in' };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserProfile(null);
  };

  const canWrite = userProfile?.role === 'superuser' || userProfile?.role === 'write';
  const isSuperuser = userProfile?.role === 'superuser';

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signOut,
    canWrite,
    isSuperuser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
