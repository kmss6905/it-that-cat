import React, { ReactNode } from 'react';
import IconCancel from '@/assets/images/icon_cancel.svg';

const ImageWrapper = ({
  children,
  onClick,
}: {
  children?: ReactNode;
  onClick?: (value?: any) => void;
}) => {
  return (
    <div className='relative rounded-primary w-[84px] h-[84px] overflow-hidden'>
      <ImageCancelBtn onClick={onClick} />
      {children}
      <div className='absolute w-full h-full bg-[rgba(0,0,0,0.35)] z-10'></div>
    </div>
  );
};

export const ImageCancelBtn = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div
      onClick={onClick}
      className='cursor-pointer absolute top-[6px] right-[6px] w-[18px] h-[18px] z-20 flex justify-center items-center rounded-full bg-black/70'
    >
      <IconCancel />
    </div>
  );
};

export default ImageWrapper;
