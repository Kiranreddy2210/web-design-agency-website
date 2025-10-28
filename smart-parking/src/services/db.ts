import { ref, set, get, onValue, update, child } from 'firebase/database';
import { db } from '../firebase';
import type { ParkingLocation, Booking, AppUser } from '../types';

export const dbPaths = {
  locations: 'locations',
  bookings: 'bookings',
  users: 'users',
};

export async function seedLocations(locations: ParkingLocation[]): Promise<void> {
  const locationsRef = ref(db, dbPaths.locations);
  const snapshot = await get(locationsRef);
  if (!snapshot.exists()) {
    await set(locationsRef, locations);
  }
}

export async function listLocations(): Promise<ParkingLocation[]> {
  const snapshot = await get(ref(db, dbPaths.locations));
  if (!snapshot.exists()) return [];
  return snapshot.val();
}

export async function getLocation(locationId: string): Promise<ParkingLocation | null> {
  const snapshot = await get(child(ref(db), `${dbPaths.locations}/${locationId}`));
  return snapshot.exists() ? (snapshot.val() as ParkingLocation) : null;
}

export async function createBooking(booking: Booking): Promise<void> {
  await set(ref(db, `${dbPaths.bookings}/${booking.id}`), booking);
}

export async function updateBooking(id: string, patch: Partial<Booking>): Promise<void> {
  await update(ref(db, `${dbPaths.bookings}/${id}`), patch);
}

export async function listUserBookings(userId: string): Promise<Booking[]> {
  const snapshot = await get(ref(db, dbPaths.bookings));
  if (!snapshot.exists()) return [];
  const all = snapshot.val() as Record<string, Booking>;
  return Object.values(all).filter((b) => b.userId === userId);
}

export function subscribeLocations(cb: (locations: ParkingLocation[]) => void): () => void {
  const locationsRef = ref(db, dbPaths.locations);
  return onValue(locationsRef, (snap) => {
    const value = snap.val() as ParkingLocation[] | null;
    cb(value ? value : []);
  });
}

export async function saveUser(user: AppUser): Promise<void> {
  await set(ref(db, `${dbPaths.users}/${user.id}`), user);
}
