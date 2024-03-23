import IconEdit from '@/assets/images/icon_edit.svg';
import IconDelete from '@/assets/images/icon_delete.svg';
import Modal, { MODAL_TYPE } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';

const ManuModal = () => {
  const { openModal } = useModal();
  const onClickDeleteButton = () => {
    openModal(MODAL_TYPE.CONTENT_DELETE);
  };

  return (
    <Modal type={MODAL_TYPE.CONTENT_MANU}>
      <div className='px-6 pt-[34px] pb-14 flex flex-col gap-[22px]'>
        <button className='flex gap-[10px] items-center'>
          <IconEdit />
          <span>수정하기</span>
        </button>
        <button
          onClick={onClickDeleteButton}
          className='flex gap-[10px] items-center'
        >
          <IconDelete />
          <span>삭제하기</span>
        </button>
      </div>
    </Modal>
  );
};

export default ManuModal;
