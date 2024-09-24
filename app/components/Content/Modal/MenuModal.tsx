import { useRouter } from 'next/navigation';

import IconEdit from '@/assets/images/icon_edit.svg';
import IconDelete from '@/assets/images/icon_delete.svg';
import IconReport from '@/assets/images/icon_report.svg';
import Modal, { MODAL_TYPE } from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';

const MenuModal = ({
  contentId,
  isAuthor,
  countOfComments,
}: {
  contentId: string | null;
  isAuthor: boolean;
  countOfComments: number;
}) => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const onClickModifyButton = () => {
    closeModal();
    router.push(`/register/${contentId}`);
  };
  const onClickDeleteButton = () => {
    openModal(countOfComments ? MODAL_TYPE.CONTENT_ANONYMIZATION : MODAL_TYPE.CONTENT_DELETE);
  };
  const onClickReportButton = () => {
    openModal(MODAL_TYPE.CONTENT_REPORT);
  };

  return (
    <Modal type={MODAL_TYPE.CONTENT_MENU}>
      <div className='px-6 pt-[34px] pb-14 flex flex-col gap-[22px]'>
        {isAuthor && (
          <button onClick={onClickModifyButton} className='flex gap-[10px] items-center'>
            <IconEdit />
            <span>수정하기</span>
          </button>
        )}
        {isAuthor && (
          <button onClick={onClickDeleteButton} className='flex gap-[10px] items-center'>
            <IconDelete />
            <span>삭제하기</span>
          </button>
        )}
        {!isAuthor && (
          <button onClick={onClickReportButton} className='flex gap-[10px] items-center'>
            <IconReport />
            <span>신고하기</span>
          </button>
        )}
      </div>
    </Modal>
  );
};

export default MenuModal;
