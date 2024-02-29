'use client';
import LoginBtn from '@/components/Login/LoginBtn';
import { useRouter } from 'next/navigation';
import LogoKakao from '@/assets/images/logo_kakao.svg';
import Logo from '@/assets/images/logo.svg';
import { useEffect } from 'react';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visited = localStorage.getItem('visited');

      if (!visited) {
        localStorage.setItem('visited', 'true');
      }
    }
  }, []);

  return (
    <div className='relative h-full mx-6 flex flex-col justify-center items-center'>
      <div className='flex-grow flex flex-col justify-center items-center gap-5 mb-28'>
        <p className='text-gray-50 body2 font-light text-center'>
          우리 동네 길고양이,
          <br />
          <span className='font-medium'>올바른 돌봄 문화의 시작</span>
        </p>
        <h1 className='heading1 text-white w-full text-center'>
          <Logo />
        </h1>
      </div>

      <div className='pb-16 w-full flex flex-col gap-6 items-center'>
        <LoginBtn className='bg-[#FEE500]' provider='kakao' Icon={LogoKakao}>
          카카오로 간편 회원가입
        </LoginBtn>
      </div>
    </div>
  );
};

export default LoginPage;
