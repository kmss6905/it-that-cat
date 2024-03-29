import { Coordinates } from '@/types/address';
import fetchApi from '../fetchApi';

export interface GetContentParams {
  position: Coordinates | null;
  size?: number;
  distance?: 'desc' | 'asc';
  follow: boolean;
  pageParam?: number;
}

export const getMapContents = async ({
  position,
  pageParam = 1,
  follow,
}: GetContentParams) => {
  const lat = position !== null ? position.lat : 37.574187;
  const lng = position !== null ? position.lng : 126.976882;
  const range = 100000000;

  const url = `/contents?page=${pageParam}&size=1000&lat=${lat}&lng=${lng}&range=${range}&distance_order=asc&follow=${follow}`;

  return (await fetchApi(url, 'GET')).data;
};

export const getCardContents = async ({
  position,
  size = 10,
  pageParam,
  follow = false,
}: GetContentParams) => {
  const lat = position !== null ? position.lat : 37.574187;
  const lng = position !== null ? position.lng : 126.976882;

  const url = `/contents?page=${pageParam}&size=${size}&lat=${lat}&lng=${lng}&range=1000000&distance_order=asc&follow=${follow}`;

  console.log(
    "🚀 ~ (await fetchApi(url, 'GET')).data:",
    (await fetchApi(url, 'GET')).data,
  );
  return (await fetchApi(url, 'GET')).data;
};
