'use client';

import IconSearch from '@/assets/images/icon_search.svg';
import { MODAL_TYPE } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';

export interface SearchBarProps {
  viewer: 'map' | 'list';
}

const SearchBar = ({ viewer }: SearchBarProps) => {
  const { openModal } = useModal();

  return (
    <div
      className={`w-full px-6 pb-6 ${viewer === 'map' ? 'absolute z-10' : ''}`}
      onClick={() => openModal(MODAL_TYPE.SEARCH)}
    >
      <div
        className={`searchbar bg-white cursor-pointer px-3 py-10px mt-12 ${viewer === 'map' ? 'shadow-[0_2px_6px_0px_rgba(0,0,0,0.12)]' : 'border border-gray-100'}`}
      >
        <IconSearch />
        <div className='flex-grow body1 text-gray-300'>
          지역, 동네명, 주소 검색
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
