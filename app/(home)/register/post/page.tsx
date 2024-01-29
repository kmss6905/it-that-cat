'use client';
import React, { Fragment } from 'react';
import IconX from '@/assets/images/icon_x.svg';
import IconAddPhoto from '@/assets/images/icon_addPhoto.svg';
import { useRouter } from 'next/navigation';
import Tooltip from '@/components/Tooltip';
import { Label, TextInput, TextareaInput } from '@/components/Input';

const RegisterPostPage = () => {
  const router = useRouter();
  return (
    <Fragment>
      <div className='w-full relative pt-5 pb-5'>
        <h2 className='w-full text-center subHeading'>우리 동네 냥이 제보</h2>
        <button
          onClick={() => router.push('/')}
          className='absolute right-5 top-1/2 -translate-y-1/2'
        >
          <IconX />
        </button>
      </div>

      <form className='p-6 flex flex-col gap-7'>
        <div>
          <Label isRequired={true}>냥이의 주요 출몰 위치</Label>
          <TextInput value='text' placeholder={''} />
        </div>

        <div>
          <Label isRequired={true}>냥이 이름</Label>
          <TextInput value='text' placeholder={''} />
        </div>

        <div>
          <Label>냥이를 자유롭게 소개해주세요!</Label>
          <TextareaInput value='text' placeholder={''} />
        </div>

        <div>
          <Label isRequired={true}>사진 업로드</Label>
          <div className='w-20 h-20 border-gray-100 rounded flex justify-center items-center border-[1px] flex-col'>
            <IconAddPhoto />
            <div className='text-gray-200 caption'>3/3</div>
          </div>
        </div>

        <div>
          <Label>중성화 수술 유무</Label>
          <TextInput value='text' placeholder={''} />
        </div>

        <div>
          <Label>같이 다니는 무리가 있나요?</Label>
          <TextInput value='text' placeholder={''} />
        </div>

        <div>
          <Label addText='(1~3개 복수 선택 가능)'>어떤 성격인가요?</Label>
          <TextInput value='text' placeholder={''} />
        </div>
      </form>
    </Fragment>
  );
};

export default RegisterPostPage;
