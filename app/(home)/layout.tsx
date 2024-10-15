import type { Metadata } from 'next';
import Script from 'next/script';

import RootWrapper from '@/components/common/Wrapper/RootWrapper';
import pretendard from '@/components/common/Pretendard';
import QueryWrapper from '@/components/common/Wrapper/QueryWrapper';
import Loading from '@/components/common/Loading';
import ToastProvider from '@/components/common/Toast/ToastProvider';
import AlertContextProvider from '@/components/common/Alert';
import './globals.css';

export const metadata: Metadata = {
  title: '이냥저냥',
  description: '동네 길고양이의 위치와 정보를 등록하고 최근 소식을 사진과 함께 공유하는 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        {/* Google Analytics or Google Tag Manager */}
        <Script async src='https://www.googletagmanager.com/gtag/js?id=G-2469LZJEG5' strategy='afterInteractive' />
        <Script id='gtag-init' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2469LZJEG5');
          `}
        </Script>
      </head>
      <body className={`${pretendard.className}`}>
        <QueryWrapper>
          <RootWrapper>
            <AlertContextProvider>
              <div className='h-full overflow-hidden'>{children}</div>
              <ToastProvider />
              <Loading />
            </AlertContextProvider>
          </RootWrapper>
        </QueryWrapper>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=clusterer&autoload=false`}
          strategy='beforeInteractive'
        />
        <Script src={`https://developers.kakao.com/sdk/js/kakao.js`} strategy='afterInteractive' />
      </body>
    </html>
  );
}
