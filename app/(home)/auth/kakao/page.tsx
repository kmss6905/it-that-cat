'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import Lottie from 'react-lottie-player';

import loadingLottie from '@/assets/images/lottie/loading.json';
import { getToken, saveToken } from '@/apis/login';

const KakaoAuthPage = () => {
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
      const test = async () => {
        const response = await getToken(code, pathname);
        if (response?.result === 'SUCCESS') {
          const redriectUrl = !!response.data.nickname ? '/' : '/login/nickname';
          await saveToken(response.data);
          router.replace(redriectUrl);
        }
      };
      test();
    }
  }, [code, pathname, router]);

  return (
    <div className='fixed w-full top-0 left-1/2 -translate-x-1/2 flex justify-center items-center h-screen bg-white/60 z-40 px-20'>
      <Lottie loop animationData={loadingLottie} play />
    </div>
  );
};

export default KakaoAuthPage;
