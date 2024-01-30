import React, { ReactNode } from 'react';

interface TootipProps {
  children: ReactNode;
  message: string;
  direction?: 'top' | 'bottom';
}

const Tooltip = ({ children, message, direction = 'top' }: TootipProps) => {
  return (
    <div className={`tooltipWrapper`}>
      <span className='w-4 h-4 flex justify-center items-center border border-gray-300 rounded-full'>
        {children}
      </span>
      <div
        className={`tooltip
        ${direction === 'top' ? 'before:block absolute -left-11 -top-16' : ''}
        ${direction === 'bottom' ? 'after:block absolute -left-11 -bottom-16' : ''}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Tooltip;
