import { RegionState } from '@/apis/map/getAddress';
import { StateCreator, create } from 'zustand';

interface GeolocationState {
  position: { lat: number; lng: number } | null;
  address: RegionState | null;
}

type GeolocationStore = {
  geolocation: GeolocationState;
  setPosition: (position: { lat: number; lng: number }) => void;
  setAddress: (addr: RegionState) => void;
  setEmpty: () => void;
};

const geolocationStore: StateCreator<GeolocationStore> = (set) => ({
  geolocation: { position: null, address: null },
  setPosition: (position) =>
    set((prev) => {
      return {
        geolocation: {
          address: prev.geolocation.address,
          position: position,
        },
      };
    }),
  setAddress: (addr) =>
    set((prev) => {
      return {
        geolocation: {
          position: prev.geolocation.position,
          address: addr,
        },
      };
    }),
  setEmpty: () =>
    set(() => ({ geolocation: { position: null, address: null } })),
});

export const useGeolocationStore = create(geolocationStore);
