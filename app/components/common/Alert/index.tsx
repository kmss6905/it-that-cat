'use client';
import React, { createContext, ReactNode, useState } from 'react';

/**
 * Alert 타입 정의.
 * alert 함수는 선택적인 message를 인자로 받고, boolean 값을 resolve하는 Promise를 반환.
 */
type AlertType = {
  /**
   * alert 함수.
   * 이 함수는 경고 메시지를 표시하고, 확인 버튼을 클릭할 때까지 대기하는 Promise를 반환한다.
   * 확인 버튼이 클릭되면 Promise는 resolve(true)로 완료된다.
   *
   * @param {string} [message] - 경고창에 표시할 선택적인 메시지.
   * @returns {Promise<boolean>} 사용자가 확인 버튼을 클릭할 때 true로 resolve되는 Promise.
   */
  alert: (message?: string) => Promise<boolean>;
};

/**
 * AlertContext 생성.
 * 기본값으로 alert 함수는 실패하는 Promise를 반환하도록 설정.
 * 실제 구현은 AlertContextProvider에서 제공됨.
 */
export const AlertContext = createContext<AlertType>({
  alert: () => new Promise((_, reject) => reject()),
});

/**
 * Alert 상태를 관리하는 타입 정의.
 * message: 경고창에 표시될 텍스트.
 * onClickOk: 확인 버튼 클릭 시 호출될 콜백 함수.
 */
type AlertState = {
  message: string;
  onClickOk: () => void;
};

/**
 * AlertContextProvider 컴포넌트.
 * 이 컴포넌트는 자식 컴포넌트에 AlertContext를 제공하며, 전역적으로 alert 함수를 사용할 수 있게 한다.
 * 내부적으로 alert 함수는 메시지를 받고, 확인 버튼을 클릭할 때까지 대기하는 Promise를 반환.
 *
 * @param {ReactNode} children - AlertContextProvider가 감싸고 있는 자식 컴포넌트들.
 * @returns {JSX.Element} AlertContext.Provider를 사용하여 자식 컴포넌트에게 alert 함수를 제공.
 */
export const AlertContextProvider = ({ children }: { children?: ReactNode }): JSX.Element => {
  const [state, setState] = useState<AlertState>();

  /**
   * alert 함수.
   * 이 함수는 경고 메시지를 표시하고, 확인 버튼을 클릭할 때까지 대기하는 Promise를 반환한다.
   * 확인 버튼이 클릭되면 Promise는 resolve(true)로 완료된다.
   *
   * @param {string} [message] - 경고창에 표시할 선택적인 메시지.
   * @returns {Promise<boolean>} 사용자가 확인 버튼을 클릭할 때 true로 resolve되는 Promise.
   */
  const alert = (message?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        message: message ?? '',
        onClickOk: () => {
          setState(undefined);
          resolve(true);
        },
      });
    });
  };

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      {state && <Alert message={state.message} onClickOk={state.onClickOk} />}
    </AlertContext.Provider>
  );
};

/**
 * Alert 컴포넌트에 전달될 props 타입 정의.
 * message: 경고창에 표시될 텍스트.
 * onClickOk: 확인 버튼이 클릭될 때 실행될 콜백 함수.
 */
interface AlertProps {
  message: string;
  onClickOk: () => void;
}

/**
 * Alert 컴포넌트.
 * 경고창 UI를 구성하며, 사용자가 확인 버튼을 클릭하면 onClickOk 콜백을 호출한다.
 *
 * @param {string} message - 경고창에 표시될 메시지.
 * @param {function} onClickOk - 확인 버튼 클릭 시 실행될 함수.
 * @returns {JSX.Element} 경고창 UI.
 */
const Alert = ({ message, onClickOk }: AlertProps): JSX.Element => {
  return (
    <div className='max-w-lg w-full mx-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
      <div className='bg-white rounded-lg mx-11 overflow-hidden'>
        <div className='flex flex-col gap-5 pt-11 pb-10 items-center text-center [&_p]:body2 text-gray-500'>
          <p>{message}</p>
        </div>
        <button
          onClick={onClickOk}
          className='w-full py-4 text-center hover:bg-gray-50 active:bg-gray-50 text-black border-t border-gray-100'
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertContextProvider;
