'use client';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import CurrentLocationBtn from '@/components/Map/CurrentLocationBtn';
import ContentCard from '@/components/Home/ContentCard';
import FloatingBtn from '@/components/Home/FloatingBtn';
import CatMark from '@/components/Home/CatMark';
import { useGeolocationStore } from '@/stores/home/store';
import IconList from '@/assets/images/icon_list.svg';
import IconNewContent from '@/assets/images/icon_newContent.svg';
import { ContentObjProps } from '@/types/content';
import MapViewer from '@/components/Home/MapViewer';
import SelectFilter, {
  SelectedFilterState,
  options,
} from '@/components/Home/SelectFilter';
import ListViewer from '@/components/Home/ListViewer';
import useGeolocation from '@/hooks/useGeolocation';

export default function Home() {
  const router = useRouter();
  const currentPosition = useGeolocation();

  const { setPosition } = useGeolocationStore();

  const [viewer, setViewer] = useState<'map' | 'list'>('map');
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<SelectedFilterState>(
    options[0],
  );

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
    ${viewer === 'list' ? 'pt-[108px] bg-gray-50' : 'overflow-hidden'}`}
    >
      {viewer === 'list' ? (
        <SelectFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={(value) => setSelectedFilter(value)}
        />
      ) : null}

      <CatMark
        isChecked={catMark}
        type={viewer}
        onClick={() => setCatMark((prev) => !prev)}
      />

      {viewer === 'map' ? (
        <MapViewer
          selectedPin={selectedPin}
          setSelectedPin={(value) => setSelectedPin(value)}
          catMark={catMark}
          setContent={(value) => setContent(value)}
        />
      ) : (
        <ListViewer catMark={catMark} selectedFilter={selectedFilter} />
      )}

      <div className='absolute bottom-3 px-6 z-20 w-full'>
        {viewer === 'map' && currentPosition.position ? (
          <CurrentLocationBtn
            handleClick={handleClickCurrentPosition}
            className='absolute -top-7 left-6 -translate-y-full'
          />
        ) : null}

        <FloatingBtn
          Icon={IconNewContent}
          onClick={() => router.push('/register')}
          className='bg-primary-500 absolute right-6 -top-[84px]'
        >
          새로운 냥이 등록
        </FloatingBtn>
        <FloatingBtn
          Icon={IconList}
          onClick={() => setViewer((prev) => (prev === 'map' ? 'list' : 'map'))}
          className='bg-gray-500 absolute -top-7 right-6'
        >
          목록보기
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
