import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/i18n/LanguageContext';

const SITE_URL = 'https://unicore-dermahome-qr.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Derma Series | UNI&CORE — Premium Skin Care System',
    template: '%s | DermaHome',
  },
  description: 'UNI&CORE Derma Series — 8-head all-in-one skin care device. QR authentication and smart skin care service.',
  keywords: ['Derma Series', 'DermaHome', 'UNI&CORE', 'UNICORE', 'QR Auth', 'Skin Care', 'Beauty Device', 'K-Beauty'],
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
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'UNI&CORE DermaHome',
    title: 'Derma Series | UNI&CORE — Premium Skin Care System',
    description: '8-head all-in-one skin care device. Experience smart skin care with QR authentication.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'UNI&CORE Derma Series' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Derma Series | UNI&CORE',
    description: '8-head all-in-one premium skin care device. QR authentication system.',
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
  description: '8-head all-in-one skin care device. RF, Ultrasonic, Iontophoresis and 8 skin care technologies.',
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
    <html lang="en" className="h-full" suppressHydrationWarning>
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
