import React, { ReactNode } from 'react';

const ContentLayout = ({ children }: { children: ReactNode }) => {
  return <div className='layout h-[calc(100%-100px)] overflow-y-scroll'>{children}</div>;
};

export default ContentLayout;
