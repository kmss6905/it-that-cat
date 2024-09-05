'use client';
import { Suspense, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { deleteUser } from '@/apis/mypage';
import { deleteCookie } from '@/utils/cookieStore';

const WithdrawPage = () => {
  return (
    <Suspense>
      <LoginLoading />
    </Suspense>
  );
};

const LoginLoading = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const pathname = usePathname().split('/')[2];
  const router = useRouter();

  useEffect(() => {
    if (code) {
      (async () => {
        const redirectUri =
          process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`
            : `${process.env.NEXT_PUBLIC_DEV_KAKAO_REDIRECT_URI}`;
        const response = await deleteUser({
          code,
          redirectUri: `${redirectUri}/auth/kakao/withdraw`,
        });

        if (response.result === 'SUCCESS') {
          await deleteCookie('accessToken');
          await deleteCookie('refreshToken');
          await deleteCookie('nickname');
          router.push('/login');
        } else {
          alert(response.error);
          router.push('/mypage');
        }
      })();
    }
  }, [code, pathname, router]);

  return (
    <div className='text-center flex justify-center items-center h-screen bg-bgBlack'>
      <div className='animate-spin rounded-full w-10 h-10 border-4 border-solid border-primary-500/80 border-l-primary-500'></div>
    </div>
  );
};

export default WithdrawPage;
