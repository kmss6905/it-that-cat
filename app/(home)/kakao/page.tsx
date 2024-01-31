'use client';
import getToken from '@/apis/login/getToken';
import saveToken from '@/apis/login/saveToken';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const KakaoAuthPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const pathname = usePathname().replace('/', '');

  useEffect(() => {
    if (code) {
      const test = async () => {
        await getToken(code, pathname).then((res) => {
          if (res !== null && res.result === 'SUCCESS') {
            saveToken(res.data);
          }
        });
      };
      test();
    }
  }, [code]);

  return (
    <>
      <div className='text-center flex justify-center items-center h-screen bg-bgBlack'>
        <div className='animate-spin rounded-full w-10 h-10 border-4 border-solid border-primary-500/80 border-l-primary-500'></div>
      </div>
    </>
  );
};

export default KakaoAuthPage;
