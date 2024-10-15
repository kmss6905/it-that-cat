import type { Metadata } from 'next';
import Script from 'next/script';

import '../(home)/globals.css';
import RootWrapper from '@/components/common/Wrapper/RootWrapper';
import pretendard from '@/components/common/Pretendard';

export const metadata: Metadata = {
  title: '이냥저냥',
  description: '길을 잃으셨군요..',
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
        <RootWrapper>
          <div className='h-[calc(100%-100px)] overflow-hidden'>{children}</div>
        </RootWrapper>
      </body>
    </html>
  );
}
