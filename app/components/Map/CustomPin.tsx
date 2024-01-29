import { MapMarker } from 'react-kakao-maps-sdk';
import mapPin from '@/assets/images/icon_mapPin.png';

interface CustomPinProps {
  position?: { lat: number; lng: number };
  onClick?: (value?: any) => void;
}

const CustomPin = ({ position, onClick }: CustomPinProps) => {
  return (
    <MapMarker
      position={{
        lat: position ? position.lat : 33.450701,
        lng: position ? position.lng : 126.570667,
      }}
      onClick={() => onClick && onClick({ level: 2, position: position })}
      image={{
        src: `${mapPin.src}`,
        size: {
          width: 46,
          height: 59,
        },
        options: {
          offset: {
            x: 23,
            y: 59,
          },
        },
      }}
    />
  );
};

export default CustomPin;
