import {
  GetContentParams,
  getCardContents,
  getMapContents,
} from '@/apis/map/getContents';
import {
  queryCardContentsKey,
  queryMapContentsKey,
} from '@/constants/queryKey';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useCardContents = (data: GetContentParams) => {
  return useInfiniteQuery(queryCardContentsKey, () => getCardContents(data), {
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });
};

export const useMapContents = (data: GetContentParams) => {
  return useQuery(queryMapContentsKey, () => getMapContents(data));
};
