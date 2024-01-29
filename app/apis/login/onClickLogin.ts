export const handleClickLogin = async (type: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${type}/signin`,
      {
        mode: 'no-cors',
        headers: { 'Access-Control-Allow-Credentials': 'true' },
      },
    );
    const data = await response.json();
    console.log('🚀 ~ handleClickLogin ~ data:', data);
  } catch (error) {
    console.log('handleClickLogin : ' + error);
  }
};
