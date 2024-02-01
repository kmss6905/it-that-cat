'use client';
import { useEffect, useRef, useState } from 'react';
import IconDropdown from '@/assets/images/icon_dropdown.svg';

interface SelectedFilterState {
  id: string;
  content: string;
}

const SelectFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { id: 'distance', content: '거리순' },
    { id: 'popularity', content: '인기순' },
  ];

  const [selectedFilter, setSelectedFilter] = useState<SelectedFilterState>(
    options[0],
  );

  const handleClickFilter = (id: SelectedFilterState) => {
    setSelectedFilter(id);
    setIsOpen(false);
  };

  return (
    <ul className='mapFilter'>
      <li
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex gap-1 items-center px-3 py-2 bg-white rounded-md cursor-pointer'
      >
        <span>{selectedFilter.content}</span>
        <span
          className={`${isOpen ? 'rotate-180 transition-transform' : 'rotate-0 transition-transform'}`}
        >
          <IconDropdown />
        </span>
      </li>
      {isOpen &&
        options.map((items) => (
          <li
            key={items.id}
            onClick={() => handleClickFilter(items)}
            className='py-1 text-center hover:bg-gray-50 cursor-pointer'
          >
            {items.content}
          </li>
        ))}
    </ul>
  );
};

export default SelectFilter;
