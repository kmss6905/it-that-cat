'use client';
import { Suspense, useContext, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Lottie from 'react-lottie-player';

import loadingLottie from '@/assets/images/lottie/loading.json';
import { deleteUser } from '@/apis/mypage';
import { deleteCookie } from '@/utils/cookieStore';
import { AlertContext } from '@/components/common/Alert';

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
  const { alert } = useContext(AlertContext);

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
          const ok = await alert(response.error.message);
          if (ok) {
            router.push('/mypage');
          }
        }
      })();
    }
  }, [code, pathname, router, alert]);

  return (
    <div className='fixed w-full top-0 left-1/2 -translate-x-1/2 flex justify-center items-center h-screen bg-white/60 z-40 px-20'>
      <Lottie loop animationData={loadingLottie} play />
    </div>
  );
};

export default WithdrawPage;
