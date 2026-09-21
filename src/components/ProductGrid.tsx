"use client";

import { useState } from "react";
import { Search, Sparkles, Filter, SlidersHorizontal, Flame } from "lucide-react";
import { Product, CartItem } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
}

const categories = [
  { id: "all", label: "All Drops 🔥" },
  { id: "glueless-wigs", label: "👑 Glueless HD Units" },
  { id: "bundles", label: "📦 3-Bundle Deals" },
  { id: "colored", label: "🧡 Sunset & Highlights" },
  { id: "bobs", label: "✂️ Bobs & Pixies" },
  { id: "ponytails", label: "🐎 2-Min Ponytails" },
  { id: "care", label: "💧 Humidity & Melt Care" },
];

export default function ProductGrid({
  products,
  onQuickView,
  onAddToCart,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filtered = products
    .filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.blendDetails.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return Number(b.rating) - Number(a.rating);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <section id="shop" className="py-16 sm:py-20 bg-[#FAF7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              100% Nelspruit In-Stock Collection
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-[#2B172A] tracking-tight">
              Human Hair Blends That Defy The Lowveld
            </h2>
            <p className="text-xs sm:text-sm text-[#6C4A64] mt-1">
              Hand-selected cuticle blends. Ready for same-day Nelspruit collection or delivery.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search wet & wavy, 30 inch, bob..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills & Sort Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-200">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#2B172A] text-white shadow-md shadow-[#2B172A]/20"
                    : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <span className="text-xs text-gray-500 font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "rating")}
              className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#2B172A] focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer shadow-sm"
            >
              <option value="featured">Nelspruit Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated Queens</option>
            </select>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 max-w-md mx-auto">
            <p className="text-3xl mb-2">🔍</p>
            <h3 className="text-base font-bold text-[#2B172A]">No hair blends found</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Try adjusting your search query or category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
