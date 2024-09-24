'use client';
import { ReactNode } from 'react';
import Nav from '../Nav';

const RootWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <div className='rootWrapper'>
      <div className='rootContainer'>
        <div className='screen'>{children}</div>
        <Nav />
      </div>
    </div>
  );
};

export default RootWrapper;
