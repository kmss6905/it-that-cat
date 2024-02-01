'use server';
import { cookies } from 'next/headers';

const handleUpdatedNickname = async (nickname: string) => {
  const cookieStore = cookies();

  const accseeToken = cookieStore.get('accessToken');
  console.log('🚀 ~ handleUpdatedNickname ~ accseeToken:', accseeToken);

  let result;

  const data = { nickname: nickname };

  try {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/nickname`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${accseeToken?.value}`,
      },
    }).then(async (response) => {
      const data = await response.json();
      cookieStore.set('nickname', data.data.nickname);
      result = data;
    });

    if (result) return result;
  } catch (error) {
    console.log('🚀 ~ handleVaildCheckNickname ~ error:', error);
  }
};

export default handleUpdatedNickname;
