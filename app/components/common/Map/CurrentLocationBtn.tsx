import React from 'react';
import IconCurrLocation from '@/assets/images/map/icon_currentLocation.svg';

interface CurrentLocationBtnProps {
  handleClick: () => void;
  className?: string;
}

const CurrentLocationBtn = ({
  handleClick,
  className = '',
}: CurrentLocationBtnProps) => {
  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer bg-white w-10 h-10 flex justify-center items-center rounded-full shadow-[0_1px_3px_0_rgba(0,0,0,0.25)] ${className}`}
    >
      <IconCurrLocation />
    </div>
  );
};

export default CurrentLocationBtn;
