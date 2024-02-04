'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useGeolocation from '@/hooks/useGeolocation';
import MapComponent from '@/components/Map/Map';
import CurrentLocationBtn from '@/components/Map/CurrentLocationBtn';
import ContentCard from '@/components/Home/ContentCard';
import FloatingBtn from '@/components/Home/FloatingBtn';
import ContentMarkers from '@/components/Map/ContentMarkers';
import CatMark from '@/components/Home/CatMark';
import { useGeolocationStore } from '@/stores/home/store';
import IconList from '@/assets/images/icon_list.svg';
import IconNewContent from '@/assets/images/icon_newContent.svg';
import getSelectContent from '@/apis/map/getSelectContent';
import getAddress from '@/apis/map/getAddress';
import { ContentObjProps } from '@/types/content';
import UnAuthUserPopup from '@/components/UnAuthUserPopup';

export default function Home() {
  const router = useRouter();
  const currentPosition = useGeolocation();

  const { geolocation, setAddress, setLevel, setPosition } =
    useGeolocationStore();

  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [catMark, setCatMark] = useState<boolean>(false);
  const [content, setContent] = useState<ContentObjProps | null>(null);
  const [cookie, setCookie] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visited = localStorage.getItem('visited');

      if (!visited) {
        router.push('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    if (geolocation.position === null && currentPosition.position !== null) {
      setPosition(currentPosition.position);
    }
  }, [geolocation.position, currentPosition.position, setPosition]);

  useEffect(() => {
    if (document) {
      const cookies = Object.fromEntries(
        document?.cookie?.split(';').map((cookie) => cookie.trim().split('=')),
      );

      setCookie(cookies);
    }
  }, []);

  const handleChangeCenter = useCallback(
    async (map: any) => {
      const level = map.getLevel();
      const latlng = map.getCenter();
      const position = { lat: latlng.getLat(), lng: latlng.getLng() };

      setLevel(level);
      setPosition(position);

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

  const handleClickMarker = async (data: any) => {
    setPosition(data.position);
    setLevel(data.level);
    setSelectedPin(data.id);

    /* 선택한 컨텐츠 내용 가져오기 */
    await getSelectContent(data.id).then((content) => {
      setContent(content);
    });
  };

  if (currentPosition.position === null) return null;

  return (
    <div className='relative h-full overflow-hidden'>
      {popupOpen ? (
        <UnAuthUserPopup setIsOpen={(value: boolean) => setPopupOpen(value)} />
      ) : null}
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
            position: currentPosition.position,
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
          className='absolute -top-7 left-6 -translate-y-full'
        />

        <FloatingBtn
          Icon={IconNewContent}
          onClick={() =>
            cookie && cookie?.accessToken
              ? router.push('/register')
              : setPopupOpen(true)
          }
          className='bg-primary-500 absolute right-6 -top-[84px]'
        >
          새로운 냥이 등록
        </FloatingBtn>
        <FloatingBtn
          Icon={IconList}
          onClick={() => router.push('/list')}
          className='bg-gray-500 absolute -top-7 right-6'
        >
          목록보기
        </FloatingBtn>

        {content !== null && selectedPin !== null ? (
          <div className='mb-[18px]'>
            <ContentCard content={content} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
