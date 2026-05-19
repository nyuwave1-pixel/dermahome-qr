import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/i18n/LanguageContext';

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
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#07070a' },
    { media: '(prefers-color-scheme: light)', color: '#f4f4f0' },
  ],
};

// Inline script — runs before React hydrates to prevent flash
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full">
      {/* Flash-prevention: must execute synchronously before paint */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
