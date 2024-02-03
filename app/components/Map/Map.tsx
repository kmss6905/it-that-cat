'use client';

import useGeolocation from '@/hooks/useGeolocation';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import CurrPin from './CurrPin';
import { useMemo } from 'react';
import { useBoundStore } from '@/stores/home/boundStore';

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

  const position = useMemo(() => {
    if (props.position) {
      return props.position;
    } else if (geolocation.position) {
      return {
        lat: geolocation.position.lat,
        lng: geolocation.position.lng,
      };
    }

    return null;
  }, [props.position, geolocation.position]);

  if (!position) return null;

  return (
    <Map
      id='map'
      center={position}
      className='w-full h-full'
      level={props.level ? props.level : 3}
      {...props}
    >
      <MarkerClusterer averageCenter={true} minLevel={5}>
        {children}
      </MarkerClusterer>

      {geolocation.position ? (
        <CurrPin position={geolocation.position} />
      ) : null}
    </Map>
  );
};

export default MapComponent;
