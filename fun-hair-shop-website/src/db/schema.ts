import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export interface VariantOption {
  label: string;
  price: number;
}

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  category: text("category").notNull(), // bundles | wigs | lace | care
  description: text("description").notNull(),
  image: text("image").notNull(),
  badge: text("badge"),
  bg: text("bg").notNull().default("#FFF4E8"),
  options: jsonb("options").$type<VariantOption[]>().notNull(),
  featured: boolean("featured").notNull().default(false),
  sort: integer("sort").notNull().default(0),
});

export interface OrderItem {
  name: string;
  option: string;
  qty: number;
  price: number;
}

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  fulfillment: text("fulfillment").notNull().default("pickup"), // pickup | delivery
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  total: integer("total").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  from: text("from").notNull(),
  style: text("style").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull().default(5),
  sort: integer("sort").notNull().default(0),
});
