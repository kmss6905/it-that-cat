import createFuzzyMatcher from './createFuzzyMatcher';
import { getSearchAddress } from '@/apis/search';

export interface AdmAddrData {
  id: number;
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

  if (search !== '') {
    const regex = createFuzzyMatcher(search);

    const searchList = addrList.filter((item: AdmAddrData) =>
      regex.test(item.fullAddr),
    );

    return searchList;
  }
};

export default getAdmAddr;
