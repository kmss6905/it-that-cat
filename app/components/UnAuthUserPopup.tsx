'use client';
import ImgUnAuth from '@/assets/images/img_unauth.svg';
import { useRouter } from 'next/navigation';
import { ReactNode, useRef } from 'react';

interface UnAuthUserPopup {
  setIsOpen: (value: boolean) => void;
}

const UnAuthUserPopup = ({ setIsOpen }: UnAuthUserPopup) => {
  const router = useRouter();
  const handleClick = (type: 'reset' | 'submit') => {
    if (type === 'submit') {
      return router.push('/login');
    }
    return setIsOpen(false);
  };

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutsideFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref || ref.current === e.target) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      onClick={(e) => handleClickOutsideFilter(e)}
      className='w-full h-full absolute left-0 top-0 z-20 bg-black/50 flex justify-center items-center'
    >
      <div className='w-full flex flex-col items-center bg-white mx-11 rounded-xl overflow-hidden'>
        <div className='text-center flex flex-col gap-2 items-center py-[30px]'>
          <ImgUnAuth />
          <p className='subHeading text-gray-500 pt-3'>
            간편하게 로그인하고
            <br />더 많은 기능을 사용해보세요!
          </p>
          <p className='body2 text-gray-200'>
            로그인한 유저만 작성이 가능해요.
          </p>
        </div>
        <div className='border-t border-gray-100 w-full text-center'>
          <UnAuthBtn
            type='reset'
            onClick={(value) => handleClick(value)}
            className='border-r border-gray-100'
          >
            닫기
          </UnAuthBtn>
          <UnAuthBtn type='submit' onClick={(value) => handleClick(value)}>
            로그인
          </UnAuthBtn>
        </div>
      </div>
    </div>
  );
};

interface UnAuthBtnProps {
  children?: ReactNode;
  onClick: (value: 'reset' | 'submit') => void;
  type?: 'reset' | 'submit';
  className?: string;
}

const UnAuthBtn = ({
  children,
  onClick,
  type = 'reset',
  className = '',
}: UnAuthBtnProps) => {
  return (
    <button
      onClick={() => onClick(type)}
      className={`w-1/2 py-4 text-center hover:bg-gray-50 active:bg-gray-50 ${type === 'submit' ? 'text-primary-500' : 'text-gray-400'} ${className}`}
    >
      {children}
    </button>
  );
};

export default UnAuthUserPopup;
