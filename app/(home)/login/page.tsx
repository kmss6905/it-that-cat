'use client';
import { handleClickLogin } from '@/apis/login/onClickLogin';

const LoginPage = () => {
  return (
    <div>
      <h2>LoginPage</h2>
      <button onClick={handleClickLogin}>카카오로 로그인하기</button>
    </div>
  );
};

export default LoginPage;
