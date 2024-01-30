import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  onClick?: () => void;
  border?: boolean;
}

const Button = ({
  children,
  className,
  type = 'button',
  onClick,
  isDisabled,
  border = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled ? isDisabled : false}
      className={`${className} border rounded-lg text-center py-[10px] px-4
      text-button font-semibold
      bg-primary-100 text-primary-500
  ${border ? 'border-primary-500 border-[1px]' : 'border-none'}
  `}
    >
      {children}
    </button>
  );
};

export default Button;
