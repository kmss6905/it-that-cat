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

const SearchModal = () => {
  const { closeModal } = useModal();

  const [searchValue, setSearchValue] = useState('');
  const [placeList, setPlaceList] = useState<AdmAddrData[]>([]);

  const getPlaceList = (search: string) => {
    const response = getAdmAddr(search);
    setPlaceList(response);
  };

  const setDebouncePlaceList = useDebounceFunction(getPlaceList, 300);

  const handleChangeSearchValue = (value: string) => {
    setSearchValue(value);
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
              value={searchValue}
              onChange={(e) => handleChangeSearchValue(e.target.value)}
              placeholder='지역, 동네명, 주소 검색'
              className='flex-grow body1 bg-transparent
              placeholder:text-gray-300 caret-primary-500'
            />
            {searchValue !== '' && (
              <div
                className='cursor-pointer'
                onClick={() => setSearchValue('')}
              >
                <IconRemoveValue />
              </div>
            )}
          </div>
        </form>

        {searchValue !== '' && placeList?.length > 0 ? (
          <ul className='px-6 py-5 flex flex-col gap-1'>
            {placeList.map((place) => (
              <li
                key={place.fullAddr}
                className='flex justify-between items-center gap-[10px] text-gray-500 cursor-pointer'
              >
                <IconGraySearchM />
                <span className='flex-grow py-[3px]'>
                  {highlight(searchValue, place.fullAddr)}
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
