import admAddrData from '@/constants/admAddrData.json';
import createFuzzyMatcher from './createFuzzyMatcher';
import { getSearchAddress } from '@/apis/search';

export interface AdmAddrData {
  sidoCode: number;
  sidoName: string;
  guCode: number;
  siGunGuName: string;
  dongCode: number;
  dongName: string;
  fullAddr: string;
}

/**
 * 검색어에 부합하는 행정 주소 리스트 반환 함수
 * @param {string} search 입력된 검색어
 * @return {AdmAddrData[]} 행정 주소 리스트 반환
 */
const getAdmAddr = async (search: string) => {
  let addrList: AdmAddrData[] = [];
  /* 오탈자 반영 검색어 리턴 */
  const response = await getSearchAddress();

  if (response) {
    addrList.push(...response);
  }

  // const admAddrs = JSON.parse(JSON.stringify(admAddrData));

  if (search !== '') {
    const regex = createFuzzyMatcher(search);

    const searchList = addrList.filter((item: AdmAddrData) =>
      regex.test(item.fullAddr),
    );

    return searchList;
  }

  /* 정확히 같은 검색어만 리턴 */
  // return admAddrs.filter((item: AdmAddrData) => item.fullAddr.includes(search));
};

export default getAdmAddr;
