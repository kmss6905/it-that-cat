import fetchApi from '../fetchApi';

export const updateNickname = async (nickname: string) => {
  const url = '/user/nickname';
  const data = { nickname: nickname };

  return await fetchApi(url, 'POST', data);
};

export const getNickname = async () => {
  const url = '/user/nickname';

  return (await fetchApi(url, 'GET')).data.nickname;
};
