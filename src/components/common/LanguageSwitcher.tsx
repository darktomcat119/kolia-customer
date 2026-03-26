import { useId } from 'react';
import { useI18n } from '../../lib/i18n';
import type { Locale } from '../../lib/i18nCopy';

const LOCALES: { code: Locale; labelKey: 'langEn' | 'langFr' | 'langPt' }[] = [
  { code: 'en', labelKey: 'langEn' },
  { code: 'fr', labelKey: 'langFr' },
  { code: 'pt', labelKey: 'langPt' },
];

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const id = useId();
  const { locale, setLocale, copy, isLocaleLocked } = useI18n();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor={id} className="sr-only">
        {copy.langLabel}
      </label>
      <select
        id={id}
        data-testid="language-switcher"
        value={locale}
        disabled={isLocaleLocked}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="min-h-[40px] rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
        aria-label={copy.langLabel}
      >
        {LOCALES.map(({ code, labelKey }) => (
          <option key={code} value={code}>
            {copy[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
}
