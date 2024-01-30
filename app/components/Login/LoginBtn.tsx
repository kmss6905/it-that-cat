'use client';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LoginBtnProps {
  children?: ReactNode;
  link: string;
  Icon?: any | StaticImageData;
  className?: string;
}

const LoginBtn = ({ children, link, Icon, className = '' }: LoginBtnProps) => {
  return (
    <Link
      href={link}
      className={`w-full inline-block text-center px-5 py-14px relative rounded-6px subHeading text-[rgba(0,0,0,0.85)] ${className}`}
    >
      {Icon ? (
        <span className='absolute left-5 top-1/2 -translate-y-1/2'>
          <Icon />
        </span>
      ) : null}
      {children}
    </Link>
  );
};

export default LoginBtn;
