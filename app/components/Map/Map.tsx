'use client';

import useGeolocation from '@/hooks/useGeolocation';
import { Map, MarkerClusterer, useKakaoLoader } from 'react-kakao-maps-sdk';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  children?: React.ReactNode;
  position?: { lat: number; lng: number };
  onCenterChanged?: (value: any) => void;
  isPanto?: boolean;
  level?: number;
  onClick?: () => void;
}

const MapComponent = ({ children, ...props }: MapProps) => {
  const geolocation = useGeolocation();

  if (geolocation.position === null) return null;

  return (
    <Map
      id='map'
      center={{
        lat: props.position ? props.position.lat : geolocation.position.lat,
        lng: props.position ? props.position.lng : geolocation.position.lng,
      }}
      className='w-full h-full'
      level={props.level ? props.level : 3}
      {...props}
    >
      <MarkerClusterer averageCenter={true} minLevel={8}>
        {children}
      </MarkerClusterer>
    </Map>
  );
};

export default MapComponent;
