'use client';
import { reissueToken } from '@/apis/login';
import { getCookie } from '@/utils/cookieStore';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useEffect, useState } from 'react';

const useTokenReissue = () => {
  const [accessToken, setAccessToken] = useState<
    ResponseCookie | undefined | null
  >(null);
  const [refreshToken, setRefreshToken] = useState<
    ResponseCookie | undefined | null
  >(null);

  useEffect(() => {
    if (accessToken === null) {
      (async () => {
        const token = await getCookie('accessToken');
        setAccessToken(token);
      })();
    }

    if (refreshToken === null) {
      (async () => {
        const token = await getCookie('refreshToken');
        setRefreshToken(token);
      })();
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (!accessToken && refreshToken) {
      const reissueAccessToken = async () => {
        await reissueToken();
      };

      reissueAccessToken();
    }
  }, [accessToken, refreshToken]);
};

export default useTokenReissue;
