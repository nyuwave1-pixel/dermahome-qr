'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

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

const CHANNEL_URL = 'https://www.youtube.com/@unincore.official/videos';

// Curated UNI&CORE videos
const videos = [
  {
    id: 'sICDg5vYvPk',
    title: '더마 시리즈 기기 소개 — UNI&CORE DermaHome 10',
    desc: '8종 헤드 올인원 피부 미용 기기의 모든 것. RF 리프팅부터 산소 인퓨전까지.',
    tag: 'FEATURED',
    tagColor: '#9dd470',
    featured: true,
  },
];

function VideoThumbnail({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [playing, setPlaying] = useState(false);
  const { t } = useLanguage();

  const featured = videos[0];

  return (
    <section ref={sectionRef} id="videos" className="py-28 relative overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(92,138,60,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Play className="w-4 h-4" style={{ color: '#ff4444', fill: '#ff4444' }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#7bae52' }}
            >
              UNI&CORE Official
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span style={{ color: 'var(--t-1)' }}>{t('video.h2_1')}</span>
            <span className="text-gradient-green">{t('video.h2_2')}</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: 'var(--t-4)' }}>
            {t('video.desc')}
          </p>
        </div>

        {/* Featured video */}
        <div
          className="mb-8 transition-all duration-700 delay-100"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)' }}
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'var(--su-2)',
              border: '1px solid var(--bd-2)',
            }}
          >
            {/* Video player area */}
            <div className="relative" style={{ aspectRatio: '16/9', background: '#000' }}>
              {playing ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${featured.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={featured.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 w-full h-full group"
                  aria-label="Play video"
                >
                  {/* Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${featured.id}/maxresdefault.jpg`}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
                    style={{ background: 'var(--t-bg-gl)' }}
                  />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)',
                        border: '2px solid rgba(255,255,255,0.3)',
                      }}
                    >
                      <Play
                        className="w-8 h-8 ml-1"
                        style={{ color: '#fff', fill: '#fff' }}
                      />
                    </div>
                  </div>
                  {/* Featured badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg tracking-wider"
                      style={{
                        background: `${featured.tagColor}20`,
                        color: featured.tagColor,
                        border: `1px solid ${featured.tagColor}35`,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {featured.tag}
                    </span>
                  </div>
                </button>
              )}
            </div>

            {/* Video info */}
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--t-1)' }}>
                  {featured.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--t-4)' }}>
                  {featured.desc}
                </p>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${featured.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-all duration-200"
                style={{
                  color: 'var(--t-5)',
                  border: '1px solid var(--bd-2)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--t-1)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--t-5)'; }}
              >
                YouTube
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Channel CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl transition-all duration-700 delay-200"
          style={{
            background: 'var(--su-2)',
            border: '1px solid var(--bd-3)',
            opacity: inView ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,68,68,0.12)', border: '1px solid rgba(255,68,68,0.25)' }}
            >
              <Play className="w-5 h-5" style={{ color: '#ff4444', fill: '#ff4444' }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--t-1)' }}>
                {t('video.channel_name')}
              </p>
              <p className="text-xs" style={{ color: 'var(--t-5)' }}>
                {t('video.channel_desc')}
              </p>
            </div>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
            style={{
              background: 'rgba(255,68,68,0.15)',
              border: '1px solid rgba(255,68,68,0.3)',
              color: '#ff7070',
            }}
          >
            {t('video.channel_cta')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
