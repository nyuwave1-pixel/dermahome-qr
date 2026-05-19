'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { LOCALES } from '@/i18n/types';

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-200"
        style={{
          color: 'var(--t-4)',
          border: '1px solid var(--bd-3)',
          background: 'transparent',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'var(--su-hover)';
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--bd-1)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'transparent';
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--bd-3)';
        }}
        aria-label="Language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{current.flag}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden z-50"
          style={{
            background: 'var(--t-bg-dp)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--bd-2)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          }}
        >
          <div className="py-1">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[13px] transition-all duration-150"
                style={{
                  color: locale === l.code ? '#9dd470' : 'var(--t-3)',
                  background: locale === l.code ? 'rgba(92,138,60,0.12)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (locale !== l.code) {
                    (e.currentTarget as HTMLElement).style.background = 'var(--su-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (locale !== l.code) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                <span className="text-base">{l.flag}</span>
                <span className="font-medium">{l.label}</span>
                {locale === l.code && (
                  <span className="ml-auto text-[10px]" style={{ color: '#7bae52' }}>
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
