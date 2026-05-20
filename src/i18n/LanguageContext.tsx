'use client';

import { createContext, useContext, useCallback, ReactNode } from 'react';
import { Locale } from './types';
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale: Locale = 'ko';

  const setLocale = useCallback(() => {}, []);

  const t = useCallback(
    (key: string): string => {
      return translations.ko[key] ?? key;
    },
    [],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
