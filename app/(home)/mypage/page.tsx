'use client';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import IconEdit from '@/assets/images/mypage/icon_edit.svg';
import IconLogout from '@/assets/images/mypage/icon_logout.svg';
import { useModal } from '@/hooks/useModal';
import { MODAL_TYPE } from '@/components/Modal';
import NicknameModal from '@/components/MyPage/NicknameModal';
import UpdateNoticeModal from '@/components/MyPage/UpdateNoticeModal';
import DeleteUserModal from '@/components/MyPage/DeleteUserModal/indext';
import getCookie from '@/utils/getCookie';

const MyPage = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);
  const { openModal } = useModal();

  useEffect(() => {
    if (nickname === null) {
      const response = getCookie('nickname');
      response && setNickname(response.value);
    }
  }, [nickname]);

  const mypageMenu = [
    {
      id: 0,
      title: '나의 활동',
      depth: [
        {
          id: 0,
          title: '내가 등록한 냥이',
          handleClick: () => router.push('/mypage/mycontent'),
        },
        {
          id: 1,
          title: '내가 쓴 냥이 소식',
          handleClick: () => openModal(MODAL_TYPE.UPDATE_NOTICE),
        },
      ],
    },
    {
      id: 1,
      title: '고객센터',
      depth: [
        {
          id: 0,
          title: '공지사항',
          handleClick: () => openModal(MODAL_TYPE.UPDATE_NOTICE),
        },
        {
          id: 1,
          title: '1:1 서비스 문의',
          handleClick: () => openModal(MODAL_TYPE.UPDATE_NOTICE),
        },
      ],
    },
    {
      id: 2,
      title: '계정 관리',
      depth: [
        {
          id: 1,
          title: '회원탈퇴',
          handleClick: () => {
            openModal(MODAL_TYPE.DELETE_USER);
          },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <NicknameModal
        handleUpdateNickname={(nickname: string) => setNickname(nickname)}
      />
      <UpdateNoticeModal />
      <DeleteUserModal />
      <div className='flex justify-end px-6 pt-7 pb-5'>
        <div className='text-gray-300 caption cursor-pointer pt-3 pb-5 flex items-center gap-1'>
          <IconLogout />
          로그아웃
        </div>
      </div>

      <div className='px-6'>
        <h3 className='heading2 text-black flex gap-[6px] items-center'>
          {nickname !== null ? (
            nickname
          ) : (
            <span className='w-20 h-6 bg-gray-50 rounded-sm animate-pulse' />
          )}
          님
          <span
            onClick={() => openModal(MODAL_TYPE.MYPAGE_NICKNAME)}
            className='cursor-pointer'
          >
            <IconEdit />
          </span>
        </h3>

        <div>
          {mypageMenu.map(({ id, title, depth }) => (
            <ul key={id} className='text-gray-500'>
              <li className='subHeading pt-6 pb-2'>{title}</li>
              {depth.map((depth2) => (
                <li
                  key={depth2.id}
                  onClick={() => depth2.handleClick()}
                  className='body2 py-4 cursor-pointer border-b border-gray-50'
                >
                  {depth2.title}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default MyPage;
