'use client';
import useGeolocation from '@/hooks/useGeolocation';
import { useCallback, useEffect, useState } from 'react';
import getAddress from '@/apis/map/getAddress';
import MapComponent from '@/components/Map/Map';
import CurrentLocationBtn from '@/components/Map/CurrentLocationBtn';
import { pinList } from '@/constants/contentMockData';
import ContentCard from '@/components/Home/ContentCard';
import FloatingBtn from '@/components/Home/FloatingBtn';
import { useRouter } from 'next/navigation';
import CatMark from '@/components/Home/CatMark';
import { useGeolocationStore } from '@/stores/home/store';
import IconList from '@/assets/images/icon_list.svg';
import IconNewContent from '@/assets/images/icon_newContent.svg';
import ContentMarkers from '@/components/Map/ContentMarkers';

export default function Home() {
  const router = useRouter();
  const currentPosition = useGeolocation();

  const { geolocation, setAddress, setLevel, setPosition } =
    useGeolocationStore();

  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const content = pinList.filter((item) => item.id === selectedPin);

  const [catMark, setCatMark] = useState<boolean>(false);

  useEffect(() => {
    if (geolocation.position === null && currentPosition.position !== null) {
      setPosition(currentPosition.position);
    }
  }, [geolocation.position, currentPosition.position, setPosition]);

  const handleChangeCenter = useCallback(
    async (map: any) => {
      const level = map.getLevel();
      const latlng = map.getCenter();
      const position = { lat: latlng.getLat(), lng: latlng.getLng() };

      setPosition(position);
      setLevel(level);

      await getAddress(position).then((addr) => addr && setAddress(addr));
    },
    [setAddress, setLevel, setPosition],
  );

  const handleClickCurrentPosition = useCallback(() => {
    if (currentPosition.position === null) return null;

    const latlng = {
      lat: currentPosition.position?.lat,
      lng: currentPosition.position?.lng,
    };

    setPosition(latlng);
  }, [currentPosition.position, setPosition]);

  const handleClickMarker = (data: any) => {
    setPosition(data.position);
    setLevel(data.level);
    setSelectedPin(data.id);
  };

  if (currentPosition.position === null) return null;

  return (
    <div className='relative h-full overflow-hidden'>
      <CatMark
        isChecked={catMark}
        type='Map'
        onClick={() => setCatMark((prev) => !prev)}
      />
      <MapComponent
        onCenterChanged={handleChangeCenter}
        position={
          geolocation.position !== null
            ? geolocation.position
            : currentPosition.position
        }
        isPanto
        level={geolocation.level}
        onClick={() => setSelectedPin(null)}
      >
        <ContentMarkers
          query={{
            position: geolocation.position
              ? geolocation.position
              : currentPosition.position,
            level: geolocation.level,
            follow: catMark,
          }}
          isSelected={selectedPin}
          onClick={handleClickMarker}
        />
      </MapComponent>

      <div className='absolute bottom-3 px-6 z-20 w-full'>
        <CurrentLocationBtn
          handleClick={handleClickCurrentPosition}
          className='absolute -top-3 left-6 -translate-y-full'
        />

        <FloatingBtn
          Icon={IconNewContent}
          onClick={() => router.push('/register/map')}
          className='bg-primary-500 absolute right-6 -top-[68px]'
        >
          새로운 냥이 등록
        </FloatingBtn>
        <FloatingBtn
          Icon={IconList}
          onClick={() => router.push('/')}
          className='bg-gray-500 absolute -top-3 right-6'
        >
          목록보기
        </FloatingBtn>

        {selectedPin !== null ? (
          <div className='mb-[18px]'>
            <ContentCard content={content[0]} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
