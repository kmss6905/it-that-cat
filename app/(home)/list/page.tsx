'use client';
import CatMark from '@/components/Home/CatMark';
import ContentCard from '@/components/Home/ContentCard';
import FloatingBtn from '@/components/Home/FloatingBtn';
import SelectFilter, {
  SelectedFilterState,
  options,
} from '@/components/Home/SelectFilter';
import useGeolocation from '@/hooks/useGeolocation';
import { useCardContents } from '@/hooks/useGetContent';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import IconMapView from '@/assets/images/icon_mapView.svg';
import IconNewContent from '@/assets/images/icon_newContent.svg';
import UnAuthUserPopup from '@/components/UnAuthUserPopup';
import { useRouter } from 'next/navigation';
import CardSkeleton from '@/components/Home/CardSkeleton';
import { NoFollowListPage, NoListPage } from '@/components/ListUi';
import { useInView } from 'react-intersection-observer';

const ListViewPage = () => {
  const router = useRouter();

  const currentPosition = useGeolocation();
  const [cookie, setCookie] = useState<{ [key: string]: any } | null>(null);

  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const [selectedFilter, setSelectedFilter] = useState<SelectedFilterState>(
    options[0],
  );

  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [catMark, setCatMark] = useState(false);
  const { data, isLoading, fetchNextPage, hasNextPage } = useCardContents({
    position: currentPosition.position,
    follow: catMark,
  });

  const contentsData = useMemo(() => {
    const result = data
      ? data.pages.flatMap((items, idx) => (idx !== 1 ? items.items : []))
      : [];

    if (selectedFilter.id === 'popularity') {
      const filteredItems = result.sort(
        (a, b) => b.countOfFollowed - a.countOfFollowed,
      );
      return filteredItems;
    }
    return result;
  }, [data, selectedFilter.id]);

  useEffect(() => {
    if (hasNextPage && inView) {
      // setPage((prev) => prev++);
      // fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    if (document) {
      const cookies = Object.fromEntries(
        document?.cookie?.split(';').map((cookie) => cookie.trim().split('=')),
      );

      setCookie(cookies);
    }
  }, []);

  if (currentPosition.position === null) return null;

  return (
    <div className='relative w-full h-full pt-[108px] bg-gray-50'>
      {popupOpen ? (
        <UnAuthUserPopup setIsOpen={(value: boolean) => setPopupOpen(value)} />
      ) : null}

      <SelectFilter
        selectedFilter={selectedFilter}
        setSelectedFilter={(value) => setSelectedFilter(value)}
      />
      <CatMark
        isChecked={catMark}
        onClick={() => setCatMark((prev) => !prev)}
      />

      <div className='px-6 overflow-y-scroll h-full layout flex flex-col gap-2 pb-6'>
        <h2 className='text-black heading2 pb-4'>우리 동네 이냥저냥이</h2>
        {isLoading ? (
          <CardSkeleton />
        ) : contentsData && contentsData.length !== 0 ? (
          contentsData.map((content) => (
            /* 등록된 고양이가 있을 때 */
            <ContentCard key={content.contentId} content={content} />
          ))
        ) : (
          /* 등록된 고양이가 있지만 팔로우한 고양이가 없을 때 */
          catMark && <NoFollowListPage />
        )}
        {/* 등록된 고양이가 없을 때 */}
        {!isLoading && !catMark && !contentsData && !contentsData ? (
          <NoListPage />
        ) : null}
        <div ref={ref}></div>
      </div>

      <FloatingBtn
        Icon={IconNewContent}
        onClick={() =>
          cookie && cookie?.accessToken
            ? router.push('/register')
            : setPopupOpen(true)
        }
        className='bg-primary-500 absolute right-6 bottom-12'
      >
        새로운 냥이 등록
      </FloatingBtn>
      <FloatingBtn
        Icon={IconMapView}
        onClick={() => router.push('/')}
        className='bg-gray-500 absolute -bottom-2 right-6'
      >
        지도보기
      </FloatingBtn>
    </div>
  );
};

export default ListViewPage;
