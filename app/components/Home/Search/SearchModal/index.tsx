import React, { useState } from 'react';
import IconBack from '@/assets/images/icon_back_black.svg';
import IconGraySearch from '@/assets/images/icon_graySearch.svg';
import IconGraySearchM from '@/assets/images/icon_graySearchM.svg';
import IconRemoveValue from '@/assets/images/Icon_removeValue.svg';
import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';
import useDebounceFunction from '@/hooks/utils/useDebounceFunction';
import { highlight } from '@/utils/highlight';
import getAdmAddr, { AdmAddrData } from '@/utils/getAdmAddr';

export interface QueryState {
  key: string;
  data: AdmAddrData[];
}

export interface SearchState {
  admAddr: AdmAddrData;
  data: AdmAddrData[] | null;
}

const SearchModal = () => {
  const { closeModal } = useModal();

  const [query, setQuery] = useState<QueryState>({ key: '', data: [] });
  const [search, setSearch] = useState<SearchState>({
    admAddr: {
      sidoCode: 0,
      sidoName: '',
      guCode: 0,
      siGunGuName: '',
      dongCode: 0,
      dongName: '',
      fullAddr: '',
    },
    data: null,
  });

  const getPlaceList = async (search: string) => {
    const response = await getAdmAddr(search);
    response && setQuery((prev) => ({ ...prev, data: response }));
  };

  const setDebouncePlaceList = useDebounceFunction(getPlaceList, 300);

  const handleChangeSearchValue = (value: string) => {
    setQuery((prev) => ({ ...prev, key: value }));
    setDebouncePlaceList(value);
  };

  return (
    <Modal type={MODAL_TYPE.SEARCH} variant={MODAL_VARIANT.ALL}>
      <div className='w-full h-full bg-white z-30 relative'>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`w-full pl-5 pr-6 pb-10px pt-18px flex justify-between items-center gap-3`}
        >
          <div onClick={() => closeModal()} className='cursor-pointer'>
            <IconBack />
          </div>

          <div className={`searchbar flex-grow px-3 py-10px bg-gray-50`}>
            <IconGraySearch />
            <input
              type='text'
              value={query.key}
              onChange={(e) => handleChangeSearchValue(e.target.value)}
              placeholder='지역, 동네명, 주소 검색'
              className='flex-grow body1 bg-transparent
              placeholder:text-gray-300 caret-primary-500'
            />
            {query.key !== '' && (
              <div
                className='cursor-pointer'
                onClick={() => setQuery((prev) => ({ ...prev, key: '' }))}
              >
                <IconRemoveValue />
              </div>
            )}
          </div>
        </form>

        {/* 검색어 추천 */}
        {query.key !== '' && query.data?.length > 0 && search.data === null ? (
          <ul className='px-6 py-5 flex flex-col gap-1'>
            {query.data.map((place) => (
              <li
                key={place.fullAddr}
                onClick={() => {
                  setSearch({
                    admAddr: place,
                    data: [],
                  });
                  setQuery((prev) => ({ ...prev, key: place.fullAddr }));
                }}
                className='flex justify-between items-center gap-[10px] text-gray-500 cursor-pointer'
              >
                <IconGraySearchM />
                <span className='flex-grow py-[3px]'>
                  {highlight(query.key, place.fullAddr)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Modal>
  );
};

export default SearchModal;
