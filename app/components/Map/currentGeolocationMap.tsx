'use client';

import useGeolocation from '@/hooks/useGeolocation';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import IconMapPin from '@/assets/images/icon_mapPin.svg';

declare global {
  interface Window {
    kakao: any;
  }
}

const CenterChangedMap = () => {
  useKakaoLoader();
  const geolocation = useGeolocation();

  const [data, setData] = useState<{
    level: number;
    position: {
      lat: number;
      lng: number;
    };
  }>();

  if (geolocation.position === null) return null;

  return (
    <div className='relative h-full'>
      <Map // 지도를 표시할 Container
        id='map'
        center={{
          // 지도의 중심좌표
          lat: geolocation.position.lat,
          lng: geolocation.position.lng,
        }}
        className='w-full h-full'
        level={3} // 지도의 확대 레벨
        onCenterChanged={(map) => {
          const level = map.getLevel();
          const latlng = map.getCenter();

          setData({
            level: level,
            position: {
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            },
          });
        }}
      />

      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-30'>
        <IconMapPin />
      </div>
    </div>
  );
};

export default CenterChangedMap;
