'use client';
import RegisterContent from '@/components/Content/RegisterContent';
import { useContent } from '@/hooks/queries/useGetContent';
import useNotFound from '@/hooks/utils/useNotFound';
import { RegisterCatObjProps } from '@/types/content';

const RegisterPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const queryResult = useContent(id);
  const { data } = useNotFound<RegisterCatObjProps>(queryResult);

  return <RegisterContent data={data} initMode='post' isNew={false} />;
};

export default RegisterPage;
