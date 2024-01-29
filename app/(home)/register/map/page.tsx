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
import CustomPin from '@/components/Map/CustomPin';

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
                <CustomPin
                  position={position}
                  onClick={() => setData({ level: 2, position: position })}
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
            냥이를 만난 장소는 바로 여기!
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
