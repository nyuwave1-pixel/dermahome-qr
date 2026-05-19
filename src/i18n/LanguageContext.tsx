'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { Locale, COUNTRY_TO_LOCALE } from './types';
import translations from './translations';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'ko',
  setLocale: () => {},
  t: (key) => key,
});

const STORAGE_KEY = 'dh_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ko');
  const [ready, setReady] = useState(false);

  /* ── 1. Restore saved locale OR detect by IP ── */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
      setReady(true);
      return;
    }

    // IP-based geolocation (free, no key required)
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data) => {
        const code: string = data?.country_code ?? '';
        const detected = COUNTRY_TO_LOCALE[code] ?? 'ko';
        setLocaleState(detected);
        localStorage.setItem(STORAGE_KEY, detected);
      })
      .catch(() => {
        // fallback: keep Korean
      })
      .finally(() => setReady(true));
  }, []);

  /* ── 2. Manual locale change ── */
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  /* ── 3. Translation helper ── */
  const t = useCallback(
    (key: string): string => {
      return translations[locale]?.[key] ?? translations.ko[key] ?? key;
    },
    [locale],
  );

  /* ── 4. Update html lang attribute ── */
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Render children immediately — locale starts as 'ko' which is fine
  // since Korean is the default content anyway
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
