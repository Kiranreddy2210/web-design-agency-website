import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { firebaseConfig, isFirebaseConfigured } from './config';

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = isFirebaseConfigured() ? getAuth(app) : (undefined as unknown as ReturnType<typeof getAuth>);
export const db = isFirebaseConfigured() ? getDatabase(app) : (undefined as unknown as ReturnType<typeof getDatabase>);
export default app;
