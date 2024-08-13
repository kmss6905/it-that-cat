import { ResType } from '@/types/api';
import { notFound } from 'next/navigation';
import { UseQueryResult } from 'react-query';

/**
 * useQuery 에서 데이터 fetching 실패 시 notFound 화면으로 이동
 */
const useNotFound = <T>({
  data,
  refetch,
  isSuccess,
}: UseQueryResult<ResType<T>> & { data?: ResType<T> }): {
  data: T;
  refetch: () => void;
  isSuccess: boolean;
} => {
  if (data?.result === 'ERROR') {
    notFound();
  }

  return { data: data?.data as T, refetch, isSuccess };
};

export default useNotFound;
