'use server';
import { cookies } from 'next/headers';
import returnFetch from 'return-fetch';

const cookieStore = cookies();
const accessToken = cookieStore.get('accessToken');

const base =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : process.env.NEXT_PUBLIC_DEV_SERVER_URL;
/**
 * baseUrl, headers 추가하여 확장된 fetch
 */
const fetchExtended = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + `${accessToken?.value}`,
  },
});

export default fetchExtended;
