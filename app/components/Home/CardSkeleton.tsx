const CardSkeleton = () => {
  return (
    <div className='flex gap-3 w-full px-4 py-5 bg-white'>
      <div className='w-[70px] h-[70px] rounded-full animate-pulse bg-gray-100'></div>
      <div className='flex-grow flex flex-col justify-between'>
        <div className='flex flex-col gap-2'>
          <div className='min-w-[150px] w-[240px] h-5 bg-gray-100 animate-pulse rounded-md'></div>
          <div className='min-w-[120px] w-[180px] h-5 bg-gray-100 animate-pulse rounded-md'></div>
        </div>
        <div className='min-w-[120px] w-[150px] h-5 bg-gray-100 animate-pulse rounded-md'></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
