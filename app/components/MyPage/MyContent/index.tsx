'use client';
import { useRouter } from 'next/navigation';

import IconBack from '@/assets/images/icon_backBlack.svg';
import MyContentFormat from './MyContentFormat';
import { useMyContents } from '@/hooks/queries/useMyContents';
import { useMemo, useState } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { NoContent } from './NoContent';

const MyContent = () => {
  const router = useRouter();
  const [selectedContent, setSelectedContent] = useState<
    string | null | undefined
  >(null);

  const { data, fetchNextPage, hasNextPage, isFetching } = useMyContents();

  const target = useIntersectionObserver((entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const myContents = useMemo(() => {
    const contents = data ? data.pages.flatMap((doc) => doc.items) : [];
    return contents;
  }, [data]);

  return (
    <div className='h-full'>
      <div className='w-full flex justify-between px-5 pt-6 pb-4 border-b border-gray-10'>
        <span onClick={() => router.back()} className='cursor-pointer'>
          <IconBack />
        </span>
        <p className='subHeading text-black'>내가 등록한 냥이</p>
        <div />
      </div>

      <div
        className={`flex flex-col last:[&_div]:!border-b-0 ${myContents && myContents.length > 0 ? 'px-6' : ''} h-[calc(100%-65px)] overflow-y-scroll layout`}
      >
        {myContents &&
          (myContents.length > 0 ? (
            myContents.map((item) => (
              <MyContentFormat
                content={item}
                key={item.contentId}
                selectedContent={selectedContent}
                setSelectedContent={(id) => setSelectedContent(id)}
              />
            ))
          ) : (
            <NoContent />
          ))}
        <div ref={target} />
      </div>
    </div>
  );
};

export default MyContent;
