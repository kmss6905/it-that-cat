'use client';
import LoginBtn from '@/components/Login/LoginBtn';
import { useRouter } from 'next/navigation';
import LogoKakao from '@/assets/images/logo_kakao.svg';

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className='relative h-full mx-6 flex flex-col justify-center items-center'>
      <div className='flex-grow flex flex-col justify-center items-center gap-2 pb-20'>
        <h1 className='heading1 text-white w-full text-center'>Logo</h1>
        <p className='text-gray-200'>한 줄 카피~</p>
      </div>

      <div className='pb-16 w-full flex flex-col gap-6 items-center'>
        <LoginBtn
          className='bg-[#FEE500]'
          link={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kakao/signin`}
          Icon={LogoKakao}
        >
          카카오로 간편 회원가입
        </LoginBtn>

        <button onClick={() => router.push('/')} className='text-[#afafaf]'>
          로그인 없이 둘러보기
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
