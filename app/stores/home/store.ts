import { Coordinates, RegionState } from '@/types/address';
import { StateCreator, create } from 'zustand';

interface GeolocationState {
  position: Coordinates | null;
  address: RegionState | null;
}

type GeolocationStore = {
  geolocation: GeolocationState;
  setPosition: (position: Coordinates) => void;
  setAddress: (addr: RegionState) => void;
};

const geolocationStore: StateCreator<GeolocationStore> = (set) => ({
  geolocation: { position: null, address: null },
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
