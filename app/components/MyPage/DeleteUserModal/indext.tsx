import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/Modal';
import ImgDeleteUser from '@/assets/images/mypage/img_deleteUser.svg';
import { useModal } from '@/hooks/useModal';
import { deleteUser } from '@/apis/mypage';
import { useToast } from '@/stores/toast/store';

const DeleteUserModal = () => {
  const { closeModal } = useModal();
  const { addToast } = useToast();

  const handleDeleteUser = async () => {
    const res = await deleteUser('kakao');
    if (res.result === 'SUCCESS') {
      closeModal();
    } else if (res.result === 'ERROR' && res.error) {
      addToast.default(res.error.message);
    }
  };

  return (
    <Modal type={MODAL_TYPE.DELETE_USER} variant={MODAL_VARIANT.CARD}>
      <div className='flex flex-col gap-5 pt-11 pb-10 items-center text-center [&_h3]:subHeading [&_p]:body2 text-gray-500'>
        <ImgDeleteUser />
        <div>
          <h3 className='pb-2'>정말로 회원을 탈퇴하시겠어요?</h3>
          <p>
            회원 탈퇴 시 계정 정보 및 작성한 게시글과
            <br />
            댓글은 모두 삭제되어 복구가 불가능해요.
          </p>
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
          onClick={() => handleDeleteUser()}
          className='w-1/2 py-4 text-center hover:bg-gray-50 active:bg-gray-50 text-error'
        >
          회원탈퇴
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
