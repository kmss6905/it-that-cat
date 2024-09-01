import { getCookie } from '@/utils/cookieStore';
import fetchApi from '../fetchApi';

export const updateNickname = async (nickname: string) => {
  const url = '/user/nickname';
  const data = { nickname: nickname };

  return await fetchApi(url, 'POST', data);
};

export const getNickname = async () => {
  const url = '/user/nickname';

  return (await fetchApi(url, 'GET')).data.nickname;
};

export const logout = async () => {
  const url = '/auth/logout';
  const refreshToken = (await getCookie('refreshToken'))?.value;

  return await fetchApi(url, 'POST', { refreshToken });
};

export const getMyContents = async ({ pageParam = 1, size = 15 }) => {
  const url = `/contents/me?page=${pageParam}&size=${size}`;
  return (await fetchApi(url, 'GET')).data;
};

export const getMyComment = async ({ pageParam = 1, size = 15 }) => {
  const url = `/comments/me?page=${pageParam}&size=${size}`;
  return (await fetchApi(url, 'GET')).data;
};

export const deleteUser = async (provider: string) => {
  const url = `/auth/${provider}/user`;
  return await fetchApi(url, 'DELETE');
};
