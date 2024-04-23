import IconDeleteModal from '@/assets/images/icon_deleteModal.svg';
import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';

const DeleteCatNewsModal = () => {
  const { closeModal } = useModal();
  return (
    <Modal type={MODAL_TYPE.CAT_NEWS_DELETE} variant={MODAL_VARIANT.CARD}>
      <div className='flex justify-center items-center flex-col py-8'>
        <div className='flex justify-center items-center mb-5'>
          <div
            className='w-16 h-16 flex justify-center items-center rounded-full bg-gray-100'
            style={{ background: 'rgba(255, 94, 94, 0.1)' }}
          >
            <IconDeleteModal />
          </div>
        </div>
        <div className='mb-2 subHeading'>소식을 삭제하시겠어요?</div>
        <div className='flex justify-center items-center flex-col Body2'>
          <span>삭제 버튼 선택 시, 작성한 글과 좋아요가</span>
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
        <button className='w-1/2 py-4 text-center hover:bg-gray-50 active:bg-gray-50 text-error'>
          삭제
        </button>
      </div>
    </Modal>
  );
};

export default DeleteCatNewsModal;
