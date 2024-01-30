import React, { ReactNode } from 'react';

const RegisterLayout = ({ children }: { children: ReactNode }) => {
  return <div className='h-full overflow-y-scroll'>{children}</div>;
};

export default RegisterLayout;
