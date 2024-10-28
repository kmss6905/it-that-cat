import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '우리 동네 냥이 등록',
  robots: { index: false, follow: false, nocache: true },
};

const RegisterLayout = ({ children }: { children: ReactNode }) => {
  return <div className='layout h-[calc(100%-100px)] overflow-y-scroll'>{children}</div>;
};

export default RegisterLayout;
