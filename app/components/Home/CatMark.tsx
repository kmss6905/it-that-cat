import IconCheck from '@/assets/images/icon_check.svg';
import IconChecked from '@/assets/images/icon_checked.svg';

interface CatMarkProps {
  onClick: () => void;
  isChecked?: boolean;
  className?: string;
  type?: 'Map' | 'List';
}

const CatMark = ({
  onClick,
  isChecked = false,
  type = 'List',
  className = '',
}: CatMarkProps) => {
  return (
    <div
      className={`catMark transition-colors
      ${type === 'List' ? 'left-[110px]' : 'left-6'}
      ${isChecked ? 'border-gray-300 text-gray-400' : 'border-gray-100 text-gray-200'}
      ${className}`}
      onClick={onClick}
    >
      <span className='flex justify-center items-center'>
        {isChecked ? <IconChecked /> : <IconCheck />}
      </span>
      팔로우한 냥이만
    </div>
  );
};

export default CatMark;
