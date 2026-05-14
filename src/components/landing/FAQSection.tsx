'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TrendingUp, Globe, Users, Award, Heart, Target, Leaf } from 'lucide-react';

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const coreValues = [
  {
    icon: Users,
    title: 'United with Partners',
    desc: '파트너스와 함께 성장하는 신뢰 기반의 비즈니스 생태계',
    color: '#7bae52',
  },
  {
    icon: Award,
    title: 'Core Product & Benefit',
    desc: '핵심 제품과 최고의 보상플랜으로 파트너의 성공을 지원',
    color: '#38bdf8',
  },
  {
    icon: Globe,
    title: 'To the Global',
    desc: '7개국 진출, USA 법인 설립 — 글로벌 직접 판매 네트워크 확장',
    color: '#e879f9',
  },
];

const milestones = [
  { year: '2022', title: '창립', desc: '㈜ 유니앤코어 설립, 서울 서초구' },
  { year: '2023', title: '론칭 & 성장', desc: '4월 공식 론칭, 전국 라운지 확산, 더마10 출시' },
  { year: '2024', title: '고속 성장', desc: '월 매출 15억 달성, 연매출 120억, 전년 대비 250% 성장' },
  { year: '2025', title: '글로벌 확장', desc: '7개국 진출, USA 법인 설립, 헤어·다이어트·스킨케어 신제품 출시' },
];

const products = [
  { name: '더마10', cat: '피부미용기기', desc: '8종 헤드 올인원 미용 기기', price: '₩6,700,000', hot: true },
  { name: '하이루프 바디 크림', cat: '화장품', desc: '바디 케어 프리미엄 크림', price: '₩100,000', hot: false },
  { name: '하이루프 스칼프 세럼', cat: '화장품', desc: '두피 강화 세럼', price: '₩200,000', hot: false },
  { name: '데일리 카밍 토너 패드', cat: '화장품', desc: '진정 & 보습 토너 패드', price: '-', hot: false },
  { name: '마이크로 버블 클렌징 폼', cat: '화장품', desc: '마이크로 버블 딥 클렌징', price: '-', hot: false },
  { name: '엔자임 스킨톤 파우더워시', cat: '화장품', desc: '효소 각질 제거 워시', price: '-', hot: false },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* BG gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(92,138,60,0.03) 40%, rgba(92,138,60,0.02) 60%, transparent)' }}
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
            2022년 설립 후 빠른 성장으로 대한민국을 넘어 글로벌로 확장하는<br />
            구독 플랫폼 기반 뷰티 &amp; 헬스케어 기업
          </p>
        </div>

        {/* Vision / Mission */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 transition-all duration-700 delay-100"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div
            className="p-6 rounded-2xl"
            style={{ background: 'rgba(92,138,60,0.06)', border: '1px solid rgba(92,138,60,0.22)' }}
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

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {coreValues.map((v, i) => (
            <div
              key={v.title}
              className="p-5 rounded-2xl text-center transition-all duration-500"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${200 + i * 80}ms`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ background: `${v.color}15`, border: `1px solid ${v.color}30` }}
              >
                <v.icon className="w-5 h-5" style={{ color: v.color }} />
              </div>
              <h3 className="text-sm font-bold mb-1.5" style={{ color: '#f8f8f6' }}>{v.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,248,246,0.45)' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div
          className="mb-16 transition-all duration-700 delay-300"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <h3
            className="text-xs font-semibold tracking-widest uppercase mb-6 text-center"
            style={{ color: 'rgba(248,248,246,0.30)' }}
          >
            성장 연혁
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="p-4 rounded-xl relative overflow-hidden transition-all duration-500"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  opacity: inView ? 1 : 0,
                  transitionDelay: `${350 + i * 70}ms`,
                }}
              >
                <div
                  className="text-3xl font-black mb-1"
                  style={{ color: 'rgba(92,138,60,0.18)' }}
                >
                  {m.year}
                </div>
                <div className="text-sm font-bold mb-1" style={{ color: '#9dd470' }}>{m.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: 'rgba(248,248,246,0.42)' }}>{m.desc}</div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(to right, rgba(92,138,60,${0.15 + i * 0.08}), transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Line */}
        <div
          className="transition-all duration-700 delay-400"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <h3
            className="text-xs font-semibold tracking-widest uppercase mb-6 text-center"
            style={{ color: 'rgba(248,248,246,0.30)' }}
          >
            주요 제품 현황
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{
                  background: p.hot ? 'rgba(92,138,60,0.07)' : 'rgba(255,255,255,0.025)',
                  border: p.hot ? '1px solid rgba(92,138,60,0.25)' : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ background: p.hot ? 'rgba(92,138,60,0.15)' : 'rgba(255,255,255,0.05)' }}
                >
                  {p.hot
                    ? <TrendingUp className="w-4 h-4" style={{ color: '#7bae52' }} />
                    : <Leaf className="w-4 h-4" style={{ color: 'rgba(248,248,246,0.3)' }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold truncate" style={{ color: '#f8f8f6' }}>{p.name}</span>
                    {p.hot && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0"
                        style={{ background: 'rgba(92,138,60,0.2)', color: '#9dd470' }}
                      >
                        FLAGSHIP
                      </span>
                    )}
                  </div>
                  <div className="text-xs truncate" style={{ color: 'rgba(248,248,246,0.38)' }}>{p.desc}</div>
                </div>
                {p.price !== '-' && (
                  <div className="text-xs font-semibold shrink-0" style={{ color: '#9dd470' }}>{p.price}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lounge Banner */}
        <div
          className="mt-12 p-6 rounded-3xl text-center transition-all duration-700 delay-500"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            opacity: inView ? 1 : 0,
          }}
        >
          <div
            className="inline-block mb-3 overflow-hidden rounded-2xl"
            style={{
              background: 'linear-gradient(160deg, #f0f0ec 0%, #e4e4e0 100%)',
              padding: '8px 20px',
            }}
          >
            <Image
              src="/images/logo_lounge.png"
              alt="UNI&CORE Lounge"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: '#f8f8f6' }}>
            전국 120여 개소 유니앤코어 라운지 운영 중
          </p>
          <p className="text-xs" style={{ color: 'rgba(248,248,246,0.4)' }}>
            더마10 기기를 직접 체험할 수 있는 전문 라운지에서 전문가와 함께하세요
          </p>
        </div>
      </div>
    </section>
  );
}
