'use client';

import React, { Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import IconX from '@/assets/images/icon_x.svg';
import IconAddPhoto from '@/assets/images/icon_addPhoto.svg';
import { Label, TextareaInput } from '@/components/Input';
import RegisterBtn from '@/components/RegisterBtn';
import ImageWrapper from '@/components/ImageWrapper';

const RegisterCommentPage = () => {
  const router = useRouter();
  const [comment, setComment] = useState({
    desc: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const onClickInputImage = () => {
    if (images.length === 3) {
      return;
    }
    inputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const newImages: (string | ArrayBuffer | null)[] = [...images];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          newImages.push(reader.result);
          setImages(newImages);
        };
      }
    }
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Fragment>
      <div className='w-full relative pt-5 pb-5'>
        <h2 className='w-full text-center subHeading'>냥이 소식 작성하기</h2>
        <button
          onClick={() => router.back()}
          className='absolute right-5 top-1/2 -translate-y-1/2'
        >
          <IconX />
        </button>
      </div>

      <form className='p-6 pt-3 flex flex-col gap-7 mb-[100px]'>
        <div>
          <Label addTextBottom='냥이의 상태, 먹이를 준 유무, 최근 사진 등의 정보 공유는 올바른 돌봄 문화를 함께 만들어 나가는데 도움이 돼요.'>
            냥이를 만난 이야기를 들려주세요!
          </Label>
          <TextareaInput
            name='desc'
            value={comment.desc}
            onChange={onChange}
            maxLength={299}
            placeholder={
              'ex. 오랜만에 발견해서 한참을 놀아주고 왔어요! 전보다 살이 쪄보여서 자세히 살펴봤는데 임신은 아닌 것 같아요ㅎㅎ '
            }
          />
        </div>

        <div>
          <Label isRequired={true}>사진 업로드</Label>
          <div className='flex gap-2'>
            <div
              onClick={onClickInputImage}
              className='w-[84px] h-[84px] border-gray-100 rounded flex justify-center items-center border-[1px] flex-col cursor-pointer'
            >
              <IconAddPhoto />
              <div className='text-gray-200 caption'>{images.length}/3</div>
              <input
                className='hidden'
                ref={inputRef}
                type='file'
                accept='image/jpg, image/jpeg'
                onChange={handleImageUpload}
                data-testid='puzzleImage-input'
              />
            </div>
            {images.map((image, index) => (
              <ImageWrapper
                key={index}
                onClick={() => handleImageRemove(index)}
              >
                <Image
                  src={image as string}
                  alt={`preview ${index}`}
                  fill
                  className='object-cover w-full h-full'
                />
              </ImageWrapper>
            ))}
          </div>
        </div>
      </form>

      <div className='absolute bottom-0 left-0 w-full z-20 px-6 pt-[18px] pb-[30px] shadow-[0px_-8px_8px_0px_rgba(0,0,0,0.15)] bg-white'>
        <RegisterBtn onClick={() => router.push('/register/post')}>
          작성 완료
        </RegisterBtn>
      </div>
    </Fragment>
  );
};

export default RegisterCommentPage;
