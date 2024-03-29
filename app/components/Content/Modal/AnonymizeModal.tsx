import IconDownArrow from '@/assets/images/icon_downArrow.svg';
import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';

const AnonymizeModal = () => {
  const { closeModal } = useModal();
  return (
    <Modal type={MODAL_TYPE.CONTENT_ANONYMIZATION} variant={MODAL_VARIANT.CARD}>
      <div className='flex justify-center items-center flex-col py-8'>
        <div className='flex justify-center items-center flex-col mb-7'>
          <div className='px-3 py-1 rounded-md bg-gray-50 text-gray-300 caption2'>
            이냥저냥님 등록
          </div>
          <div className='py-[14px]'>
            <IconDownArrow />
          </div>
          <div className='px-3 py-1 rounded-md bg-primary-100 text-primary-500 subHeading2'>
            익명의 472948님 등록
          </div>
        </div>
        <div className='mb-2 subHeading'>닉네임을 익명 처리 하시겠어요?</div>
        <div className='flex justify-center items-center flex-col Body2'>
          <span>최소 1개 이상의 근황이 공유된 고양이는</span>
          <span>작성자가 임의로 삭제할 수 없습니다.</span>
        </div>
      </div>
      <div className='border-t border-gray-100 w-full subHeading'>
        <button
          onClick={closeModal}
          className='w-1/2 py-4 text-center hover:bg-gray-50 active:bg-gray-50 text-black border-r border-gray-100'
        >
          취소
        </button>
        <button className='w-1/2 py-4 text-center hover:bg-gray-50 active:bg-gray-50 text-black'>
          익명으로
        </button>
      </div>
    </Modal>
  );
};

export default AnonymizeModal;
