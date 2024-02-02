import { catIllust } from '@/constants/catIllust';
import Image from 'next/image';
import IconDistance from '@/assets/images/icon_distance.svg';
import useGeolocation from '@/hooks/useGeolocation';
import { useEffect, useState } from 'react';
import { getDistance } from '@/utils/calcDistance';
import getDateFormat from '@/utils/getDateFormat';
import transformDistance from '@/utils/transformDistance';

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

export interface ContentCardProps {
  content: ContentType;
}
const ContentCard = ({ content }: ContentCardProps) => {
  const geolocation = useGeolocation();
  const [distance, setDistance] = useState<number | null>(null);
  const { lat, lng, name, createdAt, addrName, comment, follow, catEmoji } =
    content;

  const cat = catIllust.filter((cat) => cat.id === catEmoji)[0];

  useEffect(() => {
    if (geolocation.position !== null) {
      const dist = getDistance(geolocation.position, { lat, lng });
      setDistance(dist);
    }
  }, [geolocation.position, lat, lng]);

  return (
    <div className='flex gap-3 w-full h-full px-4 py-5 bg-white rounded-xl shadow-[0_0_12px_0_rgba(0,0,0,0.20)]'>
      <div className='w-[70px] h-[70px] rounded-full bg-gray-50 relative'>
        <Image
          src={cat.image.src}
          alt='고양이 일러스트'
          fill
          sizes='100%'
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
          <p className='caption text-gray-200'>
            {getDateFormat(createdAt)} 등록
          </p>
        </div>

        <div className='flex justify-end'>
          <div className='bg-primary-100 flex gap-[2px] items-center rounded text-primary-400 px-6px py-1 caption2'>
            <IconDistance />
            <span>
              {distance !== null ? transformDistance(distance) : '000'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
