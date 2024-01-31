'use client';
import useGeolocation from '@/hooks/useGeolocation';
import { useState } from 'react';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import MapComponent from '@/components/Map/Map';
import useAddress from '@/hooks/useAddress';
import getAddress, { RegionState } from '@/apis/map/getAddress';
import IconCurrMapPin from '@/assets/images/icon_currentMapPin.svg';
import CustomPin from '@/components/Map/CustomPin';
import IconX from '@/assets/images/icon_x.svg';
import { useRouter } from 'next/navigation';
import CurrPin from '@/components/Map/CurrPin';
import RegisterBtn from '@/components/RegisterBtn';
import CurrentLocationBtn from '@/components/Map/CurrentLocationBtn';

declare global {
  interface Window {
    kakao: any;
  }
}

const RegisterMapPage = () => {
  useKakaoLoader();
  const geolocation = useGeolocation();
  const router = useRouter();

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

  const handleClickCurrentPosition = () => {
    if (!data || data.level === null || geolocation.position === null)
      return null;

    setData({
      level: data.level,
      position: {
        lat: geolocation.position?.lat,
        lng: geolocation.position?.lng,
      },
    });
  };

  return (
    <div className='relative h-full overflow-hidden'>
      <div className='w-full bg-white pt-6 pb-4 absolute left-0 top-0 z-10'>
        <h2 className='text-center subHeading text-black'>
          우리 동네 냥이 등록
        </h2>
        <span
          className='absolute right-5 top-6 cursor-pointer'
          onClick={() => router.back()}
        >
          <IconX />
        </span>
      </div>

      <MapComponent
        position={data?.position}
        onCenterChanged={handleCenterChanged}
        isPanto
      >
        {pinList.map(
          (position) =>
            data &&
            data.position !== position && (
              <CustomPin
                key={`${position.lat}-${position.lng}`}
                position={position}
                onClick={() => setData({ level: 2, position: position })}
              />
            ),
        )}
        <CurrPin position={geolocation.position} />
      </MapComponent>

      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-20'>
        <IconCurrMapPin />
      </div>

      <div className='absolute bottom-0 left-0 w-full z-30'>
        <CurrentLocationBtn
          handleClick={handleClickCurrentPosition}
          className='ml-6'
        />

        <div className='bg-white rounded-t-xl shadow-[0px_0px_16px_0px_rgba(0,0,0,0.25)] flex flex-col gap-5 px-6 pt-7 pb-[30px]'>
          <div>
            <h3 className='pb-1 heading1 text-black'>
              냥이를 만난 장소는 바로 여기!
            </h3>
            <p className='text-gray-300 body1'>{`${address ? address?.addrName : initAddress?.addrName}`}</p>
          </div>

          <RegisterBtn onClick={() => router.push('/register/post')}>
            이 위치로 설정
          </RegisterBtn>
        </div>
      </div>
    </div>
  );
};

export default RegisterMapPage;
