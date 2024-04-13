'use client';
import useTokenReissue from '@/hooks/useTokenReissue';
import { ReactNode } from 'react';
import Nav from './Nav';

const RootWrapper = ({ children }: { children?: ReactNode }) => {
  useTokenReissue();
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
