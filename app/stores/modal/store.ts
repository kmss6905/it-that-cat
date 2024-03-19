import { create } from 'zustand';

type ModalStoreProps = {
  modal: boolean;
  onModal: () => void;
  offModal: () => void;
};

export const useModalState = create<ModalStoreProps>((set) => ({
  modal: false,
  onModal: () => set({ modal: true }),
  offModal: () => set({ modal: false }),
}));
