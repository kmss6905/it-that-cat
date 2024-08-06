'use client';

import RegisterComment from '@/components/Content/CatNews/RegisterComment';

const RegisterCommentPage = ({
  params,
}: {
  params: { contentId: string; commentId: string };
}) => {
  const { contentId, commentId } = params;
  return <RegisterComment contentId={contentId} commentId={commentId} />;
};

export default RegisterCommentPage;
