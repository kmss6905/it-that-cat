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

const getAccessToken = async () => {
  const key = {
    consumer_key: `${process.env.NEXT_PUBLIC_SGIS_API_ID}`,
    consumer_secret: `${process.env.NEXT_PUBLIC_SGIS_API_KEY}`,
  };
  const url = `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${key.consumer_key}&consumer_secret=${key.consumer_secret}`;

  return (await fetchApi(url, 'GET')).result.accessToken;
};

export const getStepByStepAdress = async () => {
  const accessToken = await getAccessToken();

  const url = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${accessToken}&cd=12345`;

  return (await fetchApi(url, 'GET')).result;
};

export const getSearchAddress = async () => {
  return (await fetchApi('/addr', 'GET')).data;
};

export const getSearch = async ({
  position,
  search,
  page = 1,
  size = 15,
}: SearchProps) => {
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
