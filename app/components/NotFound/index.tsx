'use server';

import Error404 from '@/assets/images/error404/404_error.svg';
import ErrorCat from '@/assets/images/error404/404_cat.svg';
import RegisterBtn from '@/components/RegisterBtn';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <div className='flex h-full flex-col justify-center items-center'>
      <div className='mb-6'>
        <Error404 />
      </div>
      <div className='mb-6'>
        <ErrorCat />
      </div>
      <div className='subHeading mb-3'>요청하신 페이지를 찾을 수 없습니다.</div>
      <div className='flex flex-col justify-center items-center body2'>
        <div>페이지의 주소가 잘못 입력되었거나,</div>
        <div>주소가 변경 혹은 삭제되어 접근이 불가합니다.</div>
      </div>
      <div className='absolute bottom-0 left-0 w-full z-20 px-6 pt-[18px] pb-[30px] bg-white'>
        <Link href={`/`}>
          <RegisterBtn>홈으로 돌아가기</RegisterBtn>
        </Link>
      </div>
    </div>
  );
}
