import NoContent from '@/assets/images/img_noContent.svg';

export const NoFollowListPage = () => {
  return (
    <div className='flex w-full h-full flex-col gap-2 justify-start items-center bg-gray-50 pt-24'>
      <NoContent />
      <h3 className='subHeading2 text-gray-400 mt-3'>현재 팔로우 하고 있는 냥이가 없어요.</h3>
      <p className='caption text-gray-300'>가까운 곳에 살고 있는 냥이를 팔로우해보세요!</p>
    </div>
  );
};

export const NoListPage = () => {
  return (
    <div className='flex w-full h-full flex-col gap-2 justify-start items-center bg-gray-50 pt-24'>
      <NoContent />
      <h3 className='subHeading2 text-gray-400 mt-3'>가까운 곳에 살고 있는 냥이가 없어요.</h3>
      <p className='caption text-gray-300'>새로운 냥이를 등록해 우리 동네 첫 집사님이 되어 보세요!</p>
    </div>
  );
};
