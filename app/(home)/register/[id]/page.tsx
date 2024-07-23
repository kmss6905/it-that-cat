'use client';
import RegisterContent from '@/components/Content/RegisterContent';
import { useContent } from '@/hooks/queries/useGetContent';

const RegisterPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data } = useContent(id);

  return <RegisterContent data={data} initMode='post' isNew={false} />;
};

export default RegisterPage;
