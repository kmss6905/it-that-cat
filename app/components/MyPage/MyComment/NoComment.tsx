import CatNotNews from '@/assets/images/cats/cat_notNews.svg';

const NoComment = () => {
  return (
    <li className='flex flex-col items-center mt-24'>
      <CatNotNews />
      <div className='caption text-gray-300 mt-5'>아직 작성된 소식이 없어요</div>
    </li>
  );
};

export default NoComment;
