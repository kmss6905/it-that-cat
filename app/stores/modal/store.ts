import { create } from 'zustand';

import { MODAL_TYPE } from '@/components/Modal';

type ModalStoreProps = {
  modal: MODAL_TYPE;
  setModal: (value: MODAL_TYPE) => void;
  clearModal: () => void;
};

export const useModalState = create<ModalStoreProps>((set) => ({
  modal: '',
  setModal: (modalType: MODAL_TYPE) => set({ modal: modalType }),
  clearModal: () => set({ modal: '' }),
}));
