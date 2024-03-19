'use server';
import fetchApi from '../fetchApi';
import { cookies } from 'next/headers';
import { SaveTokenProps } from '@/types/api';
import { redirect } from 'next/navigation';
import { accessTime, refreshTime } from '@/constants/tokenExpires';

export const getAccountCode = async (provider: string) => {
  const redirectUri = `/auth/${provider}/oauth-uri?redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/auth/${provider}`;
  const devUri = `/auth/${provider}/oauth-uri?redirect_uri=${process.env.NEXT_PUBLIC_DEV_KAKAO_REDIRECT_URI}/auth/${provider}`;
  const uri = process.env.NODE_ENV === 'production' ? redirectUri : devUri;
  return (await fetchApi(uri, 'GET')).data.oauthUri;
};

export const getToken = async (code: string, provider: string) => {
  const url = `/auth/${provider}/token`;

  const redirectUri = `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/auth/${provider}`;
  const devRedirectUri = `${process.env.NEXT_PUBLIC_DEV_KAKAO_REDIRECT_URI}/auth/${provider}`;

  const uri =
    process.env.NODE_ENV === 'production' ? redirectUri : devRedirectUri;

  const data = {
    code: code,
    redirectUri: uri,
  };

  return await fetchApi(url, 'POST', data);
};

export const reissueToken = async () => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const url = `/auth/issue/access-token?refresh_token=${refreshToken?.value}`;

  if (refreshToken && !accessToken) {
    const newAccessToken = (await fetchApi(url, 'GET')).data
      .accessToken as string;
    cookieStore.set('accessToken', newAccessToken, { expires: accessTime });
  }
};

export const saveToken = (data: SaveTokenProps) => {
  const cookieStore = cookies();

  cookieStore.set('accessToken', data.accessToken, {
    expires: accessTime,
  });

  cookieStore.set('refreshToken', data.refreshToken, {
    expires: refreshTime,
  });

  if (data.nickname) {
    cookieStore.set('nickname', data.nickname);
    return redirect('/');
  }
  return redirect('/login/nickname');
};

export const postNickname = async (nickname: string) => {
  const url = '/user/nickname';
  const data = { nickname: nickname };

  return await fetchApi(url, 'POST', data);
};

export const postValidNickname = async (nickname: string) => {
  const url = '/user/nickname/available-check';
  const data = { nickname: nickname };

  return await fetchApi(url, 'POST', data);
};
