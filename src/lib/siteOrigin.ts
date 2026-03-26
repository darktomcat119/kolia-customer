const DEFAULT_ORIGIN = 'http://localhost:5175';

export function getSiteOrigin(): string {
  const explicit = import.meta.env.VITE_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = (import.meta.env.VITE_VERCEL_ORIGIN as string | undefined)?.trim();
  if (vercel) return vercel.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    return window.location.origin.replace(/\/$/, '');
  }

  return DEFAULT_ORIGIN;
}

