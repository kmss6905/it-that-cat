'use client';

import { MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useModal } from '@/hooks/useModal';

interface Props {
  /**
   * Modal main components
   */
  children?: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const { modal, closeModal } = useModal();

  const removeModal = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    closeModal();
  };

  const modalContent = modal ? (
    <div
      onClick={(e) => removeModal(e)}
      className='fixed z-20 max-w-[430px] left-1/2 bg-black/30 bottom-0 -translate-x-1/2 w-full h-full'
    >
      <ModalContainer>{children}</ModalContainer>
    </div>
  ) : null;

  return createPortal(modalContent, document.body);
};

/**
 * Modal 생성 시에 useEffect 실행되서 Modal 을 제외하고, scroll 동작 막기 위함.
 */
const ModalContainer = ({ children }: { children?: React.ReactNode }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='animate-slide-up absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[430px]
      shadow-[0_-10px_60px_rgba(0,0,0,0.15)] rounded-t-lg bg-white flex flex-col'
    >
      {children}
    </div>
  );
};

export default Modal;
