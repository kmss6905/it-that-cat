import IconEdit from '@/assets/images/icon_edit.svg';
import IconDelete from '@/assets/images/icon_delete.svg';
import IconReport from '@/assets/images/icon_report.svg';
import Modal, { MODAL_TYPE } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';

const MenuModal = () => {
  const { openModal } = useModal();
  const onClickDeleteButton = () => {
    openModal(MODAL_TYPE.CONTENT_ANONYMIZATION);
  };
  const onClickReportButton = () => {
    openModal(MODAL_TYPE.CONTENT_REPORT);
  };

  return (
    <Modal type={MODAL_TYPE.CONTENT_MENU}>
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
        <button
          onClick={onClickReportButton}
          className='flex gap-[10px] items-center'
        >
          <IconReport />
          <span>신고하기</span>
        </button>
      </div>
    </Modal>
  );
};

export default MenuModal;
