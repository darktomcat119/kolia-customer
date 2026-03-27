import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SearchBar } from '../components/home/SearchBar';
import { CuisineChips } from '../components/home/CuisineChips';
import { RestaurantCard } from '../components/home/RestaurantCard';
import { PopularDishesSlider } from '../components/home/PopularDishesSlider';
import { ActiveOrderCard } from '../components/home/ActiveOrderCard';
import { ReorderCard } from '../components/home/ReorderCard';
import { HeroCanvas } from '../components/home/HeroCanvas';
import { useCopy, useI18n } from '../lib/i18n';
import { labelCuisine } from '../lib/cuisineLabels';
import { supabase } from '../lib/supabase';
import type { Restaurant } from '../lib/types';
import type { PopularDishSlide } from '../components/home/PopularDishesSlider';
import { buildDefaultLandingContent, mergeLandingContent, type LandingContent } from '../lib/landingContent';


export function Home() {
  const copy = useCopy();
  const { locale } = useI18n();
  const reduceMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [heroAspect, setHeroAspect] = useState(16 / 9);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState('');
  const [featured, setFeatured] = useState<Restaurant[]>([]);
  const [popularItems, setPopularItems] = useState<PopularDishSlide[]>([]);
  const [landingContent, setLandingContent] = useState<LandingContent | null>(null);

  const heroImgDuration = reduceMotion ? 0.25 : 1.1;
  const heroImgEase = [0.22, 1, 0.36, 1] as const;
  const heroTextDuration = reduceMotion ? 0.2 : 0.5;
  const defaultLanding = useMemo(() => buildDefaultLandingContent(copy), [copy]);
  const landing = useMemo(
    () => mergeLandingContent(defaultLanding, landingContent),
    [defaultLanding, landingContent],
  );

  const cuisines = useMemo(() => landing.sections.cuisineChips, [landing.sections.cuisineChips]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % landing.hero.slides.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [landing.hero.slides.length]);
  const currentSlide = useMemo(() => landing.hero.slides[slide], [landing.hero.slides, slide]);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    const url = landing.hero.slides[slide].image;
    img.onload = () => {
      if (cancelled || img.naturalWidth <= 0) return;
      setHeroAspect(img.naturalWidth / img.naturalHeight);
    };
    img.src = url;
    return () => {
      cancelled = true;
    };
  }, [slide, landing.hero.slides]);

  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase
        .from('landing_page_content')
        .select('content')
        .eq('locale', locale)
        .eq('is_active', true)
        .maybeSingle();
      if (!error) {
        setLandingContent((data?.content as LandingContent | undefined) ?? null);
      }
    };
    void run();
  }, [locale]);

  useEffect(() => {
    const run = async () => {
      setFeaturedLoading(true);
      setFeaturedError('');
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .eq('is_active', true)
          .eq('featured', true)
          .order('featured_rank')
          .order('name')
          .limit(4);
        if (error) throw error;
        setFeatured((data ?? []) as Restaurant[]);
      } catch (e) {
        setFeaturedError(e instanceof Error ? e.message : 'Failed to load featured restaurants');
        setFeatured([]);
      } finally {
        setFeaturedLoading(false);
      }
    };
    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase
        .from('menu_items')
        .select('id, name, price, image_url, popular_rank, restaurants(name)')
        .eq('is_popular', true)
        .eq('is_available', true)
        .order('popular_rank', { ascending: true, nullsFirst: false })
        .limit(8);
      if (!data) return;
      setPopularItems(
        data.map((row) => ({
          id: row.id as string,
          name: row.name as string,
          restaurant: (row.restaurants as { name: string } | null)?.name ?? '',
          price: Number(row.price),
          image: (row.image_url as string | null) ?? '',
        })),
      );
    };
    void run();
  }, []);

  const popularSlides = useMemo(
    () => popularItems.filter((d) => d.image),
    [popularItems],
  );

  return (
    <div className="w-full min-w-0 space-y-8">
      <section className="relative w-full min-w-0 overflow-hidden rounded-3xl border border-black/5 bg-surface shadow-card">
        <div
          className="relative w-full min-w-0 min-h-[620px] sm:min-h-[640px] md:min-h-0"
          style={{ aspectRatio: heroAspect }}
        >
          <div className="absolute inset-0">
            <AnimatePresence initial={false} mode="sync">
              <motion.img
                key={slide}
                src={currentSlide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: heroImgDuration, ease: heroImgEase }}
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
            <div className="pointer-events-none absolute inset-0 z-[2]">
              <HeroCanvas />
            </div>
          </div>

          <div className="absolute inset-0 z-10 flex min-h-0 w-full min-w-0 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain p-5 sm:p-10">
            <div className="flex min-w-0 items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                <img src="/logo.png" alt="Kolia" className="h-5 w-auto object-contain" />
                {landing.hero.badge}
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                {landing.hero.slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSlide(i)}
                    className={[
                      'h-2.5 rounded-full transition-all duration-300 ease-out',
                      i === slide ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/60',
                    ].join(' ')}
                    aria-label={copy.heroSlideAria.replace('{n}', String(i + 1))}
                  />
                ))}
              </div>
            </div>

            <motion.div
              key={slide}
              className="mt-5 w-full min-w-0 max-w-3xl"
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: heroTextDuration, ease: heroImgEase }}
            >
              <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-white sm:text-5xl">
                {currentSlide.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-3 sm:text-lg">
                {currentSlide.subtitle}
              </p>
            </motion.div>

            <div className="mt-5 w-full min-w-0 max-w-2xl">
              <SearchBar placeholder={landing.hero.searchPlaceholder} />
            </div>

            <div className="mt-4 w-full min-w-0 pr-1">
              <CuisineChips items={cuisines} />
            </div>

            <div className="mt-5 flex w-full min-w-0 flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                to="/restaurants"
                className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-dark sm:inline-flex sm:w-auto"
              >
                {landing.hero.ctaExplore}
              </Link>
              <Link
                to="/orders"
                className="flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/50 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:inline-flex sm:w-auto"
              >
                {landing.hero.ctaTrack}
              </Link>
            </div>

            <div className="mt-5 flex justify-center gap-2 sm:mt-8 sm:hidden">
              {landing.hero.slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={[
                    'h-2 rounded-full transition-all duration-300 ease-out',
                    i === slide ? 'w-7 bg-white' : 'w-2 bg-white/45',
                  ].join(' ')}
                  aria-label={copy.heroSlideAria.replace('{n}', String(i + 1))}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <div className="mb-3 flex min-w-0 items-end justify-between gap-3">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                {landing.sections.featuredTitle}
              </h2>
              <p className="mt-1 text-sm text-text-tertiary">{landing.sections.featuredSubtitle}</p>
            </div>
            <Link to="/restaurants" className="text-sm font-semibold text-primary hover:underline">
              {copy.viewAll}
            </Link>
          </div>

          <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredError ? (
              <div className="rounded-3xl border border-black/5 bg-surface p-6 text-sm text-text-secondary sm:col-span-2">
                {featuredError}
              </div>
            ) : featuredLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-44 animate-pulse rounded-3xl border border-black/5 bg-surface" />
              ))
            ) : featured.length ? (
              featured.map((r) => (
                <RestaurantCard
                  key={r.id}
                  id={r.id}
                  name={r.name}
                  cuisine={labelCuisine(copy, r.cuisine_type)}
                  city={r.city}
                  rating={Number(r.rating ?? 0)}
                  totalReviews={Number(r.total_reviews ?? 0)}
                  eta={`${r.estimated_delivery_min}–${r.estimated_delivery_max}m`}
                  image={
                    r.image_url ??
                    'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=70'
                  }
                />
              ))
            ) : (
              <div className="rounded-3xl border border-black/5 bg-surface p-6 text-sm text-text-secondary sm:col-span-2">
                No featured restaurants yet.
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <div className="mb-3 flex min-w-0 items-end justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                {landing.sections.liveStatusTitle}
              </h2>
              <p className="mt-1 text-sm text-text-tertiary">{landing.sections.liveStatusSubtitle}</p>
            </div>
          </div>

          <div className="space-y-4">
            <ActiveOrderCard />
            <ReorderCard />
          </div>
        </div>
      </section>

      <section className="w-full min-w-0">
        <div className="mb-3 flex min-w-0 items-end justify-between gap-3">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
              {landing.sections.popularTitle}
            </h2>
            <p className="mt-1 text-sm text-text-tertiary">{landing.sections.popularSubtitle}</p>
          </div>
          <Link to="/restaurants" className="text-sm font-semibold text-primary hover:underline">
            {copy.browse}
          </Link>
        </div>

        <PopularDishesSlider items={popularSlides} />
      </section>

      <section className="w-full min-w-0 rounded-3xl border border-black/5 bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex min-w-0 items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">{landing.sections.howTitle}</h2>
            <p className="mt-1 text-sm text-text-tertiary">{landing.sections.howSubtitle}</p>
          </div>
        </div>
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
          {landing.sections.howSteps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-black/5 bg-background p-5">
              <div className="text-xs font-bold tracking-widest text-primary">
                {copy.stepPrefix} {s.n}
              </div>
              <div className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">{s.title}</div>
              <div className="mt-1 text-sm text-text-secondary">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative w-full min-w-0 overflow-hidden rounded-3xl border border-emerald-200/25 bg-gradient-to-br from-emerald-900 via-secondary to-teal-900 p-6 text-white shadow-card sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex min-w-0 items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
            {landing.sections.testimonialsTitle}
          </h2>
          <span className="inline-flex shrink-0 items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90">
            ★ 5.0
          </span>
        </div>

        <div className="relative z-10 mt-5 grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
          {landing.sections.testimonials.map((t) => (
            <article
              key={t.name}
              className="rounded-3xl border border-white/20 bg-white/[0.12] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-accent">★★★★★</div>
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">
                  Verified
                </span>
              </div>
              <p className="mt-3 text-[1.02rem] font-medium leading-relaxed text-white">
                {t.text}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-xs font-bold text-white">
                  {t.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div className="text-sm text-white/85">
                  {t.name} · {t.city}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full min-w-0 rounded-3xl border border-black/5 bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex w-full min-w-0 flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">{landing.sections.ctaTitle}</h2>
            <p className="mt-1 text-sm text-text-tertiary">{landing.sections.ctaSubtitle}</p>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/restaurants"
              className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary-dark sm:inline-flex sm:w-auto"
            >
              {landing.sections.ctaPrimary}
            </Link>
            <Link
              to="/register"
              className="flex min-h-[48px] w-full items-center justify-center rounded-full border-2 border-secondary px-7 py-3 text-sm font-semibold text-secondary hover:bg-secondary hover:text-white sm:inline-flex sm:w-auto"
            >
              {landing.sections.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
