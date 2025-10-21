import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { sampleLocations } from '../services/mockData';
import type { Booking } from '../types';
import { v4 as uuid } from 'uuid';
import { format, addHours } from 'date-fns';

export function BookingPage() {
  const { locationId, slotId } = useParams();
  const navigate = useNavigate();
  const location = useMemo(() => sampleLocations.find((l) => l.id === locationId), [locationId]);
  const [hours, setHours] = useState(2);

  if (!location) {
    return <div className="max-w-3xl mx-auto p-6">Location not found. <Link className="text-blue-600" to="/search">Back</Link></div>;
  }

  const amount = hours * location.hourlyRate;

  const handleConfirm = () => {
    const now = new Date();
    const booking: Booking = {
      id: uuid(),
      userId: 'demo-user',
      locationId: location.id,
      slotId: slotId || '',
      startTime: now.toISOString(),
      endTime: addHours(now, hours).toISOString(),
      hours,
      amount,
      status: 'pending',
      createdAt: now.toISOString(),
    };
    sessionStorage.setItem('currentBooking', JSON.stringify(booking));
    navigate(`/payment/${booking.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Booking at {location.name}</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm">Duration (hours)</label>
          <select className="border rounded p-2 ml-2" value={hours} onChange={(e) => setHours(parseInt(e.target.value))}>
            {[1,2,3,4,6,8,12,24].map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div className="text-sm text-gray-600">Start: {format(new Date(), 'PPpp')}</div>
        <div className="text-sm text-gray-600">Amount: ₹{amount}</div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleConfirm}>Proceed to Payment</button>
      </div>
    </div>
  );
}
