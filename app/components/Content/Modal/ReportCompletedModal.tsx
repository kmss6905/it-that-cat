import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/Modal';
import { useContent } from '@/hooks/useGetContent';
import { useModal } from '@/hooks/useModal';

const ReportCompletedModal = ({ contentId }: { contentId: string | null }) => {
  const { closeModal } = useModal();
  const { refetch } = useContent(contentId);
  const onClickCloseButton = async () => {
    refetch();
    closeModal();
  };
  return (
    <Modal
      type={MODAL_TYPE.CONTENT_REPORT_COMPLETED}
      variant={MODAL_VARIANT.CARD}
    >
      <div className='flex justify-center items-center flex-col py-8'>
        <div className='mb-2 subHeading'>게시글 신고가 접수되었습니다.</div>
        <div className='flex justify-center items-center flex-col Body2'>
          <span>해당 게시글은 자동으로</span>
          <span>숨김처리되며 관리자 검토 후</span>
          <span>(2~3일 소요) 최종 삭제됩니다.</span>
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

export default ReportCompletedModal;
