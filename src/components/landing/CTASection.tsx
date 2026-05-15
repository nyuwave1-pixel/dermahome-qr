'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(92,138,60,0.08) 0%, transparent 65%)',
        }}
      />
      {/* Grid dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(92,138,60,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">

        {/* Logo */}
        <div
          className="flex justify-center mb-8 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div
            className="inline-block rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #f0f0ec 0%, #e4e4e0 100%)',
              padding: '10px 24px',
              boxShadow: '0 0 0 1px var(--su-1), 0 16px 48px rgba(0,0,0,0.4), 0 0 60px rgba(92,138,60,0.10)',
            }}
          >
            <Image
              src="/images/logo_with_slogan.png"
              alt="UNI&CORE — United power of uni&core to the global"
              width={240}
              height={80}
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        {/* Headline */}
        <div
          className="transition-all duration-700 delay-100"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            <span style={{ color: 'var(--t-1)' }}>지금 바로 </span>
            <span className="text-gradient-green">정품 인증</span>
            <span style={{ color: 'var(--t-1)' }}>하고<br />프리미엄 케어를 시작하세요</span>
          </h2>
          <p
            className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--t-4)' }}
          >
            더마10 기기의 QR 코드를 스캔하는 것만으로
            정품 인증과 모든 혜택이 시작됩니다.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-200"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <a
            href="https://www.unincore.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="min-w-[220px]">
              유니앤코어 공식 사이트
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-300"
          style={{ opacity: inView ? 0.6 : 0 }}
        >
          {[
            '㈜ 유니앤코어 공식 정품',
            '1회성 QR 위조 방지',
            '전국 120+ 라운지',
            '7개국 글로벌 브랜드',
          ].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-1.5 text-xs"
              style={{ color: 'var(--t-5)' }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: '#5c8a3c', display: 'inline-block' }}
              />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
