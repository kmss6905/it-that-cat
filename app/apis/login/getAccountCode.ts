export const getAccountCode = async (provider: string) => {
  let result;
  const redirectUri = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${provider}/oauth-uri?redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/auth/${provider}`;
  const devUri = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${provider}/oauth-uri?redirect_uri=${process.env.NEXT_PUBLIC_DEV_KAKAO_REDIRECT_URI}/auth/${provider}`;

  const uri = process.env.NODE_ENV === 'production' ? redirectUri : devUri;

  try {
    await fetch(uri, {
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
