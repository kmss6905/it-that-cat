import { randomCatIllust } from '@/constants/randomCatIllust';
import Image from 'next/image';
import IconLocation from '@/assets/images/icon_location.svg';

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
}

export interface ContentCardProps {
  content: ContentType;
}
const ContentCard = ({ content }: ContentCardProps) => {
  const { name, createdAt, addrName, comment, follow } = content;

  const randomCatIndex = Math.floor(Math.random() * randomCatIllust.length);

  return (
    <div className='flex gap-3 w-full h-full px-4 py-5'>
      <div className='w-[70px] h-[70px] rounded-full bg-gray-50 relative'>
        <Image
          src={randomCatIllust[randomCatIndex].src}
          alt='고양이 일러스트'
          fill
          className='object-contain p-2'
        />
      </div>
      <div className='flex-grow flex flex-col gap-[10px]'>
        <div className='flex flex-col gap-1'>
          <h3 className='subHeading text-gray-500'>{name}</h3>
          <p className='body2 text-gray-400 flex items-center'>
            <span className='inline-block w-[1.5px] h-[14px] bg-gray-300 mr-10px '></span>
            {addrName}
          </p>
        </div>
        <div className='flex flex-col gap-[6px]'>
          <div className='flex gap-1 text-gray-300 caption'>
            <span>댓글 {comment}개</span>
            <span>·</span>
            <span>팔로워 {follow}명</span>
          </div>
          <p className='caption text-gray-200'>{createdAt} 등록</p>
        </div>

        <div className='flex justify-end'>
          <div className='bg-primary-100 flex gap-[2px] items-center rounded text-primary-400 px-6px py-1 caption2'>
            <IconLocation />
            <span>360m</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
