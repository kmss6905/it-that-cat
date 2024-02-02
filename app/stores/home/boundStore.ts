import { getDistance } from '@/utils/calcDistance';
import { StateCreator, create } from 'zustand';

interface boundState {
  sw: string | { lat: number; lng: number };
  ne: string | { lat: number; lng: number };
}

interface boundStore {
  bound: boundState | null;
  distance: number | null;
  setBoundDistance: (value: boundState) => void;
}

const boundStore: StateCreator<boundStore> = (set) => ({
  bound: null,
  distance: null,
  setBoundDistance: (value) =>
    set(() => {
      const sw = value.sw
        .toString()
        .replace(/[(]|[)]/g, '')
        .split(',')
        .flatMap((value: any) => +value);

      const ne = value.ne
        .toString()
        .replace(/[(]|[)]/g, '')
        .split(',')
        .flatMap((value: any) => +value);

      const positionGroup = {
        sw: { lat: sw[0], lng: sw[1] },
        ne: { lat: ne[0], lng: ne[1] },
      };
      const result = getDistance(positionGroup.sw, positionGroup.ne);
      return {
        distance: result,
      };
    }),
});

export const useBoundStore = create(boundStore);
