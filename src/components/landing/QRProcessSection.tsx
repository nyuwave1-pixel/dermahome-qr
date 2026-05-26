'use client';

import Link from 'next/link';
import { Store, QrCode, ShieldCheck, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';

export default function QRProcessSection() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const { t } = useLanguage();

  const steps = [
    {
      icon: Store,
      step: '01',
      title: t('qr.step1_title'),
      desc: t('qr.step1_desc'),
      accent: '#7bae52',
      who: t('qr.step1_who'),
    },
    {
      icon: QrCode,
      step: '02',
      title: t('qr.step2_title'),
      desc: t('qr.step2_desc'),
      accent: '#38bdf8',
      who: t('qr.step2_who'),
    },
    {
      icon: ShieldCheck,
      step: '03',
      title: t('qr.step3_title'),
      desc: t('qr.step3_desc'),
      accent: '#9dd470',
      who: t('qr.step3_who'),
    },
    {
      icon: RefreshCw,
      step: '04',
      title: t('qr.step4_title'),
      desc: t('qr.step4_desc'),
      accent: '#e879f9',
      who: t('qr.step4_who'),
    },
  ];

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} id="qr-process" className="py-28 relative overflow-hidden">
      {/* Grid bg */}
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
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
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
            {t('qr.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>{t('qr.h2_1')}</span>
            <span className="text-gradient-green">{t('qr.h2_2')}</span>
            <span style={{ color: 'var(--t-1)' }}>{t('qr.h2_3')}</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: 'var(--t-4)' }}>
            {t('qr.desc')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                'linear-gradient(to right, rgba(92,138,60,0.15), rgba(92,138,60,0.4), rgba(92,138,60,0.4), rgba(92,138,60,0.15))',
            }}
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
                  background: 'var(--su-2)',
                  border: '1px solid var(--bd-2)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}35`;
                  (e.currentTarget as HTMLElement).style.background = `${s.accent}06`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--bd-2)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--su-2)';
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                  style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}35` }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.accent }} />
                </div>

                {/* Who badge */}
                <div
                  className="inline-block text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md mb-2"
                  style={{ background: `${s.accent}18`, color: s.accent }}
                >
                  {s.who}
                </div>

                {/* Step number */}
                <div
                  className="text-4xl font-black mb-2 leading-none"
                  style={{ color: 'var(--bd-3)' }}
                >
                  {s.step}
                </div>

                <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--t-1)' }}>
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--t-5)' }}>
                  {s.desc}
                </p>

                <div
                  className="mt-4 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(to right, ${s.accent}50, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl transition-all duration-700 delay-500"
          style={{
            background: 'rgba(92,138,60,0.06)',
            border: '1px solid rgba(92,138,60,0.22)',
            opacity: inView ? 1 : 0,
          }}
        >
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--t-1)' }}>
              {t('qr.cta_title')}
            </p>
            <p className="text-xs" style={{ color: 'var(--t-4)' }}>
              {t('qr.cta_desc')}
            </p>
          </div>
          <Link
            href="/generate"
            className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03]"
            style={{ background: '#5c8a3c', boxShadow: '0 0 20px rgba(92,138,60,0.30)' }}
          >
            <QrCode className="w-4 h-4" />
            {t('qr.cta_btn')}
          </Link>
        </div>
      </div>
    </section>
  );
}
