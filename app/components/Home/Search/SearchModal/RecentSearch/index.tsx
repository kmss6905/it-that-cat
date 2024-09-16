import React, { Fragment } from 'react';
import IconRemoveSearch from '@/assets/images/search/icon-removeSearch.svg';
import { QueryState } from '..';

const RecentSearch = ({
  recentSearch,
  setRecentSearch,
  setSearch,
  setQuery,
}: {
  recentSearch: string[] | null;
  setRecentSearch: React.Dispatch<React.SetStateAction<string[] | null>>;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
  setQuery: React.Dispatch<React.SetStateAction<QueryState>>;
}) => {
  const handleRemoveRecentSearch = (type: 'ALL' | 'PARTIAL', list?: string) => {
    if (type === 'ALL') {
      sessionStorage.removeItem('recentSearch');
      setRecentSearch([]);
    } else {
      const removeList = recentSearch?.filter((item) => item !== list);
      removeList && setRecentSearch(removeList);
      sessionStorage.setItem('recentSearch', JSON.stringify(removeList));
    }
  };

  return (
    <Fragment>
      {recentSearch && (
        <ul className='px-6 py-5 flex flex-col gap-1 h-[calc(100%-128px)] overflow-y-scroll layout'>
          {recentSearch.length > 0 ? (
            <>
              <li className='flex justify-between items-center pt-5 pb-3'>
                <h3 className='subHeading text-gray-500'>최근 검색</h3>
                <button
                  className='caption text-gray-300'
                  onClick={() => handleRemoveRecentSearch('ALL')}
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
                      setQuery((prev) => ({ ...prev, key: list }));
                      setSearch(list);
                    }}
                  >
                    {list}
                  </button>
                  <button
                    onClick={() => handleRemoveRecentSearch('PARTIAL', list)}
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
    </Fragment>
  );
};

export default RecentSearch;
