'use client';

import React, { Fragment, Suspense, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import IconX from '@/assets/images/icon_x.svg';
import IconFollowMark from '@/assets/images/icon_followMark.svg';
import IconFollowMarkFill from '@/assets/images/icon_followMarkFill.svg';
import RegisterBtn from '@/components/RegisterBtn';
import { catIllust } from '@/constants/catIllust';
import { DetailInfo } from '@/components/Content/DetailInfo';
import { CatNews } from '@/components/Content/CatNews';
import { useContent } from '@/hooks/useGetContent';
import getDateFormat from '@/utils/getDateFormat';
import { contentStore } from '@/stores/comment/store';
import { ResType } from '@/apis/type';
import postFollow from '@/apis/contents/postFollow';
import deleteFollow from '@/apis/contents/deleteFollow';

const RegisterPostPage = () => {
  return (
    <Suspense>
      <SuspenseRegisterPostPage />
    </Suspense>
  );
};

const tabName = [
  { name: '상세 정보', value: 'detailInfo' },
  { name: '냥이 소식', value: 'catNews' },
];

const SuspenseRegisterPostPage = () => {
  const router = useRouter();
  const { setContentId } = contentStore();
  const [tab, setTab] = useState('detailInfo');
  const params = useSearchParams();
  const contentId = params.get('id');
  const { data, refetch, isSuccess } = useContent(contentId);

  const onClickFollow = async () => {
    if (!contentId) return;

    const res: ResType<string> = data.isFollowed
      ? await deleteFollow({ contentId })
      : await postFollow({ contentId });

    if (res.result === 'SUCCESS') {
      refetch();
    }
  };

  if (isSuccess)
    return (
      <Fragment>
        <div className='w-full relative p-5 pt-6'>
          <button
            onClick={() => router.push('/')}
            className='absolute right-5 top-1/2 -translate-y-1/2'
          >
            <IconX />
          </button>
        </div>

        <div className='flex h-full flex-col'>
          <div className='px-6 py-3 flex relative'>
            <div className='w-[70px] h-[70px] rounded-full bg-gray-50 relative mr-3'>
              <Image
                src={
                  catIllust.filter((cat) => cat.id === Number(data.catEmoji))[0]
                    .image.src
                }
                alt='고양이 일러스트'
                fill
                sizes='100'
                className='object-contain p-2'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <h3 className='heading2 text-gray-500'>{data.name}</h3>
              <p className='caption text-gray-300 flex items-center'>
                {data.nickname} 등록
                <span className='inline-block w-[1.5px] h-[14px] bg-gray-300 mx-[6px] '></span>
                {getDateFormat(data.createdAt)}
              </p>
            </div>
            <div
              className='absolute right-12 top-4 cursor-pointer'
              onClick={onClickFollow}
            >
              {data.isFollowed ? <IconFollowMarkFill /> : <IconFollowMark />}
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

          {tab === 'detailInfo' ? (
            <DetailInfo content={data} />
          ) : (
            <CatNews contentId={contentId} />
          )}
        </div>

        <div className='absolute bottom-0 left-0 w-full z-20 px-6 pt-[18px] pb-[30px] shadow-[0px_-8px_8px_0px_rgba(0,0,0,0.15)] bg-white'>
          <RegisterBtn
            onClick={() => {
              setContentId(contentId);
              router.push('/content/register');
            }}
          >
            냥이 소식 작성하기
          </RegisterBtn>
        </div>
      </Fragment>
    );
  return null;
};

export default RegisterPostPage;
