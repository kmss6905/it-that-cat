const handleValidCheckNickname = async (nickname: string) => {
  let result;
  const data = { nickname: nickname };
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/nickname/available-check`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      },
    ).then(async (response) => {
      const data = await response.json();
      result = data;
    });

    if (result) return result;
  } catch (error) {
    console.log('🚀 ~ handleVaildCheckNickname ~ error:', error);
  }
};

export default handleValidCheckNickname;
