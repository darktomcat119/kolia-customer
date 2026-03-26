import { Link } from 'react-router-dom';
import { useCart } from '../lib/cart';
import { formatPrice } from '../lib/formatters';
import { useCopy } from '../lib/i18n';

export function Cart() {
  const copy = useCopy();
  const { items, subtotal, removeItem, setQuantity, clear } = useCart();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">{copy.cartTitle}</h2>
        <p className="mt-2 text-text-secondary">{copy.cartSubtitle}</p>

        <div className="mt-6 space-y-3">
          {!items.length ? (
            <div className="rounded-3xl border border-black/5 bg-surface p-6 text-sm text-text-secondary">
              {copy.cartEmpty}
            </div>
          ) : null}
          {items.map((item) => (
            <div
              key={item.menu_item_id}
              className="flex items-center justify-between gap-4 rounded-3xl border border-black/5 bg-surface p-5"
            >
              <div className="min-w-0">
                <div className="truncate font-semibold">{item.name}</div>
                <div className="mt-1 flex items-center gap-2 text-sm text-text-tertiary">
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] font-semibold hover:bg-black/[0.06]"
                    onClick={() => setQuantity(item.menu_item_id, item.quantity - 1)}
                    aria-label={copy.qtyDecrease}
                  >
                    −
                  </button>
                  <div className="min-w-[2ch] text-center font-semibold text-text-primary">{item.quantity}</div>
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] font-semibold hover:bg-black/[0.06]"
                    onClick={() => setQuantity(item.menu_item_id, item.quantity + 1)}
                    aria-label={copy.qtyIncrease}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="ml-2 text-xs font-semibold text-primary hover:underline"
                    onClick={() => removeItem(item.menu_item_id)}
                  >
                    {copy.removeItem}
                  </button>
                </div>
              </div>
              <div className="shrink-0 font-semibold">{formatPrice(item.price * item.quantity)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-fit rounded-3xl border border-black/5 bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-tertiary">{copy.totalLabel}</div>
          <div className="text-xl font-bold text-primary">{formatPrice(subtotal)}</div>
        </div>
        <button
          type="button"
          onClick={clear}
          disabled={!items.length}
          className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-black/[0.04] px-6 py-2.5 text-sm font-semibold text-text-primary hover:bg-black/[0.06] disabled:opacity-50"
        >
          {copy.clearCart}
        </button>
        <Link
          to="/checkout"
          className={[
            'mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white',
            items.length ? 'bg-primary hover:bg-primary-dark' : 'bg-primary/50 pointer-events-none',
          ].join(' ')}
        >
          {copy.checkoutBtn}
        </Link>
      </div>
    </div>
  );
}
