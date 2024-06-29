'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

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
          const redriectUrl = !!response.data.nickname
            ? '/'
            : '/login/nickname';
          saveToken(response.data);
          router.replace(redriectUrl);
        }
      };
      test();
    }
  }, [code, pathname, router]);

  return (
    <div className='text-center flex justify-center items-center h-screen bg-bgBlack'>
      <div className='animate-spin rounded-full w-10 h-10 border-4 border-solid border-primary-500/80 border-l-primary-500'></div>
    </div>
  );
};

export default KakaoAuthPage;
