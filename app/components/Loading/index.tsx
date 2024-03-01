'use client';
import { useLoading } from '@/stores/loading/store';

const Loading = () => {
  const { loading } = useLoading();

  if (loading)
    return (
      <div className='fixed top-0 left-1/2 flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full w-10 h-10 border-4 border-solid border-black/80 border-l-black'></div>
      </div>
    );
  return null;
};

export default Loading;
