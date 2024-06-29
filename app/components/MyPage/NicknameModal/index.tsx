'use client';
import { updateNickname } from '@/apis/mypage';
import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';
import getCookie, { setCookie } from '@/utils/getCookie';
import React, { ReactNode, useEffect, useState } from 'react';

const NicknameModal = ({
  handleUpdateNickname,
}: {
  handleUpdateNickname: (nickname: string) => void;
}) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { closeModal } = useModal();

  const handleClick = async (type: 'reset' | 'submit') => {
    if (type === 'reset') {
      setNickname(null);
      return closeModal();
    }

    if (nickname) {
      const res = await updateNickname(nickname);
      if (res.result === 'SUCCESS') {
        await setCookie({ name: 'nickname', value: nickname });
        setNickname(null);
        handleUpdateNickname(nickname);
        setError(null);
        return closeModal();
      }
      if (res.result === 'ERROR') {
        setError(res.error.message);
      }
    }
  };

  useEffect(() => {
    if (nickname === null) {
      const nick = getCookie('nickname')?.value;
      nick && setNickname(nick);
    }
  }, [nickname]);

  return (
    <Modal type={MODAL_TYPE.MYPAGE_NICKNAME} variant={MODAL_VARIANT.CARD}>
      <div className='pt-10 pb-14 px-11 text-center subHeading'>
        <p>변경할 닉네임을 입력해주세요.</p>
        <form className='relative'>
          <input
            type='text'
            value={nickname ? nickname : ''}
            onChange={(e) => setNickname(e.target.value)}
            className='border-b subHeading mt-10 border-gray-200 w-full caret-primary-500 text-primary-500'
          />
          <span className='absolute right-0 top-[45px] text-gray-300 caption'>
            {nickname === null ? 0 : nickname.length}/10
          </span>
        </form>
        {error !== null ? <p className='error inline-block'>{error}</p> : null}
      </div>

      <div className='w-full flex'>
        <CardBtn
          type='reset'
          onClick={(value) => {
            setError(null);
            handleClick(value);
          }}
          className='border-r border-gray-100'
        >
          취소
        </CardBtn>
        <CardBtn type='submit' onClick={(value) => handleClick(value)}>
          변경
        </CardBtn>
      </div>
    </Modal>
  );
};

interface CardBtnProps {
  children?: ReactNode;
  onClick: (value: 'reset' | 'submit') => void;
  type?: 'reset' | 'submit';
  className?: string;
}

const CardBtn = ({
  children,
  onClick,
  type = 'reset',
  className = '',
}: CardBtnProps) => {
  return (
    <button
      onClick={() => onClick(type)}
      className={`w-1/2 py-4 text-center subHeading border-t border-gray-100 hover:bg-gray-50 active:bg-gray-50 ${type === 'submit' ? 'text-primary-500' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default NicknameModal;
