'use client';
import Toast from '.';
import { useToast } from '@/stores/toast/store';

const ToastProvider = () => {
  const { toasts } = useToast();
  return (
    <div className='fixed z-30 bottom-[100px] py-4 left-1/2 -translate-x-1/2 flex flex-col gap-5'>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastProvider;
