import { useState } from 'react';
import { sampleLocations } from '../../services/mockData';

export function ManageSlotsPage() {
  const [locations, setLocations] = useState(sampleLocations);

  const toggleSlot = (locId: string, slotId: string) => {
    setLocations((prev) => prev.map((l) => l.id === locId ? {
      ...l,
      slots: l.slots.map((s) => s.id === slotId ? { ...s, isOccupied: !s.isOccupied } : s)
    } : l));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Manage Slots</h2>
      {locations.map((loc) => (
        <div key={loc.id} className="border rounded p-4">
          <div className="font-medium">{loc.name}</div>
          <div className="grid grid-cols-8 gap-2 mt-3">
            {loc.slots.map((s) => (
              <button key={s.id} onClick={() => toggleSlot(loc.id, s.id)} className={`h-10 rounded text-xs ${s.isOccupied ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
