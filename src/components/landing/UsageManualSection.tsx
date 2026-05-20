'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

/* ─── Types ──────────────────────────────────────────────────── */
type Step = { headId: string; product: string; time: string; purpose: string };
type Routine = {
  id: string;
  title: string;
  subtitle: string;
  concern: string;
  steps: Step[];
  directions: { zone: string; guide: string }[];
  tip?: string;
};
type Category = { id: string; label: string; color: string; routines: Routine[] };

/* ─── Head colours ───────────────────────────────────────────── */
const HEAD_COLORS: Record<string, string> = {
  rf: '#e879f9',
  us: '#38bdf8',
  ion: '#818cf8',
};

/* ─── Build data with translations ───────────────────────────── */
function buildCategories(t: (k: string) => string): Category[] {
  return [
    {
      id: 'face', label: t('m.cat_face'), color: '#e879f9',
      routines: [
        {
          id: 'brightening', title: t('m.bright.title'), subtitle: t('m.bright.sub'), concern: t('m.bright.concern'),
          steps: [
            { headId: 'ion', product: t('m.bright.s1p'), time: t('m.bright.s1t'), purpose: t('m.bright.s1x') },
            { headId: 'us', product: t('m.bright.s2p'), time: t('m.bright.s2t'), purpose: t('m.bright.s2x') },
            { headId: 'rf', product: t('m.bright.s3p'), time: t('m.bright.s3t'), purpose: t('m.bright.s3x') },
          ],
          directions: [
            { zone: t('m.bright.d1z'), guide: t('m.bright.d1g') },
            { zone: t('m.bright.d2z'), guide: t('m.bright.d2g') },
            { zone: t('m.bright.d3z'), guide: t('m.bright.d3g') },
            { zone: t('m.bright.d4z'), guide: t('m.bright.d4g') },
            { zone: t('m.bright.d5z'), guide: t('m.bright.d5g') },
          ],
          tip: t('m.bright.tip'),
        },
        {
          id: 'wrinkle', title: t('m.wrinkle.title'), subtitle: t('m.wrinkle.sub'), concern: t('m.wrinkle.concern'),
          steps: [
            { headId: 'ion', product: t('m.wrinkle.s1p'), time: t('m.wrinkle.s1t'), purpose: t('m.wrinkle.s1x') },
            { headId: 'rf', product: t('m.wrinkle.s2p'), time: t('m.wrinkle.s2t'), purpose: t('m.wrinkle.s2x') },
            { headId: 'us', product: t('m.wrinkle.s3p'), time: t('m.wrinkle.s3t'), purpose: t('m.wrinkle.s3x') },
          ],
          directions: [
            { zone: t('m.wrinkle.d1z'), guide: t('m.wrinkle.d1g') },
            { zone: t('m.wrinkle.d2z'), guide: t('m.wrinkle.d2g') },
            { zone: t('m.wrinkle.d3z'), guide: t('m.wrinkle.d3g') },
            { zone: t('m.wrinkle.d4z'), guide: t('m.wrinkle.d4g') },
            { zone: t('m.wrinkle.d5z'), guide: t('m.wrinkle.d5g') },
          ],
          tip: t('m.wrinkle.tip'),
        },
        {
          id: 'soothing', title: t('m.sooth.title'), subtitle: t('m.sooth.sub'), concern: t('m.sooth.concern'),
          steps: [
            { headId: 'us', product: t('m.sooth.s1p'), time: t('m.sooth.s1t'), purpose: t('m.sooth.s1x') },
            { headId: 'ion', product: t('m.sooth.s2p'), time: t('m.sooth.s2t'), purpose: t('m.sooth.s2x') },
            { headId: 'rf', product: t('m.sooth.s3p'), time: t('m.sooth.s3t'), purpose: t('m.sooth.s3x') },
          ],
          directions: [
            { zone: t('m.sooth.d1z'), guide: t('m.sooth.d1g') },
            { zone: t('m.sooth.d2z'), guide: t('m.sooth.d2g') },
            { zone: t('m.sooth.d3z'), guide: t('m.sooth.d3g') },
            { zone: t('m.sooth.d4z'), guide: t('m.sooth.d4g') },
          ],
          tip: t('m.sooth.tip'),
        },
        {
          id: 'depuff', title: t('m.depuff.title'), subtitle: t('m.depuff.sub'), concern: t('m.depuff.concern'),
          steps: [
            { headId: 'us', product: t('m.depuff.s1p'), time: t('m.depuff.s1t'), purpose: t('m.depuff.s1x') },
            { headId: 'ion', product: t('m.depuff.s2p'), time: t('m.depuff.s2t'), purpose: t('m.depuff.s2x') },
          ],
          directions: [
            { zone: t('m.depuff.d1z'), guide: t('m.depuff.d1g') },
            { zone: t('m.depuff.d2z'), guide: t('m.depuff.d2g') },
            { zone: t('m.depuff.d3z'), guide: t('m.depuff.d3g') },
            { zone: t('m.depuff.d4z'), guide: t('m.depuff.d4g') },
          ],
        },
        {
          id: 'makeup', title: t('m.makeup.title'), subtitle: t('m.makeup.sub'), concern: t('m.makeup.concern'),
          steps: [
            { headId: 'ion', product: t('m.makeup.s1p'), time: t('m.makeup.s1t'), purpose: t('m.makeup.s1x') },
            { headId: 'us', product: t('m.makeup.s2p'), time: t('m.makeup.s2t'), purpose: t('m.makeup.s2x') },
          ],
          directions: [
            { zone: t('m.makeup.d1z'), guide: t('m.makeup.d1g') },
            { zone: t('m.makeup.d2z'), guide: t('m.makeup.d2g') },
            { zone: t('m.makeup.d3z'), guide: t('m.makeup.d3g') },
            { zone: t('m.makeup.d4z'), guide: t('m.makeup.d4g') },
          ],
        },
      ],
    },
    {
      id: 'hair', label: t('m.cat_hair'), color: '#38bdf8',
      routines: [
        {
          id: 'headache', title: t('m.headache.title'), subtitle: t('m.headache.sub'), concern: t('m.headache.concern'),
          steps: [
            { headId: 'rf', product: t('m.headache.s1p'), time: t('m.headache.s1t'), purpose: t('m.headache.s1x') },
            { headId: 'us', product: t('m.headache.s2p'), time: t('m.headache.s2t'), purpose: t('m.headache.s2x') },
            { headId: 'ion', product: t('m.headache.s3p'), time: t('m.headache.s3t'), purpose: t('m.headache.s3x') },
          ],
          directions: [
            { zone: t('m.headache.d1z'), guide: t('m.headache.d1g') },
            { zone: t('m.headache.d2z'), guide: t('m.headache.d2g') },
            { zone: t('m.headache.d3z'), guide: t('m.headache.d3g') },
            { zone: t('m.headache.d4z'), guide: t('m.headache.d4g') },
            { zone: t('m.headache.d5z'), guide: t('m.headache.d5g') },
          ],
        },
        {
          id: 'hairloss', title: t('m.hairloss.title'), subtitle: t('m.hairloss.sub'), concern: t('m.hairloss.concern'),
          steps: [
            { headId: 'rf', product: t('m.hairloss.s1p'), time: t('m.hairloss.s1t'), purpose: t('m.hairloss.s1x') },
            { headId: 'us', product: t('m.hairloss.s2p'), time: t('m.hairloss.s2t'), purpose: t('m.hairloss.s2x') },
            { headId: 'ion', product: t('m.hairloss.s3p'), time: t('m.hairloss.s3t'), purpose: t('m.hairloss.s3x') },
          ],
          directions: [
            { zone: t('m.hairloss.d1z'), guide: t('m.hairloss.d1g') },
            { zone: t('m.hairloss.d2z'), guide: t('m.hairloss.d2g') },
            { zone: t('m.hairloss.d3z'), guide: t('m.hairloss.d3g') },
          ],
        },
        {
          id: 'facelift', title: t('m.facelift.title'), subtitle: t('m.facelift.sub'), concern: t('m.facelift.concern'),
          steps: [
            { headId: 'rf', product: t('m.facelift.s1p'), time: t('m.facelift.s1t'), purpose: t('m.facelift.s1x') },
            { headId: 'us', product: t('m.facelift.s2p'), time: t('m.facelift.s2t'), purpose: t('m.facelift.s2x') },
            { headId: 'ion', product: t('m.facelift.s3p'), time: t('m.facelift.s3t'), purpose: t('m.facelift.s3x') },
          ],
          directions: [
            { zone: t('m.facelift.d1z'), guide: t('m.facelift.d1g') },
            { zone: t('m.facelift.d2z'), guide: t('m.facelift.d2g') },
            { zone: t('m.facelift.d3z'), guide: t('m.facelift.d3g') },
          ],
        },
      ],
    },
    {
      id: 'body', label: t('m.cat_body'), color: '#34d399',
      routines: [
        {
          id: 'circulation', title: t('m.circ.title'), subtitle: t('m.circ.sub'), concern: t('m.circ.concern'),
          steps: [
            { headId: 'rf', product: t('m.circ.s1p'), time: t('m.circ.s1t'), purpose: t('m.circ.s1x') },
            { headId: 'us', product: t('m.circ.s2p'), time: t('m.circ.s2t'), purpose: t('m.circ.s2x') },
            { headId: 'ion', product: t('m.circ.s3p'), time: t('m.circ.s3t'), purpose: t('m.circ.s3x') },
          ],
          directions: [
            { zone: t('m.circ.d1z'), guide: t('m.circ.d1g') },
            { zone: t('m.circ.d2z'), guide: t('m.circ.d2g') },
            { zone: t('m.circ.d3z'), guide: t('m.circ.d3g') },
          ],
          tip: t('m.circ.tip'),
        },
        {
          id: 'slimbody', title: t('m.slim.title'), subtitle: t('m.slim.sub'), concern: t('m.slim.concern'),
          steps: [
            { headId: 'rf', product: t('m.slim.s1p'), time: t('m.slim.s1t'), purpose: t('m.slim.s1x') },
            { headId: 'us', product: t('m.slim.s2p'), time: t('m.slim.s2t'), purpose: t('m.slim.s2x') },
            { headId: 'ion', product: t('m.slim.s3p'), time: t('m.slim.s3t'), purpose: t('m.slim.s3x') },
          ],
          directions: [
            { zone: t('m.slim.d1z'), guide: t('m.slim.d1g') },
            { zone: t('m.slim.d2z'), guide: t('m.slim.d2g') },
            { zone: t('m.slim.d3z'), guide: t('m.slim.d3g') },
            { zone: t('m.slim.d4z'), guide: t('m.slim.d4g') },
          ],
        },
        {
          id: 'fascia', title: t('m.fascia.title'), subtitle: t('m.fascia.sub'), concern: t('m.fascia.concern'),
          steps: [
            { headId: 'rf', product: t('m.fascia.s1p'), time: t('m.fascia.s1t'), purpose: t('m.fascia.s1x') },
            { headId: 'us', product: t('m.fascia.s2p'), time: t('m.fascia.s2t'), purpose: t('m.fascia.s2x') },
            { headId: 'ion', product: t('m.fascia.s3p'), time: t('m.fascia.s3t'), purpose: t('m.fascia.s3x') },
          ],
          directions: [
            { zone: t('m.fascia.d1z'), guide: t('m.fascia.d1g') },
            { zone: t('m.fascia.d2z'), guide: t('m.fascia.d2g') },
          ],
        },
      ],
    },
  ];
}

