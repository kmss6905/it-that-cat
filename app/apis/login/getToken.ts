const getToken = async (code: string, provider: string) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${provider}/token`;

  const data = {
    code: code,
    redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/auth/${provider}`,
  };

  let result;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    result = await res.json();
  } catch (error) {
    console.log('🚀 ~ getToken ~ error:', error);
  }
  if (result) return result;
  return null;
};

export default getToken;
