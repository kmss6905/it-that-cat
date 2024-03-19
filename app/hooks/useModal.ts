import { useModalState } from '@/stores/modal/store';

export const useModal = () => {
  const { modal, onModal, offModal } = useModalState();

  return {
    modal,
    openModal: onModal,
    closeModal: offModal,
  };
};
