import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import IconCurrLocation from '@/assets/images/icon_currLocation.svg';

interface CustomPinProps {
  position?: { lat: number; lng: number };
}

const CurrPin = ({ position }: CustomPinProps) => {
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
