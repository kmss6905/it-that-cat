import { Coordinates } from '@/hooks/useGeolocation';

export interface RegionState {
  addrName: string;
  sido: string;
  sigungu: string;
  dong: string;
  mainAddrNo: string;
  subAddrNo: string;
}

const getAddress = async (position: Coordinates) => {
  const URL = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${position.lng}&y=${position.lat}`;

  try {
    const response: Response = await fetch(URL, {
      headers: {
        Authorization: 'KakaoAK ' + process.env.NEXT_PUBLIC_KAKAO_API_KEY,
      },
    });
    const data = await response.json();
    const address = data.documents[0].address;

    const result = {
      addrName: address.address_name,
      mainAddrNo: address.address_no,
      sido: address.region_1depth_name,
      sigungu: address.region_2depth_name,
      dong: address.region_3depth_name,
      subAddrNo: address.sub_address_no,
    };
    if (data) {
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

export default getAddress;
