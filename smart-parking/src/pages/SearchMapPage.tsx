import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { ParkingLocation } from '../types';
import { sampleLocations } from '../services/mockData';
import { withIoTSimulation } from '../services/iotSim';
import { Link } from 'react-router-dom';

export function SearchMapPage() {
  const [locations, setLocations] = useState<ParkingLocation[]>(sampleLocations);

  useEffect(() => {
    const stop = withIoTSimulation(locations, setLocations);
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const center = useMemo(() => {
    if (locations.length) return [locations[0].latitude, locations[0].longitude] as [number, number];
    return [20.5937, 78.9629] as [number, number]; // India center
  }, [locations]);

  return (
    <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
      <div className="lg:col-span-2 order-2 lg:order-1">
        <div className="h-[60vh] rounded-lg overflow-hidden border">
          <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc) => (
              <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
                <Popup>
                  <div className="space-y-2">
                    <div className="font-medium">{loc.name}</div>
                    <div className="text-sm text-gray-600">{loc.address}</div>
                    <div className="text-sm">Available: {loc.slots.filter(s => !s.isOccupied && !s.isReserved).length} / {loc.totalSlots}</div>
                    <Link to={`/booking/${loc.id}/${loc.slots.find(s => !s.isOccupied && !s.isReserved)?.id ?? ''}`} className="inline-block text-blue-600 text-sm">Book now</Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <aside className="order-1 lg:order-2 space-y-4">
        <div className="flex gap-2">
          <input className="flex-1 border rounded p-2" placeholder="Search by city, area, or PIN" />
          <button className="px-4 py-2 border rounded">Search</button>
        </div>
        <div className="space-y-3">
          {locations.map((loc) => {
            const available = loc.slots.filter(s => !s.isOccupied && !s.isReserved).length;
            return (
              <div key={loc.id} className="border rounded p-3">
                <div className="font-medium">{loc.name}</div>
                <div className="text-sm text-gray-600">{loc.city} • {loc.pinCode}</div>
                <div className="text-sm">Rate: ₹{loc.hourlyRate}/hr • Available: {available}/{loc.totalSlots}</div>
                <Link to={`/booking/${loc.id}/${loc.slots.find(s => !s.isOccupied && !s.isReserved)?.id ?? ''}`} className="inline-block mt-2 bg-blue-600 text-white px-3 py-1.5 rounded text-sm disabled:opacity-50" aria-disabled={available === 0}>Book</Link>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
