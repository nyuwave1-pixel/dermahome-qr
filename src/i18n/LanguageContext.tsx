'use client';

import { createContext, useContext, useCallback, useState, useEffect, ReactNode } from 'react';
import { Locale } from './types';
import translations from './translations';

const STORAGE_KEY = 'dermahome-locale';
const DEFAULT_LOCALE: Locale = 'en';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
});

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && saved in translations) return saved as Locale;
  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[locale]?.[key] ?? translations[DEFAULT_LOCALE]?.[key] ?? key;
    },
    [locale],
  );

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: DEFAULT_LOCALE, setLocale, t: (key) => translations[DEFAULT_LOCALE]?.[key] ?? key }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
