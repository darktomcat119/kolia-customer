import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { AuthShell } from '../components/auth/AuthShell';
import { useCopy } from '../lib/i18n';

export function Register() {
  const copy = useCopy();
  const navigate = useNavigate();
  const { signUp, resendConfirmation } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async () => {
    setLoading(true);
    setError('');
    setInfo('');
    try {
      const { needsConfirmation } = await signUp(email, password, fullName || undefined);
      if (needsConfirmation) {
        setInfo(copy.registerCheckInbox);
      } else {
        navigate('/', { replace: true });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : copy.registerFailed);
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    setLoading(true);
    setError('');
    setInfo('');
    try {
      await resendConfirmation(email);
      setInfo(copy.registerConfirmResent);
    } catch (e) {
      setError(e instanceof Error ? e.message : copy.registerFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title={copy.registerTitle} subtitle={copy.registerSubtitle}>
      <div className="space-y-3">
          {error ? (
            <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
          ) : null}
          {info ? (
            <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-700">{info}</div>
          ) : null}

          <label className="block">
            <div className="mb-1 text-sm font-semibold text-text-primary">{copy.registerFullName}</div>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
              placeholder="Your name"
              autoComplete="name"
              aria-label={copy.registerFullName}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-sm font-semibold text-text-primary">{copy.registerEmail}</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
              placeholder="you@example.com"
              autoComplete="email"
              aria-label={copy.registerEmail}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-sm font-semibold text-text-primary">{copy.registerPassword}</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
              placeholder="••••••••"
              autoComplete="new-password"
              aria-label={copy.registerPassword}
            />
          </label>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!email || !password || loading}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? copy.registerCreating : copy.registerCreate}
          </button>

          <button
            type="button"
            onClick={onResend}
            disabled={!email || loading}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-black/[0.04] px-6 py-2.5 text-sm font-semibold text-text-primary hover:bg-black/[0.06] disabled:opacity-50"
          >
            {copy.registerResend}
          </button>
      </div>

      <p className="mt-6 text-sm text-text-tertiary">
        {copy.registerHaveAccount}{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          {copy.registerLogin}
        </Link>
      </p>
    </AuthShell>
  );
}
