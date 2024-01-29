'use client';

import useGeolocation from '@/hooks/useGeolocation';
import { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import MapComponent from '@/components/Map/Map';
import useAddress from '@/hooks/useAddress';
import getAddress, { RegionState } from '@/apis/map/getAddress';

import mapPin from '@/assets/images/icon_mapPin.png';
import IconCurrMapPin from '@/assets/images/icon_currentMapPin.svg';

declare global {
  interface Window {
    kakao: any;
  }
}

const RegisterMapPage = () => {
  useKakaoLoader();
  const geolocation = useGeolocation();

  const initAddress = useAddress();
  const [address, setAddress] = useState<undefined | RegionState>();

  const [data, setData] = useState<{
    level: number;
    position: {
      lat: number;
      lng: number;
    };
  }>();

  console.log('🚀 ~ RegisterMapPage ~ data:', data);
  const pinList = [
    { lat: 35.17183079055732, lng: 129.0556621326331 },
    { lat: 35.1716984775722, lng: 129.05708553844048 },
    { lat: 35.17275369644841, lng: 129.05557562177881 },
    { lat: 35.171488702430636, lng: 129.0561720817253 },
  ];

  if (geolocation.position === null) return null;
  const handleCenterChanged = async (map: kakao.maps.Map) => {
    const level = map.getLevel();
    const latlng = map.getCenter();

    const position = { lat: latlng.getLat(), lng: latlng.getLng() };

    setData({
      level: level,
      position: position,
    });

    const addr = await getAddress(position);

    setAddress(addr);
  };

  return (
    <div className='relative h-full overflow-hidden'>
      <MapComponent
        position={data?.position}
        onCenterChanged={handleCenterChanged}
        isPanto
      >
        {pinList.map(
          (position) =>
            data &&
            data.position !== position && (
              <div
                className='bg-gray-500'
                key={`${position.lat}-${position.lng}`}
              >
                <MapMarker
                  position={{ lat: position.lat, lng: position.lng }}
                  onClick={() => setData({ level: 2, position: position })}
                  image={{
                    src: `${mapPin.src}`, // 마커이미지의 주소입니다
                    size: {
                      width: 46,
                      height: 59,
                    }, // 마커이미지의 크기입니다
                    options: {
                      offset: {
                        x: 23,
                        y: 59,
                      }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                  }}
                />
              </div>
            ),
        )}
      </MapComponent>

      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-30'>
        <IconCurrMapPin />
      </div>

      <div className='absolute bottom-0 left-0 w-full z-20 bg-white rounded-t-xl shadow-[0px_0px_16px_0px_rgba(0,0,0,0.25)] flex flex-col gap-5 px-6 pt-7 pb-[30px]'>
        <div>
          <h3 className='pb-1 heading1 text-black'>
            냥이를 목격한 스팟을 알려주세요!
          </h3>
          <p className='text-gray-300 body1'>{`${address ? address?.depth1 : initAddress?.depth1} ${address ? address?.depth2 : initAddress?.depth2} ${address ? address?.depth3 : initAddress?.depth3} ${address ? address?.sub_address_no : initAddress?.sub_address_no}`}</p>
        </div>
        <button className='w-full py-[14px] bg-primary-500 text-white rounded-[10px]'>
          이 위치로 설정
        </button>
      </div>
    </div>
  );
};

export default RegisterMapPage;
