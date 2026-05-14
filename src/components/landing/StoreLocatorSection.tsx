'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink, Navigation, Store } from 'lucide-react';

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

const NAVER_SEARCH_URL =
  'https://map.naver.com/p/search/%EC%9C%A0%EB%8B%88%EC%95%A4%EC%BD%94%EC%96%B4';

// Key regional representative locations
const regions = [
  { name: '서울·경기', count: '50+', icon: '🗼' },
  { name: '부산·경남', count: '20+', icon: '🌊' },
  { name: '대구·경북', count: '15+', icon: '🏔️' },
  { name: '인천·충청', count: '15+', icon: '✈️' },
  { name: '광주·전라', count: '10+', icon: '🌿' },
  { name: '강원·제주', count: '10+', icon: '🏖️' },
];

export default function StoreLocatorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);

  return (
    <section ref={sectionRef} id="stores" className="py-28 relative overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(92,138,60,0.03) 40%, rgba(92,138,60,0.02) 60%, transparent)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: '#7bae52' }}
          >
            Store Locator
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>가까운 </span>
            <span className="text-gradient-green">유니앤코어 라운지</span>
            <span style={{ color: 'var(--t-1)' }}> 찾기</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: 'var(--t-4)' }}>
            전국 120여 개 유니앤코어 라운지에서 더마10 기기를 직접 체험하고
            전문가 케어를 받아보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left: Region stats */}
          <div
            className="lg:col-span-2 transition-all duration-700 delay-100"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-24px)' }}
          >
            {/* Total count */}
            <div
              className="p-5 rounded-2xl mb-4"
              style={{
                background: 'rgba(92,138,60,0.07)',
                border: '1px solid rgba(92,138,60,0.25)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Store className="w-5 h-5" style={{ color: '#7bae52' }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#7bae52' }}>
                  전국 운영 현황
                </span>
              </div>
              <div className="text-5xl font-black mb-1" style={{ color: '#9dd470' }}>120+</div>
              <div className="text-sm" style={{ color: 'var(--t-4)' }}>
                유니앤코어 공식 라운지
              </div>
            </div>

            {/* Region grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {regions.map((r, i) => (
                <div
                  key={r.name}
                  className="p-3.5 rounded-xl transition-all duration-500"
                  style={{
                    background: 'var(--su-1)',
                    border: '1px solid var(--bd-3)',
                    opacity: inView ? 1 : 0,
                    transitionDelay: `${200 + i * 50}ms`,
                  }}
                >
                  <div className="text-xl mb-1">{r.icon}</div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: 'var(--t-1)' }}>
                    {r.name}
                  </div>
                  <div className="text-xs font-bold" style={{ color: '#9dd470' }}>
                    {r.count} 매장
                  </div>
                </div>
              ))}
            </div>

            {/* Naver map CTA */}
            <a
              href={NAVER_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'rgba(3,199,90,0.10)',
                border: '1px solid rgba(3,199,90,0.25)',
                color: '#4dc870',
              }}
            >
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                <span className="text-sm font-semibold">네이버 지도에서 검색</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Right: Map embed */}
          <div
            className="lg:col-span-3 transition-all duration-700 delay-200"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(24px)' }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                height: '420px',
                background: 'var(--su-1)',
                border: '1px solid var(--bd-2)',
              }}
            >
              {!showMap ? (
                /* Map placeholder / click to load */
                <button
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group"
                  onClick={() => setShowMap(true)}
                >
                  {/* Map bg pattern */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, rgba(92,138,60,0.05) 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(3,199,90,0.12)',
                      border: '1px solid rgba(3,199,90,0.25)',
                    }}
                  >
                    <MapPin className="w-8 h-8" style={{ color: '#4dc870' }} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--t-1)' }}>
                      네이버 지도 열기
                    </p>
                    <p className="text-xs" style={{ color: 'var(--t-5)' }}>
                      클릭하면 전국 유니앤코어 라운지를 지도에서 확인합니다
                    </p>
                  </div>

                  {/* Animated pings */}
                  {[
                    { top: '25%', left: '35%' },
                    { top: '55%', left: '60%' },
                    { top: '40%', left: '75%' },
                    { top: '70%', left: '28%' },
                    { top: '30%', left: '55%' },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{ top: pos.top, left: pos.left }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: '#5c8a3c',
                          animation: `glowPulse ${1.5 + i * 0.3}s ease-in-out infinite`,
                          animationDelay: `${i * 0.4}s`,
                        }}
                      />
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'rgba(92,138,60,0.3)',
                          animation: `ripple ${1.5 + i * 0.3}s ease-out infinite`,
                          animationDelay: `${i * 0.4}s`,
                        }}
                      />
                    </div>
                  ))}
                </button>
              ) : (
                <iframe
                  src={`${NAVER_SEARCH_URL}?c=7.27,0,0,0,dh`}
                  title="유니앤코어 라운지 찾기"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  onLoad={() => setMapLoaded(true)}
                  style={{ opacity: mapLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Map info bar */}
            <div
              className="mt-3 flex items-center justify-between px-4 py-3 rounded-xl"
              style={{
                background: 'var(--su-2)',
                border: '1px solid var(--bd-3)',
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-glow-fast"
                  style={{ background: '#5c8a3c' }}
                />
                <span className="text-xs" style={{ color: 'var(--t-5)' }}>
                  전국 120+ 라운지 운영 중
                </span>
              </div>
              <a
                href={NAVER_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs transition-colors"
                style={{ color: 'var(--t-7)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#7bae52'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--t-7)'; }}
              >
                지도 앱으로 열기
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
