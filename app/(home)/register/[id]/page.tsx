'use client';
import RegisterContent from '@/components/Content/RegisterContent';
import { useContent } from '@/hooks/queries/useGetContent';
import { notFound } from 'next/navigation';

const RegisterPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data } = useContent(id);

  if (data?.result === 'ERROR') {
    notFound();
  }

  return <RegisterContent data={data?.data} initMode='post' isNew={false} />;
};

export default RegisterPage;
