import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = {
  title: '소재 제작 가이드 | 키움증권',
  description: '키움증권 광고 소재 제작 가이드 및 문구 입력',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${GeistSans.variable} h-full`}>
      <body className="h-full bg-[#0b1220] font-sans text-slate-100 antialiased">{children}</body>
    </html>
  );
}
