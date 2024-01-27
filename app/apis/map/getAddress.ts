import { Coordinates } from '@/hooks/useGeolocation';

export interface RegionState {
  city: string;
  gu: string;
  dong: string;
}

const getAddress = async (position: Coordinates) => {
  let result: null | RegionState = null;

  const URL = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${position.longitude}&y=${position.latitude}`;

  try {
    const response: Response = await fetch(URL, {
      headers: {
        Authorization: 'KakaoAK ' + process.env.NEXT_PUBLIC_KAKAO_API_KEY,
      },
    });
    const data = await response.json();

    result = {
      city: data.documents[0].address.region_1depth_name,
      gu: data.documents[0].address.region_2depth_name,
      dong: data.documents[0].address.region_3depth_name,
    };
  } catch (err) {
    console.log(err);
  }
  if (result) return result;
};

export default getAddress;
