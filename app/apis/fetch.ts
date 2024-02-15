'use server';
import { cookies } from 'next/headers';
import returnFetch from 'return-fetch';

const cookieStore = cookies();
const accessToken = cookieStore.get('accessToken');

/**
 * baseUrl, headers 추가하여 확장된 fetch
 */
const fetchExtended = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + `${accessToken?.value}`,
  },
});

export default fetchExtended;