/* ─── Helpers ────────────────────────────────────────────────── */
function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

/* ─── Step badge ─────────────────────────────────────────────── */
function StepBadge({ n, label, headId }: { n: number; label: string; headId: string }) {
  const c = HEAD_COLORS[headId] ?? '#9dd470';
  return (
    <div className="flex items-center gap-2 shrink-0">
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black shrink-0"
        style={{ background: `${c}18`, color: c, border: `1px solid ${c}28` }}
      >
        {n}
      </div>
      <span
        className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded"
        style={{ background: `${c}12`, color: c }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Routine card ───────────────────────────────────────────── */
function RoutineCard({ routine, catColor, isOpen, onToggle, t }: {
  routine: Routine; catColor: string; isOpen: boolean; onToggle: () => void; t: (k: string) => string;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: 'var(--su-2)', border: `1px solid ${isOpen ? `${catColor}30` : 'var(--bd-3)'}` }}
    >
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-5 text-left">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded" style={{ background: `${catColor}12`, color: catColor }}>
              {routine.subtitle}
            </span>
            <span className="text-[10px]" style={{ color: 'var(--t-6)' }}>{routine.concern}</span>
          </div>
          <h4 className="text-base font-black" style={{ color: 'var(--t-1)' }}>{routine.title}</h4>
        </div>
        <div
          className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{ background: isOpen ? `${catColor}18` : 'var(--su-1)', color: isOpen ? catColor : 'var(--t-6)', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>

      <div className="overflow-hidden transition-all duration-400" style={{ maxHeight: isOpen ? '1200px' : '0px' }}>
        <div className="px-5 pb-5 flex flex-col gap-5">
          {/* Steps */}
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--t-7)' }}>
              {t('m.protocol')}
            </div>
            <div className="flex flex-col gap-2">
              {routine.steps.map((step, i) => {
                const c = HEAD_COLORS[step.headId] ?? catColor;
                return (
                  <div key={i} className="rounded-xl p-4" style={{ background: `${c}07`, border: `1px solid ${c}18` }}>
                    <div className="flex items-start gap-3 mb-2 flex-wrap">
                      <StepBadge n={i + 1} label={t(`m.head_${step.headId}`)} headId={step.headId} />
                      <div className="flex items-center gap-2 ml-auto shrink-0">
                        <span className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ background: 'var(--bd-3)', color: 'var(--t-4)' }}>
                          {step.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-semibold mb-1" style={{ color: 'var(--t-2)' }}>{step.product}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--t-4)' }}>{step.purpose}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Directions */}
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--t-7)' }}>
              {t('m.dir_guide')}
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--bd-3)' }}>
              {routine.directions.map(({ zone, guide }, i) => (
                <div
                  key={i}
                  className="flex gap-3 px-4 py-2.5 text-xs"
                  style={{ borderBottom: i < routine.directions.length - 1 ? '1px solid var(--bd-3)' : 'none', background: i % 2 === 0 ? 'var(--su-3)' : 'transparent' }}
                >
                  <span className="shrink-0 font-bold w-20" style={{ color: catColor }}>{zone}</span>
                  <span style={{ color: 'var(--t-3)' }}>{guide}</span>
                </div>
              ))}
            </div>
          </div>

          {routine.tip && (
            <div className="px-4 py-2.5 rounded-xl text-xs" style={{ background: `${catColor}08`, border: `1px solid ${catColor}20`, color: catColor }}>
              {routine.tip}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function UsageManualSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const { t } = useLanguage();
  const [activeCat, setActiveCat] = useState('face');
  const [openRoutine, setOpenRoutine] = useState<string | null>('brightening');

  const categories = buildCategories(t);
  const cat = categories.find(c => c.id === activeCat)!;

  return (
    <section ref={sectionRef} id="usage" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(92,138,60,0.025) 50%, transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14 transition-all duration-700" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#7bae52' }}>
            {t('m.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>{t('m.h2_1')}</span>
            <span className="text-gradient-green">{t('m.h2_2')}</span>
          </h2>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: 'var(--t-4)' }}>
            {t('m.desc')}
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-8 flex-wrap justify-center transition-all duration-700" style={{ opacity: inView ? 1 : 0, transitionDelay: '100ms' }}>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => { setActiveCat(c.id); setOpenRoutine(c.routines[0].id); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{ background: activeCat === c.id ? `${c.color}18` : 'var(--su-1)', border: `1px solid ${activeCat === c.id ? `${c.color}50` : 'var(--bd-2)'}`, color: activeCat === c.id ? c.color : 'var(--t-5)' }}
            >
              {c.label}
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: activeCat === c.id ? `${c.color}20` : 'var(--bd-3)', color: activeCat === c.id ? c.color : 'var(--t-7)' }}>
                {c.routines.length}
              </span>
            </button>
          ))}
        </div>

        {/* Routine list */}
        <div className="flex flex-col gap-3 transition-all duration-500" style={{ opacity: inView ? 1 : 0, transitionDelay: '150ms' }}>
          {cat.routines.map(routine => (
            <RoutineCard key={routine.id} routine={routine} catColor={cat.color} isOpen={openRoutine === routine.id} onToggle={() => setOpenRoutine(openRoutine === routine.id ? null : routine.id)} t={t} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 p-5 rounded-2xl flex flex-wrap gap-4 items-center justify-center transition-all duration-700" style={{ background: 'var(--su-3)', border: '1px solid var(--bd-3)', opacity: inView ? 1 : 0, transitionDelay: '200ms' }}>
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--t-7)' }}>{t('m.legend')}</span>
          {Object.entries(HEAD_COLORS).map(([id, color]) => (
            <div key={id} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
              <span className="text-xs font-medium" style={{ color: 'var(--t-4)' }}>{t(`m.head_${id}`)}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#9dd470' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--t-4)' }}>{t('m.legend_other')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
