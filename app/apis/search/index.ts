'use server';
import fetchApi from '../fetchApi';

const getAccessToken = async () => {
  const key = {
    consumer_key: `${process.env.NEXT_PUBLIC_SGIS_API_ID}`,
    consumer_secret: `${process.env.NEXT_PUBLIC_SGIS_API_KEY}`,
  };
  const url = `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${key.consumer_key}&consumer_secret=${key.consumer_secret}`;

  return (await fetchApi(url, 'GET')).result.accessToken;
};

export const getStepByStepAdress = async () => {
  const accessToken = await getAccessToken();
  console.log('🚀 ~ getStepByStepAdress ~ accessToken:', accessToken);

  const url = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${accessToken}&cd=12345`;

  return (await fetchApi(url, 'GET')).result;
};
