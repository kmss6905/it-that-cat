'use client';
import React, { Fragment } from 'react';
import IconX from '@/assets/images/icon_x.svg';
import { useRouter } from 'next/navigation';
import Tooltip from '@/components/Tooltip';

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
          <label>타이틀 *</label>
          <input type='text' />
          <Tooltip direction='top' message='냥이의 귀~~~'>
            <span>i</span>
          </Tooltip>
        </div>
      </form>
    </Fragment>
  );
};

export default RegisterPostPage;
