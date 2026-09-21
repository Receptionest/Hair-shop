"use client";

import { useState } from "react";
import { X, Star, Flame, Sparkles, Check, ShoppingBag, ShieldCheck, MapPin, Truck, Scissors } from "lucide-react";
import { Product, CartItem } from "@/types";
import { soundFX } from "@/utils/audio";
import confetti from "canvas-confetti";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onOpenBooking: () => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onOpenBooking,
}: ProductModalProps) {
  const [selectedLength, setSelectedLength] = useState<string>(
    product?.lengths?.[0] || product?.length || "26 Inch"
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0] || "Natural 1B"
  );

  if (!product) return null;

  const handleAddToCart = () => {
    soundFX.playCash();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#F472B6", "#FBBF24", "#FB7185"],
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border-2 border-orange-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 cursor-pointer z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Visual Showcase */}
          <div className="md:col-span-5 space-y-3">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-orange-100 bg-gray-50 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#2B172A] text-xs font-black px-2.5 py-1 rounded-xl shadow-md border border-orange-100">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Nelspruit Pickup Perk Box */}
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 text-xs space-y-1.5">
              <p className="font-bold text-rose-950 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                Nelspruit Sonpark Pickup Ready
              </p>
              <p className="text-rose-800 text-[11px] leading-relaxed">
                Want to touch and feel the texture first? Visit our Sonpark fitting studio or get it delivered same-day in Mbombela.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="text-xs font-bold text-rose-700 underline cursor-pointer"
              >
                Book Free Lace Tinting / Try-On →
              </button>
            </div>
          </div>

          {/* Right Column: Specifications & Checkout */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Title & Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500 font-medium">
                  {product.reviewCount} verified Nelspruit reviews
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#2B172A] font-serif leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pb-3 border-b border-gray-100">
              <span className="text-3xl font-black font-mono text-[#2B172A]">
                R{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">
                  R{product.originalPrice}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Save R{(product.originalPrice || product.price + 300) - product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#5C4258] leading-relaxed">
              {product.description}
            </p>

            {/* Blend Science & Specs Matrix */}
            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900">Blend Composition: </strong>
                  <span className="text-gray-600">{product.blendDetails}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900">Heat Safe: </strong>
                  <span className="text-gray-600">{product.heatLimit}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Scissors className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900">Cap Construction: </strong>
                  <span className="text-gray-600">{product.capType || "HD Swiss Lace"}</span>
                </div>
              </div>
            </div>

            {/* Interactive Selectors */}
            {product.lengths && product.lengths.length > 0 && (
              <div>
                <label className="text-xs font-bold text-[#2B172A] block mb-1.5">
                  Choose Inch Length:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.lengths.map((len) => (
                    <button
                      key={len}
                      onClick={() => setSelectedLength(len)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        selectedLength === len
                          ? "border-rose-500 bg-rose-50 text-rose-700 shadow-sm"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="text-xs font-bold text-[#2B172A] block mb-1.5">
                  Choose Shade:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        selectedColor === col
                          ? "border-amber-500 bg-amber-50 text-amber-900 shadow-sm"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Bag CTA */}
            <div className="pt-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-2xl sunset-gradient text-white font-black text-base shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-amber-200" />
                Add to Bag • R{product.price}
              </button>
              <p className="text-[11px] text-center text-gray-500 mt-2">
                🚚 Same-day Nelspruit delivery available at checkout (or free pickup)
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
