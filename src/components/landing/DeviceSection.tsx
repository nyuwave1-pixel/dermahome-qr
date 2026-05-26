'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';

const galleryImages = [
  { src: '/images/derma10.jpg', alt: '더마10 정면', labelKey: 'device.gallery_front' as const },
  { src: '/images/derma10_2.jpg', alt: '더마10 헤드', labelKey: 'device.gallery_head' as const },
  { src: '/images/derma10_3.jpg', alt: '더마10 측면', labelKey: 'device.gallery_side' as const },
  { src: '/images/derma10_back.jpg', alt: '더마10 후면', labelKey: 'device.gallery_back' as const },
];

export default function DeviceSection() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const [activeImg, setActiveImg] = useState(0);
  const { t } = useLanguage();

  const specs = [
    { label: t('device.spec_name'), value: t('device.spec_name_val') },
    { label: t('device.spec_heads'), value: t('device.spec_heads_val') },
    { label: t('device.spec_display'), value: t('device.spec_display_val') },
    { label: t('device.spec_conn'), value: t('device.spec_conn_val') },
    { label: t('device.spec_auth'), value: t('device.spec_auth_val') },
  ];

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} id="device-spec" className="py-28 relative">
      {/* bg gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(92,138,60,0.03) 50%, transparent)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* Section label */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#7bae52' }}
          >
            {t('device.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="text-gradient-green">{t('device.h2_1')}</span>
            <span style={{ color: 'var(--t-1)' }}>{t('device.h2_2')}</span>
          </h2>
          <p
            className="max-w-lg mx-auto text-sm leading-relaxed"
            style={{ color: 'var(--t-4)' }}
          >
            {t('device.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Gallery ─────────────────────────── */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-32px)',
            }}
          >
            {/* Main image */}
            <div
              className="rounded-3xl overflow-hidden mb-3"
              style={{
                background: 'linear-gradient(160deg, #f4f4f0 0%, #e8e8e4 100%)',
                boxShadow: '0 0 0 1px var(--bd-3), 0 32px 80px rgba(0,0,0,0.55), 0 0 100px rgba(92,138,60,0.08)',
                aspectRatio: '3/4',
                position: 'relative',
              }}
            >
              <Image
                src={galleryImages[activeImg].src}
                alt={galleryImages[activeImg].alt}
                fill
                className="object-contain p-6 transition-all duration-500"
              />
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setActiveImg(i)}
                  className="relative rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    background: 'linear-gradient(160deg, #f0f0ec 0%, #e4e4e0 100%)',
                    aspectRatio: '1',
                    outline: activeImg === i
                      ? '2px solid #5c8a3c'
                      : '1px solid var(--bd-3)',
                    opacity: activeImg === i ? 1 : 0.65,
                  }}
                  aria-label={t(img.labelKey)}
                >
                  <Image src={img.src} alt={t(img.labelKey)} fill className="object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Specs ──────────────────────────── */}
          <div
            className="transition-all duration-700 delay-100"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(32px)',
            }}
          >
            {/* Brand plate */}
            <div
              className="flex items-center gap-3 mb-8 p-4 rounded-2xl"
              style={{
                background: 'rgba(92,138,60,0.06)',
                border: '1px solid rgba(92,138,60,0.25)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black"
                style={{ background: 'rgba(92,138,60,0.15)', color: '#9dd470' }}
              >
                10
              </div>
              <div>
                <div className="font-bold" style={{ color: 'var(--t-1)' }}>{t('device.name')}</div>
                <div className="text-xs" style={{ color: 'var(--t-5)' }}>
                  {t('device.brand_sub')}
                </div>
              </div>
            </div>

            {/* Spec table */}
            <div
              className="rounded-2xl overflow-hidden mb-8"
              style={{ border: '1px solid var(--bd-2)' }}
            >
              {specs.map(({ label, value }, i) => (
                <div
                  key={label}
                  className="flex gap-4 px-5 py-3.5 text-sm"
                  style={{
                    borderBottom: i < specs.length - 1 ? '1px solid var(--bd-3)' : 'none',
                    background: i % 2 === 0 ? 'var(--su-3)' : 'transparent',
                  }}
                >
                  <span
                    className="shrink-0 w-24 font-medium"
                    style={{ color: 'var(--t-6)' }}
                  >
                    {label}
                  </span>
                  <span style={{ color: 'var(--t-2)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Key differentiators */}
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: 'var(--t-6)' }}
            >
              {t('device.tech_title')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: t('device.tech1'), sub: t('device.tech1_sub') },
                { title: t('device.tech2'), sub: t('device.tech2_sub') },
                { title: t('device.tech3'), sub: t('device.tech3_sub') },
                { title: t('device.tech4'), sub: t('device.tech4_sub') },
              ].map(({ title, sub }) => (
                <div
                  key={title}
                  className="px-4 py-3 rounded-xl"
                  style={{
                    background: 'var(--su-2)',
                    border: '1px solid var(--bd-3)',
                  }}
                >
                  <div className="text-sm font-semibold mb-0.5" style={{ color: '#9dd470' }}>
                    {title}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--t-5)' }}>
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
