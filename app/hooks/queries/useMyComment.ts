'use client';

import { getMyComment } from '@/apis/mypage';
import { useInfiniteQuery } from 'react-query';

export const useMyComment = () => {
  return useInfiniteQuery({
    queryKey: [],
    queryFn: ({ pageParam = 1 }) => getMyComment({ pageParam, size: 5 }),
    getNextPageParam: (lastPage) => {
      return !lastPage.isLast ? lastPage.currentPage + 1 : undefined;
    },
  });
};
