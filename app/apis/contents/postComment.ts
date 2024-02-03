'use server';
import { RegisterCatObjProps } from '@/types/content';
import { cookies } from 'next/headers';

export interface commentProps {
  commentImageUris: string[];
  commentDesc: string;
}

const postComment = async (contentId: string | null, data: commentProps) => {
  const cookieStore = cookies();
  const accseeToken = cookieStore.get('accessToken');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/contents/${contentId}/comments`,
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
    console.log('🚀 ~ postComment ~ error:', error);
    return error;
  }
};

export default postComment;
