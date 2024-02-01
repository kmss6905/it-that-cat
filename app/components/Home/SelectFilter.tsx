'use client';
import { useRef, useState } from 'react';
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
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutsideFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref || ref.current === e.target) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className='mapFilter w-full h-full'
      ref={ref}
      onClick={(e) => handleClickOutsideFilter(e)}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${isOpen ? 'rounded-t-md border border-b-0' : 'rounded-md border'}`}
      >
        {selectedFilter.content}
        <span
          className={`${isOpen ? 'rotate-180 transition-transform' : 'rotate-0 transition-transform'}`}
        >
          <IconDropdown />
        </span>
      </button>
      {isOpen && (
        <ul>
          {options.map((items) => (
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
