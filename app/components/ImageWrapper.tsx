import React, { ReactNode } from 'react';
import IconCancel from '@/assets/images/icon_cancel.svg';

const ImageWrapper = ({
  children,
  onClick,
  cancelBtn = false,
  dimed = false,
  size = 'M',
}: {
  children?: ReactNode;
  onClick?: (value?: any) => void;
  cancelBtn?: boolean;
  dimed?: boolean;
  size?: 'S' | 'M';
}) => {
  return (
    <div
      className={`relative rounded-6px overflow-hidden ${size === 'S' ? 'w-[84px] h-[84px]' : 'w-[106px] h-[106px]'}`}
    >
      {cancelBtn && <ImageCancelBtn onClick={onClick} />}
      {children}
      <div
        className={`absolute w-full h-full z-10 ${dimed && 'bg-[rgba(0,0,0,0.35)]'}`}
      ></div>
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
