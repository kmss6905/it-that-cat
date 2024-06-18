'use client';
import RegisterContent from '@/components/Content/RegisterContent';
import { useContent } from '@/hooks/useGetContent';

const RegisterPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data } = useContent(id);

  return <RegisterContent data={data} initMode='post' />;
};

export default RegisterPage;
