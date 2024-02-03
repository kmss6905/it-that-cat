'use client';
import { useEffect, useState } from 'react';
import RegisterMap from '@/components/Register/Map';
import RegisterPost from '@/components/Register/Post';
import { CatObjProps } from '@/types/content';
import { Coordinates, RegionState } from '@/types/address';
import useGeolocation from '@/hooks/useGeolocation';
import useAddress from '@/hooks/useAddress';

const RegisterPage = () => {
  const currentGeolocation = useGeolocation();
  const initAddress = useAddress();
  const [mode, setMode] = useState<string>('map');
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [address, setAddress] = useState<RegionState | null>(null);
  const [position, setPosition] = useState<Coordinates | null>(null);
  const [catInfo, setCatInfo] = useState<CatObjProps>({
    name: '',
    description: '',
    lng: '',
    lat: '',
    jibunAddrName: '',
    jibunSido: '',
    jibunSigungu: '',
    jibunDong: '',
    jibunMainAddrNo: '',
    jibunSubAddrNo: '',
    neuter: '',
    group: '',
    catPersonalities: [],
  });

  useEffect(() => {
    setCatInfo((value) => ({
      ...value,
      lng: String(currentGeolocation.position?.lng),
      lat: String(currentGeolocation.position?.lat),
      jibunAddrName: initAddress?.addrName,
      jibunSido: initAddress?.sido,
      jibunSigungu: initAddress?.sigungu,
      jibunDong: initAddress?.dong,
      jibunMainAddrNo: initAddress?.mainAddrNo,
      jibunSubAddrNo: initAddress?.subAddrNo,
    }));
  }, [initAddress, currentGeolocation]);

  useEffect(() => {
    setCatInfo((value) => ({
      ...value,
      lng: String(position?.lng),
      lat: String(position?.lat),
      jibunAddrName: address?.addrName,
      jibunSido: address?.sido,
      jibunSigungu: address?.sigungu,
      jibunDong: address?.dong,
      jibunMainAddrNo: address?.mainAddrNo,
      jibunSubAddrNo: address?.subAddrNo,
    }));
  }, [address, position]);

  return (
    <div className='h-full'>
      {mode === 'map' ? (
        <RegisterMap
          isModifying={isModifying}
          setMode={setMode}
          address={address}
          currentGeolocation={currentGeolocation}
          initAddress={initAddress}
          setAddress={setAddress}
          position={position}
          setPosition={setPosition}
        />
      ) : (
        <RegisterPost
          setIsModifying={setIsModifying}
          setMode={setMode}
          catInfo={catInfo}
          setCatInfo={setCatInfo}
        />
      )}
    </div>
  );
};

export default RegisterPage;
