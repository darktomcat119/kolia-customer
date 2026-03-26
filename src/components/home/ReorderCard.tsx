import { Link } from 'react-router-dom';
import { useCopy } from '../../lib/i18n';

export function ReorderCard() {
  const copy = useCopy();
  return (
    <div className="w-full min-w-0 rounded-3xl border border-black/5 bg-surface p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            {copy.reorderSectionLabel}
          </div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold">
            {copy.reorderFavoritesTitle}
          </div>
          <p className="mt-2 text-sm text-text-secondary">
            {copy.reorderFavoritesSubtitle}
          </p>
        </div>
        <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
          {copy.discountBadge}
        </div>
      </div>

      <div className="mt-5 flex w-full min-w-0 flex-col gap-3">
        <Link
          to="/restaurants"
          className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          {copy.browseRestaurantsBtn}
        </Link>
        <Link
          to="/cart"
          className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-black/[0.04] px-6 text-sm font-semibold text-text-primary hover:bg-black/[0.06]"
        >
          {copy.openCartBtn}
        </Link>
      </div>
    </div>
  );
}

