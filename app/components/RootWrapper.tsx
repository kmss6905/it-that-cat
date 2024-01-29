import { ReactNode } from 'react';

const RootWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <div className='rootWrapper'>
      <div className='rootContainer'>
        <div className='screen'>{children}</div>
      </div>
    </div>
  );
};

export default RootWrapper;
