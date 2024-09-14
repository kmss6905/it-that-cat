import React, { useEffect, useState } from 'react';

import { catIllust } from '@/constants/catIllust';
import { ContentObjProps } from '@/types/content';
import getDateFormat from '@/utils/getDateFormat';
import { useModal } from '@/hooks/useModal';
import DeleteModal from '@/components/Content/Modal/DeleteModal';
import AnonymizeModal from '@/components/Content/Modal/AnonymizeModal';
import DeleteMyContentModal from './Modal/DeleteMyContentModal';
import { useRouter } from 'next/navigation';
import { MODAL_TYPE } from '@/components/Modal';
import { getNickname } from '@/apis/mypage';
import Link from 'next/link';

const MyContentFormat = ({
  content,
  selectedContent,
  setSelectedContent,
}: {
  content: ContentObjProps;
  selectedContent?: string | null;
  setSelectedContent: (id?: string | null) => void;
}) => {
  const {
    name,
    createdAt,
    jibunAddrName,
    countOfFollowed,
    countOfComments,
    catEmoji,
    contentId,
    isReported,
  } = content;
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const cat = catIllust.filter((cat) => cat.id === Number(catEmoji))[0];

  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (nickname === '') {
      (async () => {
        const nick = await getNickname();
        setNickname(nick);
      })();
    }
  }, [nickname]);

  const handleClickModify = () => {
    setSelectedContent(contentId);
    closeModal();
    router.push(`/register/${contentId}`);
  };

  const handleClickDelete = () => {
    setSelectedContent(contentId);
    openModal(MODAL_TYPE.MY_CONTENT_DELETE);
  };

  return (
    <div className='border-b border-b-gray-50'>
      {selectedContent === contentId && contentId && (
        <>
          <DeleteMyContentModal countOfComments={countOfComments} />
          <DeleteModal contentId={contentId} />
          <AnonymizeModal contentId={contentId} nickname={nickname} />
        </>
      )}
      <Link
        href={`/content/${contentId}`}
        className='flex gap-3 w-full px-4 py-6 bg-white'
      >
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
            <div>
              {isReported && (
                <span className='text-error bg-error/10 px-2 py-1 rounded-md inline-block caption2'>
                  신고 접수
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className='mt-3 mb-5 flex justify-between items-stretch gap-[6px] [&_button]:bg-gray-50 [&_button]:text-center [&_button]:px-3 [&_button]:rounded-md'>
        <button
          disabled={isReported}
          className='flex-grow py-6px body2 disabled:text-gray-200 disabled:bg-gray-50/60'
          onClick={handleClickModify}
        >
          정보 수정하기
        </button>
        <button
          disabled={isReported}
          className='flex items-center justify-center body pb-2 disabled:text-gray-200 disabled:bg-gray-50/60'
          onClick={handleClickDelete}
        >
          ...
        </button>
      </div>
    </div>
  );
};

export default MyContentFormat;
