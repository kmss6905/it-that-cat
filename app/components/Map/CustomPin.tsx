import { MapMarker } from 'react-kakao-maps-sdk';
import mapPin from '@/assets/images/icon_mapPin.png';

interface CustomPinProps {
  position?: { lat: number; lng: number };
  onClick?: (value?: any) => void;
}

const CustomPin = ({ position, onClick }: CustomPinProps) => {
  if (!position) return null;

  return (
    <MapMarker
      position={{
        lat: position.lat,
        lng: position.lng,
      }}
      onClick={() => onClick && onClick({ level: 2, position: position })}
      image={{
        src: `${mapPin.src}`,
        size: {
          width: 23,
          height: 20,
        },
        options: {
          offset: {
            x: 11.5,
            y: 20,
          },
        },
      }}
    />
  );
};

export default CustomPin;
