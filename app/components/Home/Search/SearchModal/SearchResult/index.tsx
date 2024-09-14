import React, { Fragment, useMemo } from 'react';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useSearch } from '@/hooks/queries/useSearch';
import useGeolocation from '@/hooks/useGeolocation';
import SearchResultCard from '../SearchResultCard';
import { useModal } from '@/hooks/useModal';
import { Loading } from '@/(home)/loading';

interface SearchResultProps {
  search: string | null;
}

const SearchResult = ({ search }: SearchResultProps) => {
  const { closeModal } = useModal();
  const { position } = useGeolocation();

  const { data, hasNextPage, isSuccess, isFetching, fetchNextPage } = useSearch(
    position,
    search,
  );

  const target = useIntersectionObserver((entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const result = useMemo(() => {
    if (data) {
      const searchResult = data.pages.flatMap((list) =>
        list ? list.items : [],
      );

      return searchResult;
    }
    return null;
  }, [data]);

  if (isSuccess && (result?.length === 0 || !result))
    return (
      <div className='py-16 text-center'>
        <h3 className='body2 text-gray-400 pb-1'>
          <span className='subHeading2 text-primary-500'>'{search}'</span>에
          등록된 냥이가 없습니다.
        </h3>
        <p className='caption text-gray-300'>
          직접 등록하거나 주변의 다른 동네를 검색해보세요!
        </p>
      </div>
    );

  return (
    <Fragment>
      <h3 className='subHeading text-gray-500 px-6 pt-5 pb-3'>검색 결과</h3>
      <ul className='px-6 h-[calc(100%-128px)] overflow-y-scroll layout'>
        {isSuccess ? (
          result &&
          result.map((result) => (
            <li key={result?.contentId} onClick={() => closeModal()}>
              <SearchResultCard result={result} />
            </li>
          ))
        ) : (
          <Loading />
        )}
        <div ref={target} />
      </ul>
    </Fragment>
  );
};

export default SearchResult;
