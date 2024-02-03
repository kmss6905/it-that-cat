'use server';
import { RegisterCatObjProps } from '@/types/content';
import { cookies } from 'next/headers';

const postContent = async (data: RegisterCatObjProps) => {
  const cookieStore = cookies();
  const accseeToken = cookieStore.get('accessToken');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/contents`,
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
    console.log('🚀 ~ postContent ~ error:', error);
    return error;
  }
};

export default postContent;
