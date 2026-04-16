import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import type { Order } from '../lib/types';
import { formatPrice } from '../lib/formatters';
import { useCopy } from '../lib/i18n';
import { supabase } from '../lib/supabase';

type ReviewDraft = {
  orderId: string;
  restaurantId: string;
  restaurantName: string;
};

function getStatusTone(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'received':
    case 'preparing':
      return 'bg-amber-50 text-amber-700 border-amber-100';
    case 'on_the_way':
      return 'bg-sky-50 text-sky-700 border-sky-100';
    case 'cancelled':
      return 'bg-rose-50 text-rose-700 border-rose-100';
    default:
      return 'bg-black/[0.04] text-text-secondary border-black/10';
  }
}

function formatStatusLabel(status: string) {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

export function Orders() {
  const copy = useCopy();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviewTarget, setReviewTarget] = useState<ReviewDraft | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reviewInfo, setReviewInfo] = useState('');
  const [reviewError, setReviewError] = useState('');

  const completedOrders = useMemo(() => new Set(orders.filter((o) => o.status === 'completed').map((o) => o.id)), [orders]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.get<Order[]>('/api/orders');
        setOrders(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : copy.ordersLoadFailed);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [copy.ordersLoadFailed]);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <section className="rounded-3xl border border-black/5 bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">{copy.ordersTitle}</h2>
            <p className="mt-1 text-sm text-text-tertiary">
              {loading
                ? 'Loading your recent orders...'
                : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} found`}
            </p>
          </div>
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {loading ? 'Syncing' : 'Live updates'}
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-3xl border border-black/5 bg-surface" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {!orders.length ? (
            <section className="rounded-3xl border border-dashed border-black/10 bg-surface p-8 text-center shadow-sm">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-black/[0.04] text-lg">🧾</div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-text-primary">No orders yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">{copy.ordersEmpty}</p>
            </section>
          ) : null}
          {orders.map((o) => (
            <article key={o.id} className="rounded-3xl border border-black/5 bg-surface p-5 shadow-sm transition hover:shadow-card sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="truncate font-[family-name:var(--font-display)] text-xl font-bold text-text-primary">
                    {o.restaurant?.name ?? copy.ordersRestaurantFallback}
                  </div>
                  <div className="mt-1 text-sm text-text-tertiary">{o.order_number}</div>
                  <div className="mt-3">
                    <span
                      className={[
                        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold',
                        getStatusTone(o.status),
                      ].join(' ')}
                    >
                      {formatStatusLabel(o.status)}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 rounded-2xl border border-black/5 bg-background px-4 py-2 text-right">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Total</div>
                  <div className="mt-0.5 text-sm font-bold text-primary">{formatPrice(Number(o.total))}</div>
                </div>
              </div>
              {o.order_items?.length ? (
                <div className="mt-4 rounded-2xl border border-black/5 bg-background px-4 py-3 text-sm text-text-secondary">
                  {o.order_items.slice(0, 2).map((i) => `${i.quantity}× ${i.name}`).join(' · ')}
                  {o.order_items.length > 2
                    ? ` · ${copy.ordersMoreItems.replace('{count}', String(o.order_items.length - 2))}`
                    : ''}
                </div>
              ) : null}
              {o.status === 'completed' && o.restaurant?.id ? (
                <div className="mt-4 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setReviewInfo('');
                      setReviewError('');
                      setRating(5);
                      setComment('');
                      setReviewTarget({
                        orderId: o.id,
                        restaurantId: o.restaurant!.id,
                        restaurantName: o.restaurant?.name ?? copy.ordersRestaurantFallback,
                      });
                    }}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-black/[0.04] px-5 text-sm font-semibold text-text-primary hover:bg-black/[0.06]"
                  >
                    {copy.reviewCta}
                  </button>
                </div> 
              ) : null}
            </article>
          ))}
        </div>
      )}

      {reviewTarget ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-3xl border border-black/10 bg-surface p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-[family-name:var(--font-display)] text-xl font-bold">{copy.reviewTitle}</div>
                <div className="mt-1 text-sm text-text-tertiary">
                  {reviewTarget.restaurantName}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReviewTarget(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] text-text-primary hover:bg-black/[0.06]"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="mt-3 text-sm text-text-secondary">{copy.reviewSubtitle}</p>

            <div className="mt-4 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const v = i + 1;
                const active = v <= rating;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setRating(v)}
                    className={[
                      'h-11 w-11 rounded-full border text-lg transition-colors',
                      active ? 'border-accent bg-accent/15 text-accent' : 'border-black/10 bg-white text-text-tertiary hover:bg-black/[0.03]',
                    ].join(' ')}
                    aria-label={`${v} star`}
                    aria-pressed={active}
                  >
                    ★
                  </button>
                );
              })}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={copy.reviewPlaceholder}
              className="mt-4 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
              rows={4}
            />

            {reviewError ? (
              <div className="mt-3 rounded-2xl bg-red-50 p-3 text-sm text-red-700">{reviewError}</div>
            ) : null}
            {reviewInfo ? (
              <div className="mt-3 rounded-2xl bg-green-50 p-3 text-sm text-green-700">{reviewInfo}</div>
            ) : null}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setReviewTarget(null)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-black/[0.04] px-5 text-sm font-semibold text-text-primary hover:bg-black/[0.06]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting || !completedOrders.has(reviewTarget.orderId)}
                onClick={async () => {
                  if (!completedOrders.has(reviewTarget.orderId)) return;
                  setSubmitting(true);
                  setReviewError('');
                  setReviewInfo('');
                  try {
                    const { data: session } = await supabase.auth.getSession();
                    const userId = session.session?.user?.id;
                    if (!userId) throw new Error('Not signed in');

                    const { error: insErr } = await supabase.from('restaurant_reviews').insert({
                      restaurant_id: reviewTarget.restaurantId,
                      user_id: userId,
                      order_id: reviewTarget.orderId,
                      rating,
                      comment: comment.trim() ? comment.trim() : null,
                    });
                    if (insErr) throw insErr;

                    setReviewInfo(copy.reviewThanks);
                    setTimeout(() => setReviewTarget(null), 700);
                  } catch (e) {
                    setReviewError(e instanceof Error ? e.message : copy.reviewFailed);
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
              >
                {submitting ? copy.reviewSubmitting : copy.reviewSubmit}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
