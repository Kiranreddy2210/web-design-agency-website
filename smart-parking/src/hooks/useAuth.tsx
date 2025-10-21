import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import type { AppUser, Role } from '../types';
import { ref, get, set } from 'firebase/database';
import { db } from '../firebase';

interface AuthContextShape {
  firebaseUser: User | null;
  appUser: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

function toAppUser(u: User, role: Role = 'user'): AppUser {
  return {
    id: u.uid,
    email: u.email || '',
    displayName: u.displayName || undefined,
    role,
    createdAt: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setFirebaseUser(u);
      if (u) {
        // Fetch role from Realtime DB if exists, otherwise default 'user'
        try {
          const userRef = ref(db, `users/${u.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val() as AppUser;
            setAppUser(data);
          } else {
            const nu = toAppUser(u, 'user');
            await set(userRef, nu);
            setAppUser(nu);
          }
        } catch (e) {
          setAppUser(toAppUser(u, 'user'));
        }
      } else {
        setAppUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, displayName?: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    const userRef = ref(db, `users/${cred.user.uid}`);
    await set(userRef, toAppUser(cred.user, 'user'));
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo(() => ({ firebaseUser, appUser, loading, login, register, logout }), [firebaseUser, appUser, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
