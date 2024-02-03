import { MapMarker } from 'react-kakao-maps-sdk';
import mapPin from '@/assets/images/icon_mapMarker.png';
import currPin from '@/assets/images/icon_currMapMarker.png';

interface CustomPinProps {
  position?: { lat: number; lng: number };
  onClick?: (value?: any) => void;
  isSelected?: boolean;
}

const CustomPin = ({
  position,
  onClick,
  isSelected = false,
}: CustomPinProps) => {
  if (!position) return null;

  return (
    <MapMarker
      position={{
        lat: position.lat,
        lng: position.lng,
      }}
      onClick={() => onClick && onClick({ level: 2, position: position })}
      image={{
        src: `${isSelected ? currPin.src : mapPin.src}`,
        size: {
          width: isSelected ? 40 : 30,
          height: isSelected ? 44 : 26,
        },
        options: {
          offset: {
            x: isSelected ? 20 : 15,
            y: isSelected ? 44 : 26,
          },
        },
      }}
    />
  );
};

export default CustomPin;
