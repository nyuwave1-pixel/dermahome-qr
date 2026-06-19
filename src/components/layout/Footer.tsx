'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Globe, Store, Play } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="relative mt-auto"
      style={{ borderTop: '1px solid var(--bd-3)' }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(92,138,60,0.5), transparent)' }}
      />

      <div style={{ background: 'var(--t-bg-dp)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Brand + Links */}
            <div className="md:col-span-1">
              <div className="inline-block mb-4 px-4 py-2 rounded-xl" style={{ background: '#f5f5f3' }}>
                <Image
                  src="/images/logo_with_slogan.png"
                  alt="UNI&CORE — United power of uni&core to the global"
                  width={180}
                  height={54}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="mb-5" />
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: 'var(--t-6)' }}
              >
                {t('footer.links')}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: '/generate', label: t('footer.qr_link'), icon: Store },
                  { href: 'https://www.youtube.com/@unincore.official/videos', label: t('footer.youtube'), icon: Play, ext: true },
                  { href: 'https://www.unincore.com', label: 'www.unincore.com', icon: Globe, ext: true },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={'ext' in item && item.ext ? '_blank' : undefined}
                      rel={'ext' in item && item.ext ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-sm transition-colors"
                      style={{ color: 'var(--t-4)' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#9dd470')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--t-4)')}
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Info — registration details */}
            <div className="md:col-span-2">
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--t-6)' }}
              >
                {t('footer.company_info')}
              </h4>

              <div className="text-sm font-bold mb-2" style={{ color: 'var(--t-2)' }}>
                {t('footer.company_name')}
              </div>

              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--t-5)' }}>
                {t('footer.address')}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs mb-3" style={{ color: 'var(--t-5)' }}>
                <span>
                  <span style={{ color: 'var(--t-7)' }}>{t('footer.ceo_label')}</span>{' '}
                  {t('footer.ceo')}
                </span>
                <span style={{ color: 'var(--bd-2)' }}>|</span>
                <span>
                  <span style={{ color: 'var(--t-7)' }}>{t('footer.biz_reg_label')}</span>{' '}
                  {t('footer.biz_reg')}
                </span>
                <span style={{ color: 'var(--bd-2)' }}>|</span>
                <span>
                  <span style={{ color: 'var(--t-7)' }}>{t('footer.commerce_label')}</span>{' '}
                  {t('footer.commerce')}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs" style={{ color: 'var(--t-5)' }}>
                <span>
                  <span style={{ color: 'var(--t-7)' }}>TEL</span>{' '}
                  {t('footer.tel')}
                </span>
                <span style={{ color: 'var(--bd-2)' }}>|</span>
                <span>
                  <span style={{ color: 'var(--t-7)' }}>FAX</span>{' '}
                  {t('footer.fax')}
                </span>
                <span style={{ color: 'var(--bd-2)' }}>|</span>
                <span>
                  <span style={{ color: 'var(--t-7)' }}>EMail</span>{' '}
                  <a
                    href={`mailto:${t('footer.email')}`}
                    className="transition-colors"
                    style={{ color: 'var(--t-5)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#9dd470')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--t-5)')}
                  >
                    {t('footer.email')}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid var(--bd-3)' }}
          >
            <p className="text-xs" style={{ color: 'var(--t-7)' }}>
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full animate-glow-fast"
                style={{ display: 'inline-block', background: '#5c8a3c' }}
              />
              <span className="text-xs" style={{ color: 'var(--t-7)' }}>
                {t('footer.system')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
