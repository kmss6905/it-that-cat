'use client';
import { getAccountCode } from '@/apis/login/getAccountCode';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface LoginBtnProps {
  children?: ReactNode;
  provider: string;
  Icon?: any | StaticImageData;
  className?: string;
}

const LoginBtn = ({
  children,
  provider,
  Icon,
  className = '',
}: LoginBtnProps) => {
  const router = useRouter();

  const handleClick = async () => {
    let redirectURI: string | undefined = await getAccountCode(provider);
    if (redirectURI) {
      router.push(`${redirectURI}&prompt=select_account`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full cursor-pointer inline-block text-center px-5 py-14px relative rounded-6px subHeading text-[rgba(0,0,0,0.85)] ${className}`}
    >
      {Icon ? (
        <span className='absolute left-5 top-1/2 -translate-y-1/2'>
          <Icon />
        </span>
      ) : null}
      {children}
    </div>
  );
};

export default LoginBtn;
