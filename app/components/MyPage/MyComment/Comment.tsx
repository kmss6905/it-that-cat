import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CommentData } from '.';
import getDateFormat from '@/utils/getDateFormat';
import ImageWrapper from '@/components/ImageWrapper';
import { MODAL_TYPE } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';
import IconRightArrow from '@/assets/images/mypage/icon_rightArrow.svg';
import IconHeart from '@/assets/images/icon_heart.svg';
import IconHeartFill from '@/assets/images/icon_heartFill.svg';

const Comment = ({
  comment,
  onClickLike,
  setCommentId,
}: {
  comment: CommentData;
  onClickLike: (
    commentId: string,
    contentId: string,
    isCatCommentLiked: boolean,
  ) => void;
  setCommentId: (commentId: string) => void;
}) => {
  const router = useRouter();
  const { openModal } = useModal();
  const {
    commentDesc,
    commentId,
    commentImageUris,
    commentLikeCount,
    contentId,
    createdAt,
    isCatCommentLiked,
  } = comment;

  return (
    <li key={commentId} className='py-4'>
      {/* 컨텐츠 등록 고양이 이름 */}
      <Link href={`/content/${contentId}`}>
        <h3 className='subHeading text-black flex items-center'>
          컨텐츠 고양이 이름이 필요!
          <IconRightArrow />
        </h3>
      </Link>

      {/* 등록일 */}
      <p className='caption text-gray-300 pt-3 pb-6px'>
        {getDateFormat(createdAt)} 등록
      </p>

      {/* 댓글 내용 */}
      <p className='caption text-gray-500 pb-4'>{commentDesc}</p>

      {/* 이미지 */}
      <div className={`flex gap-2 ${commentImageUris?.length && 'mb-4'}`}>
        {commentImageUris?.map((image: string, index: number) => (
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
        ))}
      </div>

      <div className='flex justify-between items-center'>
        {/* 좋아요 버튼 */}
        <button
          onClick={() => onClickLike(commentId, contentId, isCatCommentLiked)}
          className={`border rounded-full flex gap-[6px] px-[10px] py-[6px] items-center caption
              ${
                isCatCommentLiked
                  ? 'text-primary-500 border-primary-300'
                  : 'text-gray-200 border-gray-100'
              }`}
        >
          {isCatCommentLiked ? <IconHeartFill /> : <IconHeart />}
          {commentLikeCount}
        </button>

        {/* 수정, 삭제 버튼 */}
        <div className='flex items-center gap-4 caption text-gray-400'>
          <button
            onClick={() => {
              setCommentId(commentId);
              router.push(`/content/${contentId}/register/${commentId}`);
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              setCommentId(commentId);
              openModal(MODAL_TYPE.CAT_NEWS_DELETE);
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
};

export default Comment;
