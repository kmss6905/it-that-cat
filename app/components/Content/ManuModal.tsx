import IconEdit from '@/assets/images/icon_edit.svg';
import IconDelete from '@/assets/images/icon_delete.svg';
import Modal from '@/components/Modal';

const ManuModal = () => {
  return (
    <Modal>
      <div className='px-6 pt-[34px] pb-14 flex flex-col gap-[22px]'>
        <button className='flex gap-[10px] items-center'>
          <IconEdit />
          <span>수정하기</span>
        </button>
        <button className='flex gap-[10px] items-center'>
          <IconDelete />
          <span>삭제하기</span>
        </button>
      </div>
    </Modal>
  );
};

export default ManuModal;
