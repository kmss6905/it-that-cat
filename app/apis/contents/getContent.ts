'use server';

import { cookies } from 'next/headers';

export const getContent = async (contentId: string | null) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/contents/${contentId}`;
  const cookieStore = cookies();
  const accseeToken = cookieStore.get('accessToken');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${accseeToken?.value}`,
      },
    });

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.log('🚀 ~ getContent ~ error:', error);
    return error;
  }
};
