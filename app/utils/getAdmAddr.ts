import admAddrData from '@/constants/admAddrData.json';
import createFuzzyMatcher from './createFuzzyMatcher';

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
const getAdmAddr = (search: string) => {
  /* 오탈자 반영 검색어 리턴 */
  const admAddrs = JSON.parse(JSON.stringify(admAddrData));

  if (search !== '') {
    const regex = createFuzzyMatcher(search);

    const searchList = admAddrs.filter((item: AdmAddrData) =>
      regex.test(item.fullAddr),
    );

    return searchList;
  }

  /* 정확히 같은 검색어만 리턴 */
  // return admAddrs.filter((item: AdmAddrData) => item.fullAddr.includes(search));
};

export default getAdmAddr;
