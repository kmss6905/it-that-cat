import { useState } from 'react';

import IconBackBlack from '@/assets/images/icon_backBlack.svg';
import { useModal } from '@/hooks/useModal';
import Modal, { MODAL_TYPE, MODAL_VARIANT } from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { reportButtons } from '@/constants/reportButtons';
import { TextareaInput } from '@/components/common/Input';
import RegisterButton from '@/components/common/Button/RegisterButton';
import { reportContent } from '@/apis/contents';
import { ContentReportProps } from '@/types/content';
import { ResType } from '@/types/api';

const ReportModal = ({ contentId, nickname, name }: { contentId: string | null; nickname: string; name: string }) => {
  const { closeModal, openModal } = useModal();
  const [report, setReport] = useState<{ category: string; content: string }>({
    category: '',
    content: '',
  });
  const onClickOnlyOne = (name: string, value: string) => {
    setReport({
      ...report,
      [name]: value,
    });
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: value,
    });
  };
  const resetAndCloseModal = () => {
    setReport({ category: '', content: '' });
    closeModal();
  };
  const onClickReportButton = async () => {
    const data: ContentReportProps = {
      ...report,
      contentId,
    };
    const res: ResType<string> = await reportContent(data);

    if (res.result === 'SUCCESS') {
      openModal(MODAL_TYPE.CONTENT_REPORT_COMPLETED);
    }
  };
  return (
    <Modal type={MODAL_TYPE.CONTENT_REPORT} variant={MODAL_VARIANT.ALL}>
      <div className='w-full relative py-6'>
        <button onClick={() => resetAndCloseModal()} className='absolute left-5 top-1/2 -translate-y-1/2'>
          <IconBackBlack />
        </button>
        <h2 className='w-full text-center subHeading'>게시글 신고</h2>
      </div>
      <div className='px-5 py-3 subHeading'>
        <div>
          '{nickname ?? '익명의 집사'}'님이 등록한 '{name}'
        </div>
        <div>게시글을 신고하는 이유를 선택해주세요.</div>
      </div>
      <div className='px-5 flex flex-col gap-2'>
        {reportButtons.map(({ name, value }) => (
          <Button
            key={value}
            onClick={() => onClickOnlyOne('category', value)}
            border={report.category === value}
            gray={report.category !== value}
            report
          >
            {name}
          </Button>
        ))}
        <TextareaInput
          name='content'
          value={report.content}
          onChange={onChange}
          maxLength={299}
          placeholder={'신고 내용을 입력해주세요.'}
          isDisabled={report.category !== 'OTHER'}
          report
        />
      </div>
      <div className='absolute bottom-0 left-0 w-full z-20 px-6 pt-[18px] pb-[30px] shadow-[0px_-8px_8px_0px_rgba(0,0,0,0.15)] bg-white'>
        <RegisterButton
          onClick={onClickReportButton}
          isDisabled={!report.category || (report.category === 'OTHER' && !report.content)}
        >
          신고 접수하기
        </RegisterButton>
      </div>
    </Modal>
  );
};

export default ReportModal;
