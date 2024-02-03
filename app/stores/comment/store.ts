import { create } from 'zustand';

type ContentStoreProps = {
  contentId: string | null;
  setContentId: (user: string | null) => void;
};

export const contentStore = create<ContentStoreProps>((set) => ({
  contentId: null,
  setContentId: (contentId: string | null) => set({ contentId: contentId }),
}));
