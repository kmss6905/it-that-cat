import { Coordinates } from '@/hooks/useGeolocation';

export interface RegionState {
  depth1: string;
  depth2: string;
  depth3: string;
}

const getAddress = async (position: Coordinates) => {
  const URL = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${position.longitude}&y=${position.latitude}`;

  try {
    const response: Response = await fetch(URL, {
      headers: {
        Authorization: 'KakaoAK ' + process.env.NEXT_PUBLIC_KAKAO_API_KEY,
      },
    });
    const data = await response.json();

    if (data) {
      return {
        depth1: data.documents[0].address.region_1depth_name,
        depth2: data.documents[0].address.region_2depth_name,
        depth3: data.documents[0].address.region_3depth_name,
      };
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

export default getAddress;
