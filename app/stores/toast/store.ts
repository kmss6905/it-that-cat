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
  addToast: (message: string, icon?: IconType) => void;
}

/**
 * @method addToast 토스트 메시지 설정 메소드
 * @param message 필수, 띄울 토스트 메세지
 * @param icon 선택, 토스트 메시지 앞 아이콘 타입
 */
export const useToast = create<ToastProps>((set) => ({
  toasts: [],
  addToast: (message, icon) => {
    const key = Date.now();
    const TOAST_DURATION = 3000;

    set((prev) => ({
      toasts: [...prev.toasts, { id: key, message, icon }],
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
}));
