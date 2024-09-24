import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';
import ImgNotice from '@/assets/images/mypage/img_notice.svg';

const UpdateNoticeModal = () => {
  const { closeModal } = useModal();
  return (
    <Modal type={MODAL_TYPE.UPDATE_NOTICE} variant={MODAL_VARIANT.CARD}>
      <div className='flex flex-col gap-5 pt-7 pb-10 items-center text-center subHeading text-gray-500'>
        <ImgNotice />
        <p className='px-16'>
          곧 업데이트 될 예정이에요...
          <br />
          조금만 기다려주세요!
        </p>
      </div>
      <button
        onClick={() => closeModal()}
        className='w-full py-4 border-t border-gray-100 hover:bg-gray-50 transition-colors'
      >
        확인
      </button>
    </Modal>
  );
};

export default UpdateNoticeModal;
