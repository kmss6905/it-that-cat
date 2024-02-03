import { ReactNode } from 'react';

interface RegisterBtn {
  children: ReactNode;
  type?: 'submit' | 'reset' | 'button';
  isDisabled?: boolean;
  onClick?: (event?: any) => void;
}
const RegisterBtn = ({
  children,
  onClick,
  isDisabled = false,
  type = 'submit',
}: RegisterBtn) => {
  return (
    <button
      type={type}
      disabled={isDisabled ? isDisabled : false}
      className={`w-full py-14px text-white rounded-10px
      ${isDisabled ? 'bg-primary-200' : 'bg-primary-500'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RegisterBtn;
