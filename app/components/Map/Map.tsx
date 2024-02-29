'use client';

import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import CurrPin from './CurrPin';
import React, { RefObject, useEffect, useMemo, useRef } from 'react';
import { clusterStyle } from './clusterStyle';
import useGeolocation from '@/hooks/useGeolocation';
import { useGeolocationStore } from '@/stores/home/store';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  children?: React.ReactNode;
  onCenterChanged?: (value: any) => void;
  isPanto?: boolean;
  onClick?: () => void;
  handleClickMarker?: (data: any, ref: any) => void;
}

const MapComponent = ({ children, ...props }: MapProps) => {
  const currentPosition = useGeolocation();

  const { geolocation, setLevel } = useGeolocationStore();

  const mapRef = useRef<kakao.maps.Map>(null);

  useEffect(() => {
    if (!mapRef.current) {
    }
    mapRef?.current?.setLevel(geolocation.level);
  }, [setLevel, geolocation.level]);

  const position = useMemo(() => {
    const initPosition = { lat: 36, lng: 127 };
    return geolocation.position === null
      ? currentPosition.position === null
        ? initPosition
        : currentPosition.position
      : geolocation.position;
  }, [geolocation.position, currentPosition.position]);

  const defaultLevel = 3;

  return (
    <Map
      id='map'
      center={position}
      className='w-full h-full'
      level={defaultLevel}
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
