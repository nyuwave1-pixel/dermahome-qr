'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QrCode, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

/* ── Canvas Particle Network ──────────────────────────── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; opacity: number;
}

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const particles: Particle[] = [];
    const COUNT = 70;
    const MAX_DIST = 140;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const spawn = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.8 + 0.6,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Update & draw dots
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(92,138,60,${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(92,138,60,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    spawn();
    draw();

    const ro = new ResizeObserver(() => { resize(); spawn(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [canvasRef]);
}

/* ── Component ────────────────────────────────────────── */
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { value: '120+', label: '전국 라운지' },
    { value: '7개국', label: '해외 진출' },
    { value: '300+', label: '기기 판매' },
  ];

  const badges = [
    '8종 헤드 올인원 시스템',
    'QR 정품 인증',
    'BLE 5.3 스마트 연동',
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* Radial glow behind device */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(92,138,60,0.10) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Left ambient glow */}
      <div
        className="absolute left-0 bottom-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(92,138,60,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* ── Left: Content ─────────────────────────── */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(32px)',
            }}
          >
            {/* Brand tag */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: 'rgba(92,138,60,0.12)',
                border: '1px solid rgba(92,138,60,0.35)',
                color: '#9dd470',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-glow-fast"
                style={{ background: '#5c8a3c', display: 'inline-block' }}
              />
              UNI&CORE DermaHome 10
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span style={{ color: '#f8f8f6' }}>QR 스캔 한 번으로</span>
              <br />
              <span style={{ color: '#f8f8f6' }}>시작하는</span>
              <br />
              <span className="text-gradient-green">프리미엄 더마 케어</span>
            </h1>

            <p
              className="text-base md:text-lg mb-8 leading-relaxed max-w-md"
              style={{ color: 'rgba(248,248,246,0.55)' }}
            >
              8종 헤드 올인원 피부 미용 시스템.
              페이스 RF, 갈바닉, 초음파, 고주파, 이온토포레시스로
              메디컬 에스테틱을 홈에서.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(248,248,246,0.65)',
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#7bae52' }} />
                  {b}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
              <Link href="/verify">
                <Button size="lg" className="min-w-[196px]">
                  <QrCode className="w-5 h-5" />
                  QR 정품 인증하기
                </Button>
              </Link>
              <Link href="/app-connect">
                <Button variant="secondary" size="lg" className="min-w-[196px]">
                  앱 연결하기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="flex items-center gap-6 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
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
                  <div
                    className="text-2xl font-black"
                    style={{ color: '#9dd470' }}
                  >
                    {value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(248,248,246,0.4)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Device Image ───────────────────── */}
          <div
            className="relative flex justify-center transition-all duration-700 delay-200"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-3xl animate-glow pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 80% 90% at 50% 55%, rgba(92,138,60,0.14) 0%, transparent 65%)',
              }}
            />

            {/* Device card */}
            <div
              className="relative w-full max-w-sm animate-float-slow"
              style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.6)) drop-shadow(0 0 60px rgba(92,138,60,0.12))' }}
            >
              {/* White spotlight pod for product photo */}
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #f4f4f0 0%, #e8e8e4 100%)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.55), 0 0 120px rgba(92,138,60,0.10)',
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

              {/* Floating chip — top left */}
              <div
                className="absolute -left-6 top-16 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{
                  background: 'rgba(7,7,10,0.92)',
                  border: '1px solid rgba(92,138,60,0.35)',
                  backdropFilter: 'blur(16px)',
                  color: '#9dd470',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                <div className="text-base font-black">8종</div>
                <div style={{ color: 'rgba(248,248,246,0.5)' }}>헤드 시스템</div>
              </div>

              {/* Floating chip — bottom right */}
              <div
                className="absolute -right-6 bottom-20 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{
                  background: 'rgba(7,7,10,0.92)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(16px)',
                  color: '#f8f8f6',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                <div className="text-base font-black" style={{ color: '#9dd470' }}>670만원</div>
                <div style={{ color: 'rgba(248,248,246,0.5)' }}>정품 인증 필수</div>
              </div>

              {/* Floating chip — top right */}
              <div
                className="absolute -right-4 top-8 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs"
                style={{
                  background: 'rgba(7,7,10,0.92)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(16px)',
                  color: 'rgba(248,248,246,0.8)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-glow-fast"
                  style={{ background: '#5c8a3c', display: 'inline-block' }}
                />
                정품 인증됨
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700"
        style={{ opacity: mounted ? 0.45 : 0 }}
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
