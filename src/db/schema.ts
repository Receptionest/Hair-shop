import { pgTable, text, serial, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // 'glueless-wigs' | 'bundles' | 'bobs' | 'colored' | 'ponytails' | 'care'
  price: integer("price").notNull(), // in ZAR (Rands)
  originalPrice: integer("original_price"), // for crossed out discount
  rating: text("rating").notNull().default("4.9"),
  reviewCount: integer("review_count").notNull().default(24),
  image: text("image").notNull(),
  badge: text("badge"), // 'Nelspruit Best Seller', 'Humidity Proof', 'Ready To Wear', 'New Drop'
  description: text("description").notNull(),
  blendDetails: text("blend_details").notNull().default("70% Cuticle-Aligned Human Hair + 30% Lowveld Heat-Locked Memory Silk"),
  length: text("length").notNull().default("26 Inch"),
  lengths: jsonb("lengths").$type<string[]>().default(["18 Inch", "22 Inch", "26 Inch", "30 Inch"]),
  colors: jsonb("colors").$type<string[]>().default(["Natural 1B", "Honey Blonde #4/27", "Copper Ginger #350"]),
  capType: text("cap_type").default("5x5 Pre-Plucked HD Glueless Lace"),
  heatLimit: text("heat_limit").default("200°C (Flat iron & curling tong safe)"),
  inStock: boolean("in_stock").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email").notNull(),
  suburb: text("suburb").notNull(), // 'West Acres', 'Steiltes', 'Riverside', 'Kamagugu', 'White River', etc.
  streetAddress: text("street_address").notNull(),
  city: text("city").notNull().default("Nelspruit"),
  deliveryMethod: text("delivery_method").notNull(), // 'same_day_nelspruit', 'store_pickup_sonpark', 'paxi_pep', 'courier_guy'
  paymentMethod: text("payment_method").notNull(), // 'instant_eft', 'payflex', 'card', 'cash_on_collection'
  items: jsonb("items").$type<Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    length: string;
    color: string;
    image: string;
  }>>().notNull(),
  subtotal: integer("subtotal").notNull(),
  discount: integer("discount").notNull().default(0),
  shippingFee: integer("shipping_fee").notNull(),
  total: integer("total").notNull(),
  status: text("status").notNull().default("Processing"), // 'Processing', 'Ready For Pickup', 'Out For Delivery', 'Delivered'
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email").notNull(),
  service: text("service").notNull(), // 'Wig Fitting & Lace Tinting', 'Blend Texture Touch & Feel', 'Custom Plucking Masterclass', 'Ponytail Instant Glam'
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  suburb: text("suburb").default("Nelspruit"),
  notes: text("notes"),
  status: text("status").notNull().default("Confirmed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  suburb: text("suburb").notNull(), // 'West Acres, Nelspruit', 'Steiltes', etc.
  rating: integer("rating").notNull().default(5),
  wigStyle: text("wig_style").notNull(),
  comment: text("comment").notNull(),
  verifiedLocation: text("verified_location").default("Nelspruit, Mpumalanga"),
  likesCount: integer("likes_count").notNull().default(12),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizLeads = pgTable("quiz_leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  vibe: text("vibe"),
  lifestyle: text("lifestyle"),
  length: text("length"),
  texture: text("texture"),
  recommendedProduct: text("recommended_product"),
  couponCode: text("coupon_code").default("NELSPRUITBADDIE"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
