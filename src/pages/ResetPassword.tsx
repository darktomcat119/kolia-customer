import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCopy } from '../lib/i18n';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';

export function ResetPassword() {
  const copy = useCopy();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canUpdate = useMemo(() => true, []);

  const onSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      navigate('/login', { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : copy.resetFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-6 sm:px-0">
      <div className="mb-4 flex justify-end">
        <LanguageSwitcher />
      </div>
      <div className="rounded-3xl border border-black/5 bg-surface p-6 shadow-card sm:p-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">{copy.resetTitle}</h1>
        <p className="mt-2 text-text-secondary">{copy.resetSubtitle}</p>

        {error ? (
          <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-6 space-y-3">
          <label className="block">
            <div className="mb-1 text-sm font-semibold text-text-primary">{copy.resetNewPassword}</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
              placeholder="••••••••"
              autoComplete="new-password"
              aria-label={copy.resetNewPassword}
            />
          </label>

          <button
            type="button"
            disabled={!canUpdate || !password || loading}
            onClick={onSubmit}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? copy.resetSaving : copy.resetUpdate}
          </button>
        </div>
      </div>
    </div>
  );
}
