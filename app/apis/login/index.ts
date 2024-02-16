'use server';
import fetchApi from '../fetchApi';
import { cookies } from 'next/headers';
import { SaveTokenProps } from '@/types/api';
import { redirect } from 'next/navigation';

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

export const saveToken = (data: SaveTokenProps) => {
  const cookieStore = cookies();
  cookieStore.set('accessToken', data.accessToken);
  cookieStore.set('refreshToken', data.refreshToken);

  if (data.nickname) {
    cookieStore.set('nickname', data.nickname);
    return redirect('/');
  }
  return redirect('/login/nickname');
};

export const handleUpdatedNickname = async (nickname: string) => {
  const url = '/user/nickname';
  const data = { nickname: nickname };

  return await fetchApi(url, 'POST', data);
};

export const handleValidCheckNickname = async (nickname: string) => {
  const url = '/user/nickname/available-check';
  const data = { nickname: nickname };

  return await fetchApi(url, 'POST', data);
};
