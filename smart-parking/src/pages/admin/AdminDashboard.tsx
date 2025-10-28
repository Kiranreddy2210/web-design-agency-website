import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { sampleLocations } from '../../services/mockData';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export function AdminDashboard() {
  const chartData = useMemo(() => {
    return Array.from({ length: 7 }).map((_, idx) => ({
      day: `D${idx+1}`,
      bookings: Math.floor(Math.random() * 40) + 10,
      revenue: Math.floor(Math.random() * 5000) + 1000,
    }));
  }, []);

  const totalAvailable = sampleLocations.reduce((sum, l) => sum + l.slots.filter(s => !s.isOccupied && !s.isReserved).length, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded p-4"><div className="text-sm text-gray-600">Total Locations</div><div className="text-2xl font-semibold">{sampleLocations.length}</div></div>
        <div className="border rounded p-4"><div className="text-sm text-gray-600">Available Slots</div><div className="text-2xl font-semibold">{totalAvailable}</div></div>
        <div className="border rounded p-4"><div className="text-sm text-gray-600">Today's Revenue</div><div className="text-2xl font-semibold">₹{(Math.random()*10000).toFixed(0)}</div></div>
      </div>
      <div className="border rounded p-4">
        <div className="font-medium mb-2">Weekly Bookings</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex gap-3">
        <Link to="/admin/slots" className="px-4 py-2 border rounded">Manage Slots</Link>
        <Link to="/admin/bookings" className="px-4 py-2 border rounded">Manage Bookings</Link>
        <Link to="/admin/users" className="px-4 py-2 border rounded">Manage Users</Link>
      </div>
    </div>
  );
}
