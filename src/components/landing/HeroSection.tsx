'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QrCode, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { value: '8종', label: '메디컬 헤드' },
    { value: '7개국', label: '글로벌 진출' },
    { value: 'VIP', label: '본사 케어' },
  ];

  const badges = [
    '8종 헤드 메디컬 에스테틱',
    '1회성 QR 세션 시스템',
    '서울 본사 직영 운영',
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Hero Background Image ──────────────────────── */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        <Image
          src="/images/hero_bg.png"
          alt="DermaHome hero background"
          fill
          className="object-cover object-top"
          priority
          quality={90}
        />

        {/* Layered dark overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: 'var(--hero-grad)',
          }}
        />
        {/* Warm gold tint matching promo image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(180,140,60,0.06) 0%, transparent 65%)',
          }}
        />
        {/* Vignette edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 130% 110% at 50% 50%, transparent 55%, var(--t-bg-gl) 100%)',
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
                background: 'rgba(92,138,60,0.14)',
                border: '1px solid rgba(92,138,60,0.40)',
                color: '#9dd470',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-glow-fast"
                style={{ background: '#5c8a3c', display: 'inline-block' }}
              />
              UNI&CORE Official — DermaHome 10
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] mb-6">
              <span style={{ color: 'var(--t-1)' }}>피부의 시간을</span>
              <br />
              <span style={{ color: 'var(--t-1)' }}>되돌리다</span>
              <br />
              <span className="text-gradient-green">더마 시리즈</span>
            </h1>

            <p
              className="text-base md:text-lg mb-8 leading-relaxed max-w-md"
              style={{ color: 'var(--t-3)' }}
            >
              페이스 RF·갈바닉·초음파·고주파 8가지 메디컬 에스테틱 기술.
              유니앤코어 본사에서 직접 체험하고,
              집에서 클리닉 수준의 케어를 시작하세요.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: 'var(--su-1)',
                    border: '1px solid var(--bd-1)',
                    color: 'var(--t-2)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#7bae52' }} />
                  {b}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
              <Link href="/generate">
                <Button size="lg" className="min-w-[196px]">
                  <QrCode className="w-5 h-5" />
                  매장 QR 세션 생성
                </Button>
              </Link>
              <a href="#stores">
                <Button variant="outline" size="lg" className="min-w-[196px]">
                  <MapPin className="w-4 h-4" />
                  본사 위치 보기
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div
              className="flex items-center gap-6 pt-6"
              style={{ borderTop: '1px solid var(--bd-2)' }}
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
                  <div className="text-2xl font-black" style={{ color: '#9dd470' }}>
                    {value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--t-5)' }}>
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
                  'drop-shadow(0 40px 80px rgba(0,0,0,0.7)) drop-shadow(0 0 80px rgba(92,138,60,0.15))',
              }}
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #f4f4f0 0%, #e8e8e4 100%)',
                  boxShadow:
                    '0 0 0 1px var(--bd-2), 0 32px 80px rgba(0,0,0,0.6), 0 0 120px rgba(92,138,60,0.12)',
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
                  background: 'var(--t-bg-dp)',
                  border: '1px solid rgba(92,138,60,0.40)',
                  backdropFilter: 'blur(16px)',
                  color: '#9dd470',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                }}
              >
                <div className="text-base font-black">8종</div>
                <div style={{ color: 'var(--t-4)' }}>헤드 시스템</div>
              </div>

              {/* Chip: session */}
              <div
                className="absolute -right-4 top-8 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs"
                style={{
                  background: 'var(--t-bg-dp)',
                  border: '1px solid var(--bd-1)',
                  backdropFilter: 'blur(16px)',
                  color: 'var(--t-2)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-glow-fast"
                  style={{ background: '#5c8a3c', display: 'inline-block' }}
                />
                케어 세션 활성
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
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--t-5)' }}>
          Scroll
        </span>
        <div
          className="w-px h-10 relative overflow-hidden"
          style={{ background: 'var(--bd-3)' }}
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
