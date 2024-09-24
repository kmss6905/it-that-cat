'use server';
import { Coordinates } from '@/types/address';
import fetchApi from '../fetchApi';
import { SearchContentProps } from '@/types/content';

export interface SearchProps {
  position: Coordinates | null;
  search: string | null;
  page?: number;
  size?: number;
}

export const getSearchAddress = async () => {
  return (await fetchApi('/addr', 'GET')).data;
};

export const getSearch = async ({ position, search, page = 1, size = 15 }: SearchProps) => {
  if (!search) return;
  const lat = position !== null ? position.lat : 37.574187;
  const lng = position !== null ? position.lng : 126.976882;
  const range = 1000000;

  const url = `/contents?page=${page}&size=${size}&lat=${lat}&lng=${lng}&range=${range}&distance_order=asc&addr=${search}`;

  return (await fetchApi(url, 'GET')).data as {
    currentPage: number;
    items: SearchContentProps[];
    isEnd: boolean;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
};
