import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';
import IconDelete from '@/assets/images/icon_delete.svg';

const DeleteMyContentModal = ({ countOfComments }: { countOfComments: number }) => {
  const { openModal } = useModal();

  const onClickDeleteButton = () => {
    openModal(countOfComments ? MODAL_TYPE.CONTENT_ANONYMIZATION : MODAL_TYPE.CONTENT_DELETE);
  };

  return (
    <Modal type={MODAL_TYPE.MY_CONTENT_DELETE} variant={MODAL_VARIANT.SLIDE}>
      <div className='px-6 pt-[34px] pb-14 flex flex-col gap-[22px]'>
        <button onClick={onClickDeleteButton} className='flex gap-[10px] items-center'>
          <IconDelete />
          <span>삭제하기</span>
        </button>
      </div>
    </Modal>
  );
};

export default DeleteMyContentModal;
