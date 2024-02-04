'use server';
import { cookies } from 'next/headers';

export interface commentLikeId {
  commentId: string;
}

const postLike = async (data: commentLikeId, contentId: string) => {
  const cookieStore = cookies();
  const accseeToken = cookieStore.get('accessToken');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/contents/${contentId}/comments/likes`,
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
    console.log('🚀 ~ postLike ~ error:', error);
    return error;
  }
};

export default postLike;
