export const handleClickLogin = async (provider: string) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${provider}/signin`,
      {
        method: 'GET',
        mode: 'no-cors',
        headers: { 'Access-Control-Allow-Origin': 'true' },
      },
    ).then((res) => console.log('🚀 ~ handleClickLogin ~ res:', res));
  } catch (error) {
    console.log('handleClickLogin : ' + error);
  }
};
