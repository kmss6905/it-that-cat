export const getAccountCode = async (provider: string) => {
  let result;
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${provider}/oauth-uri?redirect_uri=http://localhost:3000/auth/${provider}`,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    ).then(async (res) => {
      const { data } = await res.json();
      result = data.oauthUri;
    });
  } catch (error) {
    console.log('handleClickLogin : ' + error);
  }
  if (result) return result;
};
