'use client';

import React, { ReactNode, RefObject, useMemo } from 'react';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';

import useGeolocation from '@/hooks/useGeolocation';
import { useGeolocationStore } from '@/stores/home/store';
import CurrPin from './CurrPin';
import { clusterStyle } from './clusterStyle';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  isPanto?: boolean;
  children?: ReactNode;
  mapRef?: RefObject<kakao.maps.Map>;
  onClick?: () => void;
  onCenterChanged?: (value: any) => void;
}

const MapComponent = ({ children, mapRef, ...props }: MapProps) => {
  const currentPosition = useGeolocation();
  const { geolocation } = useGeolocationStore();

  const position = useMemo(() => {
    const initPosition = { lat: 36, lng: 127 };
    return geolocation.position === null
      ? currentPosition.position === null
        ? initPosition
        : currentPosition.position
      : geolocation.position;
  }, [geolocation.position, currentPosition.position]);

  return (
    <Map
      id='map'
      center={position}
      className='w-full h-full'
      level={3}
      ref={mapRef}
      {...props}
    >
      <MarkerClusterer
        averageCenter={true}
        minLevel={5}
        calculator={[10, 30, 50]}
        styles={clusterStyle}
      >
        {children}
      </MarkerClusterer>

      <CurrPin />
    </Map>
  );
};

export default MapComponent;
