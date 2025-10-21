import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import type { AppUser, Role } from '../types';
import { ref, get, set } from 'firebase/database';
import { db } from '../firebase';

interface AuthContextShape {
  firebaseUser: User | null;
  appUser: AppUser | null;
  loading: boolean;
  isMock: boolean;
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
  const [mockMode, setMockMode] = useState(false);

  // Helpers for mock mode persistence
  const loadMockUser = (): AppUser | null => {
    try {
      const raw = localStorage.getItem('mockUser');
      return raw ? (JSON.parse(raw) as AppUser) : null;
    } catch {
      return null;
    }
  };
  const saveMockUser = (user: AppUser | null) => {
    if (!user) {
      localStorage.removeItem('mockUser');
      return;
    }
    localStorage.setItem('mockUser', JSON.stringify(user));
  };

  useEffect(() => {
    if (!auth) {
      setMockMode(true);
      const existing = loadMockUser();
      if (existing) setAppUser(existing);
      setLoading(false);
      return;
    }
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
    if (!auth) {
      const role: Role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
      const mock: AppUser = {
        id: `mock-${role}-${email}`,
        email,
        displayName: email.split('@')[0],
        role,
        createdAt: new Date().toISOString(),
      };
      setAppUser(mock);
      saveMockUser(mock);
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, displayName?: string) => {
    if (!auth) {
      const mock: AppUser = {
        id: `mock-user-${email}`,
        email,
        displayName,
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      setAppUser(mock);
      saveMockUser(mock);
      return;
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    const userRef = ref(db, `users/${cred.user.uid}`);
    await set(userRef, toAppUser(cred.user, 'user'));
  };

  const logout = async () => {
    if (!auth) {
      setAppUser(null);
      saveMockUser(null);
      return;
    }
    await signOut(auth);
  };

  const value = useMemo(() => ({ firebaseUser, appUser, loading, isMock: mockMode, login, register, logout }), [firebaseUser, appUser, loading, mockMode]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
