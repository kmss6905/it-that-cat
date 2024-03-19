'use client';
import { reissueToken } from '@/apis/login';
import { useEffect } from 'react';

const useTokenReissue = () => {
  useEffect(() => {
    const reissueAccessToken = async () => {
      await reissueToken();
    };
    reissueAccessToken();
  }, []);
};

export default useTokenReissue;
