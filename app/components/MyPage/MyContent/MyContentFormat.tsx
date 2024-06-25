import { catIllust } from '@/constants/catIllust';
import { ContentObjProps } from '@/types/content';
import getDateFormat from '@/utils/getDateFormat';
import React from 'react';

const MyContentFormat = ({ content }: { content: ContentObjProps }) => {
  const {
    name,
    createdAt,
    jibunAddrName,
    countOfFollowed,
    countOfComments,
    catEmoji,
  } = content;

  const cat = catIllust.filter((cat) => cat.id === Number(catEmoji))[0];

  return (
    <div className='border-b border-b-gray-50'>
      <div className='flex gap-3 w-full px-4 py-6 bg-white'>
        <div className='w-[70px] h-[70px] rounded-full bg-gray-50 flex justify-center items-center'>
          <cat.image />
        </div>

        <div className='flex-grow flex flex-col gap-[10px]'>
          <div className='flex flex-col gap-1'>
            <div className='flex justify-between items-center'>
              <h3 className='subHeading text-gray-500'>{name}</h3>
              <p className='caption text-gray-200'>
                {getDateFormat(createdAt)} 등록
              </p>
            </div>
            <p className='body2 text-gray-400 flex items-center'>
              <span className='inline-block w-[1.5px] h-[14px] bg-gray-300 mr-10px '></span>
              {jibunAddrName}
            </p>
          </div>

          <div className='flex flex-col gap-[6px]'>
            <div className='flex gap-1 text-gray-300 caption'>
              <span>댓글 {countOfComments}개</span>
              <span>·</span>
              <span>팔로워 {countOfFollowed}명</span>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-3 mb-5 flex justify-between items-stretch gap-[6px] [&_div]:bg-gray-50 [&_div]:text-center [&_div]:px-3 [&_div]:rounded-md [&_div]:cursor-pointer'>
        <div className='flex-grow py-6px body2'>정보 수정하기</div>
        <div className='flex items-center justify-center body'>...</div>
      </div>
    </div>
  );
};

export default MyContentFormat;
