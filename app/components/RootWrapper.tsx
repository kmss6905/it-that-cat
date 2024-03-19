'use client';
import useTokenReissue from '@/hooks/useTokenReissue';
import { ReactNode } from 'react';

const RootWrapper = ({ children }: { children?: ReactNode }) => {
  useTokenReissue();
  return (
    <div className='rootWrapper'>
      <div className='rootContainer'>
        <div className='screen'>{children}</div>
      </div>
    </div>
  );
};

export default RootWrapper;
