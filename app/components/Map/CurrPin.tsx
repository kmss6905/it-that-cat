import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import IconCurrLocation from '@/assets/images/icon_currLocation.svg';
import { Coordinates } from '@/types/address';
import useGeolocation from '@/hooks/useGeolocation';

const CurrPin = () => {
  const { position } = useGeolocation();

  if (!position) return null;

  return (
    <CustomOverlayMap
      position={{
        lat: position.lat,
        lng: position.lng,
      }}
      clickable={false}
    >
      <div className='relative w-[70px] h-[70px] flex justify-center items-center'>
        <div
          className='absolute left-0 top-0 bg-[rgba(53,129,255,0.10)]
        rounded-full w-full h-full animate-pingCustom'
        ></div>
        <IconCurrLocation />
      </div>
    </CustomOverlayMap>
  );
};

export default CurrPin;
