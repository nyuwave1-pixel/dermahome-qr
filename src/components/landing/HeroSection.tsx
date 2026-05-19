'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QrCode, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/i18n/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: t('hero.stat1_val'), label: t('hero.stat1_label') },
    { value: t('hero.stat2_val'), label: t('hero.stat2_label') },
    { value: t('hero.stat3_val'), label: t('hero.stat3_label') },
  ];

  const badges = [
    t('hero.badge1'),
    t('hero.badge2'),
    t('hero.badge3'),
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Hero Background Image ──────────────────────── */}
      <div className="absolute inset-0 overflow-hidden bg-white">
        <Image
          src="/images/hero_bg.png"
          alt="DermaHome hero background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />

        {/* Light fade for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0) 65%)',
          }}
        />
        {/* Bottom fade to page bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 70%, var(--t-bg) 100%)',
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: Copy */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(32px)',
            }}
          >
            {/* Brand badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: 'rgba(92,138,60,0.10)',
                border: '1px solid rgba(92,138,60,0.35)',
                color: '#3d6b22',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-glow-fast"
                style={{ background: '#5c8a3c', display: 'inline-block' }}
              />
              {t('hero.badge')}
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] mb-6">
              <span style={{ color: '#1a1a1a' }}>{t('hero.h1_1')}</span>
              <br />
              <span style={{ color: '#1a1a1a' }}>{t('hero.h1_2')}</span>
              <br />
              <span style={{ color: '#4a8c2a' }}>{t('hero.h1_3')}</span>
            </h1>

            <p
              className="text-base md:text-lg mb-8 leading-relaxed max-w-md"
              style={{ color: '#555555' }}
            >
              {t('hero.desc')}
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.70)',
                    border: '1px solid rgba(0,0,0,0.10)',
                    color: '#333333',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#4a8c2a' }} />
                  {b}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
              <Link href="/generate">
                <Button size="lg" className="min-w-[196px]">
                  <QrCode className="w-5 h-5" />
                  {t('hero.cta1')}
                </Button>
              </Link>
              <a href="#stores">
                <Button variant="outline" size="lg" className="min-w-[196px]">
                  <MapPin className="w-4 h-4" />
                  {t('hero.cta2')}
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div
              className="flex items-center gap-6 pt-6"
              style={{ borderTop: '1px solid rgba(0,0,0,0.10)' }}
            >
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="transition-all duration-500"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                    transitionDelay: `${400 + i * 100}ms`,
                  }}
                >
                  <div className="text-2xl font-black" style={{ color: '#4a8c2a' }}>
                    {value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#777777' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Device */}
          <div
            className="relative flex justify-center transition-all duration-700 delay-200"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            <div
              className="relative w-full max-w-sm animate-float-slow"
              style={{
                filter:
                  'drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 0 40px rgba(92,138,60,0.08))',
              }}
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #ffffff 0%, #f4f4f0 100%)',
                  boxShadow:
                    '0 0 0 1px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.12)',
                }}
              >
                <Image
                  src="/images/derma10_2.jpg"
                  alt="더마 시리즈 — 8종 헤드 올인원 피부 미용 기기"
                  width={480}
                  height={640}
                  className="w-full object-cover"
                  priority
                />
              </div>

              {/* Chip: heads */}
              <div
                className="absolute -left-6 top-16 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(92,138,60,0.30)',
                  backdropFilter: 'blur(12px)',
                  color: '#4a8c2a',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                }}
              >
                <div className="text-base font-black">{t('hero.chip_heads')}</div>
                <div style={{ color: '#777' }}>{t('hero.chip_heads_sub')}</div>
              </div>

              {/* Chip: session */}
              <div
                className="absolute -right-4 top-8 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(12px)',
                  color: '#333',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-glow-fast"
                  style={{ background: '#5c8a3c', display: 'inline-block' }}
                />
                {t('hero.chip_session')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700"
        style={{ opacity: mounted ? 0.5 : 0 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: '#999' }}>
          Scroll
        </span>
        <div
          className="w-px h-10 relative overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.12)' }}
        >
          <div
            className="absolute w-full"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, transparent, #5c8a3c)',
              animation: 'scanBeam 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
