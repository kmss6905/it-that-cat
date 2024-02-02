import { Coordinates } from '@/hooks/useGeolocation';

export interface GetContentParams {
  position: Coordinates | null;
  size?: number | undefined;
  distance?: 'desc' | 'asc';
  follow: boolean;
  page?: number;
}

export const getMapContents = async ({
  position,
  distance = 'asc',
  page = 1,
  follow,
}: GetContentParams) => {
  console.log('🚀 ~ follow:', follow);
  let result;

  const lat = position !== null ? position.lat : 37.574187;
  const lng = position !== null ? position.lng : 126.976882;
  const range = 10000000;

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/contents?page=${page}&size=1000&lat=${lat}&lon=${lng}&range=${range}&distance_order=${distance ? distance : 'asc'}&follow=${follow}`;

  const response = await fetch(url, { method: 'GET' });

  result = await response.json();

  if (result.result !== 'SUCCESS') {
    throw new Error('네트워크의 응답이 없습니다.');
  }
  return result.data;
};

export const getCardContents = async ({
  position,
  size = 10,
  distance = 'asc',
  page = 1,
  follow = false,
}: GetContentParams) => {
  let result;
  const lat = position !== null ? position.lat : 37.574187;
  const lng = position !== null ? position.lng : 126.976882;

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/contents?page=${page}&size=${size}&lat=${lat}&lon=${lng}&range=10000&distance_order=${distance}&follow=${follow}`;

  const response = await fetch(url, { method: 'GET' });

  result = await response.json();

  if (result.result !== 'SUCCESS') {
    throw new Error('네트워크의 응답이 없습니다.');
  }
  return result.data;
};
