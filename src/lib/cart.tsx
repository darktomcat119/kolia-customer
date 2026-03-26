import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, MenuItem } from './types';

type CartContextType = {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (restaurantId: string, item: MenuItem, quantity?: number) => void;
  removeItem: (menuItemId: string) => void;
  setQuantity: (menuItemId: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = 'kolia_customer_cart_v1';

type Persisted = {
  restaurantId: string | null;
  items: CartItem[];
};

function safeParse(raw: string | null): Persisted | null {
  if (!raw) return null;
  try {
    const json = JSON.parse(raw) as Persisted;
    if (!json || typeof json !== 'object') return null;
    return { restaurantId: json.restaurantId ?? null, items: Array.isArray(json.items) ? json.items : [] };
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = safeParse(typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null);
    if (stored) {
      setRestaurantId(stored.restaurantId);
      setItems(stored.items);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const payload: Persisted = { restaurantId, items };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [restaurantId, items]);

  const addItem = useCallback((rid: string, item: MenuItem, quantity = 1) => {
    setRestaurantId((current) => {
      if (current && current !== rid) {
        // Switching restaurants clears cart by design (simpler UX).
        setItems([]);
      }
      return rid;
    });

    setItems((current) => {
      const existing = current.find((i) => i.menu_item_id === item.id);
      if (existing) {
        return current.map((i) =>
          i.menu_item_id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [
        ...current,
        {
          menu_item_id: item.id,
          restaurant_id: rid,
          name: item.name,
          price: Number(item.price),
          quantity,
          image_url: item.image_url ?? null,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((menuItemId: string) => {
    setItems((current) => current.filter((i) => i.menu_item_id !== menuItemId));
  }, []);

  const setQuantity = useCallback((menuItemId: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) return current.filter((i) => i.menu_item_id !== menuItemId);
      return current.map((i) => (i.menu_item_id === menuItemId ? { ...i, quantity } : i));
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setRestaurantId(null);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextType>(
    () => ({ items, restaurantId, addItem, removeItem, setQuantity, clear, subtotal }),
    [items, restaurantId, addItem, removeItem, setQuantity, clear, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

