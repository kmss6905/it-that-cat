import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
}

type TokenStore = {
  token: TokenState;
  getToken: () => void;
};

const tokenStore: StateCreator<TokenStore> = (set) => ({
  token: { accessToken: null, refreshToken: null },
  getToken: () =>
    set((state) => {
      const newAccess = 'new';
      const newRefresh = 'new';

      return {
        token: {
          accessToken: newAccess,
          refreshToken: newRefresh,
        },
      };
    }),
});

const useTokenStore = create(devtools(tokenStore));

export default useTokenStore;
