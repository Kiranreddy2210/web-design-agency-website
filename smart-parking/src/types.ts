export type Role = 'user' | 'admin';

export interface AppUser {
  id: string;
  email: string;
  phone?: string;
  displayName?: string;
  role: Role;
  createdAt: string; // ISO timestamp
}

export interface ParkingSlot {
  id: string;
  label: string; // e.g., A1
  isOccupied: boolean; // real-time status from IoT sim
  isReserved: boolean; // reserved for booking window
}

export interface ParkingLocation {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  pinCode: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  slots: ParkingSlot[];
  hourlyRate: number; // base price per hour
  totalSlots: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  userId: string;
  locationId: string;
  slotId: string;
  startTime: string; // ISO timestamp
  endTime: string; // ISO timestamp
  hours: number;
  amount: number; // in smallest currency unit or float
  status: BookingStatus;
  createdAt: string;
  paymentId?: string;
  qrData?: string;
}

export type PaymentStatus = 'initiated' | 'succeeded' | 'failed' | 'cancelled';

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string; // e.g., 'INR' or 'USD'
  provider: 'stripe' | 'razorpay' | 'mock';
  status: PaymentStatus;
  transactionTime: string;
  raw?: Record<string, unknown>;
}

export interface AnalyticsSnapshot {
  date: string; // YYYY-MM-DD
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number; // 0..1
}
