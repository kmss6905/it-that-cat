'use client';

import React, { Fragment, Suspense, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { deleteFollow, postFollow } from '@/apis/contents';
import IconBack from '@/assets/images/icon_back.svg';
import IconKebab from '@/assets/images/icon_kebab.svg';
import IconFollowMark from '@/assets/images/icon_followMark.svg';
import IconFollowMarkFill from '@/assets/images/icon_followMarkFill.svg';
import IconImage from '@/assets/images/icon_image.svg';
import RegisterBtn from '@/components/RegisterBtn';
import { catIllust } from '@/constants/catIllust';
import { DetailInfo } from '@/components/Content/DetailInfo';
import { CatNews } from '@/components/Content/CatNews';
import { useContent } from '@/hooks/useGetContent';
import getDateFormat from '@/utils/getDateFormat';
import { contentStore } from '@/stores/comment/store';
import { ResType } from '@/types/api';
import { useModal } from '@/hooks/useModal';
import ManuModal from '@/components/Content/Modal/ManuModal';
import { MODAL_TYPE } from '@/components/Modal';
import DeleteModal from '@/components/Content/Modal/DeleteModal';
import AnonymizeModal from '@/components/Content/Modal/AnonymizeModal';

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
  const [swiperIndex, setSwiperIndex] = useState(0);
  const params = useSearchParams();
  const { openModal } = useModal();
  const contentId = params.get('id');
  const { data, refetch, isSuccess } = useContent(contentId);

  const cat = catIllust.filter((cat) => cat.id === Number(data?.catEmoji))[0];

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
        <ManuModal />
        <DeleteModal />
        <AnonymizeModal />

        <div className='w-full relative'>
          <div className='absolute w-full h-16 top-0 px-5 py-6 z-10 flex justify-between'>
            <button onClick={() => router.back()}>
              <IconBack />
            </button>
            <div className='flex justify-between gap-4'>
              <button onClick={onClickFollow}>
                {data.isFollowed ? <IconFollowMarkFill /> : <IconFollowMark />}
              </button>
              <button onClick={() => openModal(MODAL_TYPE.CONTENT_MANU)}>
                <IconKebab />
              </button>
            </div>
          </div>
          <div
            className='absolute bottom-4 right-6 px-3 py-[6px] z-10 flex justify-center items-center gap-1 rounded-full'
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          >
            <div className='text-gray-200 body2'>
              <span>
                {swiperIndex + 1}/{data.images.length}
              </span>
            </div>
            <IconImage />
          </div>
          <Swiper
            slidesPerView={1}
            onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
          >
            {data.images.map((image: string) => (
              <SwiperSlide
                key={image}
                className='relative w-full h-full after:pb-[80%] after:block '
              >
                <div className='absolute w-full h-full'>
                  <div>
                    <Image
                      src={image as string}
                      alt={`preview ${image}`}
                      fill
                      priority
                      className='object-cover'
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='flex h-full flex-col'>
          <div className='px-6 py-3 flex relative'>
            <div className='w-[70px] h-[70px] rounded-full bg-gray-50 flex justify-center items-center mr-3'>
              <cat.image />
            </div>
            <div className='flex flex-col gap-1'>
              <h3 className='heading2 text-gray-500'>{data.name}</h3>
              <p className='caption text-gray-300 flex items-center'>
                {data.nickname} 등록
                <span className='inline-block w-[1.5px] h-[14px] bg-gray-300 mx-[6px] '></span>
                {getDateFormat(data.createdAt)}
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
