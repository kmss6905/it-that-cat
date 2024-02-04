'use server';
import { cookies } from 'next/headers';

export interface catFollowId {
  contentId: string;
}

const postFollow = async (data: catFollowId) => {
  const cookieStore = cookies();
  const accseeToken = cookieStore.get('accessToken');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/contents/follow`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + `${accseeToken?.value}`,
        },
      },
    );
    return await response.json();
  } catch (error) {
    console.log('🚀 ~ postFollow ~ error:', error);
    return error;
  }
};

export default postFollow;
