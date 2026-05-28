import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: '소재 제작 가이드 | 키움증권',
  description: '키움증권 광고 소재 제작 가이드 및 문구 입력',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geist.variable} h-full`}>
      <body className="h-full bg-[#0b1220] font-sans text-slate-100 antialiased">{children}</body>
    </html>
  );
}
