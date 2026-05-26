import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/i18n/LanguageContext';

const SITE_URL = 'https://unicore-dermahome-qr.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DermaHome 10 | UNI&CORE — 프리미엄 피부 관리 시스템',
    template: '%s | DermaHome',
  },
  description: '유니앤코어 더마10 — 8종 헤드 올인원 피부 미용 기기. QR 정품 인증 및 스마트 피부 관리 서비스.',
  keywords: ['더마10', 'DermaHome', '유니앤코어', 'UNICORE', 'QR인증', '피부관리', '미용기기', '피부미용기기'],
  authors: [{ name: 'UNI&CORE', url: SITE_URL }],
  creator: 'UNI&CORE',
  publisher: 'UNI&CORE',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: 'UNI&CORE DermaHome',
    title: 'DermaHome 10 | UNI&CORE — 프리미엄 피부 관리 시스템',
    description: '8종 헤드 올인원 피부 미용 기기. QR 정품 인증으로 스마트 피부 관리를 경험하세요.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'UNI&CORE DermaHome 10' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DermaHome 10 | UNI&CORE',
    description: '8종 헤드 올인원 피부 미용 기기. QR 정품 인증 시스템.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
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

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'DermaHome 10',
  brand: { '@type': 'Brand', name: 'UNI&CORE' },
  description: '8종 헤드 올인원 피부 미용 기기. RF, 초음파, 이온토포레시스 등 8가지 피부 케어 기술.',
  url: 'https://unicore-dermahome-qr.netlify.app',
  image: 'https://unicore-dermahome-qr.netlify.app/images/derma10.jpg',
  offers: { '@type': 'Offer', availability: 'https://schema.org/InStoreOnly', priceCurrency: 'KRW' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '18514' },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
