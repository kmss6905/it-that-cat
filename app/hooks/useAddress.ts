import { useState, useEffect } from 'react';
import getAddress from '@/apis/map/getAddress';
import useGeolocation from '@/hooks/useGeolocation';
import { RegionState } from '@/types/address';

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
