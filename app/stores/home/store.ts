import { Coordinates, RegionState } from '@/types/address';
import { StateCreator, create } from 'zustand';

interface GeolocationState {
  level: number;
  position: Coordinates | null;
  address: RegionState | null;
}

type GeolocationStore = {
  geolocation: GeolocationState;
  setLevel: (level: number) => void;
  setPosition: (position: Coordinates) => void;
  setAddress: (addr: RegionState) => void;
};

const geolocationStore: StateCreator<GeolocationStore> = (set) => ({
  geolocation: { level: 3, position: null, address: null },
  setLevel: (level) =>
    set((prev) => ({
      geolocation: { ...prev.geolocation, level: level },
    })),
  setPosition: (position) =>
    set((prev) => ({
      geolocation: { ...prev.geolocation, position: position },
    })),
  setAddress: (addr) =>
    set((prev) => ({
      geolocation: { ...prev.geolocation, address: addr },
    })),
});

export const useGeolocationStore = create(geolocationStore);
