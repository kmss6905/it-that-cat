import { MapMarker } from 'react-kakao-maps-sdk';
import mapPin from '@/assets/images/icon_mapPin.png';
import mapPinSelect from '@/assets/images/icon_mapPin_select.png';

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
        src: `${isSelected ? mapPinSelect.src : mapPin.src}`,
        size: {
          width: isSelected ? 35 : 23,
          height: isSelected ? 30 : 20,
        },
        options: {
          offset: {
            x: isSelected ? 17.5 : 11.5,
            y: isSelected ? 30 : 20,
          },
        },
      }}
    />
  );
};

export default CustomPin;
