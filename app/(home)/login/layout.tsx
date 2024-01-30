import React, { ReactNode } from 'react';

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return <div className='bg-bgBlack h-full'>{children}</div>;
};

export default LoginLayout;
