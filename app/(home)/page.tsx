'use client';
import useGeolocation from '@/hooks/useGeolocation';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useState } from 'react';
import useAddress from '@/hooks/useAddress';
import getAddress, { RegionState } from '@/apis/map/getAddress';
import MapComponent from '@/components/Map/Map';
import CustomPin from '@/components/Map/CustomPin';
import CurrPin from '@/components/Map/CurrPin';
import CurrentLocationBtn from '@/components/Map/CurrentLocationBtn';
import CardSkeleton from '@/components/Home/CardSkeleton';
import SelectFilter from '@/components/Home/SelectFilter';
import { pinList } from '@/constants/contentMockData';
import ContentCard from '@/components/Home/ContentCard';
import FloatingBtn from '@/components/Home/FloatingBtn';
import IconList from '@/assets/images/icon_list.svg';
import IconNewContent from '@/assets/images/icon_newContent.svg';

export default function Home() {
  useKakaoLoader();

  const geolocation = useGeolocation();
  const initAddress = useAddress();

  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const content = pinList.filter((item) => item.id === selectedPin);

  const [address, setAddress] = useState<undefined | RegionState>();

  const [data, setData] = useState<{
    level: number;
    position: {
      lat: number;
      lng: number;
    };
  } | null>(null);

  if (geolocation.position === null) return null;

  const handleChangeCenter = async (map: any) => {
    const level = map.getLevel();
    const latlng = map.getCenter();
    const position = { lat: latlng.getLat(), lng: latlng.getLng() };
    setData({
      level: level,
      position: position,
    });
    const addr = await getAddress(position);
    setAddress(addr);
  };

  const handleClickCurrentPosition = () => {
    if (data === null || geolocation.position === null) return null;

    setData({
      level: data?.level,
      position: {
        lat: geolocation.position?.lat,
        lng: geolocation.position?.lng,
      },
    });
  };

  return (
    <div className='relative h-full overflow-hidden'>
      <SelectFilter />
      <MapComponent
        onCenterChanged={handleChangeCenter}
        position={data?.position}
        isPanto
        level={3}
        onClick={() => setSelectedPin(null)}
      >
        {pinList.map(
          (position) =>
            data && (
              <CustomPin
                isSelected={position.id === selectedPin}
                position={position}
                key={position.id}
                onClick={() => {
                  setData({ level: 2, position: position });
                  setSelectedPin(position.id);
                }}
              />
            ),
        )}
        <CurrPin position={geolocation.position} />
      </MapComponent>

      <div className='absolute bottom-10 px-6 z-20 w-full'>
        <CurrentLocationBtn
          handleClick={handleClickCurrentPosition}
          className='absolute -top-4 -translate-y-full'
        />

        <FloatingBtn
          Icon={IconNewContent}
          className='bg-primary-500 absolute right-6 -top-[68px] -translate-y-full'
        >
          새로운 냥이 등록
        </FloatingBtn>
        <FloatingBtn
          Icon={IconList}
          className='bg-gray-500 absolute right-6 -top-4 -translate-y-full'
        >
          목록보기
        </FloatingBtn>

        <div className='bg-white rounded-xl w-full shadow-[0_0_12px_0_rgba(0,0,0,0.20)]'>
          {/* <CardSkeleton /> */}
          {selectedPin !== null ? (
            <ContentCard
              content={
                content
                  ? content[0]
                  : pinList[Math.floor(Math.random() * pinList.length)]
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
