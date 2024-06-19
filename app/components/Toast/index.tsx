import { ToastType } from '@/stores/toast/store';
import { useEffect, useState } from 'react';
import IconToastCheck from '@/assets/images/toast/icon_toastCheck.svg';

/** @type {number} 토스트 유지 시간 */
const TOAST_DURATION = 2000;

/** @type {number} 토스트 애니메이션 시간 */
const ANIMATION_DURATION = 350;

const Toast = ({ id, message, icon }: ToastType) => {
  const [opacity, setOpacity] = useState(0.2);

  useEffect(() => {
    setOpacity(1);

    const timeoutForVisible = setTimeout(() => {
      setOpacity(0);
    }, TOAST_DURATION - ANIMATION_DURATION);

    return () => {
      clearTimeout(timeoutForVisible);
    };
  }, [id]);

  return (
    <div
      style={{ opacity: opacity }}
      className={`bg-gray-400
      min-w-[200px] py-2 px-5 max-w-[calc(100%-48px)]
      rounded-full opacity-[opacity] transition-all ease-in-out
      ${opacity === 0 ? 'translate-y-[50px]' : 'translate-y-0'}
      `}
    >
      <div className='flex justify-center items-center gap-2 text-white caption'>
        {icon === 'check' && <IconToastCheck />}
        {message}
      </div>
    </div>
  );
};

export default Toast;
