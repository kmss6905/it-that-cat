'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import loginCharacter from '@/assets/images/login_character.png';
import handleValidCheckNickname from '@/apis/login/handleValidCheckNickname';
import { useRouter } from 'next/navigation';

const NicknamePage = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nickname !== null) {
      await handleValidCheckNickname(nickname).then((res: any) => {
        if (res.result === 'SUCCESS') {
          res?.data.isAvailable === false
            ? setError('이미 사용 중인 닉네임이에요.')
            : router.push('/');
        } else {
          switch (res.error.code) {
            case 'U004':
            case 'U003':
            case 'U002':
              setError(res.error.message);
              break;
            default:
              break;
          }
        }
      });
    }
  };

  return (
    <div className='h-full flex flex-col justify-center'>
      <div className='mx-6 text-center flex-grow flex flex-col gap-3 justify-center items-center'>
        <div className='w-52 min-h-28 relative mb-12'>
          <Image
            src={loginCharacter.src}
            alt='이냥저냥 캐릭터 이미지'
            fill
            sizes='100%'
            className='object-contain'
            priority
          />
        </div>
        <h2 className='heading1 text-white'>
          반가워요 집사님,
          <br />
          저희는 이냥이와 저냥이에요!
        </h2>
        <p className='body1 text-gray-200'>
          서비스 내에서 사용할 닉네임을 입력해주세요.
        </p>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col items-center gap-52'
      >
        <div>
          <label className='border-b border-white'>
            <input
              type='text'
              value={nickname !== null ? nickname : ''}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={10}
              className='bg-transparent heading1 text-primary-500'
            />
            <span className='text-gray-300 caption'>
              {nickname === null ? 0 : nickname.length}/10
            </span>
          </label>
          {error !== null ? <p className='error'>{error}</p> : null}
        </div>

        <input
          type='submit'
          value='시작하기'
          disabled={nickname === null && error === null}
          className='w-full subHeading bg-primary-500 pt-4 pb-9 text-white disabled:bg-gray-500 disabled:text-gray-300 cursor-pointer disabled:cursor-default'
        />
      </form>
    </div>
  );
};

export default NicknamePage;
