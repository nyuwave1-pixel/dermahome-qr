'use client';

import { useEffect, useRef, useState } from 'react';
import { QrCode, ShieldCheck, Gift, Smartphone } from 'lucide-react';

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

const steps = [
  {
    icon: QrCode,
    step: '01',
    title: 'QR 코드 스캔',
    desc: '더마10 기기에 부착된 QR 코드를 스마트폰 카메라로 스캔합니다.',
    accent: '#38bdf8',
  },
  {
    icon: ShieldCheck,
    step: '02',
    title: '정품 인증',
    desc: '서버에서 1회성 QR 코드를 검증하고 정품 여부를 확인합니다.',
    accent: '#7bae52',
  },
  {
    icon: Gift,
    step: '03',
    title: '쿠폰 발급',
    desc: '인증 완료 시 프로모션 쿠폰 및 혜택이 자동으로 발급됩니다.',
    accent: '#e879f9',
  },
  {
    icon: Smartphone,
    step: '04',
    title: '앱 스마트 연동',
    desc: '더마홈 앱과 기기를 BLE 5.3으로 연결하여 스마트 케어를 시작합니다.',
    accent: '#fb923c',
  },
];

export default function QRProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Dark bg with grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(7,7,10,0), rgba(92,138,60,0.04), rgba(7,7,10,0))',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4">

        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#7bae52' }}
          >
            Authentication
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: '#f8f8f6' }}>QR </span>
            <span className="text-gradient-green">정품 인증</span>
            <span style={{ color: '#f8f8f6' }}> 프로세스</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: 'rgba(248,248,246,0.5)' }}>
            4단계 간편 인증으로 위조품을 차단하고 정품 혜택을 받으세요
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(to right, rgba(92,138,60,0.15), rgba(92,138,60,0.4), rgba(92,138,60,0.4), rgba(92,138,60,0.15))' }}
          />

          {steps.map((s, i) => (
            <div
              key={s.step}
              className="relative transition-all duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div
                className="p-5 rounded-2xl h-full transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}30`;
                  (e.currentTarget as HTMLElement).style.background = `rgba(${s.accent === '#7bae52' ? '92,138,60' : '255,255,255'},0.05)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                {/* Icon circle */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: `${s.accent}15`,
                    border: `1px solid ${s.accent}35`,
                  }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.accent }} />
                </div>

                {/* Step number */}
                <div
                  className="text-4xl font-black mb-2 leading-none"
                  style={{ color: 'rgba(255,255,255,0.06)' }}
                >
                  {s.step}
                </div>

                <h3
                  className="text-sm font-bold mb-2"
                  style={{ color: '#f8f8f6' }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(248,248,246,0.45)' }}
                >
                  {s.desc}
                </p>

                {/* Bottom accent */}
                <div
                  className="mt-4 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(to right, ${s.accent}50, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          className="mt-10 p-4 rounded-2xl text-center text-sm transition-all duration-700 delay-500"
          style={{
            background: 'rgba(92,138,60,0.06)',
            border: '1px solid rgba(92,138,60,0.20)',
            color: 'rgba(248,248,246,0.55)',
            opacity: inView ? 1 : 0,
          }}
        >
          <span style={{ color: '#9dd470' }}>★</span>&nbsp; QR 코드는 1회만 인증 가능합니다.
          이미 인증된 코드는 재사용이 불가능하며, 이를 통해 위조 제품을 완벽하게 차단합니다.
        </div>
      </div>
    </section>
  );
}
