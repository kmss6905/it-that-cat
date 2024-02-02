'use client';

import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import IconX from '@/assets/images/icon_x.svg';
import RegisterBtn from '@/components/RegisterBtn';
import { catIllust } from '@/constants/catIllust';
import { pinList } from '@/constants/contentMockData';
import { DetailInfo } from '@/components/Content/DetailInfo';
import { CatNews } from '@/components/Content/CatNews';

export interface ContentType {
  id: number;
}

const tabName = [
  { name: '상세 정보', value: 'detailInfo' },
  { name: '냥이 소식', value: 'catNews' },
];

const RegisterPostPage = () => {
  const router = useRouter();
  const content = pinList[0];
  const cat = catIllust.filter((cat) => cat.id === content.catEmoji)[0];
  const [tab, setTab] = useState('detailInfo');

  return (
    <Fragment>
      <div className='w-full relative pt-5 pb-5'>
        <button
          onClick={() => router.push('/')}
          className='absolute right-5 top-1/2 -translate-y-1/2'
        >
          <IconX />
        </button>
      </div>

      <div className='flex h-full flex-col'>
        <div className='px-6 py-3 flex'>
          <div className='w-[70px] h-[70px] rounded-full bg-gray-50 relative mr-3'>
            <Image
              src={cat.image.src}
              alt='고양이 일러스트'
              fill
              className='object-contain p-2'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <h3 className='heading2 text-gray-500'>{content.name}</h3>
            <p className='caption text-gray-300 flex items-center'>
              {content.nickname} 등록
              <span className='inline-block w-[1.5px] h-[14px] bg-gray-300 mx-[6px] '></span>
              {content.createdAt}
            </p>
          </div>
        </div>

        <div className='relative'>
          <div className='flex px-6 mb-[10px]'>
            {tabName.map((v) => (
              <div
                key={v.value}
                className={`w-full text-center cursor-pointer ${v.value === tab ? 'text-gray-500' : 'text-gray-200'}`}
                onClick={() => setTab(v.value)}
              >
                {v.name}
              </div>
            ))}
          </div>
          <div className='flex px-6'>
            {tabName.map((v) => (
              <div
                key={v.value}
                className={`w-full h-[1.5px] z-10 ${v.value === tab ? 'bg-gray-500' : 'bg-gray-50'}`}
              />
            ))}
          </div>
          <div className='absolute w-full h-[1.5px] bg-gray-50 translate-y-[-1.5px]' />
        </div>

        {tab === 'detailInfo' ? <DetailInfo content={content} /> : <CatNews />}
      </div>

      <div className='absolute bottom-0 left-0 w-full z-20 px-6 pt-[18px] pb-[30px] shadow-[0px_-8px_8px_0px_rgba(0,0,0,0.15)] bg-white'>
        <RegisterBtn onClick={() => router.push('/register/post')}>
          냥이 소식 작성하기
        </RegisterBtn>
      </div>
    </Fragment>
  );
};

export default RegisterPostPage;
