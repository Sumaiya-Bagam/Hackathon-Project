import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Language } from '@/types';
import { translations } from '@/data/translations';

interface LanguageContextValue {
  lang: Language;
  toggleLang: () => void;
  t: typeof translations['ta'];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ta');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ta' ? 'en' : 'ta'));
  }, []);

  const value: LanguageContextValue = {
    lang,
    toggleLang,
    t: translations[lang],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
