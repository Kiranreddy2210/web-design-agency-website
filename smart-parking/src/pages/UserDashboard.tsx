import { useMemo } from 'react';
import type { Booking } from '../types';

export function UserDashboard() {
  const bookings: Booking[] = useMemo(() => {
    const raw = sessionStorage.getItem('currentBooking');
    const one = raw ? [JSON.parse(raw) as Booking] : [];
    return one;
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Your Dashboard</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <h3 className="font-medium">Upcoming Bookings</h3>
          <ul className="mt-2 space-y-2">
            {bookings.length === 0 && <li className="text-sm text-gray-600">No bookings yet.</li>}
            {bookings.map((b) => (
              <li key={b.id} className="text-sm">{b.id} — {b.status} — ₹{b.amount}</li>
            ))}
          </ul>
        </div>
        <div className="border rounded p-4">
          <h3 className="font-medium">Payment History</h3>
          <div className="text-sm text-gray-600">Visible after successful payments.</div>
        </div>
      </div>
    </div>
  );
}
