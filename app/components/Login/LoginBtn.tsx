'use client';
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

interface LoginBtnProps {
  children?: ReactNode;
  onClick?: (event?: any) => void;
  Icon?: any | StaticImageData;
  className?: string;
}

const LoginBtn = ({
  children,
  onClick,
  Icon,
  className = '',
}: LoginBtnProps) => {
  return (
    <button
      onClick={() => onClick}
      className={`w-full px-5 py-14px relative rounded-primary subHeading text-[rgba(0,0,0,0.85)] ${className}`}
    >
      {Icon ? (
        <span className='absolute left-5 top-1/2 -translate-y-1/2'>
          <Icon />
        </span>
      ) : null}
      {children}
    </button>
  );
};

export default LoginBtn;
