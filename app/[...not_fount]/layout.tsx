import type { Metadata } from 'next';
import '../(home)/globals.css';
import RootWrapper from '@/components/RootWrapper';
import pretendard from '@/components/Pretendard';

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
      <body className={`${pretendard.className}`}>
        <RootWrapper>
          <div className='h-[calc(100%-100px)] overflow-hidden'>{children}</div>
        </RootWrapper>
      </body>
    </html>
  );
}
