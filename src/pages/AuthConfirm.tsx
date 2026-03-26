import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { useCopy } from '../lib/i18n';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';

export function AuthConfirm() {
  const copy = useCopy();
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const run = async () => {
      const { data: { session: s } } = await supabase.auth.getSession();

      if (typeof window !== 'undefined' && window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      if (s) {
        setStatus('success');
        navigate('/', { replace: true });
      } else if (!isLoading) {
        setStatus('error');
      }
    };

    run();
  }, [isLoading, navigate]);

  useEffect(() => {
    if (session && status === 'loading') {
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', window.location.pathname);
      }
      setStatus('success');
      navigate('/', { replace: true });
    }
  }, [session, status, navigate]);

  if (status === 'error') {
    return (
      <div className="mx-auto max-w-lg px-4 py-6 sm:px-0">
        <div className="mb-4 flex justify-end">
          <LanguageSwitcher />
        </div>
        <div className="rounded-3xl border border-black/5 bg-surface p-6 shadow-card sm:p-8">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">
            {copy.authConfirmInvalidTitle}
          </h1>
          <p className="mt-2 text-text-secondary">{copy.authConfirmInvalidBody}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              {copy.authGoLogin}
            </Link>
            <Link
              to="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-secondary px-7 py-3 text-sm font-semibold text-secondary hover:bg-secondary hover:text-white"
            >
              {copy.authBackHome}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6 sm:px-0">
      <div className="mb-4 flex justify-end">
        <LanguageSwitcher />
      </div>
      <div className="rounded-3xl border border-black/5 bg-surface p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          <div>
            <div className="font-semibold">{copy.authConfirming}</div>
            <div className="text-sm text-text-tertiary">{copy.authFinishingSignIn}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
