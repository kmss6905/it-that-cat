import { comments } from '@/constants/contentMockData';
import CatNotNews from '@/assets/images/cats/cat_notNews.svg';
import IconHeart from '@/assets/images/icon_heart.svg';
import IconHeartFill from '@/assets/images/icon_heartFill.svg';

export const CatNews = () => {
  return (
    <div className='p-6'>
      <div className={`flex gap-1 pb-5 subHeading`}>
        <div>냥이의 근황을 공유해요</div>
        <span className='text-gray-300'>{comments.length}개</span>
      </div>

      {comments.length ? (
        comments.map((comment, index) => (
          <div key={comment.contentId}>
            <div className='caption2 text-gray-400 mb-2'>
              {comment.nickname}
            </div>
            <div className='caption text-gray-500 mb-4'>{comment.comment}</div>
            <div className='flex justify-between items-center'>
              <button
                className={`border rounded-full flex gap-[6px] px-[10px] py-[6px] items-center caption
              ${
                comment.isLike
                  ? 'text-primary-500 border-primary-300'
                  : 'text-gray-200 border-gray-100'
              }`}
              >
                {comment.isLike ? <IconHeartFill /> : <IconHeart />}
                {comment.likes}
              </button>
              <div className='caption text-gray-300'>{comment.createdAt}</div>
            </div>
            {index !== comments.length - 1 ? (
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
};
