'use client';

import { Suspense } from 'react';
import Lottie from 'react-lottie-player';

import loadingLottie from '@/assets/images/lottie/loading.json';

const LoadingPage = () => {
  return (
    <Suspense>
      <Loading />
    </Suspense>
  );
};

export const Loading = ({ className = '' }: { className?: string }) => {
  return (
    <div className='fixed w-full top-0 left-1/2 -translate-x-1/2 flex justify-center items-center h-screen bg-white/60 z-40 px-20'>
      <Lottie loop animationData={loadingLottie} play />
    </div>
  );
};

export default LoadingPage;
