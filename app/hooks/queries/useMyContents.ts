'use client';
import { getMyContents } from '@/apis/mypage';
import { useInfiniteQuery } from 'react-query';

export const useMyContents = () => {
  return useInfiniteQuery({
    queryKey: [],
    queryFn: ({ pageParam = 1 }) => getMyContents({ pageParam, size: 10 }),
    getNextPageParam: (lastPage) => {
      return !lastPage.isEnd ? lastPage.currentPage + 1 : undefined;
    },
  });
};
