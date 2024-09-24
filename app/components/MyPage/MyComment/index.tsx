'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useMyComment } from '@/hooks/queries/useMyComment';
import Loading from '@/components/common/Loading';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { deleteLike, postLike } from '@/apis/contents';
import { ResType } from '@/types/api';
import DeleteCatNewsModal from '@/components/Content/CatNews/DeleteCatNewsModal';
import IconBack from '@/assets/images/icon_backBlack.svg';
import NoComment from './NoComment';
import Comment from './Comment';

export interface CommentData {
  commentId: string;
  commentDesc: string;
  commentImageUris: string[];
  createdAt: string;
  updatedAt: string;
  contentId: string;
  commentLikeCount: number;
  isCatCommentLiked: boolean;
  catName: string;
}

const MyComment = () => {
  const router = useRouter();
  const [commentId, setCommentId] = useState<string | null>(null);

  const { data, isSuccess, refetch, fetchNextPage, hasNextPage, isFetching } = useMyComment();

  const target = useIntersectionObserver((entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const onClickLike = async (commentId: string, contentId: string, isCatCommentLiked: boolean) => {
    if (!contentId) return;

    const res: ResType<string> = isCatCommentLiked
      ? await deleteLike({ commentId }, contentId)
      : await postLike({ commentId }, contentId);

    if (res.result === 'SUCCESS') {
      refetch();
    }
  };

  const comments = useMemo(() => {
    const contents = data ? data.pages.flatMap((doc) => doc.items) : [];
    return contents as CommentData[];
  }, [data]);

  if (!isSuccess) return <Loading />;

  return (
    <div className='h-full'>
      <DeleteCatNewsModal commentId={commentId} refetch={refetch} />

      {/* top nav */}
      <div className='w-full flex justify-between px-5 pt-6 pb-4 border-b border-gray-10'>
        <button onClick={() => router.back()}>
          <IconBack />
        </button>
        <p className='subHeading text-black'>작성한 냥이 소식</p>
        <div />
      </div>

      {/* My comment */}
      <ul className='h-[calc(100%-65px)] overflow-y-scroll px-6 layout'>
        <li className='pt-6 pb-2 heading2 text-black'>작성한 냥이 소식 총 {comments.length}개</li>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.commentId}
              comment={comment}
              onClickLike={onClickLike}
              setCommentId={(id) => setCommentId(id)}
            />
          ))
        ) : (
          <NoComment />
        )}
        <div ref={target} />
      </ul>
    </div>
  );
};

export default MyComment;
