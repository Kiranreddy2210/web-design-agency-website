import type { ParkingLocation, ParkingSlot } from '../types';
import { v4 as uuid } from 'uuid';

function makeSlots(count: number): ParkingSlot[] {
  const slots: ParkingSlot[] = [];
  for (let i = 1; i <= count; i++) {
    slots.push({
      id: uuid(),
      label: `A${i}`,
      isOccupied: Math.random() < 0.3,
      isReserved: false,
    });
  }
  return slots;
}

export const sampleLocations: ParkingLocation[] = [
  {
    id: uuid(),
    name: 'City Center Parking',
    description: 'Secure multi-level parking at city center',
    address: 'MG Road, Central Plaza',
    city: 'Bengaluru',
    pinCode: '560001',
    latitude: 12.9716,
    longitude: 77.5946,
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200&auto=format&fit=crop',
    slots: makeSlots(20),
    hourlyRate: 60,
    totalSlots: 20,
  },
  {
    id: uuid(),
    name: 'Airport Parking - T1',
    description: 'Outdoor long-term parking near Terminal 1',
    address: 'Airport Rd',
    city: 'Mumbai',
    pinCode: '400099',
    latitude: 19.0896,
    longitude: 72.8656,
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200&auto=format&fit=crop',
    slots: makeSlots(35),
    hourlyRate: 90,
    totalSlots: 35,
  },
];
