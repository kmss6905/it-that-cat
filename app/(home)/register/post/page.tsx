'use client';
import React, { Fragment } from 'react';
import IconX from '@/assets/images/icon_x.svg';
import { useRouter } from 'next/navigation';
import Tooltip from '@/components/Tooltip';
import ImageWrapper, { ImageCancelBtn } from '@/components/ImageWrapper';
import Image from 'next/image';
import examImage from '@/assets/images/miao-xiang-hf6978Xi8Dw-unsplash.jpg';

const RegisterPostPage = () => {
  const router = useRouter();
  return (
    <Fragment>
      <div className='w-full relative pt-6 pb-4'>
        <h2 className='w-full text-center'>우리 동네 냥이 제보</h2>
        <button
          onClick={() => router.push('/')}
          className='absolute right-5 top-1/2 -translate-y-1/2'
        >
          <IconX />
        </button>
      </div>

      <form>
        <div>
          <label className='flex gap-1 items-center'>
            중성화 수술 유무 *
            <Tooltip
              direction='top'
              message={`냥이의 귀를 살펴보세요! 중성화를 마친
              고양이는 귀 끝을 조금 잘라 표시하곤 해요:)`}
            >
              i
            </Tooltip>
          </label>
          <input type='text' />
        </div>
      </form>

      <ImageWrapper>
        <Image
          src={examImage.src}
          alt='예시 이미지'
          fill
          className='object-cover w-full h-full'
        />
      </ImageWrapper>
    </Fragment>
  );
};

export default RegisterPostPage;
