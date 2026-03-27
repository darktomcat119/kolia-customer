export type CuisineType =
  | 'west_african'
  | 'congolese'
  | 'north_african'
  | 'central_african'
  | 'southern_african'
  | 'lusophone_african'
  | 'pan_african';

export type OrderStatus =
  | 'received'
  | 'preparing'
  | 'ready'
  | 'on_the_way'
  | 'completed'
  | 'cancelled';

export type OrderType = 'delivery' | 'pickup';

export type DietaryTag =
  | 'halal'
  | 'vegan'
  | 'vegetarian'
  | 'spicy'
  | 'gluten_free'
  | 'contains_nuts';

export interface Restaurant {
  id: string;
  owner_id: string | null;
  name: string;
  description: string | null;
  cuisine_type: CuisineType;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  image_url: string | null;
  logo_url: string | null;
  opening_hours: Record<string, { open: string; close: string } | null>;
  delivery_fee: number;
  minimum_order: number;
  estimated_delivery_min: number;
  estimated_delivery_max: number;
  delivery_radius_km: number;
  pickup_available: boolean;
  is_active: boolean;
  featured: boolean;
  featured_rank: number;
  language: string;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export interface MenuCategory {
  id: string;
  restaurant_id: string;
  name: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  is_popular: boolean;
  popular_rank: number | null;
  dietary_tags: DietaryTag[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string | null;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  restaurant_id: string;
  status: OrderStatus;
  order_type: OrderType;
  delivery_address: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  restaurant?: Pick<Restaurant, 'id' | 'name' | 'image_url' | 'logo_url'>;
  order_items?: OrderItem[];
}

export interface CartItem {
  menu_item_id: string;
  restaurant_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string | null;
}

export interface CreateOrderPayload {
  restaurant_id: string;
  items: { menu_item_id: string; quantity: number }[];
  order_type: OrderType;
  delivery_address?: string;
  delivery_lat?: number;
  delivery_lng?: number;
  notes?: string;
}

export interface CreateOrderResponse {
  order_id: string;
  order_number: string;
  client_secret: string;
}

