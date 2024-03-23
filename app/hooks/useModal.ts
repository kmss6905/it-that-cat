import { useModalState } from '@/stores/modal/store';

export const useModal = () => {
  const { modal, setModal, clearModal } = useModalState();

  return {
    modal,
    openModal: setModal,
    closeModal: clearModal,
  };
};
