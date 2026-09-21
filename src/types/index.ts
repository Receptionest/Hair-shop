export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number | null;
  rating: string;
  reviewCount: number;
  image: string;
  badge: string | null;
  description: string;
  blendDetails: string;
  length: string;
  lengths: string[];
  colors: string[];
  capType: string | null;
  heatLimit: string | null;
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  length: string;
  color: string;
  image: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  suburb: string;
  streetAddress: string;
  city: string;
  deliveryMethod: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: string;
  notes?: string | null;
  createdAt: string;
}

export interface Appointment {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  suburb?: string | null;
  notes?: string | null;
  status: string;
  createdAt: string;
}

export interface Review {
  id: number;
  customerName: string;
  suburb: string;
  rating: number;
  wigStyle: string;
  comment: string;
  verifiedLocation?: string | null;
  likesCount: number;
  createdAt: string;
}
