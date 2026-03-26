export function formatPrice(price: number): string {
  return `€${price.toFixed(2)}`;
}

export function formatDeliveryTime(min: number, max: number): string {
  return `${min}–${max} min`;
}

