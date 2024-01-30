import { ReactNode } from 'react';

interface RegisterBtn {
  children: ReactNode;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event?: any) => void;
}
const RegisterBtn = ({ children, onClick, type = 'submit' }: RegisterBtn) => {
  return (
    <button
      type={type}
      className='w-full py-14px bg-primary-500 text-white rounded-10px'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RegisterBtn;
