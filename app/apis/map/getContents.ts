'use server';
import { Coordinates } from '@/types/address';
import { cookies } from 'next/headers';

export interface GetContentParams {
  position: Coordinates | null;
  size?: number | undefined;
  distance?: 'desc' | 'asc';
  follow: boolean;
  pageParam?: number;
}

export const getMapContents = async ({
  position,
  distance = 'asc',
  pageParam = 1,
  follow,
}: GetContentParams) => {
  const accessToken = cookies().get('accessToken');

  let result;

  const lat = position !== null ? position.lat : 37.574187;
  const lng = position !== null ? position.lng : 126.976882;
  const range = 100000000;

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/contents?page=${pageParam}&size=1000&lat=${lat}&lng=${lng}&range=${range}&distance_order=${distance ? distance : 'asc'}&follow=${follow}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + `${accessToken}` },
  });

  result = await response.json();

  if (result.result !== 'SUCCESS') {
    throw new Error('네트워크의 응답이 없습니다.');
  }
  return result.data;
};

export const getCardContents = async ({
  position,
  size = 100,
  distance = 'asc',
  pageParam,
  follow = false,
}: GetContentParams) => {
  const accessToken = cookies().get('accessToken');

  let result;
  const lat = position !== null ? position.lat : 37.574187;
  const lng = position !== null ? position.lng : 126.976882;

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/contents?page=${pageParam}&size=${size}&lat=${lat}&lng=${lng}&range=1000&distance_order=${distance}&follow=${follow}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + `${accessToken}` },
  });

  result = await response.json();

  if (result.result !== 'SUCCESS') {
    throw new Error('네트워크의 응답이 없습니다.');
  }
  return result.data;
};
