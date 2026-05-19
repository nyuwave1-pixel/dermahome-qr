'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, MapPin, Globe, Package } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

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

export default function PromotionSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  const stats = [
    {
      icon: TrendingUp,
      value: t('promo.stat1_val'),
      label: t('promo.stat1_label'),
      sub: t('promo.stat1_sub'),
      color: '#7bae52',
    },
    {
      icon: MapPin,
      value: t('promo.stat2_val'),
      label: t('promo.stat2_label'),
      sub: t('promo.stat2_sub'),
      color: '#38bdf8',
    },
    {
      icon: Globe,
      value: t('promo.stat3_val'),
      label: t('promo.stat3_label'),
      sub: t('promo.stat3_sub'),
      color: '#e879f9',
    },
    {
      icon: Package,
      value: t('promo.stat4_val'),
      label: t('promo.stat4_label'),
      sub: t('promo.stat4_sub'),
      color: '#fb923c',
    },
  ];

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
            {t('promo.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>{t('promo.h2_1')}</span>
            <span className="text-gradient-green">{t('promo.h2_2')}</span>
          </h2>
          <p
            className="max-w-md mx-auto text-sm leading-relaxed"
            style={{ color: 'var(--t-4)' }}
          >
            {t('promo.desc')}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <div
              key={i}
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
            {t('promo.vision_tag')}
          </div>
          <blockquote
            className="text-xl md:text-2xl font-bold italic mb-3"
            style={{ color: 'var(--t-1)' }}
          >
            {t('promo.vision_quote')}
          </blockquote>
          <p className="text-sm" style={{ color: 'var(--t-5)' }}>
            {t('promo.vision_sub')}
          </p>
        </div>
      </div>
    </section>
  );
}
