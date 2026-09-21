"use client";

import { useState } from "react";
import { Star, Flame, Eye, ShoppingBag, Check } from "lucide-react";
import { Product, CartItem } from "@/types";
import { soundFX } from "@/utils/audio";
import confetti from "canvas-confetti";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  const [selectedLength, setSelectedLength] = useState<string>(
    product.lengths?.[0] || product.length || "26 Inch"
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0] || "Natural 1B"
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.playCash();
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#F472B6", "#FBBF24", "#38BDF8"],
    });

    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      length: selectedLength,
      color: selectedColor,
      image: product.image,
    });
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-3xl border border-orange-100/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1"
    >
      {/* Top Image Showcase */}
      <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#2B172A] text-[11px] font-black px-2.5 py-1 rounded-xl shadow-md border border-orange-100 flex items-center gap-1">
            <span>{product.badge}</span>
          </div>
        )}

        {/* Heat Safe Pill */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/20 flex items-center gap-1">
          <Flame className="w-3 h-3 text-orange-400" />
          <span>200°C Heat Safe</span>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <span className="px-4 py-2 rounded-2xl bg-white/90 text-[#2B172A] text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4 text-rose-600" />
            Inspect Blend Details
          </span>
        </div>
      </div>

      {/* Details & Actions */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount} reviews)</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Nelspruit Stock
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-sm sm:text-base text-[#2B172A] line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>

          {/* Blend Details Snippet */}
          <p className="text-[11px] text-[#7A5873] mt-1 line-clamp-1 font-medium">
            {product.blendDetails}
          </p>
        </div>

        {/* Interactive Length / Color Pickers */}
        <div className="space-y-2 pt-2 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
          {product.lengths && product.lengths.length > 1 && (
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-semibold text-gray-400 shrink-0">Inch:</span>
              {product.lengths.map((len) => (
                <button
                  key={len}
                  onClick={() => setSelectedLength(len)}
                  className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium transition-all shrink-0 cursor-pointer ${
                    selectedLength === len
                      ? "border-rose-500 bg-rose-50 text-rose-700 font-bold"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {len.replace(" Inch", "\"")}
                </button>
              ))}
            </div>
          )}

          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-semibold text-gray-400 shrink-0">Color:</span>
              {product.colors.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium transition-all shrink-0 cursor-pointer ${
                    selectedColor === col
                      ? "border-amber-500 bg-amber-50 text-amber-900 font-bold"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {col.length > 16 ? col.slice(0, 14) + "…" : col}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black font-mono text-[#2B172A]">
                R{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  R{product.originalPrice}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-600 font-medium">
              Free Sonpark Pickup
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="px-3.5 py-2 rounded-2xl sunset-gradient text-white text-xs font-bold shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
}
