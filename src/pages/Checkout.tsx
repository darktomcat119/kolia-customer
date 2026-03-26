import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../lib/cart';
import { formatPrice } from '../lib/formatters';
import type { CreateOrderPayload, CreateOrderResponse, OrderType } from '../lib/types';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getSiteOrigin } from '../lib/siteOrigin';
import { useCopy } from '../lib/i18n';

export function Checkout() {
  const copy = useCopy();
  const navigate = useNavigate();
  const { session } = useAuth();
  const { items, restaurantId, subtotal, clear } = useCart();
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const deliveryFee = useMemo(() => 0, []);
  const total = subtotal + deliveryFee;

  const [clientSecret, setClientSecret] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');

  const stripePromise = useMemo(() => {
    const key = (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined)?.trim();
    return key ? loadStripe(key) : Promise.resolve(null);
  }, []);

  const createOrder = async () => {
    if (!restaurantId || !items.length) return;
    setLoading(true);
    setError('');
    try {
      const payload: CreateOrderPayload = {
        restaurant_id: restaurantId,
        items: items.map((i) => ({ menu_item_id: i.menu_item_id, quantity: i.quantity })),
        order_type: orderType,
        notes: notes.trim() ? notes.trim() : undefined,
      };
      const result = await api.post<CreateOrderResponse>('/api/orders', payload);
      setClientSecret(result.client_secret);
      setOrderId(result.order_id);
    } catch (e) {
      setError(e instanceof Error ? e.message : copy.checkoutOrderCreateFailed);
    } finally {
      setLoading(false);
    }
  };

  if (!items.length || !restaurantId) {
    return (
      <div className="rounded-3xl border border-black/5 bg-surface p-6 text-sm text-text-secondary">
        {copy.checkoutCartEmpty}
      </div>
    );
  }

  if (!session) {
    return (
      <div className="rounded-3xl border border-black/5 bg-surface p-6">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">{copy.checkoutGuestTitle}</h2>
        <p className="mt-2 text-text-secondary">{copy.checkoutLoginPrompt}</p>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          {copy.registerLogin}
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">{copy.checkoutTitle}</h2>
        <p className="mt-2 text-text-secondary">{copy.checkoutSubtitle}</p>

        <div className="mt-6 rounded-3xl border border-black/5 bg-surface p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm font-semibold text-text-primary">{copy.checkoutOrderType}</div>
            <div className="inline-flex overflow-hidden rounded-full border border-black/5 bg-background p-1">
              {(['delivery', 'pickup'] as OrderType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setOrderType(t)}
                  aria-label={t === 'delivery' ? copy.checkoutDelivery : copy.checkoutPickup}
                  className={[
                    'min-h-[40px] rounded-full px-4 text-sm font-semibold transition-colors',
                    orderType === t ? 'bg-surface text-text-primary shadow-sm' : 'text-text-tertiary hover:bg-black/[0.03]',
                  ].join(' ')}
                >
                  {t === 'delivery' ? copy.checkoutDelivery : copy.checkoutPickup}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-1 text-sm font-semibold text-text-primary">{copy.checkoutNotes}</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[96px] w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
              placeholder={copy.checkoutNotesPlaceholder}
              aria-label={copy.checkoutNotes}
            />
          </div>

          {error ? (
            <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
          ) : null}

          {clientSecret ? (
            <div className="mt-6 rounded-3xl border border-black/5 bg-background p-4">
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#E07A2F',
                      colorText: '#1A1A1A',
                      colorBackground: '#FFFFFF',
                      borderRadius: '16px',
                      fontFamily: 'DM Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
                    },
                  },
                }}
              >
                <StripeConfirm
                  orderId={orderId}
                  onSuccess={() => {
                    clear();
                    navigate('/orders', { replace: true });
                  }}
                />
              </Elements>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-black/[0.03] p-4 text-sm text-text-secondary">
              {copy.checkoutPaymentLoadHint}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="rounded-3xl border border-black/5 bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-tertiary">{copy.checkoutSubtotal}</div>
            <div className="font-semibold">{formatPrice(subtotal)}</div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm text-text-tertiary">{copy.checkoutDeliveryFee}</div>
            <div className="font-semibold">{formatPrice(deliveryFee)}</div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
            <div className="text-sm font-semibold text-text-primary">{copy.checkoutTotal}</div>
            <div className="text-xl font-bold text-primary">{formatPrice(total)}</div>
          </div>

          <button
            type="button"
            onClick={createOrder}
            disabled={loading || !!clientSecret}
            className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
          >
            {clientSecret ? copy.checkoutPaymentReady : loading ? copy.checkoutCreatingOrder : copy.checkoutCreateOrder}
          </button>
        </div>
      </div>
    </div>
  );
}

function StripeConfirm({
  orderId,
  onSuccess,
}: {
  orderId: string;
  onSuccess: () => void;
}) {
  const copy = useCopy();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const confirm = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');
    try {
      const returnUrl = `${getSiteOrigin()}/orders?order_id=${encodeURIComponent(orderId)}`;
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
        redirect: 'if_required',
      });
      if (error) throw error;
      onSuccess();
    } catch (e) {
      setError(e instanceof Error ? e.message : copy.checkoutPaymentFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-text-primary">{copy.checkoutPaymentTitle}</div>
      <PaymentElement />
      {error ? (
        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
      ) : null}
      <button
        type="button"
        onClick={confirm}
        disabled={!stripe || !elements || loading}
        aria-label={copy.checkoutPaySecurely}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-secondary px-6 py-3 text-base font-semibold text-white hover:bg-secondary/90 disabled:opacity-50"
      >
        {loading ? copy.checkoutProcessing : copy.checkoutPaySecurely}
      </button>
    </div>
  );
}
