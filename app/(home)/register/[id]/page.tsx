'use client';
import RegisterConent from '@/components/Content/RegisterContent';
import { useContent } from '@/hooks/useGetContent';

const RegisterPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data } = useContent(id);

  return <RegisterConent data={data} initMode='post' />;
};

export default RegisterPage;
