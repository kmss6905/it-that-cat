import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/Modal';
import { useContent } from '@/hooks/useGetContent';
import { useModal } from '@/hooks/useModal';

const ReportNotificationModal = () => {
  const { closeModal } = useModal();
  const onClickCloseButton = async () => {
    closeModal();
  };
  return (
    <Modal
      type={MODAL_TYPE.CONTENT_REPORT_NOTIFICATION}
      variant={MODAL_VARIANT.CARD}
    >
      <div className='flex justify-center items-center flex-col py-8'>
        <div className='flex justify-center items-center flex-col mb-2 subHeading'>
          <span>신고가 접수되어</span>
          <span>숨김처리된 게시글입니다.</span>
        </div>
        <div className='flex justify-center items-center flex-col Body2'>
          <span>관리자 검토 후, 최종 삭제될 예정입니다.</span>
        </div>
      </div>
      <div className='border-t border-gray-100 w-full subHeading'>
        <button
          onClick={onClickCloseButton}
          className='w-full py-4 text-center hover:bg-gray-50 active:bg-gray-50 text-black border-r border-gray-100'
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default ReportNotificationModal;
