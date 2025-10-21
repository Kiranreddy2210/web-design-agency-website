import { useEffect, useMemo, useState } from 'react';
import { sampleLocations } from '../../services/mockData';
import type { AnalyticsSnapshot } from '../../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot[]>([]);

  useEffect(() => {
    // mock analytics
    const days = 7;
    const data: AnalyticsSnapshot[] = Array.from({ length: days }).map((_, i) => ({
      date: new Date(Date.now() - (days - i) * 86400000).toISOString().slice(0, 10),
      totalBookings: Math.floor(20 + Math.random() * 50),
      totalRevenue: Math.floor(5000 + Math.random() * 15000),
      occupancyRate: Math.random(),
    }));
    setAnalytics(data);
  }, []);

  const totals = useMemo(() => {
    return {
      locations: sampleLocations.length,
      slots: sampleLocations.reduce((sum, l) => sum + l.totalSlots, 0),
      revenue: analytics.reduce((sum, a) => sum + a.totalRevenue, 0),
    };
  }, [analytics]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded p-4"><div className="text-sm">Locations</div><div className="text-2xl font-semibold">{totals.locations}</div></div>
        <div className="border rounded p-4"><div className="text-sm">Total Slots</div><div className="text-2xl font-semibold">{totals.slots}</div></div>
        <div className="border rounded p-4"><div className="text-sm">Weekly Revenue</div><div className="text-2xl font-semibold">₹{totals.revenue}</div></div>
      </div>
      <div className="border rounded p-4 h-80">
        <div className="font-medium mb-2">Revenue (last 7 days)</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analytics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalRevenue" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
