import Image from 'next/image';
import CatNotNews from '@/assets/images/cats/cat_notNews.svg';
import IconHeart from '@/assets/images/icon_heart.svg';
import IconHeartFill from '@/assets/images/icon_heartFill.svg';
import { useComments } from '@/hooks/useGetContent';
import getDateFormat from '@/utils/getDateFormat';
import ImageWrapper from '../ImageWrapper';
import deleteLike from '@/apis/contents/deleteLike';
import postLike from '@/apis/contents/postLike';
import { ResType } from '@/apis/type';

export const CatNews = ({ contentId }: { contentId: string | null }) => {
  const { data, isSuccess, refetch } = useComments(contentId);

  const onClickLike = async (commentId: string, isCatCommentLiked: string) => {
    if (!contentId) return;

    const res: ResType<string> = isCatCommentLiked
      ? await deleteLike({ commentId }, contentId)
      : await postLike({ commentId }, contentId);

    if (res.result === 'SUCCESS') {
      refetch();
    }
  };

  if (isSuccess)
    return (
      <div className='p-6'>
        <div className={`flex gap-1 pb-5 subHeading`}>
          <div>냥이의 근황을 공유해요</div>
          <span className='text-gray-300'>{data.items.length}개</span>
        </div>

        {data.items.length ? (
          data.items.map((comment: any, index: number) => (
            <div key={comment.commentId}>
              <div className='caption2 text-gray-400 mb-2'>
                {comment.userNickname}
              </div>
              <div className='caption text-gray-500 mb-4'>
                {comment.commentDesc}
              </div>
              <div
                className={`flex gap-2 ${comment.commentImageUris?.length && 'mb-4'}`}
              >
                {comment.commentImageUris.map(
                  (image: string, index: number) => (
                    <ImageWrapper key={index} size='S'>
                      <Image
                        src={image as string}
                        alt={`preview ${index}`}
                        fill
                        sizes='100'
                        priority
                        className='object-cover w-full h-full'
                      />
                    </ImageWrapper>
                  ),
                )}
              </div>
              <div className='flex justify-between items-center'>
                <button
                  onClick={() =>
                    onClickLike(comment.commentId, comment.isCatCommentLiked)
                  }
                  className={`border rounded-full flex gap-[6px] px-[10px] py-[6px] items-center caption
              ${
                comment.isCatCommentLiked
                  ? 'text-primary-500 border-primary-300'
                  : 'text-gray-200 border-gray-100'
              }`}
                >
                  {comment.isCatCommentLiked ? (
                    <IconHeartFill />
                  ) : (
                    <IconHeart />
                  )}
                  {comment.commentLikeCount}
                </button>
                <div className='caption text-gray-300'>
                  {getDateFormat(comment.createdAt)}
                </div>
              </div>
              {index !== data.items.length - 1 ? (
                <div className='w-full h-[1px] bg-gray-50 mt-4 mb-5' />
              ) : null}
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center mt-24'>
            <CatNotNews />
            <div className='caption text-gray-300 mt-5'>
              아직 작성된 소식이 없어요
            </div>
          </div>
        )}
      </div>
    );
  return null;
};
