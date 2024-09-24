import { getContent, getComments, getComment } from '@/apis/contents';
import { GetContentParams, getCardContents, getMapContents } from '@/apis/map/getContents';
import { queryCardContentsKey, queryCommentsKey, queryContentKey, queryMapContentsKey } from '@/constants/queryKey';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useCardContents = (data: GetContentParams) => {
  return useInfiniteQuery(
    [queryCardContentsKey, data.position, data.follow],
    ({ pageParam = 1 }) => getCardContents({ ...data, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return !lastPage?.isEnd ? nextPage : undefined;
      },
      staleTime: 1,
      keepPreviousData: true,
    },
  );
};

export const useMapContents = (data: GetContentParams) => {
  return useQuery([queryMapContentsKey, data.position, data.follow], () => getMapContents(data), { staleTime: 1 });
};

export const useContent = (contentId: string | null) => {
  return useQuery([queryContentKey, contentId], () => getContent(contentId), {
    staleTime: 1,
  });
};

export const useComments = (contentId: string | null) => {
  return useQuery([queryCommentsKey], () => getComments(contentId), {
    staleTime: 1,
  });
};

export const useComment = (contentId: string | null, commentId: string | null) => {
  return useQuery([queryCommentsKey, contentId, commentId], () => getComment(contentId, commentId), {
    staleTime: 1,
  });
};
