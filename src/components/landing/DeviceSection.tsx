'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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

const specs = [
  { label: '기기명', value: '더마10 PRO' },
  { label: '8종 헤드', value: '페이스RF, 바디RF, 울트라소닉, 이온토포레시스, 고주파, 스킨스크러버, 쿨&핫, 산소주입기' },
  { label: '디스플레이', value: '8인치 터치스크린' },
  { label: '연결', value: 'BLE 5.3 스마트 연동' },
  { label: '인증', value: 'QR 1회성 정품 인증' },
  { label: '출시가', value: '₩6,700,000' },
];

const galleryImages = [
  { src: '/images/derma10.jpg', alt: '더마10 정면', label: '정면' },
  { src: '/images/derma10_2.jpg', alt: '더마10 헤드', label: '헤드 구성' },
  { src: '/images/derma10_3.jpg', alt: '더마10 측면', label: '측면' },
  { src: '/images/derma10_back.jpg', alt: '더마10 후면', label: '후면' },
];

export default function DeviceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <section ref={sectionRef} className="py-28 relative">
      {/* bg gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(92,138,60,0.03) 50%, transparent)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* Section label */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#7bae52' }}
          >
            Device
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="text-gradient-green">더마10</span>
            <span style={{ color: 'var(--t-1)' }}> 프리미엄 피부 관리 시스템</span>
          </h2>
          <p
            className="max-w-lg mx-auto text-sm leading-relaxed"
            style={{ color: 'var(--t-4)' }}
          >
            메디컬 에스테틱 기술을 담은 올인원 피부 미용 기기.
            8종 헤드로 전신을 케어하는 전문가급 홈 뷰티 솔루션.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Gallery ─────────────────────────── */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-32px)',
            }}
          >
            {/* Main image */}
            <div
              className="rounded-3xl overflow-hidden mb-3"
              style={{
                background: 'linear-gradient(160deg, #f4f4f0 0%, #e8e8e4 100%)',
                boxShadow: '0 0 0 1px var(--bd-3), 0 32px 80px rgba(0,0,0,0.55), 0 0 100px rgba(92,138,60,0.08)',
                aspectRatio: '3/4',
                position: 'relative',
              }}
            >
              <Image
                src={galleryImages[activeImg].src}
                alt={galleryImages[activeImg].alt}
                fill
                className="object-contain p-6 transition-all duration-500"
              />
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setActiveImg(i)}
                  className="relative rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    background: 'linear-gradient(160deg, #f0f0ec 0%, #e4e4e0 100%)',
                    aspectRatio: '1',
                    outline: activeImg === i
                      ? '2px solid #5c8a3c'
                      : '1px solid var(--bd-3)',
                    opacity: activeImg === i ? 1 : 0.65,
                  }}
                  aria-label={img.label}
                >
                  <Image src={img.src} alt={img.label} fill className="object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Specs ──────────────────────────── */}
          <div
            className="transition-all duration-700 delay-100"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(32px)',
            }}
          >
            {/* Brand plate */}
            <div
              className="flex items-center gap-3 mb-8 p-4 rounded-2xl"
              style={{
                background: 'rgba(92,138,60,0.06)',
                border: '1px solid rgba(92,138,60,0.25)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black"
                style={{ background: 'rgba(92,138,60,0.15)', color: '#9dd470' }}
              >
                10
              </div>
              <div>
                <div className="font-bold" style={{ color: 'var(--t-1)' }}>더마10 PRO</div>
                <div className="text-xs" style={{ color: 'var(--t-5)' }}>
                  UNI&CORE 플래그십 미용 기기
                </div>
              </div>
            </div>

            {/* Spec table */}
            <div
              className="rounded-2xl overflow-hidden mb-8"
              style={{ border: '1px solid var(--bd-2)' }}
            >
              {specs.map(({ label, value }, i) => (
                <div
                  key={label}
                  className="flex gap-4 px-5 py-3.5 text-sm"
                  style={{
                    borderBottom: i < specs.length - 1 ? '1px solid var(--bd-3)' : 'none',
                    background: i % 2 === 0 ? 'var(--su-3)' : 'transparent',
                  }}
                >
                  <span
                    className="shrink-0 w-24 font-medium"
                    style={{ color: 'var(--t-6)' }}
                  >
                    {label}
                  </span>
                  <span style={{ color: 'var(--t-2)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Key differentiators */}
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: 'var(--t-6)' }}
            >
              핵심 기술
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'RF 고주파', sub: '콜라겐 재생 · 리프팅' },
                { title: '갈바닉 이온', sub: '성분 침투 극대화' },
                { title: '초음파 진동', sub: '모공 정화 · 흡수 촉진' },
                { title: 'QR 인증', sub: '위조 방지 · 정품 보장' },
              ].map(({ title, sub }) => (
                <div
                  key={title}
                  className="px-4 py-3 rounded-xl"
                  style={{
                    background: 'var(--su-2)',
                    border: '1px solid var(--bd-3)',
                  }}
                >
                  <div className="text-sm font-semibold mb-0.5" style={{ color: '#9dd470' }}>
                    {title}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--t-5)' }}>
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
