'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, MapPin, Globe, Package } from 'lucide-react';

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

const stats = [
  {
    icon: TrendingUp,
    value: 'VIP',
    label: '본사 직영 혜택',
    sub: '본사 단독 프리미엄 케어',
    color: '#7bae52',
  },
  {
    icon: MapPin,
    value: '본사',
    label: '서울 직영 운영',
    sub: '서초구 유니앤코어 본사',
    color: '#38bdf8',
  },
  {
    icon: Globe,
    value: '7개국',
    label: '해외 진출',
    sub: 'USA 법인 포함 글로벌 확장',
    color: '#e879f9',
  },
  {
    icon: Package,
    value: '8종',
    label: '올인원 헤드',
    sub: '더마 테크 기반 프리미엄 관리',
    color: '#fb923c',
  },
];

export default function PromotionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(92,138,60,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4">

        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#7bae52' }}
          >
            Company
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>유니앤코어, </span>
            <span className="text-gradient-green">글로벌 K-뷰티 혁신</span>
          </h2>
          <p
            className="max-w-md mx-auto text-sm leading-relaxed"
            style={{ color: 'var(--t-4)' }}
          >
            본사 직영 프리미엄 혜택과 글로벌 K-뷰티 혁신 기술로
            피부 변화의 시작을 함께합니다
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="transition-all duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="p-5 rounded-2xl text-center h-full"
                style={{
                  background: 'var(--su-1)',
                  border: '1px solid var(--bd-2)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div className="text-2xl font-black mb-0.5" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--t-1)' }}>
                  {s.label}
                </div>
                <div className="text-xs" style={{ color: 'var(--t-7)' }}>
                  {s.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vision banner */}
        <div
          className="relative p-8 rounded-3xl overflow-hidden text-center transition-all duration-700 delay-400"
          style={{
            background: 'rgba(92,138,60,0.07)',
            border: '1px solid rgba(92,138,60,0.22)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {/* Corner glows */}
          <div
            className="absolute -top-12 -left-12 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(92,138,60,0.12) 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(92,138,60,0.08) 0%, transparent 70%)' }}
          />

          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
            style={{ background: 'rgba(92,138,60,0.15)', color: '#9dd470', border: '1px solid rgba(92,138,60,0.3)' }}
          >
            Vision
          </div>
          <blockquote
            className="text-xl md:text-2xl font-bold italic mb-3"
            style={{ color: 'var(--t-1)' }}
          >
            &ldquo;피부 자신감을 완성하는 선택, 럭셔리 홈 에스테틱 경험&rdquo;
          </blockquote>
          <p className="text-sm" style={{ color: 'var(--t-5)' }}>
            ㈜ 유니앤코어 본사 &nbsp;|&nbsp; 더마 테크 기반 프리미엄 관리 &nbsp;|&nbsp; 홈케어의 새로운 기준
          </p>
        </div>
      </div>
    </section>
  );
}
