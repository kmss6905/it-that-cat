import React, { ReactNode } from 'react';

const RegisterLayout = ({ children }: { children: ReactNode }) => {
  return <div className='layout h-full overflow-y-scroll'>{children}</div>;
};

export default RegisterLayout;
