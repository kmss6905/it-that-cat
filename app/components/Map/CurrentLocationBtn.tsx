import React from 'react';
import IconCurrLocation from '@/assets/images/icon_currentLocation.svg';

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
      className={`cursor-pointer bg-white p-6px w-10 h-10 flex justify-center items-center rounded-full mb-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.25)] ${className}`}
    >
      <IconCurrLocation />
    </div>
  );
};

export default CurrentLocationBtn;
