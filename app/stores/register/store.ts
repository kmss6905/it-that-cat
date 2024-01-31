import { RegionState } from '@/apis/map/getAddress';
import { StateCreator, create } from 'zustand';

interface GeolocationState {
  position: { lat: number; lng: number } | null;
  address: RegionState | null;
}

type GeolocationStore = {
  geolocation: GeolocationState;
  getPosition: (position: { lat: number; lng: number }) => void;
  getAddress: (addr: RegionState) => void;
};

const geolocationStore: StateCreator<GeolocationStore> = (set) => ({
  geolocation: { position: null, address: null },
  getPosition: (position) =>
    set((prev) => {
      const newPosition = { lat: position.lat, lng: position.lng };

      return {
        geolocation: {
          address: prev.geolocation.address,
          position: newPosition,
        },
      };
    }),
  getAddress: (addr) =>
    set((prev) => {
      return {
        geolocation: {
          position: prev.geolocation.position,
          address: addr,
        },
      };
    }),
});

export const useGeolocationStore = create(geolocationStore);
