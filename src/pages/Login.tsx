import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { AuthShell } from '../components/auth/AuthShell';
import { useCopy } from '../lib/i18n';

export function Login() {
  const copy = useCopy();
  const navigate = useNavigate();
  const { signIn, requestPasswordReset } = useAuth();
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
      await signIn(email, password);
      navigate('/', { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : copy.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  const onForgot = async () => {
    setLoading(true);
    setError('');
    setInfo('');
    try {
      await requestPasswordReset(email);
      setInfo(copy.loginPasswordResetSent);
    } catch (e) {
      setError(e instanceof Error ? e.message : copy.forgotPasswordFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title={copy.loginTitle} subtitle={copy.loginSubtitle}>
      <div className="space-y-3">
          {error ? (
            <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
          ) : null}
          {info ? (
            <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-700">{info}</div>
          ) : null}

          <label className="block">
            <div className="mb-1 text-sm font-semibold text-text-primary">{copy.loginEmail}</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
              placeholder="you@example.com"
              autoComplete="email"
              aria-label={copy.loginEmail}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-sm font-semibold text-text-primary">{copy.loginPassword}</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
              placeholder="••••••••"
              autoComplete="current-password"
              aria-label={copy.loginPassword}
            />
          </label>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!email || !password || loading}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? copy.loginSigningIn : copy.loginContinue}
          </button>

          <button
            type="button"
            onClick={onForgot}
            disabled={!email || loading}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-black/[0.04] px-6 py-2.5 text-sm font-semibold text-text-primary hover:bg-black/[0.06] disabled:opacity-50"
          >
            {copy.loginForgot}
          </button>
      </div>

      <p className="mt-6 text-sm text-text-tertiary">
        {copy.loginNoAccount}{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          {copy.loginCreateOne}
        </Link>
      </p>
    </AuthShell>
  );
}
