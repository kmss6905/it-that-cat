'use server';
import { cookies } from 'next/headers';

export interface catFollowId {
  contentId: string;
}

const deleteFollow = async (data: catFollowId) => {
  const cookieStore = cookies();
  const accseeToken = cookieStore.get('accessToken');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/contents/follow`,
      {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + `${accseeToken?.value}`,
        },
      },
    );
    return await response.json();
  } catch (error) {
    console.log('🚀 ~ deleteFollow ~ error:', error);
    return error;
  }
};

export default deleteFollow;
