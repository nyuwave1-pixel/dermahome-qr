'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

/*
  Each entry ties one model image to a specific page section.
  - sectionId : the DOM id of the <section> the image should appear next to
  - side      : 'left' | 'right'
  - src / alt : image props
*/
/* ── Product images (replace model portraits) ─────────────────────────
   product_01.png : Hydrating Skin Barrier Serum Mist 120ml
   product_02.png : Hydrating Skin Barrier Serum Mist 50ml
   product_03.png : Micro Bubble Cleansing Foam 120ml
───────────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  { src: '/images/product_01.png', alt: 'UNI&CORE Hydrating Skin Barrier Serum Mist 120ml' },
  { src: '/images/product_02.png', alt: 'UNI&CORE Hydrating Skin Barrier Serum Mist 50ml' },
  { src: '/images/product_03.png', alt: 'UNI&CORE Micro Bubble Cleansing Foam' },
];

const MODELS: {
  sectionId: string;
  side: 'left' | 'right';
  src: string;
  alt: string;
}[] = [
  // 더마10 — 8종 헤드 시스템
  { sectionId: 'heads',       side: 'left',  ...PRODUCTS[0] },
  { sectionId: 'heads',       side: 'right', ...PRODUCTS[1] },
  // 더마10 프리미엄 피부 관리 시스템
  { sectionId: 'device-spec', side: 'left',  ...PRODUCTS[2] },
  { sectionId: 'device-spec', side: 'right', ...PRODUCTS[0] },
  // 더마10 사용 가이드
  { sectionId: 'usage',       side: 'left',  ...PRODUCTS[1] },
  { sectionId: 'usage',       side: 'right', ...PRODUCTS[2] },
  // 1회성 QR로 기기 사용 권한 관리
  { sectionId: 'qr-process',  side: 'left',  ...PRODUCTS[0] },
  { sectionId: 'qr-process',  side: 'right', ...PRODUCTS[1] },
  // 케어 가이드
  { sectionId: 'guide',       side: 'left',  ...PRODUCTS[2] },
  { sectionId: 'guide',       side: 'right', ...PRODUCTS[0] },
];

export default function SideModels() {
  const [rects, setRects] = useState<(DOMRect | null)[]>(MODELS.map(() => null));
  const [scrollY, setScrollY] = useState(0);
  const [winH, setWinH] = useState(0);

  /* Measure section positions */
  const measure = useCallback(() => {
    setRects(
      MODELS.map((m) => {
        const el = document.getElementById(m.sectionId);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return new DOMRect(r.x, r.y + window.scrollY, r.width, r.height);
      }),
    );
    setWinH(window.innerHeight);
  }, []);

  useEffect(() => {
    measure();

    // rAF-throttled scroll handler — caps at ~60fps
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    // Re-measure after fonts / images settle
    const t = setTimeout(measure, 1500);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      clearTimeout(t);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [measure]);

  if (winH === 0) return null;

  return (
    <div className="hidden 2xl:block pointer-events-none fixed inset-0 z-10">
      {MODELS.map((model, i) => {
        const rect = rects[i];
        if (!rect) return null;

        // Section top / bottom relative to viewport
        const secTop = rect.top - scrollY;
        const secBot = rect.top + rect.height - scrollY;

        // Only show when the section is actually overlapping the viewport
        if (secBot < 0 || secTop > winH) return null;

        // How much of the section is inside the viewport (0→1)
        const overlapTop = Math.max(0, secTop);
        const overlapBot = Math.min(winH, secBot);
        const overlapRatio = (overlapBot - overlapTop) / winH;

        // Opacity peaks when section is centered in viewport
        const secCenter = (secTop + secBot) / 2;
        const distFromCenter = Math.abs(secCenter - winH / 2);
        const maxDist = winH * 0.8;
        let opacity = 1 - distFromCenter / maxDist;
        opacity = Math.max(0, Math.min(1, opacity)) * Math.min(overlapRatio * 3, 1) * 0.6;

        if (opacity < 0.02) return null;

        // Subtle parallax: move image slightly opposite to scroll
        const normalised = (secCenter - winH / 2) / winH; // −0.5 ↔ +0.5
        const yOffset = normalised * -60;

        const isLeft = model.side === 'left';

        return (
          <div
            key={i}
            className="absolute top-0 h-full flex items-center"
            style={{
              left: isLeft ? '0' : 'auto',
              right: isLeft ? 'auto' : '0',
              width: 'calc((100vw - 1152px) / 2)',
              maxWidth: '320px',
              minWidth: '120px',
            }}
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{
                opacity,
                transform: `translateY(${yOffset}px)`,
                willChange: 'opacity, transform',
                maskImage:
                  'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            >
              <Image
                src={model.src}
                alt={model.alt}
                width={400}
                height={500}
                className="w-full h-auto object-contain"
                style={{
                  padding: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                }}
                priority={false}
              />
              {/* Inner edge fade toward content area */}
              <div
                className="absolute inset-0"
                style={{
                  background: isLeft
                    ? 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.15) 100%)'
                    : 'linear-gradient(to left, transparent 60%, rgba(0,0,0,0.15) 100%)',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
