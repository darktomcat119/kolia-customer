import type { Copy } from './i18nCopy';
import type { CuisineType } from './types';

export function labelCuisine(copy: Copy, key: CuisineType | 'all'): string {
  if (key === 'all') return copy.cuisineAll;
  const map: Record<CuisineType, string> = {
    west_african: copy.cuisineWestAfrican,
    congolese: copy.cuisineCongolese,
    north_african: copy.cuisineNorthAfrican,
    central_african: copy.cuisineCentralAfrican,
    southern_african: copy.cuisineSouthernAfrican,
    lusophone_african: copy.cuisineLusophone,
    pan_african: copy.cuisinePanAfrican,
  };
  return map[key] ?? key.replace(/_/g, ' ');
}
