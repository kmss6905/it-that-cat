'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
interface SaveTokenProps {
  accessToken: string;
  refreshToken: string;
  nickname: string | null;
}
const saveToken = (data: SaveTokenProps) => {
  const cookieStore = cookies();
  cookieStore.set('accessToken', data.accessToken);
  cookieStore.set('refreshToken', data.refreshToken);
  if (data.nickname) {
    cookieStore.set('nickname', data.nickname);
    redirect('/');
  }
  redirect('/login/nickname');
};

export default saveToken;
