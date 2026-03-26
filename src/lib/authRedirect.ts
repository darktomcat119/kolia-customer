/**
 * URLs passed to Supabase must match Redirect URLs in the Supabase dashboard.
 * Otherwise Supabase uses "Site URL" (often localhost).
 */

function getOrigin(): string {
  // Keep local logic here to avoid circular imports; shared helper exists for other modules.
  const explicit = import.meta.env.VITE_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = (import.meta.env.VITE_VERCEL_ORIGIN as string | undefined)?.trim();
  if (vercel) return vercel.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    return window.location.origin.replace(/\/$/, '');
  }

  return 'https://kolia-customer.vercel.app';
}

function pathWithBase(suffix: string): string {
  const rawBase = import.meta.env.BASE_URL || '/';
  const basePath = rawBase === '/' ? '' : rawBase.replace(/^\/+|\/+$/g, '');
  const seg = suffix.replace(/^\//, '');
  return basePath ? `/${basePath}/${seg}` : `/${seg}`;
}

export function getAuthConfirmRedirectUrl(): string {
  return `${getOrigin()}${pathWithBase('auth/confirm')}`;
}

export function getPasswordResetRedirectUrl(): string {
  return `${getOrigin()}${pathWithBase('reset-password')}`;
}

