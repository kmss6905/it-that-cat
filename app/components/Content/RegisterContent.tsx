'use client';
import { useEffect, useState } from 'react';
import RegisterMap from '@/components/Register/Map';
import RegisterPost from '@/components/Register/Post';
import { CatObjProps } from '@/types/content';
import { Coordinates, RegionState } from '@/types/address';
import useGeolocation from '@/hooks/useGeolocation';
import useAddress from '@/hooks/useAddress';

const RegisterConent = ({
  data,
  initMode,
}: {
  data?: CatObjProps;
  initMode: 'map' | 'post';
}) => {
  const currentGeolocation = useGeolocation();
  const initAddress = useAddress();
  const [mode, setMode] = useState<string>(initMode);
  const [isFillingIn, setIsFillingIn] = useState<boolean>(false);
  const [isNew, _] = useState<boolean>(!data);
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
    images: [],
  });

  const updateCatInfo = (
    position: Coordinates | null,
    address: RegionState | null,
  ) =>
    setCatInfo((value: CatObjProps) => ({
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

  useEffect(() => {
    // 등록 페이지에서 사용하는 컴포넌트일 경우 초기 주소 사용
    if (initMode === 'map') {
      updateCatInfo(currentGeolocation.position, initAddress);
    }
  }, [currentGeolocation, initAddress, initMode]);

  useEffect(() => {
    updateCatInfo(position, address);
  }, [position, address]);

  useEffect(() => {
    if (data) {
      setCatInfo(() => data);
    }
  }, [data]);

  return (
    <div className='h-full'>
      {mode === 'map' ? (
        <RegisterMap
          isFillingIn={isFillingIn}
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
          setIsFillingIn={setIsFillingIn}
          setMode={setMode}
          catInfo={catInfo}
          setCatInfo={setCatInfo}
          isNew={isNew}
        />
      )}
    </div>
  );
};

export default RegisterConent;
