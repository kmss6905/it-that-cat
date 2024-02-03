import { RegionState } from '@/apis/map/getAddress';
import { StateCreator, create } from 'zustand';

interface GeolocationState {
  level: number;
  position: { lat: number; lng: number } | null;
  address: RegionState | null;
}

type GeolocationStore = {
  geolocation: GeolocationState;
  setLevel: (level: number) => void;
  setPosition: (position: { lat: number; lng: number }) => void;
  setAddress: (addr: RegionState) => void;
  setEmpty: () => void;
};

const geolocationStore: StateCreator<GeolocationStore> = (set) => ({
  geolocation: { level: 3, position: null, address: null },
  setLevel: (level) =>
    set((prev) => ({
      geolocation: {
        level: level,
        position: prev.geolocation.position,
        address: prev.geolocation.address,
      },
    })),
  setPosition: (position) =>
    set((prev) => ({
      geolocation: {
        level: prev.geolocation.level,
        address: prev.geolocation.address,
        position: position,
      },
    })),
  setAddress: (addr) =>
    set((prev) => ({
      geolocation: {
        level: prev.geolocation.level,
        position: prev.geolocation.position,
        address: addr,
      },
    })),
  setEmpty: () =>
    set(() => ({ geolocation: { level: 3, position: null, address: null } })),
});

export const useGeolocationStore = create(geolocationStore);
