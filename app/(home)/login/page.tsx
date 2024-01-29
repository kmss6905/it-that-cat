'use client';
import { handleClickLogin } from '@/apis/login/onClickLogin';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className='relative h-full'>
      <h2>Logo</h2>

      <div className='absolute z-10 bottom-10 w-full flex flex-col gap-2 items-center'>
        <button onClick={() => handleClickLogin('kakao')}>
          카카오로 간편 회원가입
        </button>

        {/* <button onClick={() => handleClickLogin('kakao')}>
          네이버로 간편 회원가입
        </button> */}

        <button onClick={() => router.push('/')}>로그인 없이 둘러보기</button>
      </div>
    </div>
  );
};

export default LoginPage;
