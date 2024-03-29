import { Suspense } from 'react';

const LoadingPage = () => {
  return (
    <Suspense>
      <Loading />
    </Suspense>
  );
};

export const Loading = () => {
  return (
    <div className='text-center flex justify-center items-center h-screen bg-gray-50'>
      <div className='animate-spin rounded-full w-10 h-10 border-4 border-solid border-black/80 border-l-black'></div>
    </div>
  );
};

export default LoadingPage;
