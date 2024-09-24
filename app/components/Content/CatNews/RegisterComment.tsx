'use client';

import React, { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { postComment, putComment } from '@/apis/contents';
import IconX from '@/assets/images/icon_x.svg';
import IconAddPhoto from '@/assets/images/icon_addPhoto.svg';
import { Label, TextareaInput } from '@/components/common/Input';
import RegisterButton from '@/components/common/Button/RegisterButton';
import ImageWrapper from '@/components/common/Wrapper/ImageWrapper';
import { saveImageAWS } from '@/apis/image/saveImage';
import { commentProps, ResType } from '@/types/api';
import { useWithLoading } from '@/hooks/useWithLoading';
import { useToast } from '@/stores/toast/store';
import { useComment } from '@/hooks/queries/useGetContent';
import useNotFound from '@/hooks/utils/useNotFound';
import { CatNewsProps } from '@/types/content';

const RegisterComment = ({ contentId, commentId }: { contentId: string; commentId: string }) => {
  const router = useRouter();
  const queryResult = useComment(contentId, commentId);
  const { data } = useNotFound<CatNewsProps>(queryResult);
  const isNew = !commentId;
  const [comment, setComment] = useState({
    commentDesc: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [thumbImages, setThumbImages] = useState<(string | ArrayBuffer | null)[]>([]);
  const [images, setImages] = useState<(File | string)[]>([]);
  const { withLoading } = useWithLoading();
  const { addToast } = useToast();

  useEffect(() => {
    if (data) {
      setComment(() => data);
    }
  }, [data]);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const onClickInputImage = () => {
    if (thumbImages.length === 3) {
      return;
    }
    inputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const newThumbImages: (string | ArrayBuffer | null)[] = [...thumbImages];
    const newImages: (File | string)[] = [...images];
    newImages.push(files?.[0] || new File([], ''));
    setImages(newImages);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          newThumbImages.push(reader.result);
          setThumbImages(newThumbImages);
        };
      }
    }
  };

  const handleImageRemove = (index: number) => {
    setThumbImages(thumbImages.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRegister = async (contentId: string | null, comment: commentProps, images: any[]) => {
    const saveImageKeys = await Promise.all(images.map(saveImageAWS));
    const data: commentProps = {
      ...comment,
      commentImageKeys: saveImageKeys,
    };
    if (isNew) {
      const res: ResType<{ contentId: string }> = await postComment(contentId, data);
      return res;
    }
    const res: ResType<{ contentId: string }> = await putComment(commentId, data);
    return res;
  };

  const onClickRegister = async () => {
    const res = await withLoading(() => handleRegister(contentId, comment, images));
    if (res.result === 'SUCCESS') {
      const message = isNew ? '새로운 소식을 등록했어요!' : '소식을 수정했어요!';
      addToast.check(message);
      router.push(`/content/${contentId}`);
    }
  };

  useEffect(() => {
    if (data?.commentImageUris) {
      setThumbImages(data.commentImageUris);
      setImages(data.commentImageUris);
    }
  }, [data?.commentImageUris]);

  return (
    <Fragment>
      <div className='w-full relative pt-5 pb-5'>
        <h2 className='w-full text-center subHeading'>냥이 소식 작성하기</h2>
        <button onClick={() => router.back()} className='absolute right-5 top-1/2 -translate-y-1/2'>
          <IconX />
        </button>
      </div>

      <form className='p-6 pt-3 flex flex-col gap-7'>
        <div>
          <Label
            isRequired={true}
            addTextBottom='냥이의 상태, 먹이를 준 유무, 최근 사진 등의 정보 공유는 올바른 돌봄 문화를 함께 만들어 나가는데 도움이 돼요.'
          >
            냥이를 만난 이야기를 들려주세요!
          </Label>
          <TextareaInput
            name='commentDesc'
            value={comment.commentDesc}
            onChange={onChange}
            maxLength={299}
            placeholder={
              'ex. 오랜만에 발견해서 한참을 놀아주고 왔어요! 전보다 살이 쪄보여서 자세히 살펴봤는데 임신은 아닌 것 같아요ㅎㅎ '
            }
          />
        </div>

        <div>
          <Label>사진 업로드</Label>
          <div className='flex gap-2'>
            <div
              onClick={onClickInputImage}
              className='w-[84px] h-[84px] border-gray-100 rounded flex justify-center items-center border-[1px] flex-col cursor-pointer'
            >
              <IconAddPhoto />
              <div className='text-gray-200 caption'>{thumbImages.length}/3</div>
              <input
                className='hidden'
                ref={inputRef}
                type='file'
                accept='image/jpg, image/jpeg'
                onChange={handleImageUpload}
                data-testid='puzzleImage-input'
              />
            </div>
            {thumbImages.map((image, index) => (
              <ImageWrapper key={index} size='S' dimed={true} cancelBtn={true} onClick={() => handleImageRemove(index)}>
                <Image src={image as string} alt={`preview ${index}`} fill className='object-cover w-full h-full' />
              </ImageWrapper>
            ))}
          </div>
        </div>
      </form>

      <div className='absolute bottom-0 left-0 w-full z-20 px-6 pt-[18px] pb-[30px] shadow-[0px_-8px_8px_0px_rgba(0,0,0,0.15)] bg-white'>
        <RegisterButton onClick={onClickRegister} isDisabled={!comment.commentDesc}>
          작성 완료
        </RegisterButton>
      </div>
    </Fragment>
  );
};

export default RegisterComment;
