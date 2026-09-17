export interface VariantOption {
  label: string;
  price: number;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  category: "bundles" | "wigs" | "lace" | "care" | string;
  description: string;
  image: string;
  badge: string | null;
  bg: string;
  options: VariantOption[];
  featured: boolean;
  sort: number;
}

export interface Testimonial {
  id: number;
  author: string;
  from: string;
  style: string;
  quote: string;
  rating: number;
}

export interface CartItem {
  key: string;
  productId: number;
  name: string;
  option: string;
  price: number;
  image: string;
  qty: number;
}
