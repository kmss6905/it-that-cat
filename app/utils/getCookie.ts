'use server';
import { cookies } from 'next/headers';

const getCookie = async (name: string) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);

  return cookie;
};

export const setCookie = async (data: { name: string; value: string }) => {
  const cookieStore = cookies();
  cookieStore.set(data.name, data.value);
};

export default getCookie;
