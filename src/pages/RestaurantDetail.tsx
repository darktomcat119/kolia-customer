import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { MenuCategory, MenuItem, Restaurant } from '../lib/types';
import { useCart } from '../lib/cart';
import { formatPrice } from '../lib/formatters';
import { useAuth } from '../lib/auth';
import { useCopy } from '../lib/i18n';
import { labelCuisine } from '../lib/cuisineLabels';

export function RestaurantDetail() {
  const copy = useCopy();
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const { addItem, restaurantId } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      try {
        const { data: r, error: rErr } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', id)
          .eq('is_active', true)
          .single();
        if (rErr) throw rErr;
        setRestaurant(r as Restaurant);

        const { data: c, error: cErr } = await supabase
          .from('menu_categories')
          .select('*')
          .eq('restaurant_id', id)
          .eq('is_active', true)
          .order('sort_order');
        if (cErr) throw cErr;
        setCategories((c ?? []) as MenuCategory[]);

        const { data: m, error: mErr } = await supabase
          .from('menu_items')
          .select('*')
          .eq('restaurant_id', id)
          .eq('is_available', true)
          .order('sort_order');
        if (mErr) throw mErr;
        setItems((m ?? []) as MenuItem[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : copy.restaurantLoadFailed);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id, copy.restaurantLoadFailed]);

  const grouped = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const item of items) {
      const arr = map.get(item.category_id) ?? [];
      arr.push(item);
      map.set(item.category_id, arr);
    }
    return map;
  }, [items]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-44 animate-pulse rounded-3xl border border-black/5 bg-surface" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-3xl border border-black/5 bg-surface" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="rounded-3xl border border-black/5 bg-surface p-6 text-sm text-text-secondary">
        {error || copy.restaurantNotFound}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-black/5 bg-surface shadow-sm">
        <div className="relative h-52 overflow-hidden">
          <img
            src={
              restaurant.image_url ??
              'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=70'
            }
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
              {restaurant.name}
            </h1>
            <p className="mt-1 text-sm text-white/80">
              {labelCuisine(copy, restaurant.cuisine_type)} · {restaurant.city} ·{' '}
              {restaurant.estimated_delivery_min}–{restaurant.estimated_delivery_max}m
            </p>
            <p className="mt-1 text-xs text-white/90">
              {restaurant.total_reviews >= 3
                ? `★ ${Number(restaurant.rating ?? 0).toFixed(1)} (${restaurant.total_reviews})`
                : 'New restaurant'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-text-secondary">{restaurant.description ?? copy.restaurantDefaultBlurb}</p>
          <div className="flex gap-3">
            {restaurantId && restaurantId !== restaurant.id ? (
              <div className="rounded-2xl bg-accent/10 px-4 py-2 text-xs font-semibold text-accent">
                {copy.cartSwitchWarning}
              </div>
            ) : null}
            <Link
              to="/cart"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              {copy.goToCart}
            </Link>
          </div>
        </div>
      </div>

      {categories.length ? (
        <div className="space-y-7">
          {categories.map((cat) => {
            const list = grouped.get(cat.id) ?? [];
            if (!list.length) return null;
            return (
              <section key={cat.id}>
                <div className="mb-3 flex items-end justify-between">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                    {cat.name}
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((item) => (
                    <div key={item.id} className="overflow-hidden rounded-3xl border border-black/5 bg-surface shadow-sm">
                      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-3">
                          <div className="min-w-0 truncate font-semibold text-white">{item.name}</div>
                          <div className="shrink-0 rounded-full bg-white/15 px-2 py-1 text-xs font-semibold text-white">
                            {formatPrice(Number(item.price))}
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        {item.description ? (
                          <p className="line-clamp-2 text-sm text-text-secondary">{item.description}</p>
                        ) : (
                          <p className="text-sm text-text-tertiary">{copy.menuItemFallbackDesc}</p>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            if (!session) {
                              navigate('/login');
                              return;
                            }
                            addItem(restaurant.id, item, 1);
                          }}
                          className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-black/[0.04] px-5 text-sm font-semibold text-text-primary hover:bg-black/[0.06]"
                        >
                          {copy.addToCart}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-black/5 bg-surface p-6 text-sm text-text-secondary">
          {copy.menuNotAvailable}
        </div>
      )}
    </div>
  );
}
