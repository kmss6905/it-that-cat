'use server';
import { cookies } from 'next/headers';

export const getComments = async (contentId: string | null) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/contents/${contentId}/comments?sort=likes:desc&page=1&size=1000&created_at=desc`;
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
    console.log('🚀 ~ getComments ~ error:', error);
    return error;
  }
};
