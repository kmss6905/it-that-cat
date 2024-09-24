'use client';
import { useRef, useState } from 'react';
import IconDropdown from '@/assets/images/icon_dropdown.svg';

export interface SelectedFilterState {
  id: string;
  content: string;
}

interface SelectedFilterProps {
  selectedFilter: SelectedFilterState;
  setSelectedFilter: (value: SelectedFilterState) => void;
}

export const options = [
  { id: 'asc', content: '거리순' },
  { id: 'popularity', content: '인기순' },
];

const SelectFilter = ({ selectedFilter, setSelectedFilter }: SelectedFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickFilter = (id: SelectedFilterState) => {
    setSelectedFilter(id);
    setIsOpen(false);
  };
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutsideFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref || ref.current === e.target) {
      setIsOpen(false);
    }
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`filter ${isOpen ? 'rounded-t-md border border-b-0' : 'rounded-md border'}`}
      >
        {selectedFilter.content}
        <span className={`rotate-0 transition-transform ${isOpen ? 'rotate-180 transition-transform' : ''}`}>
          <IconDropdown />
        </span>
      </button>
    );

  return (
    <div className={`mapFilter`} ref={ref} onClick={(e) => handleClickOutsideFilter(e)}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${isOpen ? 'rounded-t-md border border-b-0' : 'rounded-md border'}`}
      >
        {selectedFilter.content}
        <IconDropdown className={`${isOpen ? 'rotate-180 transition-transform' : 'rotate-0 transition-transform'}`} />
      </button>

      {isOpen && (
        <ul className='absolute'>
          {options
            .filter((items) => items.id !== selectedFilter.id)
            .map((items) => (
              <li key={items.id} onClick={() => handleClickFilter(items)}>
                {items.content}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SelectFilter;
