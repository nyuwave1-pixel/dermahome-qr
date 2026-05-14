import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DermaHome 10 | UNI&CORE — 프리미엄 피부 관리 시스템',
    template: '%s | DermaHome',
  },
  description: '유니앤코어 더마10 — 8종 헤드 올인원 피부 미용 기기. QR 정품 인증 및 스마트 피부 관리 서비스.',
  keywords: ['더마10', 'DermaHome', '유니앤코어', 'UNICORE', 'QR인증', '피부관리', '미용기기', '피부미용기기'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#07070a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body
        className="min-h-full flex flex-col"
        style={{ background: '#07070a', color: '#f8f8f6' }}
      >
        {children}
      </body>
    </html>
  );
}
