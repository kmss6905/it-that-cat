'use client';

import useGeolocation from '@/hooks/useGeolocation';
import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const geolocation = useGeolocation();

  useEffect(() => {
    const mapScript = document.createElement('script');
    if (geolocation.position === null) {
      return;
    }
    const { latitude, longitude } = geolocation.position;

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude,
        );
        const nowMarker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        nowMarker.setMap(map);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [geolocation.position]);

  return (
    <div
      id='map'
      className='w-full'
      style={{ height: 'calc(812px - 120px)' }}
    />
  );
};

export default Map;
