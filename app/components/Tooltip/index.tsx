import React, { ReactNode } from 'react';

interface TootipProps {
  children: ReactNode;
  message: string;
  direction?:
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'leftTop'
    | 'left'
    | 'leftBottom'
    | 'rightTop'
    | 'right'
    | 'rightBottom'
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight';
}

const Tooltip = ({ children, message, direction = 'top' }: TootipProps) => {
  return (
    <div className='tooltipWrapper'>
      {children}
      <div className='tooltip'>{message}</div>
    </div>
  );
};

export default Tooltip;
