'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';

interface Review {
  name: string;
  handle: string;
  age: number;
  gradient: [string, string];
  before: { moisture: number; elasticity: number };
  after: { moisture: number; elasticity: number };
  quote: string;
  weeks: number;
  tag: string;
  head: string;
}

const reviews: Review[] = [
  {
    name: '이지현',
    handle: '@jihyun_skin',
    age: 29,
    gradient: ['#f472b6', '#ec4899'],
    before: { moisture: 42, elasticity: 55 },
    after: { moisture: 81, elasticity: 89 },
    quote: '2주 만에 피부가 완전히 달라졌어요. 수분감이 눈에 띄게 올라갔고 아침에 거울 보는 게 즐거워졌어요. 이온토포레시스 헤드 조합이 특히 인상적이었어요.',
    weeks: 2,
    tag: 'MOISTURE BOOST',
    head: '이온토포레시스',
  },
  {
    name: '박민준',
    handle: '@minjun.beauty',
    age: 34,
    gradient: ['#60a5fa', '#6366f1'],
    before: { moisture: 38, elasticity: 48 },
    after: { moisture: 75, elasticity: 82 },
    quote: '30대 들어 피부 탄력이 걱정됐는데 더마10 RF 헤드 쓰고 3주 만에 턱선이 달라졌어요. 피부과 리프팅 시술 생각했는데 이걸로 충분히 만족합니다.',
    weeks: 3,
    tag: 'ANTI-AGING',
    head: '페이스 RF',
  },
  {
    name: '김소연',
    handle: '@soyeon_glow',
    age: 26,
    gradient: ['#c084fc', '#e879f9'],
    before: { moisture: 51, elasticity: 62 },
    after: { moisture: 88, elasticity: 93 },
    quote: 'QR 인증이 이렇게 간편할 줄 몰랐어요. 정품이라는 확신이 생기니 더 믿고 쓸 수 있어요. 4주 사용하니 피부 전체 톤이 밝아진 게 느껴져요.',
    weeks: 4,
    tag: 'GLOW UP',
    head: '울트라소닉',
  },
];

function MetricBar({ label, before, after, color }: { label: string; before: number; after: number; color: string }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setAnimated(true), 200); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const gain = after - before;

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs" style={{ color: 'var(--t-5)' }}>{label}</span>
        <span className="text-xs font-bold" style={{ color }}>
          +{gain}%
          <span className="ml-1 font-normal" style={{ color: 'var(--t-6)' }}>
            ({before}→{after})
          </span>
        </span>
      </div>
      {/* Before bar */}
      <div className="relative h-1.5 rounded-full mb-1 overflow-hidden" style={{ background: 'var(--su-1)' }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000"
          style={{
            width: animated ? `${before}%` : '0%',
            background: 'rgba(255,255,255,0.15)',
          }}
        />
      </div>
      {/* After bar */}
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--su-1)' }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 delay-300"
          style={{
            width: animated ? `${after}%` : '0%',
            background: `linear-gradient(to right, ${color}80, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

export default function ReviewSection() {
  const { ref: sectionRef, inView } = useInView(0.08);
  const { t } = useLanguage();

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="py-28 relative overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(92,138,60,0.04) 0%, transparent 65%)',
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
            {t('review.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>{t('review.h2_1')}</span>
            <span className="text-gradient-green">{t('review.h2_2')}</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: 'var(--t-4)' }}>
            {t('review.desc')}
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={r.handle}
              className="transition-all duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div
                className="p-5 rounded-2xl h-full flex flex-col"
                style={{
                  background: 'var(--su-1)',
                  border: '1px solid var(--bd-2)',
                }}
              >
                {/* Profile */}
                <div className="flex items-center gap-3 mb-4">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${r.gradient[0]}, ${r.gradient[1]})` }}
                  >
                    {r.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold truncate" style={{ color: 'var(--t-1)' }}>{r.name}</span>
                      <span className="text-xs" style={{ color: 'var(--t-6)' }}>{r.age}</span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--t-6)' }}>{r.handle}</div>
                  </div>
                  {/* Tag */}
                  <div
                    className="text-[9px] font-bold px-2 py-1 rounded-md shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${r.gradient[0]}20, ${r.gradient[1]}20)`,
                      color: r.gradient[0],
                      border: `1px solid ${r.gradient[0]}35`,
                    }}
                  >
                    {r.tag}
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 fill-current" style={{ color: '#f59e0b' }} />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="text-sm leading-relaxed mb-4 flex-1"
                  style={{ color: 'var(--t-3)' }}
                >
                  &ldquo;{r.quote}&rdquo;
                </p>

                {/* Metrics */}
                <div
                  className="p-4 rounded-xl mb-3"
                  style={{ background: 'var(--su-2)', border: '1px solid var(--bd-3)' }}
                >
                  <MetricBar label={t('review.moisture')} before={r.before.moisture} after={r.after.moisture} color={r.gradient[0]} />
                  <MetricBar label={t('review.elasticity')} before={r.before.elasticity} after={r.after.elasticity} color={r.gradient[1]} />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1" style={{ color: 'var(--t-7)' }}>
                    <TrendingUp className="w-3 h-3" />
                    {r.weeks}{t('review.weeks')}
                  </div>
                  <div style={{ color: 'var(--t-7)' }}>
                    {t('review.head_label')}: <span style={{ color: '#9dd470' }}>{r.head}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Average rating strip */}
        <div
          className="mt-10 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 delay-400"
          style={{
            background: 'var(--su-2)',
            border: '1px solid var(--bd-3)',
            opacity: inView ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="text-4xl font-black" style={{ color: '#9dd470' }}>4.9</div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#f59e0b' }} />
                ))}
              </div>
              <div className="text-xs" style={{ color: 'var(--t-7)' }}>{t('review.avg_rating')}</div>
            </div>
          </div>
          <div
            className="h-px sm:h-10 w-full sm:w-px"
            style={{ background: 'var(--bd-2)' }}
          />
          <div className="text-center sm:text-right">
            <div className="text-2xl font-black mb-0.5" style={{ color: '#7bae52' }}>+43%</div>
            <div className="text-xs" style={{ color: 'var(--t-7)' }}>{t('review.moisture_gain')}</div>
          </div>
          <div
            className="h-px sm:h-10 w-full sm:w-px"
            style={{ background: 'var(--bd-2)' }}
          />
          <div className="text-center sm:text-right">
            <div className="text-2xl font-black mb-0.5" style={{ color: '#38bdf8' }}>VIP</div>
            <div className="text-xs" style={{ color: 'var(--t-7)' }}>{t('review.vip_event')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
