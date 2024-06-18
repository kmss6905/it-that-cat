import React from 'react';
import IconBookmark from '@/assets/images/icon_bookmark.svg';
import IconBookmarkFill from '@/assets/images/icon_bookmarkFill.svg';

interface BookmarkBtnProps {
  handleClick: () => void;
  className?: string;
  activate: boolean;
}

const BookmarkBtn = ({
  handleClick,
  className = '',
  activate,
}: BookmarkBtnProps) => {
  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer bg-white w-10 h-10 flex justify-center items-center rounded-full shadow-[0_1px_3px_0_rgba(0,0,0,0.25)] ${className}`}
    >
      {activate ? <IconBookmarkFill /> : <IconBookmark />}
    </div>
  );
};

export default BookmarkBtn;
