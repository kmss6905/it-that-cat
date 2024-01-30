import React, { ReactNode } from 'react';

import IconI from '@/assets/images/icon_i.svg';

interface TootipProps {
  children?: ReactNode;
  direction?: 'top' | 'bottom';
}

const Tooltip = ({ children, direction = 'top' }: TootipProps) => {
  return (
    <div className={`tooltipWrapper`}>
      <IconI />
      <div
        className={`tooltip
        ${direction === 'top' ? 'before:block absolute -left-8 -top-16' : ''}
        ${direction === 'bottom' ? 'after:block absolute -left-8 -bottom-16' : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
