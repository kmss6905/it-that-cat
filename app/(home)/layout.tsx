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
  title: { default: '이냥저냥', template: '%s | 이냥저냥' },
  description: '동네 길고양이의 위치와 정보를 등록하고 최근 소식을 사진과 함께 공유하는 서비스',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONT_URL}`),
  keywords: [
    '이냥저냥',
    '길고양이 서비스',
    '동네',
    '중성화',
    '냥냥이',
    '길냥이',
    '고양이 커뮤니티',
    '고양이 밥주기',
    '소식',
    '고양이',
    '캣맘',
  ],
  openGraph: {
    title: '이냥저냥 - 고양이들의 발자국, 우리 동네에서 사진으로 공유하세요!',
    description: '동네 길고양이의 위치와 정보를 등록하고 최근 소식을 사진과 함께 공유하는 서비스',
    url: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
    images: [
      {
        url: '/open_graph.jpg',
        width: 1200,
        height: 600,
        alt: '이냥저냥 - 고양이들의 발자국, 우리 동네에서 사진으로 공유하세요!',
      },
    ],
    type: 'website',
    siteName: '이냥저냥',
  },
  verification: {
    other: { 'naver-site-verification': `${process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION}` },
  },
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
        <Script src={`${process.env.NEXT_PUBLIC_KAKAO_MAP_URL}`} strategy='afterInteractive' />
      </body>
    </html>
  );
}
