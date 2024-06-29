import { getCookie } from '@/utils/cookieStore';
import fetchExtended from './fetch'; // 새롭게 만든 fetchExtended 파일을 import

/**
 * @param url
 * @param method
 * @param data
 */
const fetchApi = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: T,
) => {
  const accessToken = await getCookie('accessToken');

  try {
    const response = await fetchExtended(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${accessToken?.value}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(`🚀 ~ fetchApi url: ${url}, error: ${error}`);
    return error;
  }
};

export default fetchApi;
