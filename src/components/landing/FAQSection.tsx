'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TrendingUp, Globe, Users, Award, Target, Heart, Zap } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';

export default function FAQSection() {
  const { ref: sectionRef, inView } = useInView(0.06);
  const { t } = useLanguage();

  const keyStats = [
    { value: 'VIP', label: t('promo.stat1_label'), sub: t('promo.stat1_sub'), color: '#9dd470' },
    { value: t('promo.stat2_val'), label: t('promo.stat2_label'), sub: t('promo.stat2_sub'), color: '#38bdf8' },
    { value: t('promo.stat3_val'), label: t('promo.stat3_label'), sub: t('promo.stat3_sub'), color: '#e879f9' },
    { value: '2022', label: t('promo.stat4_label'), sub: t('promo.stat4_sub'), color: '#fb923c' },
  ];

  const values = [
    {
      icon: Users,
      title: t('about.value1_title'),
      desc: t('about.value1_desc'),
      color: '#7bae52',
    },
    {
      icon: Award,
      title: t('about.value2_title'),
      desc: t('about.value2_desc'),
      color: '#38bdf8',
    },
    {
      icon: Globe,
      title: t('about.value3_title'),
      desc: t('about.value3_desc'),
      color: '#e879f9',
    },
  ];

  return (
    <section id="about" ref={sectionRef as React.RefObject<HTMLElement>} className="py-28 relative overflow-hidden">
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
            {t('about.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>{t('about.h2_1')}</span>
            <span className="text-gradient-green">{t('about.h2_2')}</span>
          </h2>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: 'var(--t-4)' }}>
            {t('about.desc')}
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
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#7bae52' }}>{t('about.vision')}</span>
            </div>
            <p className="text-lg font-bold leading-snug whitespace-pre-line" style={{ color: 'var(--t-1)' }}>
              {t('about.vision_text')}
            </p>
          </div>
          <div
            className="p-6 rounded-2xl"
            style={{ background: 'var(--su-1)', border: '1px solid var(--bd-2)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4" style={{ color: '#38bdf8' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#38bdf8' }}>{t('about.mission')}</span>
            </div>
            <p className="text-lg font-bold leading-snug italic whitespace-pre-line" style={{ color: 'var(--t-1)' }}>
              {t('about.mission_text')}
            </p>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {keyStats.map((s, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl text-center transition-all duration-500"
              style={{
                background: 'var(--su-1)',
                border: '1px solid var(--bd-3)',
                opacity: inView ? 1 : 0,
                transitionDelay: `${150 + i * 60}ms`,
              }}
            >
              <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-xs font-semibold mb-0.5" style={{ color: 'var(--t-1)' }}>{s.label}</div>
              <div className="text-[10px]" style={{ color: 'var(--t-7)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl text-center transition-all duration-500"
              style={{
                background: 'var(--su-1)',
                border: '1px solid var(--bd-3)',
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
              <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t-1)' }}>{v.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--t-5)' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Growth timeline */}
        <div
          className="p-5 rounded-2xl mb-8 transition-all duration-700 delay-400"
          style={{
            background: 'var(--su-2)',
            border: '1px solid var(--bd-3)',
            opacity: inView ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4" style={{ color: '#7bae52' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--t-6)' }}>
              {t('about.timeline_title')}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { year: '2022', event: t('about.y2022'), color: 'rgba(92,138,60,0.18)' },
              { year: '2023', event: t('about.y2023'), color: 'rgba(92,138,60,0.28)' },
              { year: '2024', event: t('about.y2024'), color: 'rgba(92,138,60,0.40)' },
              { year: '2025', event: t('about.y2025'), color: 'rgba(92,138,60,0.55)' },
            ].map((m) => (
              <div
                key={m.year}
                className="p-3 rounded-xl relative overflow-hidden"
                style={{ background: 'var(--su-3)', border: '1px solid var(--bd-3)' }}
              >
                <div className="text-2xl font-black mb-1" style={{ color: m.color }}>
                  {m.year}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--t-4)' }}>
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
                <span className="text-sm font-bold" style={{ color: 'var(--t-1)' }}>{t('about.flagship')}</span>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(92,138,60,0.20)', color: '#9dd470' }}
                >
                  {t('about.flagship_tag')}
                </span>
              </div>
              <div className="text-xs" style={{ color: 'var(--t-5)' }}>
                {t('about.flagship_sub')}
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-2xl flex items-center gap-4"
            style={{ background: 'var(--su-2)', border: '1px solid var(--bd-3)' }}
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
              <div className="text-sm font-bold mb-1" style={{ color: 'var(--t-1)' }}>
                {t('about.lounge_title')}
              </div>
              <div className="text-xs leading-relaxed whitespace-pre-line" style={{ color: 'var(--t-5)' }}>
                {t('about.lounge_desc')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
