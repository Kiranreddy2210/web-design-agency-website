import type { ParkingLocation, ParkingSlot } from '../types';

export function withIoTSimulation(locations: ParkingLocation[], onUpdate: (locs: ParkingLocation[]) => void): () => void {
  const interval = setInterval(() => {
    const updated = locations.map((loc) => ({
      ...loc,
      slots: loc.slots.map((slot) => toggleRandom(slot)),
    }));
    onUpdate(updated);
  }, 10000);

  return () => clearInterval(interval);
}

function toggleRandom(slot: ParkingSlot): ParkingSlot {
  // 15% chance to flip occupied state, reserved stays
  if (Math.random() < 0.15) {
    return { ...slot, isOccupied: !slot.isOccupied };
  }
  return slot;
}
