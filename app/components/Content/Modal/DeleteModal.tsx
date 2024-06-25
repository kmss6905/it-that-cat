import { useRouter } from 'next/navigation';

import { deleteContent } from '@/apis/contents';
import IconDeleteModal from '@/assets/images/icon_deleteModal.svg';
import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';
import { ResType } from '@/types/api';

const DeleteModal = ({ contentId }: { contentId: string | null }) => {
  const router = useRouter();
  const { closeModal } = useModal();
  const onClickDeleteButton = async () => {
    const res: ResType<string> = await deleteContent(contentId);

    if (res.result === 'SUCCESS') {
      router.push(`/`);
    }
  };
  return (
    <Modal type={MODAL_TYPE.CONTENT_DELETE} variant={MODAL_VARIANT.CARD}>
      <div className='flex justify-center items-center flex-col py-8'>
        <div className='flex justify-center items-center mb-5'>
          <div
            className='w-16 h-16 flex justify-center items-center rounded-full bg-gray-100'
            style={{ background: 'rgba(255, 94, 94, 0.1)' }}
          >
            <IconDeleteModal />
          </div>
        </div>
        <div className='mb-2 subHeading'>고양이 정보를 삭제하시겠어요?</div>
        <div className='flex justify-center items-center flex-col Body2'>
          <span>삭제 버튼 선택 시, 등록한 고양이 정보가</span>
          <span>즉시 삭제되며 복구할 수 없습니다.</span>
        </div>
      </div>
      <div className='border-t border-gray-100 w-full subHeading'>
        <button
          onClick={closeModal}
          className='w-1/2 py-4 text-center hover:bg-gray-50 active:bg-gray-50 text-black border-r border-gray-100'
        >
          취소
        </button>
        <button
          onClick={onClickDeleteButton}
          className='w-1/2 py-4 text-center hover:bg-gray-50 active:bg-gray-50 text-error'
        >
          삭제
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
