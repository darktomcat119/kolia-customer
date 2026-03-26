import type { ReactNode } from 'react';
import logo from '../../../../website/public/logo.png';
import { useCopy } from '../../lib/i18n';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const copy = useCopy();
  return (
    <div className="grid min-h-[100dvh] gap-6 lg:grid-cols-12 lg:items-stretch">
      <aside className="relative hidden h-[100dvh] overflow-hidden rounded-r-3xl border border-black/5 bg-secondary text-white shadow-card lg:col-span-5 lg:block lg:rounded-l-none">
        <img
          src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1400&auto=format&fit=crop&q=70"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-secondary/65 to-primary/40" />
        <div className="absolute inset-0 p-8">
          <img src={logo} alt="Kolia" className="h-12 w-auto rounded-xl bg-white/15 p-2 backdrop-blur" />
          <div className="mt-10 max-w-sm">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight">
              {copy.authAsideTitle}
            </h2>
            <p className="mt-4 text-sm text-white/85">{copy.authAsideSubtitle}</p>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-col justify-start lg:col-span-7 lg:justify-center">
        <div className="relative mb-4 overflow-hidden rounded-b-3xl border border-black/5 bg-secondary text-white shadow-card lg:hidden">
          <img
            src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1400&auto=format&fit=crop&q=70"
            alt=""
            className="h-40 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-secondary/65 to-primary/40" />
          <div className="absolute inset-0 p-4">
            <img src={logo} alt="Kolia" className="h-9 w-auto rounded-lg bg-white/15 p-1.5 backdrop-blur" />
            <p className="mt-3 max-w-[92%] text-sm font-semibold leading-snug text-white/90">{copy.authAsideSubtitle}</p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg rounded-3xl border border-black/5 bg-surface p-6 shadow-card sm:p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center">
              <img src={logo} alt="Kolia" className="h-11 w-auto rounded-lg bg-black/[0.03] p-1" />
            </div>
            <LanguageSwitcher />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-text-secondary">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
