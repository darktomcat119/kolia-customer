import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { CuisineType, Restaurant } from '../lib/types';
import { SearchBar } from '../components/home/SearchBar';
import { CuisineChips } from '../components/home/CuisineChips';
import { RestaurantCard } from '../components/home/RestaurantCard';
import { useCopy } from '../lib/i18n';
import { labelCuisine } from '../lib/cuisineLabels';

export function Restaurants() {
  const copy = useCopy();
  const cuisines = useMemo(
    () =>
      [
        { id: 'all' as const, label: copy.cuisineAll },
        { id: 'west_african' as const, label: copy.cuisineWestAfrican },
        { id: 'congolese' as const, label: copy.cuisineCongolese },
        { id: 'north_african' as const, label: copy.cuisineNorthAfrican },
        { id: 'central_african' as const, label: copy.cuisineCentralAfrican },
        { id: 'southern_african' as const, label: copy.cuisineSouthernAfrican },
        { id: 'lusophone_african' as const, label: copy.cuisineLusophone },
        { id: 'pan_african' as const, label: copy.cuisinePanAfrican },
      ] as const,
    [copy],
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [q, setQ] = useState('');
  const [cuisine, setCuisine] = useState<'all' | CuisineType>('all');

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .eq('is_active', true)
          .order('name');
        if (error) throw error;
        setRestaurants((data ?? []) as Restaurant[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : copy.restaurantsLoadFailed);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [copy.restaurantsLoadFailed]);

  const filtered = useMemo(() => {
    let list = restaurants;
    if (cuisine !== 'all') list = list.filter((r) => r.cuisine_type === cuisine);
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(t) ||
          (r.description?.toLowerCase().includes(t) ?? false) ||
          r.city.toLowerCase().includes(t),
      );
    }
    return list;
  }, [restaurants, cuisine, q]);

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">{copy.restaurantsTitle}</h2>
        <p className="text-text-secondary">{copy.restaurantsSubtitle}</p>
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-2 md:items-stretch">
        <SearchBar
          placeholder={copy.searchRestaurantsPlaceholder}
          onSubmit={(value) => setQ(value)}
        />
        <div className="min-w-0 rounded-3xl border border-black/5 bg-surface p-3">
          <CuisineChips
            items={cuisines}
            defaultSelectedId="all"
            onChange={(id) => setCuisine(id as 'all' | CuisineType)}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-3xl border border-black/5 bg-surface"
            />
          ))}
        </div>
      ) : (
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RestaurantCard
              key={r.id}
              id={r.id}
              name={r.name}
              cuisine={labelCuisine(copy, r.cuisine_type)}
              city={r.city}
              rating={Number(r.rating ?? 0)}
              totalReviews={Number(r.total_reviews ?? 0)}
              eta={`${r.estimated_delivery_min}–${r.estimated_delivery_max}m`}
              image={r.image_url ?? 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=70'}
            />
          ))}
          {!filtered.length ? (
            <div className="rounded-3xl border border-black/5 bg-surface p-6 text-sm text-text-secondary sm:col-span-2 lg:col-span-3">
              {copy.noRestaurantsFound}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
