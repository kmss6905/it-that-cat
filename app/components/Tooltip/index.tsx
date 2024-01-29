import React, { ReactNode } from 'react';

interface TootipProps {
  children: ReactNode;
  message: string;
  direction?: 'top' | 'bottom';
}

const Tooltip = ({ children, message, direction = 'top' }: TootipProps) => {
  return (
    <div className={`tooltipWrapper`}>
      {children}
      <div
        className={`tooltip
        ${direction === 'top' ? 'before:block absolute -left-11 -top-16 z-50' : ''}
        ${direction === 'bottom' ? 'after:block absolute -left-11 -bottom-16 z-50' : ''}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Tooltip;
