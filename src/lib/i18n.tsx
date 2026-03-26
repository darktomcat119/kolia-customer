import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  type Copy,
  type Locale,
  STORAGE_KEY,
  getCopyForLocale,
  getInitialLocale,
  isLocaleLocked,
} from './i18nCopy';

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: Copy;
  isLocaleLocked: boolean;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const locked = useMemo(() => isLocaleLocked(), []);
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());

  const setLocale = useCallback(
    (next: Locale) => {
      if (locked) return;
      setLocaleState(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* noop */
      }
    },
    [locked],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const copy = useMemo(() => getCopyForLocale(locale), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, copy, isLocaleLocked: locked }),
    [locale, setLocale, copy, locked],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function useCopy(): Copy {
  return useI18n().copy;
}
