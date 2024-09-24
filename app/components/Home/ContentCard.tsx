import { useEffect, useState } from 'react';
import { catIllust } from '@/constants/catIllust';
import IconDistance from '@/assets/images/map/icon_distance.svg';
import useGeolocation from '@/hooks/useGeolocation';
import { getDistance } from '@/utils/calcDistance';
import getDateFormat from '@/utils/getDateFormat';
import transformDistance from '@/utils/transformDistance';
import { ContentCardProps } from '@/types/content';
import Link from 'next/link';

const ContentCard = ({ content }: ContentCardProps) => {
  const geolocation = useGeolocation();
  const [distance, setDistance] = useState<number | null>(null);

  const { lat, lng, name, createdAt, jibunAddrName, countOfFollowed, countOfComments, catEmoji } = content;

  const cat = catIllust.filter((cat) => cat.id === Number(catEmoji))[0];

  useEffect(() => {
    if (geolocation.position !== null) {
      const dist = getDistance(geolocation.position, {
        lat: Number(lat),
        lng: Number(lng),
      });
      setDistance(dist);
    }
  }, [geolocation.position, lat, lng]);

  return (
    <Link href={`/content/${content.contentId}`}>
      <div className='flex gap-3 w-full px-4 py-5 bg-white rounded-xl shadow-[0_0_12px_0_rgba(0,0,0,0.06)]'>
        <div className='w-[70px] h-[70px] rounded-full bg-gray-50 flex justify-center items-center'>
          <cat.image />
        </div>
        <div className='flex-grow flex flex-col gap-[10px]'>
          <div className='flex flex-col gap-1'>
            <h3 className='subHeading text-gray-500'>{name}</h3>
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
            <p className='caption text-gray-200'>{getDateFormat(createdAt)} 등록</p>
          </div>

          <div className='flex justify-end'>
            <div className='bg-primary-100 flex gap-[2px] items-center rounded text-primary-400 px-6px py-1 caption2'>
              <IconDistance />
              <span>{distance !== null ? transformDistance(distance) : '000'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
