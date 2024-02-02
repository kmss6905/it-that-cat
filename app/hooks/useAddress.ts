import { useState, useEffect } from 'react';
import getAddress, { RegionState } from '@/apis/map/getAddress';
import useGeolocation from '@/hooks/useGeolocation';

const useAddress = () => {
  const geolocation = useGeolocation();
  const [region, setRegion] = useState<null | RegionState>(null);

  useEffect(() => {
    if (geolocation.position) {
      getAddress(geolocation.position).then((address) => {
        if (!address) {
          return;
        }
        setRegion(address);
      });
    }
  }, [geolocation?.position]);

  return region;
};

export default useAddress;
