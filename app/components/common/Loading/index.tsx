'use client';
import { useLoading } from '@/stores/loading/store';
import Lottie from 'react-lottie-player';

import loadingLottie from '@/assets/images/lottie/loading.json';

const Loading = () => {
  const { loading } = useLoading();

  if (loading)
    return (
      <div className='fixed w-full top-0 left-1/2 -translate-x-1/2 flex justify-center items-center h-screen bg-white/60 z-40 px-20'>
        <Lottie loop animationData={loadingLottie} play />
      </div>
    );
  return null;
};

export default Loading;
