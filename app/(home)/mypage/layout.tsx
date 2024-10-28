import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: '마이페이지',
  robots: { index: false, follow: false, nocache: true },
};

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
