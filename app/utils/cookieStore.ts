'use server';
import { cookies } from 'next/headers';

export const getCookie = async (name: string) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);

  return cookie;
};

export const setCookie = async (
  name: string,
  value: string,
  options?: { maxAge: number },
) => {
  const cookieStore = cookies();
  cookieStore.set(name, value, { ...options });
};
