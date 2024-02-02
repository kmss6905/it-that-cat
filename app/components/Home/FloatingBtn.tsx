import { ReactNode } from 'react';

interface FloatingBtnProps {
  children?: ReactNode;
  className?: string;
  Icon?: any;
  onClick?: () => void;
}
const FloatingBtn = ({
  children,
  Icon,
  onClick,
  className = '',
}: FloatingBtnProps) => {
  return (
    <div
      className={`floatingBtn ${className} group -translate-y-full transition-all`}
      onClick={onClick}
    >
      {Icon ? <Icon /> : null}
      <p className='group-hover:pl-6px group-active:pl-6px group-hover:block group-active:block hidden transition-all'>
        {children}
      </p>
    </div>
  );
};

export default FloatingBtn;
