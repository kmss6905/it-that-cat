export const getAccountCode = async (provider: string) => {
  let result;
  const uri = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${provider}/oauth-uri?redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/auth/${provider}`;
  const devUri = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${provider}/oauth-uri?redirect_uri=${process.env.NEXT_PUBLIC_DEV_KAKAO_REDIRECT_URI}/auth/${provider}`;

  const redirectUri = process.env.NODE_ENV === 'production' ? uri : devUri;

  try {
    await fetch(redirectUri, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    }).then(async (res) => {
      const { data } = await res.json();
      result = data.oauthUri;
    });
  } catch (error) {
    console.log('🚀 ~ getAccountCode ~ error:', error);
  }
  if (result) return result;
};
