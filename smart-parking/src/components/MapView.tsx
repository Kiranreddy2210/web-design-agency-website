import { useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MapContainer, TileLayer, Marker as LMarker, Popup } from 'react-leaflet';
import type { ParkingLocation } from '../types';

export function MapView({
  locations,
  onSelect,
}: {
  locations: ParkingLocation[];
  onSelect?: (location: ParkingLocation) => void;
}) {
  const center = useMemo<[number, number]>(() => {
    if (locations.length) return [locations[0].latitude, locations[0].longitude];
    return [20.5937, 78.9629];
  }, [locations]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const useGoogle = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY) && isLoaded;

  if (useGoogle) {
    return (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{ lat: center[0], lng: center[1] }}
        zoom={13}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            onClick={() => onSelect?.(loc)}
          />
        ))}
      </GoogleMap>
    );
  }

  return (
    <MapContainer {...({ center, zoom: 13, scrollWheelZoom: true, className: 'h-full w-full' } as any)}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((loc) => (
        <LMarker key={loc.id} position={[loc.latitude, loc.longitude]} eventHandlers={{ click: () => onSelect?.(loc) }}>
          <Popup>
            <div className="space-y-1">
              <div className="font-medium">{loc.name}</div>
              <div className="text-xs text-gray-600">{loc.address}</div>
            </div>
          </Popup>
        </LMarker>
      ))}
    </MapContainer>
  );
}
