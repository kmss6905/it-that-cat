import React, { ChangeEvent, useState } from 'react';
import IconBack from '@/assets/images/icon_back.svg';
import IconGraySearch from '@/assets/images/icon_graySearch.svg';

const SearchModal = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    // <Modal type={MODAY_TYPE.SEARCH} variant={MODAL_VARIANT.ALL}>
    <div className='w-full h-full bg-white z-30 relative'>
      <form className={`w-full px-6 pb-6 flex justify-between`}>
        <IconBack />

        <div className={`searchbar px-3 py-10px mt-12 bg-gray-50`}>
          <IconGraySearch />
          <input
            type='text'
            value={searchValue}
            onChange={(e) => handleChangeSearchValue(e)}
            placeholder='지역, 동네명, 주소 검색'
            className='flex-grow body1 bg-transparent placeholder:text-gray-300'
          />
        </div>
      </form>
    </div>
    // </Modal>
  );
};

export default SearchModal;
