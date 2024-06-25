'use client';
import { useRouter } from 'next/navigation';

import IconBack from '@/assets/images/icon_backBlack.svg';
import MyContentFormat from './MyContentFormat';

const MyContent = () => {
  const router = useRouter();

  const dummyData = {
    contentId: 2,
    name: '냥이이름',
    description: 'ds',
    group: 'YES',
    catPersonalities: ['UNSURE'],
    lat: '37.212321',
    lng: '126.223123',
    jibunAddrName: '서울 마포구 망원동 415-31',
    jibunMainAddrNo: 'main',
    jibunSido: '시도',
    jibunSigungu: '시군구',
    jibunDong: '지번동',
    jibunSubAddrNo: '서브동',
    images: [],
    neuter: 'YES',
    createdAt: '2024-03-09T21:15:38',
    updatedAt: '2024-04-09T23:47:40',
    catEmoji: 10,
    isFollowed: false,
    countOfFollowed: 0,
    countOfComments: 0,
    userUid: 0,
    nickname: null,
    isArchived: true,
    isAuthor: false,
  };

  const dummyArr = new Array(2).fill(dummyData);
  return (
    <div>
      <div className='w-full flex justify-between px-5 pt-6 pb-4 border-b border-gray-10'>
        <span onClick={() => router.back()} className='cursor-pointer'>
          <IconBack />
        </span>
        <p className='subHeading text-black'>내가 등록한 냥이</p>
        <div />
      </div>

      <div className='flex flex-col last:[&_div]:!border-b-0 px-6'>
        {dummyArr.map((item) => (
          <MyContentFormat content={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default MyContent;
