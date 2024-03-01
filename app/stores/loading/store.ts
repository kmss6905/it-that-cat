import { create } from 'zustand';

type LoadingStoreProps = {
  loading: boolean;
  onLoading: () => void;
  offLoading: () => void;
};

export const useLoading = create<LoadingStoreProps>((set) => ({
  loading: false,
  onLoading: () => set({ loading: true }),
  offLoading: () => set({ loading: false }),
}));
