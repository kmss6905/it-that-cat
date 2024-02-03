import Image from 'next/image';
import {
  neuterButtons,
  groupButtons,
  personalityButtons,
} from '@/constants/catInfoButtons';
import CustomPin from '../Map/CustomPin';
import MapComponent from '../Map/Map';
import { ContentObjProps } from '@/types/content';
import getDateFormat from '@/utils/getDateFormat';
import ImageWrapper from '../ImageWrapper';

export const DetailInfo = ({ content }: { content: ContentObjProps }) => {
  const position = { lat: Number(content.lat), lng: Number(content.lng) };

  return (
    <div>
      <div className='p-6'>
        <div className='caption2 text-primary-400 mb-3'>
          {getDateFormat(content.updatedAt)} 업데이트
        </div>
        <div className={`${titleClassName}`}>동네 집사의 한 줄 소개</div>
        <div className='body2 text-gray-400 mb-4'>{content.description}</div>
        <div className='flex gap-2'>
          {content.images.map((image, index) => (
            <ImageWrapper key={index}>
              <Image
                src={image as string}
                alt={`preview ${index}`}
                fill
                sizes='100'
                priority
                className='object-cover w-full h-full'
              />
            </ImageWrapper>
          ))}
        </div>
      </div>

      <div className={`${barClassName}`} />

      <div className='p-6'>
        <div className={`${titleClassName}`}>건강한 돌봄을 위한 필수 체크!</div>
        <div className='flex mb-4'>
          <div className='w-full'>
            <div className={`${subTitleClassName}`}>중성화 수술</div>
            <div>
              <span className={`${contentClassName}`}>
                {
                  neuterButtons.find(
                    (button) => button.value === content.neuter,
                  )?.name
                }
              </span>
            </div>
          </div>
          <div className='w-full'>
            <div className={`${subTitleClassName}`}>같이 다니는 무리</div>
            <div>
              <span className={`${contentClassName}`}>
                {
                  groupButtons.find((button) => button.value === content.group)
                    ?.name
                }
              </span>
            </div>
          </div>
        </div>

        <div className={`${subTitleClassName}`}>성격 및 특징</div>
        <div className='flex flex-wrap'>
          {content.catPersonalities?.map((value) => (
            <div
              key={value}
              className={`${contentClassName} mr-[6px] text-nowrap mb-[6px]`}
            >
              {
                personalityButtons.find((button) => button.value === value)
                  ?.name
              }
            </div>
          ))}
        </div>
      </div>

      <div className={`${barClassName}`} />

      <div className='p-6'>
        <div className={`${titleClassName}`}>주요 출몰 위치</div>
        <div className='caption text-gray-400 mb-3'>{content.addrName}</div>
        <div className='w-full h-[136px]'>
          <MapComponent position={position} level={4}>
            <CustomPin position={position} />
          </MapComponent>
        </div>
      </div>
    </div>
  );
};

const titleClassName = 'flex flex-col pb-2 subHeading';
const subTitleClassName = 'subHeading2 text-gray-400 mb-2';
const contentClassName =
  'caption text-primary-500 bg-primary-100 px-[10px] py-[6px] rounded';
const barClassName = 'w-full h-[7px] bg-gray-50';
