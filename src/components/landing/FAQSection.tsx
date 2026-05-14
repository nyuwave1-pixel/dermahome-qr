'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TrendingUp, Globe, Users, Award, Target, Heart, Zap } from 'lucide-react';

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const keyStats = [
  { value: '₩120억', label: '2024 연매출', sub: '전년 대비 +250%', color: '#9dd470' },
  { value: '120+', label: '전국 라운지', sub: '직영 & 파트너', color: '#38bdf8' },
  { value: '7개국', label: '글로벌 진출', sub: 'USA 법인 설립', color: '#e879f9' },
  { value: '2022', label: '창립', sub: '서초구 양재대로', color: '#fb923c' },
];

const values = [
  {
    icon: Users,
    title: 'United with Partners',
    desc: '파트너스와 함께 성장하는 신뢰 기반 비즈니스 생태계',
    color: '#7bae52',
  },
  {
    icon: Award,
    title: 'Core Product & Benefit',
    desc: '핵심 제품과 최고의 보상 플랜으로 파트너의 성공 지원',
    color: '#38bdf8',
  },
  {
    icon: Globe,
    title: 'To the Global',
    desc: '7개국 진출, USA 법인 설립 — 글로벌 직접 판매 네트워크',
    color: '#e879f9',
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(92,138,60,0.03) 40%, transparent)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#7bae52' }}
          >
            Company
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: '#f8f8f6' }}>㈜ 유니앤코어 </span>
            <span className="text-gradient-green">회사 소개</span>
          </h2>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: 'rgba(248,248,246,0.5)' }}>
            2022년 설립 후 3년 만에 연매출 ₩120억, 7개국 진출을 달성한
            구독 플랫폼 기반 글로벌 뷰티 &amp; 헬스케어 기업
          </p>
        </div>

        {/* Vision + Mission */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 transition-all duration-700 delay-100"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div
            className="p-6 rounded-2xl"
            style={{ background: 'rgba(92,138,60,0.07)', border: '1px solid rgba(92,138,60,0.25)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4" style={{ color: '#7bae52' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#7bae52' }}>Vision</span>
            </div>
            <p className="text-lg font-bold leading-snug" style={{ color: '#f8f8f6' }}>
              구독 플랫폼을 기반으로한<br />세계 최고의 직접 판매 회사
            </p>
          </div>
          <div
            className="p-6 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4" style={{ color: '#38bdf8' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#38bdf8' }}>Mission</span>
            </div>
            <p className="text-lg font-bold leading-snug italic" style={{ color: '#f8f8f6' }}>
              &ldquo;United power of uni&amp;core<br />to the global&rdquo;
            </p>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {keyStats.map((s, i) => (
            <div
              key={s.label}
              className="p-4 rounded-2xl text-center transition-all duration-500"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                opacity: inView ? 1 : 0,
                transitionDelay: `${150 + i * 60}ms`,
              }}
            >
              <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-xs font-semibold mb-0.5" style={{ color: '#f8f8f6' }}>{s.label}</div>
              <div className="text-[10px]" style={{ color: 'rgba(248,248,246,0.38)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="p-5 rounded-2xl text-center transition-all duration-500"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${300 + i * 80}ms`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ background: `${v.color}14`, border: `1px solid ${v.color}28` }}
              >
                <v.icon className="w-5 h-5" style={{ color: v.color }} />
              </div>
              <h3 className="text-sm font-bold mb-1.5" style={{ color: '#f8f8f6' }}>{v.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,248,246,0.45)' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Growth timeline */}
        <div
          className="p-5 rounded-2xl mb-8 transition-all duration-700 delay-400"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            opacity: inView ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4" style={{ color: '#7bae52' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(248,248,246,0.30)' }}>
              성장 연혁
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { year: '2022', event: '창립 — 서초구 양재대로', color: 'rgba(92,138,60,0.18)' },
              { year: '2023', event: '공식 론칭 · 더마10 출시', color: 'rgba(92,138,60,0.28)' },
              { year: '2024', event: '연매출 120억 · 250% 성장', color: 'rgba(92,138,60,0.40)' },
              { year: '2025', event: '7개국 · USA 법인 · 신제품', color: 'rgba(92,138,60,0.55)' },
            ].map((m) => (
              <div
                key={m.year}
                className="p-3 rounded-xl relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="text-2xl font-black mb-1" style={{ color: m.color }}>
                  {m.year}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: 'rgba(248,248,246,0.48)' }}>
                  {m.event}
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(to right, ${m.color}, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Flagship + Lounge */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 delay-500"
          style={{ opacity: inView ? 1 : 0 }}
        >
          <div
            className="p-5 rounded-2xl flex items-center gap-4"
            style={{ background: 'rgba(92,138,60,0.07)', border: '1px solid rgba(92,138,60,0.22)' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(92,138,60,0.15)' }}
            >
              <Zap className="w-6 h-6" style={{ color: '#9dd470' }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold" style={{ color: '#f8f8f6' }}>더마10 PRO</span>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(92,138,60,0.20)', color: '#9dd470' }}
                >
                  FLAGSHIP
                </span>
              </div>
              <div className="text-xs mb-0.5" style={{ color: 'rgba(248,248,246,0.45)' }}>
                8종 헤드 올인원 피부 미용 기기
              </div>
              <div className="text-sm font-bold" style={{ color: '#9dd470' }}>₩6,700,000</div>
            </div>
          </div>

          <div
            className="p-5 rounded-2xl flex items-center gap-4"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div
              className="shrink-0 overflow-hidden rounded-xl"
              style={{ background: 'linear-gradient(160deg, #f0f0ec 0%, #e4e4e0 100%)', padding: '6px 12px' }}
            >
              <Image
                src="/images/logo_lounge.png"
                alt="UNI&CORE Lounge"
                width={80}
                height={28}
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-bold mb-1" style={{ color: '#f8f8f6' }}>
                전국 120여 개 라운지
              </div>
              <div className="text-xs leading-relaxed" style={{ color: 'rgba(248,248,246,0.42)' }}>
                더마10 기기를 직접 체험할 수 있는<br />전문 케어 라운지
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
