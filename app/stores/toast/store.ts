import { Key } from 'react';
import { create } from 'zustand';

type IconType = 'check';

export type ToastType = {
  id: Key;
  message: string;
  icon?: IconType;
};

interface ToastProps {
  toasts: ToastType[];
  addToast: {
    default: (message: string) => void;
    check: (message: string) => void;
  };
}

/**
 * @param addToast.default 토스트 메세지만 띄울 때
 * @param addToast.check 체크 아이콘과 메세지를 같이 띄울 때
 */
export const useToast = create<ToastProps>((set) => ({
  toasts: [],
  addToast: {
    default: (message) => {
      const key = Date.now();
      const TOAST_DURATION = 3000;

      set((prev) => ({
        toasts: [...prev.toasts, { id: key, message }],
      }));

      setTimeout(() => {
        set((prev) => {
          const deleteToasts = prev.toasts.filter((toast) => toast.id !== key);
          return {
            toasts: deleteToasts,
          };
        });
      }, TOAST_DURATION);
    },
    check: (message) => {
      const key = Date.now();
      const TOAST_DURATION = 3000;

      set((prev) => ({
        toasts: [...prev.toasts, { id: key, message, icon: 'check' }],
      }));

      setTimeout(() => {
        set((prev) => {
          const deleteToasts = prev.toasts.filter((toast) => toast.id !== key);
          return {
            toasts: deleteToasts,
          };
        });
      }, TOAST_DURATION);
    },
  },
}));
