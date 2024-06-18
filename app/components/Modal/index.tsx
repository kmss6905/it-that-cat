'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useModal } from '@/hooks/useModal';

export const MODAL_TYPE = {
  CONTENT_MENU: 'contentMenu',
  CONTENT_DELETE: 'contentDelete',
  CAT_NEWS_DELETE: 'catNewsDelete',
  CONTENT_ANONYMIZATION: 'contentAnonymization',
  SEARCH: 'search',
  MYPAGE_NICKNAME: 'myPageNickname',
  DELETE_USER: 'deleteUser',
  UPDATE_NOTICE: 'updateNotice',
  CONTENT_REPORT: 'contentReport',
};
export type MODAL_TYPE = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

export const MODAL_VARIANT = {
  SLIDE: 'slide',
  CARD: 'card',
  ALL: 'all',
};
export type MODAL_VARIANT = (typeof MODAL_VARIANT)[keyof typeof MODAL_VARIANT];

interface Props {
  /**
   * Modal main components
   */
  children?: React.ReactNode;
  /**
   * Modal type
   */
  type: MODAL_TYPE;
  /**
   * Modal variant
   */
  variant?: MODAL_VARIANT;
}

const Modal = ({ children, type, variant = MODAL_VARIANT.SLIDE }: Props) => {
  const { modal, closeModal } = useModal();
  const [body, setBody] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') setBody(document.body);
  }, []);

  const removeModal = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    closeModal();
  };

  const modalContent =
    modal === type ? (
      <div
        onClick={(e) => removeModal(e)}
        className='fixed z-20 max-w-[430px] left-1/2 bg-black/30 bottom-0 -translate-x-1/2 w-full h-full'
      >
        <ModalContainer variant={variant}>{children}</ModalContainer>
      </div>
    ) : null;

  if (!body) return;
  return createPortal(modalContent, body);
};

/**
 * Modal 생성 시에 useEffect 실행되서 Modal 을 제외하고, scroll 동작 막기 위함.
 */
const ModalContainer = ({
  children,
  variant,
}: {
  children?: React.ReactNode;
  variant?: MODAL_VARIANT;
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (variant === MODAL_VARIANT.ALL)
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className='max-w-lg w-full h-full mx-auto absolute left-1/2 -translate-x-1/2 bg-white'
      >
        {children}
      </div>
    );

  if (variant === MODAL_VARIANT.CARD)
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className='max-w-lg w-full mx-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'
      >
        <div className='bg-white rounded-lg mx-11 overflow-hidden'>
          {children}
        </div>
      </div>
    );

  if (variant === MODAL_VARIANT.SLIDE)
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className='animate-slide-up absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[430px]
      shadow-[0_-10px_60px_rgba(0,0,0,0.15)] rounded-lg bg-white flex flex-col'
      >
        {children}
      </div>
    );

  if (variant === MODAL_VARIANT.ALL)
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-full h-full bg-white mx-auto absolute left-1/2 -translate-x-1/2 top-0'
      >
        {children}
      </div>
    );
};

export default Modal;
