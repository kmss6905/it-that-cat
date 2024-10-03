'use client';
import { useRouter } from 'next/navigation';
import MapComponent from '@/components/common/Map/Map';
import getAddress from '@/apis/map/getAddress';
import RegisterButton from '@/components/common/Button/RegisterButton';
import CurrentLocationBtn from '@/components/common/Map/CurrentLocationBtn';
import IconCurrMapPin from '@/assets/images/map/icon_currentMapPin.svg';
import IconX from '@/assets/images/icon_x.svg';
import { Dispatch, SetStateAction } from 'react';
import { Coordinates, RegionState } from '@/types/address';
import { useMapContents } from '@/hooks/queries/useGetContent';
import CustomPin from '../common/Map/CustomPin';
import useGeolocation from '@/hooks/useGeolocation';
import { useGeolocationStore } from '@/stores/home/store';

const RegisterMap = ({
  isFillingIn,
  initAddress,
  setMode,
}: {
  isFillingIn: boolean;
  initAddress: RegionState | null;
  setMode: Dispatch<SetStateAction<string>>;
}) => {
  const currentGeolocation = useGeolocation();
  const {
    geolocation: { position, address },
    setPosition,
    setAddress,
  } = useGeolocationStore();
  const router = useRouter();

  const query = {
    position: currentGeolocation.position ? currentGeolocation.position : null,
    follow: false,
  };

  const { data } = useMapContents({ ...query });

  const handleCenterChanged = async (map: any) => {
    const latlng = map.getCenter();
    const location = { lat: latlng.getLat(), lng: latlng.getLng() };
    setPosition(location);
    await getAddress(location).then((addr) => addr && setAddress(addr));
  };

  const handleClickCurrentPosition = () => {
    if (!position || currentGeolocation.position === null) return null;
    const currPosition: Coordinates = {
      lat: currentGeolocation.position?.lat,
      lng: currentGeolocation.position?.lng,
    };
    setPosition(currPosition);
  };

  const onClickClose = () => {
    isFillingIn ? setMode('post') : router.back();
  };

  return (
    <div className='relative h-full overflow-hidden'>
      <div className='w-full bg-white pt-6 pb-4 absolute left-0 top-0 z-10'>
        <h2 className='text-center subHeading text-black'>우리 동네 냥이 등록</h2>
        <span className='absolute right-5 top-6 cursor-pointer' onClick={onClickClose}>
          <IconX />
        </span>
      </div>

      <MapComponent isPanto onCenterChanged={handleCenterChanged}>
        {data
          ? data.items.map(({ contentId, lat, lng }: any) => (
              <CustomPin key={contentId} position={{ lat: lat, lng: lng }} />
            ))
          : null}
      </MapComponent>

      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-20'>
        <IconCurrMapPin />
      </div>

      <div className='fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[430px] z-10'>
        <CurrentLocationBtn
          handleClick={handleClickCurrentPosition}
          className='absolute -top-3 left-6 -translate-y-full'
        />

        <div className='bg-white rounded-t-xl shadow-[0px_0px_16px_0px_rgba(0,0,0,0.25)] flex flex-col gap-5 px-6 pt-7 pb-[30px]'>
          <div>
            <h3 className='pb-1 heading1 text-black'>냥이를 만난 장소는 바로 여기!</h3>
            <p className='text-gray-300 body1'>{`${address ? address.addrName : initAddress ? initAddress.addrName : '고양이는 사랑입니다❤'}`}</p>
          </div>

          <RegisterButton onClick={() => setMode('post')}>이 위치로 설정</RegisterButton>
        </div>
      </div>
    </div>
  );
};

export default RegisterMap;
