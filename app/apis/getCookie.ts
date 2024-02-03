'use server';
import { cookies } from 'next/headers';

const getCookies = (key: string) => {
  const cookieStore = cookies();
  const data = cookieStore.has(key);

  return data;
};

export default getCookies;
