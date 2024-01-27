'use client';
import getAddress, { RegionState } from '@/apis/map/getAddress';
import useGeolocation from '@/hooks/useGeolocation';
import { useEffect, useState } from 'react';

const Map = () => {
  const geolocation = useGeolocation();
  const [region, setRegion] = useState<undefined | RegionState>();

  useEffect(() => {
    if (geolocation.position) {
      getAddress(geolocation.position).then((address) => {
        setRegion(address);
      });
    }
  }, [geolocation]);

  return <div>Map</div>;
};

export default Map;
