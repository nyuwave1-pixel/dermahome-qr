'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink, Navigation, Building2, Phone, Clock, Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

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

const GOOGLE_MAP_URL =
  'https://www.google.com/maps?num=10&sca_esv=409ebaf8c7634d9a&output=search&q=%EC%9C%A0%EB%8B%88%EC%95%A4%EC%BD%94%EC%96%B4&source=lnms&fbs=ADc_l-bD_nyrjATWBKup7flJ4reabDXIIhQQUsoZw8B9coVqKEgfu6lcPwoTE2ivC7emLV02gK8-bh9uQxb87Gnd1572jqYXiMfkUQdpqFD76g4TDke-fqGeRZuOnmUIEv-xvuEIENt-CtAQImhSCars4MnNa7F7HIYkflutLigwMJqee__TGKPxZnexp0OEXX42rbGv_3wjPdUVziPJOw1Y5G4kd4seUQ&entry=mc&ved=1t:200715&ictx=111';

const GOOGLE_MAP_EMBED =
  'https://maps.google.com/maps?q=%EC%9C%A0%EB%8B%88%EC%95%A4%EC%BD%94%EC%96%B4&t=&z=15&ie=UTF8&iwloc=&output=embed';

export default function StoreLocatorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { t } = useLanguage();

  const HQ_INFO = [
    { icon: MapPin, label: t('store.address_label'), value: t('store.address') },
    { icon: Phone, label: 'TEL', value: '1551-7970' },
    { icon: Phone, label: 'FAX', value: '02-571-0122' },
    { icon: Clock, label: t('store.hours_label'), value: t('store.hours') },
    { icon: Globe, label: t('store.website_label'), value: 'www.unincore.com', href: 'https://www.unincore.com' },
  ];

  return (
    <section ref={sectionRef} id="stores" className="py-28 relative overflow-hidden">
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
            {t('store.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="text-gradient-green">{t('store.h2_1')}</span>
            <span style={{ color: 'var(--t-1)' }}>{t('store.h2_2')}</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: 'var(--t-4)' }}>
            {t('store.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left: HQ Info */}
          <div
            className="lg:col-span-2 transition-all duration-700 delay-100"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-24px)' }}
          >
            {/* Company badge */}
            <div
              className="p-5 rounded-2xl mb-4"
              style={{
                background: 'rgba(92,138,60,0.07)',
                border: '1px solid rgba(92,138,60,0.25)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-5 h-5" style={{ color: '#7bae52' }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#7bae52' }}>
                  UNI&CORE HQ
                </span>
              </div>
              <div className="text-2xl font-black mb-1" style={{ color: 'var(--t-1)' }}>
                {t('store.company')}
              </div>
              <div className="text-sm" style={{ color: 'var(--t-4)' }}>
                {t('store.hq_sub')}
              </div>
            </div>

            {/* Info list */}
            <div className="space-y-2.5 mb-4">
              {HQ_INFO.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl transition-all duration-500"
                  style={{
                    background: 'var(--su-1)',
                    border: '1px solid var(--bd-3)',
                    opacity: inView ? 1 : 0,
                    transitionDelay: `${200 + i * 80}ms`,
                  }}
                >
                  <item.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#7bae52' }} />
                  <div>
                    <div className="text-[11px] font-medium mb-0.5" style={{ color: 'var(--t-5)' }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold transition-colors"
                        style={{ color: '#9dd470' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm font-semibold" style={{ color: 'var(--t-1)' }}>
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google map CTA */}
            <a
              href={GOOGLE_MAP_URL}
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
                <span className="text-sm font-semibold">{t('store.map_cta')}</span>
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
                <button
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group"
                  onClick={() => setShowMap(true)}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, rgba(92,138,60,0.05) 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  {/* HQ pin marker */}
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(3,199,90,0.12)',
                        border: '1px solid rgba(3,199,90,0.25)',
                      }}
                    >
                      <Building2 className="w-8 h-8" style={{ color: '#4dc870' }} />
                    </div>
                    <div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: '#5c8a3c',
                        border: '2px solid var(--t-bg)',
                      }}
                    >
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--t-1)' }}>
                      {t('store.map_btn')}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--t-5)' }}>
                      {t('store.map_desc')}
                    </p>
                  </div>

                  {/* Single HQ ping */}
                  <div className="absolute" style={{ top: '45%', left: '50%' }}>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: '#5c8a3c',
                        animation: 'glowPulse 1.5s ease-in-out infinite',
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'rgba(92,138,60,0.3)',
                        animation: 'ripple 1.5s ease-out infinite',
                      }}
                    />
                  </div>
                </button>
              ) : (
                <iframe
                  src={GOOGLE_MAP_EMBED}
                  title="UNI&CORE HQ"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  onLoad={() => setMapLoaded(true)}
                  style={{ opacity: mapLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
                  allowFullScreen
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
                  {t('store.map_bar')}
                </span>
              </div>
              <a
                href={GOOGLE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs transition-colors"
                style={{ color: 'var(--t-7)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#7bae52'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--t-7)'; }}
              >
                {t('store.map_open')}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
