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
    { value: '120+', label: '전국 라운지' },
    { value: '7개국', label: '글로벌 진출' },
    { value: '₩120억', label: '2024 연매출' },
  ];

  const badges = [
    '8종 헤드 메디컬 에스테틱',
    '1회성 QR 세션 시스템',
    '전국 120+ 매장 운영',
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Hero Background Image ──────────────────────── */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        <Image
          src="/images/hero_bg.png"
          alt="DermaHome hero background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />

        {/* Layered dark overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(7,7,10,0.50) 0%, rgba(7,7,10,0.38) 40%, rgba(7,7,10,0.62) 75%, rgba(7,7,10,0.92) 100%)',
          }}
        />
        {/* Green tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(92,138,60,0.08) 0%, transparent 65%)',
          }}
        />
        {/* Vignette edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 50%, rgba(7,7,10,0.45) 100%)',
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
              <span style={{ color: '#f8f8f6' }}>클리닉 기술을</span>
              <br />
              <span style={{ color: '#f8f8f6' }}>집으로 가져오다</span>
              <br />
              <span className="text-gradient-green">더마10 PRO</span>
            </h1>

            <p
              className="text-base md:text-lg mb-8 leading-relaxed max-w-md"
              style={{ color: 'rgba(248,248,246,0.65)' }}
            >
              페이스 RF·갈바닉·초음파·고주파 8가지 메디컬 에스테틱 기술.
              전국 120개 라운지에서 직접 체험하고,
              집에서 클리닉 수준의 케어를 시작하세요.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(248,248,246,0.75)',
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
                  가까운 매장 찾기
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div
              className="flex items-center gap-6 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
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
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(248,248,246,0.42)' }}>
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
                    '0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.6), 0 0 120px rgba(92,138,60,0.12)',
                }}
              >
                <Image
                  src="/images/derma10_2.jpg"
                  alt="더마10 PRO — 8종 헤드 올인원 피부 미용 기기"
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
                  background: 'rgba(7,7,10,0.92)',
                  border: '1px solid rgba(92,138,60,0.40)',
                  backdropFilter: 'blur(16px)',
                  color: '#9dd470',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                }}
              >
                <div className="text-base font-black">8종</div>
                <div style={{ color: 'rgba(248,248,246,0.5)' }}>헤드 시스템</div>
              </div>

              {/* Chip: price */}
              <div
                className="absolute -right-6 bottom-20 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{
                  background: 'rgba(7,7,10,0.92)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(16px)',
                  color: '#f8f8f6',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                }}
              >
                <div className="text-base font-black" style={{ color: '#9dd470' }}>₩670만</div>
                <div style={{ color: 'rgba(248,248,246,0.5)' }}>플래그십 기기</div>
              </div>

              {/* Chip: session */}
              <div
                className="absolute -right-4 top-8 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs"
                style={{
                  background: 'rgba(7,7,10,0.92)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(16px)',
                  color: 'rgba(248,248,246,0.8)',
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
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(248,248,246,0.4)' }}>
          Scroll
        </span>
        <div
          className="w-px h-10 relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)' }}
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
