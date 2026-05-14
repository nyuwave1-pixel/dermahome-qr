'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import GlassCard from '@/components/ui/GlassCard';

const heads = [
  {
    img: '/images/face_rf.jpg',
    name: '페이스 RF',
    en: 'Face RF',
    desc: '고주파 에너지로 진피층을 자극해 콜라겐 재생 및 피부 탄력을 강화합니다.',
    tag: 'LIFTING',
    color: '#e879f9',
  },
  {
    img: '/images/body_rf.jpg',
    name: '바디 RF',
    en: 'Body RF',
    desc: '전신 피부 탄력 개선 및 셀룰라이트 감소에 특화된 전용 헤드입니다.',
    tag: 'BODY CARE',
    color: '#f472b6',
  },
  {
    img: '/images/ultrasonic.jpg',
    name: '페이스 울트라소닉',
    en: 'Ultrasonic',
    desc: '초음파 진동으로 유효 성분의 피부 흡수를 극대화하고 모공을 정화합니다.',
    tag: 'ABSORPTION',
    color: '#38bdf8',
  },
  {
    img: '/images/iontophoresis.jpg',
    name: '이온토포레시스',
    en: 'Iontophoresis',
    desc: '미세 전류를 이용한 갈바닉 이온 테라피로 영양 성분을 깊숙이 침투시킵니다.',
    tag: 'ION THERAPY',
    color: '#818cf8',
  },
  {
    img: '/images/highfreq_head1.jpg',
    name: '고주파',
    en: 'High Frequency',
    desc: '고주파 전류로 살균, 진정 효과를 제공하고 여드름성 피부를 케어합니다.',
    tag: 'ANTIBACTERIAL',
    color: '#fb923c',
  },
  {
    img: '/images/skin_scrubber.jpg',
    name: '스킨스크러버',
    en: 'Skin Scrubber',
    desc: '초음파 스크러빙으로 각질과 노폐물을 효과적으로 제거합니다.',
    tag: 'CLEANSING',
    color: '#34d399',
  },
  {
    img: '/images/cool_hot.jpg',
    name: '쿨 & 핫',
    en: 'Cool & Hot',
    desc: '냉온 테라피로 모공을 조절하고 영양 성분 흡수와 진정을 번갈아 제공합니다.',
    tag: 'THERMO',
    color: '#7bae52',
  },
  {
    img: '/images/oxygen_infuser.jpg',
    name: '산소주입기',
    en: 'Oxygen Infuser',
    desc: '고압 산소를 피부에 주입해 생기와 윤기를 되살리는 산소 인퓨전 케어.',
    tag: 'OXYGEN',
    color: '#a78bfa',
  },
];

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

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section ref={sectionRef} className="py-28 relative">
      {/* Subtle bg gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(92,138,60,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#7bae52' }}
          >
            8 Head System
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: '#f8f8f6' }}>더마10 — </span>
            <span className="text-gradient-green">8종 헤드 시스템</span>
          </h2>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: 'rgba(248,248,246,0.5)' }}>
            하나의 기기로 8가지 전문 케어를 경험하세요.
            페이스 RF부터 산소 인퓨전까지, 피부 고민에 맞는 헤드를 선택합니다.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {heads.map((head, i) => (
            <div
              key={head.en}
              className="transition-all duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <GlassCard hover className="overflow-hidden group">
                {/* Product image */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(160deg, #f0f0ec 0%, #e4e4e0 100%)',
                    height: '160px',
                  }}
                >
                  <Image
                    src={head.img}
                    alt={head.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Tag overlay */}
                  <div
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider"
                    style={{
                      background: 'rgba(7,7,10,0.85)',
                      color: head.color,
                      border: `1px solid ${head.color}40`,
                    }}
                  >
                    {head.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-bold" style={{ color: '#f8f8f6' }}>
                      {head.name}
                    </h3>
                    <span
                      className="text-[10px] font-medium"
                      style={{ color: 'rgba(248,248,246,0.3)' }}
                    >
                      {head.en}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,248,246,0.48)' }}>
                    {head.desc}
                  </p>

                  {/* Color accent bar */}
                  <div
                    className="mt-4 h-0.5 rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${head.color}60, transparent)`,
                    }}
                  />
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
