'use server';

import { cookies } from 'next/headers';

const getToken = async (code: string) => {
  const cookieStore = cookies();
  const provider = cookieStore.get('provider');

  const data = {
    code: code,
    redirectUri: `http://localhost:3000/login/nickname`,
  };

  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${provider}/token`,
      {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(data),
      },
    ).then((res) => {
      console.log('🚀 ~ ).then ~ res:', res);
    });

    // console.log('🚀 ~ getToken ~ response:', response);
    // response = await JSON.parse(response);
  } catch (error) {
    console.log('🚀 ~ getToken ~ error:', error);
  }
};

export default getToken;
