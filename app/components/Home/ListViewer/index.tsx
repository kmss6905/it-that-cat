import { NoFollowListPage, NoListPage } from '@/components/ListUi';
import ContentCard from '../ContentCard';
import { useEffect, useMemo, useState } from 'react';
import { SelectedFilterState, options } from '../SelectFilter';
import useGeolocation from '@/hooks/useGeolocation';
import { useInView } from 'react-intersection-observer';
import { useCardContents } from '@/hooks/useGetContent';
import CardSkeleton from '../CardSkeleton';
import { Coordinates, GeolocationState } from '@/types/address';
import { useGeolocationStore } from '@/stores/home/store';

interface ListViewerProps {
  catMark: boolean;
  selectedFilter: SelectedFilterState;
}
const ListViewer = ({ catMark, selectedFilter }: ListViewerProps) => {
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const { geolocation } = useGeolocationStore();

  const { data, isLoading, fetchNextPage, hasNextPage } = useCardContents({
    position: geolocation.position,
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

  return (
    <div className='px-6 overflow-y-scroll h-full layout flex flex-col gap-2 pb-6'>
      <h2 className='text-black heading2 pb-4'>우리 동네 이냥저냥이</h2>
      {isLoading
        ? Array.from(Array(3), (_, key) => <CardSkeleton key={key} />)
        : contentsData && contentsData.length !== 0
          ? contentsData.map((content) => (
              /* 등록된 고양이가 있을 때 */
              <ContentCard key={content.contentId} content={content} />
            ))
          : /* 등록된 고양이가 있지만 팔로우한 고양이가 없을 때 */
            catMark && <NoFollowListPage />}
      {/* 등록된 고양이가 없을 때 */}
      {!isLoading && !catMark && !contentsData ? <NoListPage /> : null}
      <div ref={ref}></div>
    </div>
  );
};

export default ListViewer;
