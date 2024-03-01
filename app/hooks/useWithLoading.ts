'use client';
import { useLoading } from '@/stores/loading/store';

export const useWithLoading = () => {
  const { onLoading, offLoading } = useLoading();

  const withLoading = async (func: any) => {
    try {
      onLoading();
      const result = await func();
      return result;
    } finally {
      offLoading();
    }
  };

  return { withLoading };
};
