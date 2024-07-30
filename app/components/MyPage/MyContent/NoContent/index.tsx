'use client';
import { useRouter } from 'next/navigation';

import ImgNoContent from '@/assets/images/img_noContent.svg';
import IconNewContent from '@/assets/images/icon_newContent.svg';

export const NoContent = () => {
  const router = useRouter();

  return (
    <div className='flex w-full h-full flex-col gap-2 justify-start items-center bg-gray-50 pt-24'>
      <ImgNoContent />
      <h3 className='subHeading2 text-gray-400 mt-3'>
        현재 내가 등록한 냥이가 없어요.
      </h3>
      <p className='caption text-gray-300'>
        동네에서 만난 냥이가 있다면 등록해보세요!
      </p>

      <button
        onClick={() => router.push('/register')}
        className='bg-primary-500 mt-5 text-white flex items-center gap-[6px] px-4 py-3 rounded-full body2'
      >
        <IconNewContent />
        새로운 냥이 등록
      </button>
    </div>
  );
};
