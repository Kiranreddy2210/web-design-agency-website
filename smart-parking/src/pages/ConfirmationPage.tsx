import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Booking } from '../types';
import QRCode from 'react-qr-code';

export function ConfirmationPage() {
  const { bookingId } = useParams();
  const booking: Booking | null = useMemo(() => {
    const raw = sessionStorage.getItem('currentBooking');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Booking;
    return parsed.id === bookingId ? parsed : null;
  }, [bookingId]);

  // Read payment if needed later
  // const payment: Payment | null = useMemo(() => {
  //   const raw = sessionStorage.getItem('lastPayment');
  //   return raw ? (JSON.parse(raw) as Payment) : null;
  // }, []);

  if (!booking) return <div className="max-w-xl mx-auto p-6">Booking not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Booking Confirmed</h2>
      <div className="border rounded p-4 space-y-2">
        <div className="text-sm">Booking ID: {booking.id}</div>
        <div className="text-sm">Status: {booking.status}</div>
        <div className="text-sm">Payment ID: {booking.paymentId}</div>
        <div className="pt-4 flex items-center justify-center">
          <QRCode value={booking.id} size={160} />
        </div>
      </div>
      <Link to="/dashboard" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Go to Dashboard</Link>
    </div>
  );
}
