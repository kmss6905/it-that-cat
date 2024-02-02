'use client';

import React, { Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import IconX from '@/assets/images/icon_x.svg';
import RegisterBtn from '@/components/RegisterBtn';
import { catIllust } from '@/constants/catIllust';
import { pinList } from '@/constants/contentMockData';
import { Label } from '@/components/Input';
import {
  groupButtons,
  neuterButtons,
  personalityButtons,
} from '@/constants/catInfoButtons';

export interface ContentType {
  id: number;
  lat: number;
  lng: number;
  nickname: string;
  name: string;
  neuter: string;
  group: string;
  personality: string[] | [];
  desc: string;
  createdAt: string;
  addrName: string;
  comment: number;
  follow: number;
  catEmoji: number;
}

const RegisterPostPage = () => {
  const router = useRouter();
  const content = pinList[0];
  const cat = catIllust.filter((cat) => cat.id === content.catEmoji)[0];

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

      <div className='flex flex-col mb-[100px]'>
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

        <div className='p-6'>
          <div className='caption2 text-primary-400 mb-3'>
            {content.updatedAt} 업데이트
          </div>
          <div className={`${titleClassName}`}>동네 집사의 한 줄 소개</div>
          <div className='body2 text-gray-400'>{content.desc}</div>
        </div>

        <div className={`${barClassName}`} />

        <div className='p-6'>
          <div className={`${titleClassName}`}>
            건강한 돌봄을 위한 필수 체크!
          </div>
          <div className='flex mb-4'>
            <div className='w-full'>
              <div className={`${subTitleClassName}`}>중성화 수술</div>
              <div>
                <span className={`${contentClassName}`}>
                  {
                    neuterButtons.find(
                      (button) => button.value === content.neuter,
                    )?.name
                  }
                </span>
              </div>
            </div>
            <div className='w-full'>
              <div className={`${subTitleClassName}`}>같이 다니는 무리</div>
              <div>
                <span className={`${contentClassName}`}>
                  {
                    groupButtons.find(
                      (button) => button.value === content.group,
                    )?.name
                  }
                </span>
              </div>
            </div>
          </div>

          <div className={`${subTitleClassName}`}>성격 및 특징</div>
          <div className='flex flex-wrap'>
            {content.personality.map((value) => (
              <div
                key={value}
                className={`${contentClassName} mr-[6px] text-nowrap mb-[6px]`}
              >
                {
                  personalityButtons.find((button) => button.value === value)
                    ?.name
                }
              </div>
            ))}
          </div>
        </div>

        <div className={`${barClassName}`} />

        <div className='p-6'>
          <div className={`${titleClassName}`}>주요 출몰 위치</div>
          <div className='caption text-gray-400'>{content.addrName}</div>
        </div>
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

const titleClassName = 'flex flex-col pb-2 subHeading';
const subTitleClassName = 'subHeading2 text-gray-400 mb-2';
const contentClassName =
  'caption text-primary-500 bg-primary-100 px-[10px] py-[6px] rounded';
const barClassName = 'w-full h-[7px] bg-gray-50';
