import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { LazyImage } from '../common/LazyImage';
import { useCopy } from '../../lib/i18n';
import { formatPrice } from '../../lib/formatters';

export type PopularDishSlide = {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  image: string;
  tag?: string;
};

const SCROLL_PX_PER_SEC = 32;
const CARD_GAP_PX = 16;

function DishSlide({
  item,
  openLabel,
}: {
  item: PopularDishSlide;
  openLabel: string;
}) {
  return (
    <Link
      to="/cart"
      className="group block h-full w-full min-w-0 shrink-0 overflow-hidden rounded-3xl border border-black/5 bg-surface shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={openLabel}
    >
      <div className="relative aspect-[16/10] min-h-[200px] w-full overflow-hidden sm:aspect-[16/9] sm:min-h-[240px] md:min-h-[280px]">
        <LazyImage
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
        {item.tag ? (
          <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-text-primary shadow-sm backdrop-blur-sm">
            {item.tag}
          </div>
        ) : null}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6">
          <div className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl">
            {item.name}
          </div>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <span className="max-w-[70%] text-sm font-medium text-white/90 sm:text-base">{item.restaurant}</span>
            <span className="shrink-0 rounded-full bg-white/20 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PopularDishesSlider({ items }: { items: PopularDishSlide[] }) {
  const copy = useCopy();
  const reduceMotion = useReducedMotion();
  const len = items.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const computeGeometry = () => {
      const w = el.clientWidth;
      const cardsPerView = w >= 1200 ? 3 : w >= 760 ? 2 : 1;
      const totalGap = CARD_GAP_PX * (cardsPerView - 1);
      const next = Math.max(280, (w - totalGap) / cardsPerView);
      setCardWidth(next);
    };
    const ro = new ResizeObserver(() => {
      computeGeometry();
    });
    ro.observe(el);
    computeGeometry();
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || len <= 1 || cardWidth <= 0) return;
    const track = trackRef.current;
    if (!track) return;

    let cancelled = false;
    let last = performance.now();
    let x = 0;
    const unit = cardWidth + CARD_GAP_PX;
    const loopW = len * unit;

    const step = (now: number) => {
      if (cancelled) return;
      if (!pausedRef.current) {
        const dt = (now - last) / 1000;
        x += SCROLL_PX_PER_SEC * dt;
        if (x >= loopW) x -= loopW;
        track.style.transform = `translate3d(${-x}px,0,0)`;
      }
      last = now;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    return () => {
      cancelled = true;
      track.style.transform = '';
    };
  }, [reduceMotion, len, cardWidth]);

  if (!len) return null;

  const openLabel = (item: PopularDishSlide) => copy.openDishAria.replace('{name}', item.name);

  if (reduceMotion || len === 1) {
    const item = items[0];
    return (
      <div className="relative w-full min-w-0">
        <div className="relative w-full min-w-0 overflow-hidden rounded-3xl">
          <DishSlide item={item} openLabel={openLabel(item)} />
        </div>
      </div>
    );
  }

  const loop = [...items, ...items];

  return (
    <div
      className="relative w-full min-w-0"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) pausedRef.current = false;
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full min-w-0 overflow-hidden rounded-3xl"
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{
            gap: `${CARD_GAP_PX}px`,
            width: cardWidth > 0 ? `${(cardWidth + CARD_GAP_PX) * loop.length}px` : undefined,
          }}
        >
          {loop.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="box-border shrink-0 grow-0"
              style={{ width: cardWidth > 0 ? cardWidth : '100%' }}
            >
              <DishSlide item={item} openLabel={openLabel(item)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
