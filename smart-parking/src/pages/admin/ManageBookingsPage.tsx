import { useMemo } from 'react';
import type { Booking } from '../../types';

export function ManageBookingsPage() {
  const bookings: Booking[] = useMemo(() => {
    const raw = sessionStorage.getItem('currentBooking');
    const one = raw ? [JSON.parse(raw) as Booking] : [];
    return one;
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Manage Bookings</h2>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 && (
            <tr>
              <td className="py-3 text-gray-600" colSpan={4}>No bookings yet.</td>
            </tr>
          )}
          {bookings.map(b => (
            <tr key={b.id} className="border-b">
              <td className="py-2">{b.id}</td>
              <td>{b.userId}</td>
              <td>{b.status}</td>
              <td>₹{b.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
