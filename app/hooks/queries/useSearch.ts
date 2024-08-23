'use client';
import { useInfiniteQuery } from 'react-query';

import { querySearchKey } from '@/constants/queryKey';
import { Coordinates } from '@/types/address';
import { getSearch } from '@/apis/search';

export const useSearch = (
  position: Coordinates | null,
  search: string | null,
) => {
  return useInfiniteQuery(
    [querySearchKey, search],
    ({ pageParam = 1 }) =>
      getSearch({ position, search, page: pageParam, size: 10 }),
    {
      enabled: search !== null,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return !lastPage?.isEnd ? nextPage : undefined;
      },
    },
  );
};
