import { useNavigate, useParams } from 'react-router-dom';
import type { Booking, Payment } from '../types';
import { v4 as uuid } from 'uuid';

export function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const booking: Booking | null = (() => {
    const raw = sessionStorage.getItem('currentBooking');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Booking;
    return parsed.id === bookingId ? parsed : null;
  })();

  if (!booking) {
    return <div className="max-w-xl mx-auto p-6">No booking data found.</div>;
  }

  const simulatePayment = async () => {
    const pay: Payment = {
      id: uuid(),
      bookingId: booking.id,
      userId: booking.userId,
      amount: booking.amount,
      currency: 'INR',
      provider: 'mock',
      status: 'succeeded',
      transactionTime: new Date().toISOString(),
    };
    sessionStorage.setItem('lastPayment', JSON.stringify(pay));
    sessionStorage.setItem('currentBooking', JSON.stringify({ ...booking, status: 'confirmed', paymentId: pay.id }));
    navigate(`/confirmation/${booking.id}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Payment</h2>
      <div className="border rounded p-4">
        <div className="text-sm">Booking ID: {booking.id}</div>
        <div className="text-sm">Amount: ₹{booking.amount}</div>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={simulatePayment}>Pay (Mock)</button>
    </div>
  );
}
