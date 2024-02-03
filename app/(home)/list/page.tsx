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
import { Suspense, useEffect, useState } from 'react';
import IconMapView from '@/assets/images/icon_mapView.svg';
import IconNewContent from '@/assets/images/icon_newContent.svg';
import UnAuthUserPopup from '@/components/UnAuthUserPopup';
import { useRouter } from 'next/navigation';
import CardSkeleton from '@/components/Home/CardSkeleton';
import { NoFollowListPage, NoListPage } from '@/components/ListUi';

const ListViewPage = () => {
  const router = useRouter();

  const currentPosition = useGeolocation();
  const [cookie, setCookie] = useState<{ [key: string]: any } | null>(null);

  const [contents, setContents] = useState<any[] | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<SelectedFilterState>(
    options[0],
  );

  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [catMark, setCatMark] = useState(false);
  const { data, isLoading } = useCardContents({
    position: currentPosition.position,
    follow: catMark,
  });

  useEffect(() => {
    if (data) {
      const newContents = data.pages[0].items.flatMap((item: any) => ({
        ...item,
      }));

      if (selectedFilter.id === 'popularity') {
        const sortContent = newContents.sort(
          (a: any, b: any) => a.numberOfCatSlaves - b.numberOfCatSlaves,
        );
        setContents(sortContent);
      }
      setContents(newContents);
    }
  }, [data, selectedFilter.id]);

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

      <div className='px-6 overflow-y-scroll h-full layout flex flex-col gap-2'>
        <h2 className='text-black heading2 pb-4'>우리 동네 이냥저냥이</h2>
        {isLoading ? (
          <CardSkeleton />
        ) : contents && contents.length !== 0 ? (
          contents.map((content) => (
            /* 등록된 고양이가 있을 때 */
            <ContentCard key={content.contentId} content={content} />
          ))
        ) : (
          /* 등록된 고양이가 있지만 팔로우한 고양이가 없을 때 */
          catMark && <NoFollowListPage />
        )}
        {/* 등록된 고양이가 없을 때 */}
        {(!isLoading && !catMark && !contents) ||
        (contents && contents.length === 0) ? (
          <NoListPage />
        ) : null}
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
