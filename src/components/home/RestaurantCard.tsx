import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyImage } from '../common/LazyImage';

export function RestaurantCard({
  id,
  name,
  cuisine,
  city,
  rating,
  totalReviews = 0,
  eta,
  image,
}: {
  id: string;
  name: string;
  cuisine: string;
  city: string;
  rating: number;
  totalReviews?: number;
  eta: string;
  image: string;
}) {
  const hasEnoughReviews = totalReviews >= 3;

  return (
    <motion.div
      className="w-full min-w-0"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <Link
        to={`/restaurant/${id}`}
        className="group block w-full min-w-0 overflow-hidden rounded-3xl border border-black/5 bg-surface shadow-sm transition hover:shadow-card"
      >
      <div className="relative h-44 overflow-hidden">
        <LazyImage
          src={image}
          alt={name}
          className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        {hasEnoughReviews ? (
          <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-text-primary">
            <span className="text-accent">★</span> {rating.toFixed(1)} <span className="text-text-tertiary">({totalReviews})</span>
          </div>
        ) : (
          <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-text-tertiary">
            New
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="truncate font-[family-name:var(--font-display)] text-xl font-bold text-white">
            {name}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/80">
            <span>{cuisine}</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span>{city}</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span>{eta}</span>
          </div>
        </div>
      </div>
      </Link>
    </motion.div>
  );
}

