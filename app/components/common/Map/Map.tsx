'use client';

import React, { ReactNode, RefObject, useMemo } from 'react';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';

import useGeolocation from '@/hooks/useGeolocation';
import { useGeolocationStore } from '@/stores/home/store';
import CurrPin from './CurrPin';
import { clusterStyle } from './clusterStyle';
import useDebounceFunction from '@/hooks/utils/useDebounceFunction';

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
  center?: { lat: number; lng: number };
}

const MapComponent = ({ children, mapRef, ...props }: MapProps) => {
  const currentPosition = useGeolocation();
  const { geolocation, setPosition } = useGeolocationStore();
  const setPositionDebounced = useDebounceFunction(setPosition, 300);

  const position = useMemo(() => {
    const initPosition = { lat: 36, lng: 127 };

    if (geolocation.position === null) {
      if (currentPosition.position === null) {
        return initPosition;
      }
      return currentPosition.position;
    }
    return geolocation.position;
  }, [geolocation.position, currentPosition.position]);

  return (
    <Map
      id='map'
      center={position}
      className='w-full h-full'
      level={3}
      ref={mapRef}
      onCenterChanged={(map) => {
        const latlng = map.getCenter();

        setPositionDebounced({
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        });
      }}
      {...props}
    >
      <MarkerClusterer averageCenter={true} minLevel={5} calculator={[10, 30, 50]} styles={clusterStyle}>
        {children}
      </MarkerClusterer>

      <CurrPin />
    </Map>
  );
};

export default MapComponent;
