'use client';

import React, { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';

import IconX from '@/assets/images/icon_x.svg';
import IconRandom from '@/assets/images/icon_random.svg';
import IconAddPhoto from '@/assets/images/icon_addPhoto.svg';
import Tooltip from '@/components/common/Tooltip';
import { Label, TextInput, TextareaInput } from '@/components/common/Input';
import Button from '@/components/common/Button';
import RegisterButton from '@/components/common/Button/RegisterButton';
import ImageWrapper from '@/components/common/Wrapper/ImageWrapper';
import { randomCatNameList } from '@/constants/randomCatNameList';
import { UNSURE, groupButtons, neuterButtons, personalityButtons } from '@/constants/catInfoButtons';
import { postContent, putContent } from '@/apis/contents';
import { saveImageAWS } from '@/apis/image/saveImage';
import { RegisterCatObjProps, UpdateCatObjProps } from '@/types/content';
import { ResType } from '@/types/api';
import { catIllust } from '@/constants/catIllust';
import { useWithLoading } from '@/hooks/useWithLoading';

const RegisterPost = ({
  setIsFillingIn,
  catInfo,
  setMode,
  setCatInfo,
  isNew,
}: {
  setIsFillingIn: Dispatch<SetStateAction<boolean>>;
  catInfo: RegisterCatObjProps;
  setMode: Dispatch<SetStateAction<string>>;
  setCatInfo: Dispatch<SetStateAction<RegisterCatObjProps>>;
  isNew: boolean;
}) => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [thumbImages, setThumbImages] = useState<(string | ArrayBuffer | null)[]>([]);
  const [images, setImages] = useState<(File | string)[]>([]);
  const [catEmoji, setCatEmoji] = useState<number>(1);
  const swiperRef = useRef<SwiperCore | null>(null);
  const { withLoading } = useWithLoading();

  useEffect(() => {
    if (catInfo.images) {
      setThumbImages(catInfo.images);
      setImages(catInfo.images);
    }
    if (catInfo.catEmoji) {
      setCatEmoji(catInfo.catEmoji);
      swiperRef.current?.slideTo(catInfo.catEmoji - 1);
    }
  }, [catInfo?.images, catInfo?.catEmoji]);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setCatInfo({
      ...catInfo,
      [name]: value,
    });
  };

  const setRandomCatName = () => {
    const randomIndex = Math.floor(Math.random() * randomCatNameList.length);
    setCatInfo({ ...catInfo, name: randomCatNameList[randomIndex] });
  };

  const onClickOnlyOne = (name: string, value: string) => {
    setCatInfo({
      ...catInfo,
      [name]: catInfo[name] === value ? '' : value,
    });
  };

  const onClickPersonalities = (value: string) => {
    let catPersonalities = [...catInfo.catPersonalities];

    // 모르겠어요 눌렀을 때
    if (value === UNSURE) {
      if (catPersonalities.includes(UNSURE)) {
        setCatInfo({ ...catInfo, catPersonalities: [] });
      } else {
        setCatInfo({ ...catInfo, catPersonalities: [UNSURE] });
      }
      return;
    }

    // 이미 선택된 성격을 눌렀을 때
    if (catPersonalities.includes(value)) {
      setCatInfo({
        ...catInfo,
        catPersonalities: catPersonalities.filter((personalityValue) => personalityValue !== value),
      });
      return;
    }

    if (catPersonalities.length < 3) {
      catPersonalities.push(value);
    }

    // 모르겠어요가 이미 눌러져 있을 때
    if (catPersonalities.includes(UNSURE)) {
      catPersonalities = catPersonalities.filter((personalityValue) => personalityValue !== UNSURE);
    }

    setCatInfo({ ...catInfo, catPersonalities });
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

  const handleRegister = async () => {
    const saveImageKeys = await Promise.all(images.map(saveImageAWS));
    const updatedCatInfo = {
      ...catInfo,
      group: catInfo.group ? catInfo.group : UNSURE,
      catPersonalities: catInfo.catPersonalities.length ? catInfo.catPersonalities : [UNSURE],
    };
    if (isNew) {
      const data: RegisterCatObjProps = {
        ...updatedCatInfo,
        imageKeys: saveImageKeys,
        catEmoji: catEmoji,
      };
      return (await postContent(data)) as ResType<{ contentId: string }>;
    }
    const data: UpdateCatObjProps = {
      name: updatedCatInfo.name,
      description: updatedCatInfo.description,
      neuter: updatedCatInfo.neuter,
      group: updatedCatInfo.group,
      catPersonalities: updatedCatInfo.catPersonalities,
      imageKeys: saveImageKeys,
      catEmoji: catEmoji,
    };
    return (await putContent(data, catInfo?.contentId)) as ResType<{
      contentId: string;
    }>;
  };

  const onClickRegister = async () => {
    const res = await withLoading(() => handleRegister());
    if (res.result === 'SUCCESS') {
      const contentId = res?.data?.contentId ?? catInfo.contentId;
      router.push(`/content/${contentId}`);
    }
  };

  return (
    <Fragment>
      <div className='w-full relative pt-5 pb-5'>
        <h2 className='w-full text-center subHeading'>우리 동네 냥이 등록</h2>
        <button onClick={() => router.back()} className='absolute right-5 top-1/2 -translate-y-1/2'>
          <IconX />
        </button>
      </div>

      <form className='p-6 pt-3 flex flex-col gap-7'>
        <div>
          <Label isRequired={true}>냥이의 주요 출몰 위치</Label>
          <div className='w-full h-11 rounded-lg text-text-title body1 bg-gray-50 px-4 py-[10px] text-gray-300 flex justify-between'>
            <div>{catInfo.jibunAddrName}</div>
            {isNew && (
              <div
                onClick={() => {
                  setMode('map');
                  setIsFillingIn(true);
                }}
                className='text-primary-500 cursor-pointer'
              >
                수정
              </div>
            )}
          </div>
        </div>

        <div>
          <Label isRequired={true} addTextBottom='정확한 이름을 몰라도 괜찮아요. 새로운 애칭을 지어주세요!'>
            이름 또는 애칭
          </Label>
          <div className='flex gap-2'>
            <TextInput
              name='name'
              value={catInfo.name}
              onChange={onChange}
              maxLength={9}
              placeholder={'ex. 키키'}
              isDisabled={!isNew}
            />
            {isNew && (
              <Button onClick={setRandomCatName}>
                <div className='flex'>
                  <div className='flex justify-center items-center mr-[6px]'>
                    <IconRandom />
                  </div>
                  <span className='whitespace-nowrap'>랜덤 생성</span>
                </div>
              </Button>
            )}
          </div>
        </div>

        <div>
          <Label isRequired={true} addTextBottom='냥이의 털색깔과 얼룩을 참고해 선택해주세요'>
            프로필 캐릭터
          </Label>
          <Swiper
            slidesPerView={4.4}
            onSwiper={(swiper) => {
              swiperRef.current = swiper; // SwiperCore 인스턴스를 ref에 할당
            }}
          >
            {catIllust.map((cat) => (
              <SwiperSlide key={cat.id}>
                <div
                  className={`w-[70px] h-[70px] rounded-full  bg-gray-50 mb-3 box-border
                  flex justify-center items-center
                  ${catEmoji === cat.id ? 'border border-primary-300' : null}`}
                  onClick={() => setCatEmoji(cat.id)}
                >
                  <cat.image />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <Label>냥이를 자유롭게 소개해주세요</Label>
          <TextareaInput
            name='description'
            value={catInfo.description}
            onChange={onChange}
            maxLength={299}
            placeholder={
              'ex. 우리집 고양이는 츄르를 좋아해~ 저랑 같이 코코 집사 되실분!! 애교도 많고 사람을 좋아하는 사랑스러운 친구랍니다:)'
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
              <div className='text-gray-200 caption'>{thumbImages?.length}/3</div>
              <input
                className='hidden'
                ref={inputRef}
                type='file'
                accept='image/jpg, image/jpeg'
                onChange={handleImageUpload}
                data-testid='puzzleImage-input'
              />
            </div>
            {thumbImages?.map((image, index) => (
              <ImageWrapper key={index} size='S' dimed={true} cancelBtn={true} onClick={() => handleImageRemove(index)}>
                <Image src={image as string} alt={`preview ${index}`} fill className='object-cover w-full h-full' />
              </ImageWrapper>
            ))}
          </div>
        </div>

        <div>
          <div className='flex items-start'>
            <Label isRequired>중성화 수술 유무</Label>
            <Tooltip direction='top'>
              냥이의 귀를 살펴보세요! 중성화를 마친
              <br />
              고양이는 귀 끝을 조금 잘라 표시하곤 해요:{')'}
            </Tooltip>
          </div>

          <div className='flex gap-[6px]'>
            {neuterButtons.map(({ name, value }) => (
              <Button
                key={value}
                onClick={() => onClickOnlyOne('neuter', value)}
                border={catInfo.neuter === value}
                gray={catInfo.neuter !== value}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>같이 다니는 무리가 있나요?</Label>
          <div className='flex gap-[6px]'>
            {groupButtons.map(({ name, value }) => (
              <Button
                key={value}
                onClick={() => onClickOnlyOne('group', value)}
                border={catInfo.group === value}
                gray={catInfo.group !== value}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label addText='(1~3개 복수 선택 가능)'>어떤 성격인가요?</Label>
          <div className='flex gap-[6px] flex-wrap'>
            {personalityButtons.map(({ name, value }) => (
              <Button
                key={value}
                onClick={() => onClickPersonalities(value)}
                border={catInfo.catPersonalities?.includes(value)}
                gray={!catInfo.catPersonalities?.includes(value)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </form>

      <div className='absolute bottom-0 left-0 w-full z-20 px-6 pt-[18px] pb-[30px] shadow-[0px_-8px_8px_0px_rgba(0,0,0,0.15)] bg-white'>
        <RegisterButton
          onClick={onClickRegister}
          isDisabled={!catInfo.jibunAddrName || !catInfo.name || !catInfo.neuter || !images?.length}
        >
          {isNew ? '등록하기' : '수정하기'}
        </RegisterButton>
      </div>
    </Fragment>
  );
};

export default RegisterPost;
