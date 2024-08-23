import React, { FormEvent, useEffect, useMemo, useState } from 'react';

import IconBack from '@/assets/images/icon_back_black.svg';
import IconGraySearch from '@/assets/images/icon_graySearch.svg';
import IconGraySearchM from '@/assets/images/icon_graySearchM.svg';
import IconRemoveValue from '@/assets/images/Icon_removeValue.svg';
import IconRemoveSearch from '@/assets/images/search/icon-removeSearch.svg';
import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/Modal';
import { highlight } from '@/utils/highlight';
import getAdmAddr, { AdmAddrData } from '@/utils/getAdmAddr';
import { useModal } from '@/hooks/useModal';
import useDebounceFunction from '@/hooks/utils/useDebounceFunction';
import useGeolocation from '@/hooks/useGeolocation';
import { useSearch } from '@/hooks/queries/useSearch';
import SearchResultCard from './SearchResultCard';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export interface QueryState {
  key: string;
  data: AdmAddrData[];
}

const SearchModal = () => {
  const { closeModal } = useModal();
  const { position } = useGeolocation();

  const [query, setQuery] = useState<QueryState>({ key: '', data: [] });
  const [search, setSearch] = useState<string | null>(null);
  const [recentSearch, setRecentSearch] = useState<string[] | null>(null);

  useEffect(() => {
    const strRecentSearch = sessionStorage.getItem('recentSearch');
    const recentSearchList = strRecentSearch ? JSON.parse(strRecentSearch) : [];

    setRecentSearch(recentSearchList);
  }, []);

  const getPlaceList = async (search: string) => {
    const response = await getAdmAddr(search);
    response && setQuery((prev) => ({ ...prev, data: response }));
  };

  const setDebouncePlaceList = useDebounceFunction(getPlaceList, 300);

  const handleChangeSearchValue = (value: string) => {
    setSearch(null);
    setQuery((prev) => ({ ...prev, key: value }));
    setDebouncePlaceList(value);
  };

  const { data, hasNextPage, isFetching, fetchNextPage } = useSearch(
    position,
    search,
  );

  const target = useIntersectionObserver((entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(query.key);

    const updateRecentSearch = recentSearch
      ? [...recentSearch, query.key]
      : [query.key];
    setRecentSearch(updateRecentSearch);
    sessionStorage.setItem('recentSearch', JSON.stringify(updateRecentSearch));
  };

  const result = useMemo(() => {
    if (data) {
      const searchResult = data.pages.flatMap((list) =>
        list ? list.items : [],
      );

      return searchResult;
    }
    return null;
  }, [data]);

  return (
    <Modal type={MODAL_TYPE.SEARCH} variant={MODAL_VARIANT.ALL}>
      <div className='w-full h-full bg-white'>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={`w-full pl-5 pr-6 pb-10px pt-18px flex justify-between items-center gap-3`}
        >
          <div
            onClick={() => {
              closeModal();
              setSearch(null);
              setQuery({ data: [], key: '' });
            }}
            className='cursor-pointer'
          >
            <IconBack />
          </div>

          <div className={`searchbar flex-grow px-3 py-10px bg-gray-50`}>
            <IconGraySearch />
            <input
              type='text'
              value={query.key}
              onChange={(e) => handleChangeSearchValue(e.target.value)}
              placeholder='지역, 동네명, 주소 검색'
              className='flex-grow body1 bg-transparent
              placeholder:text-gray-300 caret-primary-500'
            />
            {query.key !== '' && (
              <div
                className='cursor-pointer'
                onClick={() => {
                  setQuery((prev) => ({ ...prev, key: '' }));
                  setSearch(null);
                }}
              >
                <IconRemoveValue />
              </div>
            )}
          </div>
        </form>

        {recentSearch && query.key === '' && search === null && (
          <ul className='px-6 py-5 flex flex-col gap-1 h-[calc(100%-128px)] overflow-y-scroll layout'>
            {recentSearch.length > 0 ? (
              <>
                <li className='flex justify-between items-center pt-5 pb-3'>
                  <h3 className='subHeading text-gray-500'>최근 검색</h3>
                  <button
                    className='caption text-gray-300'
                    onClick={() => {
                      sessionStorage.removeItem('recentSearch');
                      setRecentSearch([]);
                    }}
                  >
                    모두 지우기
                  </button>
                </li>
                {recentSearch.map((list) => (
                  <li
                    key={list}
                    className='flex gap-3 justify-between items-center py-2'
                  >
                    <button
                      className='body2 text-gray-500 flex-grow text-left'
                      onClick={() => {
                        setSearch(list);
                      }}
                    >
                      {list}
                    </button>
                    <button
                      onClick={() => {
                        const removeList = recentSearch.filter(
                          (item) => item !== list,
                        );
                        setRecentSearch(removeList);
                        sessionStorage.setItem(
                          'recentSearch',
                          JSON.stringify(removeList),
                        );
                      }}
                    >
                      <IconRemoveSearch />
                    </button>
                  </li>
                ))}
              </>
            ) : (
              <li className='py-[72px] text-center body2 text-gray-400'>
                최근 검색한 내역이 없습니다.
              </li>
            )}
          </ul>
        )}

        {/* 검색어 추천 */}
        {query.key !== '' && query.data?.length > 0 && search === null ? (
          <ul className='px-6 py-5 flex flex-col gap-1 h-[calc(100%-128px)] overflow-y-scroll layout'>
            {query.data.map((place) => (
              <li
                key={place.fullAddr}
                onClick={() => {
                  setSearch(place.fullAddr);
                  setQuery((prev) => ({ ...prev, key: place.fullAddr }));

                  const updateRecentSearch = recentSearch
                    ? [...recentSearch, place.fullAddr]
                    : [place.fullAddr];
                  setRecentSearch(updateRecentSearch);
                  sessionStorage.setItem(
                    'recentSearch',
                    JSON.stringify(updateRecentSearch),
                  );
                }}
                className='flex justify-between items-center gap-[10px] text-gray-500 cursor-pointer'
              >
                <IconGraySearchM />
                <span className='flex-grow py-[3px]'>
                  {highlight(query.key, place.fullAddr)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {result &&
          query.key !== '' &&
          (result.length > 0 ? (
            <>
              <h3 className='subHeading text-gray-500 px-6 pt-5 pb-3'>
                검색 결과
              </h3>
              <ul className='px-6 h-[calc(100%-128px)] overflow-y-scroll layout'>
                {result.map((result) => (
                  <li key={result?.contentId} onClick={() => closeModal()}>
                    <SearchResultCard result={result} />
                  </li>
                ))}
                <div ref={target} />
              </ul>
            </>
          ) : (
            /* 검색 결과가 없을 시 */
            <div className='py-16 text-center'>
              <h3 className='body2 text-gray-400 pb-1'>
                <span className='subHeading2 text-primary-500'>'{search}'</span>
                에 등록된 냥이가 없습니다.
              </h3>
              <p className='caption text-gray-300'>
                직접 등록하거나 주변의 다른 동네를 검색해보세요!
              </p>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default SearchModal;
