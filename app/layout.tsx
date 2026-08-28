import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '한자의 뿌리 · 214부수 특강',
  description: '50분 × 10타임으로 배우는 교수용 한자 부수 웹 수업자료',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
