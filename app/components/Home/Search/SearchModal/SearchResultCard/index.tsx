import { useEffect, useState } from 'react';
import Link from 'next/link';

import { catIllust } from '@/constants/catIllust';
import useGeolocation from '@/hooks/useGeolocation';
import { SearchContentProps } from '@/types/content';
import transformDistance from '@/utils/transformDistance';
import { getDistance } from '@/utils/calcDistance';
import IconDistance from '@/assets/images/map/icon_distance.svg';

const SearchResultCard = ({ result }: { result: SearchContentProps }) => {
  const geolocation = useGeolocation();
  const [distance, setDistance] = useState<number | null>(null);

  const { lat, lng, name, jibunAddrName, countOfFollowed, countOfComments, catEmoji } = result;

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
    <Link href={`/content/${result.contentId}`}>
      <div className='flex gap-4 w-full py-5 bg-white'>
        <div className='w-[54px] h-[54px] rounded-full bg-gray-50 flex justify-center items-center p-1'>
          <cat.image viewBox='0 0 64 47' />
        </div>
        <div className='flex-grow flex flex-col gap-[10px]'>
          <div className='flex flex-col gap-1'>
            <div className='flex justify-between'>
              <h3 className='subHeading text-gray-500'>{name}</h3>
              <div className='bg-primary-100 flex gap-[2px] items-center rounded text-primary-400 px-6px py-1 caption2'>
                <IconDistance />
                <span>{distance !== null ? transformDistance(distance) : '000'}</span>
              </div>
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
    </Link>
  );
};

export default SearchResultCard;
