'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const MODELS = [
  { src: '/images/model_gold.png', alt: 'Model Gold', side: 'left' as const },
  { src: '/images/model_dark.png', alt: 'Model Dark', side: 'right' as const },
  { src: '/images/model_pink.png', alt: 'Model Pink', side: 'left' as const },
];

export default function SideModels() {
  const [scrollY, setScrollY] = useState(0);
  const [winH, setWinH] = useState(0);
  const [docH, setDocH] = useState(0);

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY);
      setWinH(window.innerHeight);
      setDocH(document.documentElement.scrollHeight);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (docH === 0) return null;

  // Total scroll range
  const maxScroll = docH - winH;
  const progress = maxScroll > 0 ? scrollY / maxScroll : 0; // 0 → 1

  // Each model gets a section of the scroll
  // Model 1: appears 5%~35%, Model 2: 30%~65%, Model 3: 60%~95%
  const ranges = [
    { start: 0.05, peak: 0.15, end: 0.40 },
    { start: 0.25, peak: 0.45, end: 0.70 },
    { start: 0.55, peak: 0.70, end: 0.95 },
  ];

  return (
    <div className="hidden 2xl:block pointer-events-none fixed inset-0 z-10">
      {MODELS.map((model, i) => {
        const { start, peak, end } = ranges[i];

        // Opacity: fade in from start→peak, full at peak, fade out peak→end
        let opacity = 0;
        if (progress >= start && progress <= end) {
          if (progress < peak) {
            opacity = (progress - start) / (peak - start);
          } else {
            opacity = 1 - (progress - peak) / (end - peak);
          }
        }
        opacity = Math.max(0, Math.min(1, opacity)) * 0.55;

        // Parallax vertical offset
        const midPoint = (start + end) / 2;
        const yOffset = (progress - midPoint) * -120;

        if (opacity < 0.01) return null;

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
              className="relative w-full overflow-hidden"
              style={{
                opacity,
                transform: `translateY(${yOffset}px)`,
                transition: 'opacity 0.1s ease-out',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              }}
            >
              <Image
                src={model.src}
                alt={model.alt}
                width={400}
                height={600}
                className="w-full h-auto object-cover"
                style={{
                  filter: 'grayscale(0.15) brightness(0.85)',
                  mixBlendMode: 'luminosity',
                }}
                priority={false}
              />
              {/* Gradient overlay to blend with site */}
              <div
                className="absolute inset-0"
                style={{
                  background: isLeft
                    ? 'linear-gradient(to right, transparent 0%, rgba(var(--bg-raw, 0,0,0), 0.4) 100%)'
                    : 'linear-gradient(to left, transparent 0%, rgba(var(--bg-raw, 0,0,0), 0.4) 100%)',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
