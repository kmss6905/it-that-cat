import { useMemo } from 'react';

import { NoFollowListPage, NoListPage } from '@/components/Home/ListViewer/ListUi';
import ContentCard from '../ContentCard';
import SelectFilter, { SelectedFilterState } from '../SelectFilter';
import { useCardContents } from '@/hooks/queries/useGetContent';
import CardSkeleton from '../CardSkeleton';
import useGeolocation from '@/hooks/useGeolocation';
import CatMark from '../CatMark';
import GrayLogo from '@/assets/images/logo/logo_gray.svg';
import { Loading } from '@/(home)/loading';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface ListViewerProps {
  catMark: boolean;
  selectedFilter: SelectedFilterState;
  setCatMark: () => void;
  setSelectedFilter: (value: SelectedFilterState) => void;
}
const ListViewer = ({ catMark, selectedFilter, setCatMark, setSelectedFilter }: ListViewerProps) => {
  const currentLocation = useGeolocation();

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useCardContents({
    position: currentLocation.position,
    follow: catMark,
  });

  const target = useIntersectionObserver((entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const contentsData = useMemo(() => {
    const result = data ? data.pages.flatMap((list: any, idx) => (idx !== 1 ? list.items : [])) : [];

    if (selectedFilter.id === 'popularity') {
      const filteredItems = result.toSorted((a: any, b: any) => b.countOfFollowed - a.countOfFollowed);
      return filteredItems;
    }
    return result;
  }, [data, selectedFilter.id]);

  const renderedComponent = useMemo(() => {
    if (isLoading) {
      return Array.from(Array(3), (_, key) => <CardSkeleton key={key} />);
    } else if (contentsData && contentsData.length !== 0) {
      return contentsData.map((content: any) => (
        /* 등록된 고양이가 있을 때 */
        <ContentCard key={content.contentId} content={content} />
      ));
    } else {
      /* 등록된 고양이가 있지만 팔로우한 고양이가 없을 때 */
      return catMark ? <NoFollowListPage /> : <NoListPage />;
    }
  }, [catMark, isLoading, contentsData]);

  return (
    <div className='h-[calc(100%-94px)] flex flex-col'>
      <div className='px-6'>
        <h2 className='text-black heading2 pb-4'>우리 동네 이냥저냥이</h2>
        <div className='flex gap-[6px] pb-4'>
          <SelectFilter selectedFilter={selectedFilter} setSelectedFilter={(value) => setSelectedFilter(value)} />

          <CatMark isChecked={catMark} onClick={() => setCatMark()} />
        </div>
      </div>
      <div className='overflow-y-scroll layout flex-grow flex flex-col gap-2 px-6'>
        {renderedComponent}
        {isLoading ? (
          <Loading className='h-[128px] pt-16 pb-10' />
        ) : (
          <div className='pt-16 pb-10 w-full flex justify-center'>
            <GrayLogo />
          </div>
        )}
        <div ref={target} />
      </div>
    </div>
  );
};

export default ListViewer;
