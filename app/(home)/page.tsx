'use client';
import { useCallback, useState } from 'react';

import IconList from '@/assets/images/icon_list.svg';
import IconMap from '@/assets/images/map/icon_mapView.svg';
import CurrentLocationBtn from '@/components/common/Map/CurrentLocationBtn';
import ContentCard from '@/components/Home/ContentCard';
import FloatingBtn from '@/components/Home/FloatingBtn';
import { useGeolocationStore } from '@/stores/home/store';
import { ContentObjProps } from '@/types/content';
import MapViewer from '@/components/Home/MapViewer';
import { SelectedFilterState, options } from '@/components/Home/SelectFilter';
import ListViewer from '@/components/Home/ListViewer';
import useGeolocation from '@/hooks/useGeolocation';
import SearchBar from '@/components/Home/Search/SearchBar';
import SearchModal from '@/components/Home/Search/SearchModal';
import BookmarkBtn from '@/components/Home/BookmarkBtn';

export default function Home() {
  const currentPosition = useGeolocation();

  const { setPosition } = useGeolocationStore();

  const [viewer, setViewer] = useState<'map' | 'list'>('map');
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<SelectedFilterState>(options[0]);

  const [catMark, setCatMark] = useState<boolean>(false);
  const [content, setContent] = useState<ContentObjProps | null>(null);

  const handleClickCurrentPosition = useCallback(() => {
    if (currentPosition.position === null) return null;

    const latlng = {
      lat: currentPosition.position?.lat,
      lng: currentPosition.position?.lng,
    };

    setPosition(latlng);
  }, [currentPosition.position, setPosition]);

  return (
    <div
      className={`relative h-full
    ${viewer === 'list' ? 'pt-6 bg-gray-50' : 'overflow-hidden'}`}
    >
      <SearchModal />
      <SearchBar viewer={viewer} />
      {viewer === 'map' ? (
        <MapViewer
          selectedPin={selectedPin}
          setSelectedPin={(value) => setSelectedPin(value)}
          catMark={catMark}
          setContent={(value) => setContent(value)}
        />
      ) : (
        <ListViewer
          catMark={catMark}
          selectedFilter={selectedFilter}
          setSelectedFilter={(value) => setSelectedFilter(value)}
          setCatMark={() => setCatMark((prev) => !prev)}
        />
      )}

      <div className='absolute bottom-3 px-6 z-20 w-full'>
        {viewer === 'map' && currentPosition.position ? (
          <>
            <BookmarkBtn
              handleClick={() => setCatMark((prev) => !prev)}
              className='absolute -top-20 left-6 -translate-y-full'
              activate={catMark}
            />
            <CurrentLocationBtn
              handleClick={handleClickCurrentPosition}
              className='absolute -top-7 left-6 -translate-y-full'
            />
          </>
        ) : null}

        <FloatingBtn
          Icon={viewer === 'map' ? IconList : IconMap}
          onClick={() => setViewer((prev) => (prev === 'map' ? 'list' : 'map'))}
          className='bg-gray-500 absolute -top-7 right-6'
        >
          {viewer === 'map' ? '목록보기' : '지도보기'}
        </FloatingBtn>

        {viewer === 'map' && content !== null && selectedPin !== null ? (
          <div className='mb-[18px]'>
            <ContentCard content={content} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
