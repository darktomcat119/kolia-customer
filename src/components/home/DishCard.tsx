import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyImage } from '../common/LazyImage';
import { useCopy } from '../../lib/i18n';

export function DishCard({
  name,
  restaurant,
  price,
  image,
  tag,
}: {
  name: string;
  restaurant: string;
  price: number;
  image: string;
  tag?: string;
}) {
  const copy = useCopy();
  const aria = copy.openDishAria.replace('{name}', name);
  return (
    <motion.div
      className="w-full min-w-0"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <Link
        to="/cart"
        className="group block w-full min-w-0 overflow-hidden rounded-3xl border border-black/5 bg-surface shadow-sm transition hover:shadow-card"
        aria-label={aria}
      >
      <div className="relative h-44 overflow-hidden">
        <LazyImage
          src={image}
          alt={name}
          className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        {tag ? (
          <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-text-primary">
            {tag}
          </div>
        ) : null}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="truncate font-[family-name:var(--font-display)] text-xl font-bold text-white">
            {name}
          </div>
          <div className="mt-1 flex items-center justify-between gap-3 text-xs text-white/80">
            <span className="truncate">{restaurant}</span>
            <span className="shrink-0 rounded-full bg-white/15 px-2 py-1 text-xs font-semibold text-white">
              €{price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      </Link>
    </motion.div>
  );
}

