import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  onClick?: () => void;
  border?: boolean;
  gray?: boolean;
}

const Button = ({
  children,
  className,
  type = 'button',
  onClick,
  isDisabled,
  border = false,
  gray = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled ? isDisabled : false}
      className={`${className} rounded-lg text-center py-[10px] px-4
      text-button font-semibold body1 tracking-[-0.32px]
      bg-primary-100
      ${border ? 'border-primary-500 border' : null}
      ${gray ? 'bg-opacity-0 text-gray-400 border-gray-100 border' : 'text-primary-500'}
  `}
    >
      {children}
    </button>
  );
};

export default Button;
