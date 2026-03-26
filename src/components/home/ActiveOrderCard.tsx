import { Link } from 'react-router-dom';
import { useCopy } from '../../lib/i18n';

export function ActiveOrderCard() {
  const copy = useCopy();
  return (
    <div className="relative w-full min-w-0 overflow-hidden rounded-3xl border border-black/5 bg-surface p-6 shadow-sm">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              {copy.activeOrderLabel}
            </div>
            <div className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold">
              KOL-0042
            </div>
          </div>
          <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {copy.orderStatusOnTheWay}
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-text-secondary">
          <div className="flex items-center justify-between">
            <span>{copy.orderRestaurantLabel}</span>
            <span className="font-semibold text-text-primary">Chez Fatou</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{copy.orderEtaLabel}</span>
            <span className="font-semibold text-text-primary">12–18 min</span>
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/[0.06]">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-secondary to-primary" />
        </div>

        <div className="mt-5 flex min-w-0 gap-3">
          <Link
            to="/orders"
            className="inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-full bg-secondary px-5 text-sm font-semibold text-white hover:bg-secondary/90"
          >
            {copy.activeTrackOrder}
          </Link>
          <Link
            to="/cart"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-black/[0.04] px-5 text-sm font-semibold text-text-primary hover:bg-black/[0.06]"
          >
            {copy.activeReorderBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}

