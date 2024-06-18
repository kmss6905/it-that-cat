import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  onClick?: () => void;
  border?: boolean;
  gray?: boolean;
  report?: boolean;
}

const Button = ({
  children,
  className,
  type = 'button',
  onClick,
  isDisabled,
  border = false,
  gray = false,
  report = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled ? isDisabled : false}
      className={`${className} rounded-lg px-4
      text-button tracking-[-0.32px]
      bg-primary-100
      ${border ? 'border-primary-500 border' : null}
      ${gray ? 'bg-opacity-0 text-gray-400 border-gray-100 border' : 'text-primary-500'}
      ${report ? 'body2 py-3 text-start' : 'font-semibold body1 py-[10px] text-center'}
  `}
    >
      {children}
    </button>
  );
};

export default Button;
