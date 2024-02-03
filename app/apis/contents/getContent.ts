export const getContent = async (contentId: string | null) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/contents/${contentId}`;

  const response = await fetch(url, { method: 'GET' });

  const result = await response.json();

  if (result.result !== 'SUCCESS') {
    throw new Error('네트워크의 응답이 없습니다.');
  }
  return result.data;
};
