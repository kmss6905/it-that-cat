'use client';

import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import IconX from '@/assets/images/icon_x.svg';
import IconRandom from '@/assets/images/icon_random.svg';
import IconAddPhoto from '@/assets/images/icon_addPhoto.svg';
import Tooltip from '@/components/Tooltip';
import { Label, TextInput, TextareaInput } from '@/components/Input';
import Button from '@/components/Button';
import { randomCatNameList } from '@/constants/randomCatNameList';
import {
  groupButtons,
  neuterButtons,
  personalityButtons,
} from '@/constants/catInfoButtons';
import RegisterBtn from '@/components/RegisterBtn';

interface CatObjProps {
  [key: string]: string | string[];
  location: string;
  name: string;
  desc: string;
  neuter: string;
  group: string;
  personality: string[];
}

const RegisterPostPage = () => {
  const router = useRouter();
  const [catInfo, setCatInfo] = useState<CatObjProps>({
    location: '',
    name: '',
    desc: '',
    neuter: '',
    group: '',
    personality: [],
  });

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

  const onClickPersonality = (value: string) => {
    let personality = [...catInfo.personality];

    // 모르겠어요 눌렀을 때
    if (value === 'UNSURE') {
      if (personality.includes('UNSURE')) {
        setCatInfo({ ...catInfo, personality: [] });
      } else {
        setCatInfo({ ...catInfo, personality: ['UNSURE'] });
      }
      return;
    }

    // 이미 선택된 성격을 눌렀을 때
    if (personality.includes(value)) {
      setCatInfo({
        ...catInfo,
        personality: personality.filter(
          (personalityValue) => personalityValue !== value,
        ),
      });
      return;
    }

    if (personality.length < 3) {
      personality.push(value);
    }

    // 모르겠어요가 이미 눌러져 있을 때
    if (personality.includes('UNSURE')) {
      personality = personality.filter(
        (personalityValue) => personalityValue !== 'UNSURE',
      );
    }

    setCatInfo({ ...catInfo, personality });
  };

  return (
    <Fragment>
      <div className='w-full relative pt-5 pb-5'>
        <h2 className='w-full text-center subHeading'>우리 동네 냥이 제보</h2>
        <button
          onClick={() => router.push('/')}
          className='absolute right-5 top-1/2 -translate-y-1/2'
        >
          <IconX />
        </button>
      </div>

      <form className='p-6 pt-3 flex flex-col gap-7 mb-[100px]'>
        <div>
          <Label isRequired={true}>냥이의 주요 출몰 위치</Label>
          <TextInput
            name='location'
            value={catInfo.location}
            onChange={onChange}
            placeholder={''}
          />
        </div>

        <div>
          <Label isRequired={true}>이름 또는 애칭</Label>
          <div className='flex gap-2'>
            <TextInput
              name='name'
              value={catInfo.name}
              onChange={onChange}
              maxLength={9}
              placeholder={'ex. 키키'}
            />
            <Button onClick={setRandomCatName}>
              <div className='flex'>
                <div className='flex justify-center items-center mr-[6px]'>
                  <IconRandom />
                </div>
                <span className='whitespace-nowrap'>랜덤 생성</span>
              </div>
            </Button>
          </div>
        </div>

        <div>
          <Label>냥이를 자유롭게 소개해주세요</Label>
          <TextareaInput
            name='desc'
            value={catInfo.desc}
            onChange={onChange}
            maxLength={299}
            placeholder={
              'ex. 우리집 고양이는 츄르를 좋아해~ 저랑 같이 코코 집사 되실분!! 애교도 많고 사람을 좋아하는 사랑스러운 친구랍니다:)'
            }
          />
        </div>

        <div>
          <Label isRequired={true}>사진 업로드</Label>
          <div className='w-[84px] h-[84px] border-gray-100 rounded flex justify-center items-center border-[1px] flex-col'>
            <IconAddPhoto />
            <div className='text-gray-200 caption'>3/3</div>
          </div>
          {/* <ImageWrapper>
            <Image
              src={examImage.src}
              alt='예시 이미지'
              fill
              className='object-cover w-full h-full'
            />
          </ImageWrapper> */}
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
                onClick={() => onClickPersonality(value)}
                border={catInfo.personality.includes(value)}
                gray={!catInfo.personality.includes(value)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </form>

      <div className='absolute bottom-0 left-0 w-full z-20 px-6 pt-[18px] pb-[30px] shadow-[0px_-8px_8px_0px_rgba(0,0,0,0.15)] bg-white'>
        <RegisterBtn onClick={() => router.push('/register/post')}>
          이 위치로 설정
        </RegisterBtn>
      </div>
    </Fragment>
  );
};

export default RegisterPostPage;
