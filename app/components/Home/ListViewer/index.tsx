import { NoFollowListPage, NoListPage } from '@/components/ListUi';
import ContentCard from '../ContentCard';
import { useEffect, useMemo, useState } from 'react';
import SelectFilter, { SelectedFilterState } from '../SelectFilter';
import { useInView } from 'react-intersection-observer';
import { useCardContents } from '@/hooks/useGetContent';
import CardSkeleton from '../CardSkeleton';
import useGeolocation from '@/hooks/useGeolocation';
import CatMark from '../CatMark';
import GrayLogo from '@/assets/images/logo_gray.svg';
import { Loading } from '@/(home)/loading';

interface ListViewerProps {
  catMark: boolean;
  selectedFilter: SelectedFilterState;
  setCatMark: () => void;
  setSelectedFilter: (value: SelectedFilterState) => void;
}
const ListViewer = ({
  catMark,
  selectedFilter,
  setCatMark,
  setSelectedFilter,
}: ListViewerProps) => {
  const [page, setPage] = useState(1);
  const [observerRef, inView] = useInView();
  const currentLocation = useGeolocation();

  const { data, isLoading, isFetching } = useCardContents({
    position: currentLocation.position,
    follow: catMark,
  });

  const contentsData = useMemo(() => {
    const result = data
      ? data.pages.flatMap((list: any, idx) => (idx !== 1 ? list.items : []))
      : [];

    if (selectedFilter.id === 'popularity') {
      const filteredItems = result.toSorted(
        (a: any, b: any) => b.countOfFollowed - a.countOfFollowed,
      );
      return filteredItems;
    }
    return result;
  }, [data, selectedFilter.id]);

  console.log('🚀 ~ contentsData ~ contentsData:', contentsData);

  useEffect(() => {
    if (inView && isLoading && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isLoading, isFetching]);

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
    <div className='h-[calc(100%-142px)] flex flex-col'>
      <div className='px-6'>
        <h2 className='text-black heading2 pb-4'>우리 동네 이냥저냥이</h2>
        <div className='flex gap-[6px] pb-4'>
          <SelectFilter
            selectedFilter={selectedFilter}
            setSelectedFilter={(value) => setSelectedFilter(value)}
          />

          <CatMark isChecked={catMark} onClick={() => setCatMark()} />
        </div>
      </div>
      <div className='overflow-y-scroll layout flex-grow flex flex-col gap-2 px-6'>
        {renderedComponent}
        {isLoading ? (
          <Loading />
        ) : (
          <div className='pt-16 pb-10 w-full flex justify-center'>
            <GrayLogo />
          </div>
        )}
        <div ref={observerRef}></div>
      </div>
    </div>
  );
};

export default ListViewer;
