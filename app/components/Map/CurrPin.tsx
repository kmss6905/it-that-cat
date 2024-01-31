import { MapMarker } from 'react-kakao-maps-sdk';
import currPin from '@/assets/images/icon_currPin.png';

interface CustomPinProps {
  position?: { lat: number; lng: number };
}

const CurrPin = ({ position }: CustomPinProps) => {
  if (!position) return null;

  return (
    <MapMarker
      position={{
        lat: position.lat,
        lng: position.lng,
      }}
      clickable={false}
      image={{
        src: `${currPin.src}`,
        size: {
          width: 78,
          height: 78,
        },
        options: {
          offset: {
            x: 39,
            y: 39,
          },
        },
      }}
    />
  );
};

export default CurrPin;
