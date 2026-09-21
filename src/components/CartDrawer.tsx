"use client";

import { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Truck, Tag, ArrowRight } from "lucide-react";
import { CartItem } from "@/types";
import { soundFX } from "@/utils/audio";
import confetti from "canvas-confetti";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, length: string, color: string, qty: number) => void;
  onRemoveItem: (id: number, length: string, color: string) => void;
  onProceedToCheckout: (discountAmount: number, shippingCost: number, coupon: string, deliveryType: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; isPercent: boolean } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("same_day_nelspruit"); // 'same_day_nelspruit' | 'store_pickup_sonpark' | 'courier_guy'

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.isPercent) {
      discountAmount = Math.round(subtotal * (appliedCoupon.discount / 100));
    } else {
      discountAmount = appliedCoupon.discount;
    }
  }

  // Delivery cost
  let shippingCost = 60; // Same-day Nelspruit
  if (deliveryMethod === "store_pickup_sonpark") {
    shippingCost = 0;
  } else if (deliveryMethod === "courier_guy") {
    shippingCost = subtotal >= 1200 ? 0 : 100;
  } else if (deliveryMethod === "paxi_pep") {
    shippingCost = 60;
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = () => {
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    if (code === "NELSPRUITBADDIE") {
      setAppliedCoupon({ code, discount: 10, isPercent: true });
      soundFX.playCash();
      confetti({ particleCount: 30, spread: 50 });
    } else if (code === "LOWVELDHEAT") {
      setAppliedCoupon({ code, discount: 100, isPercent: false });
      soundFX.playCash();
      confetti({ particleCount: 30, spread: 50 });
    } else {
      setCouponError("Invalid coupon. Try code 'NELSPRUITBADDIE' for 10% off!");
    }
  };

  const handleCheckoutClick = () => {
    soundFX.playPop();
    onProceedToCheckout(discountAmount, shippingCost, appliedCoupon?.code || "", deliveryMethod);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-orange-100">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF7F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-600" />
              <h2 className="font-extrabold text-base text-[#2B172A]">Your Nelspruit Slay Bag</h2>
              <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <div
                  key={`${item.id}-${item.length}-${item.color}-${idx}`}
                  className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex gap-3.5 items-center justify-between"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#2B172A] line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {item.length} • {item.color}
                    </p>
                    <p className="text-xs font-black font-mono text-rose-700 mt-1">
                      R{item.price} each
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.length, item.color, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                      >
                        <Minus className="w-3 h-3 text-gray-700" />
                      </button>
                      <span className="text-xs font-bold text-gray-900 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.length, item.color, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                      >
                        <Plus className="w-3 h-3 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id, item.length, item.color)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 cursor-pointer shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-gray-800">Your bag is empty</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Add one of our Lowveld heat-proof human hair blend units to start your glam transformation!
                </p>
              </div>
            )}

            {/* Nelspruit Delivery Method Selector */}
            {items.length > 0 && (
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <label className="text-xs font-bold text-[#2B172A] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  Nelspruit Fulfilment Option:
                </label>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => setDeliveryMethod("same_day_nelspruit")}
                    className={`w-full p-2.5 rounded-xl text-left border flex items-center justify-between cursor-pointer ${
                      deliveryMethod === "same_day_nelspruit"
                        ? "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>⚡ Same-Day Nelspruit Express (West Acres, Steiltes, Riverside)</span>
                    <span className="font-black text-emerald-700">R60</span>
                  </button>

                  <button
                    onClick={() => setDeliveryMethod("store_pickup_sonpark")}
                    className={`w-full p-2.5 rounded-xl text-left border flex items-center justify-between cursor-pointer ${
                      deliveryMethod === "store_pickup_sonpark"
                        ? "border-purple-500 bg-purple-50/70 text-purple-950 font-bold"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>🏢 Free 2-Hour Pickup at Sonpark Studio (Nelspruit)</span>
                    <span className="font-black text-purple-700">FREE</span>
                  </button>

                  <button
                    onClick={() => setDeliveryMethod("courier_guy")}
                    className={`w-full p-2.5 rounded-xl text-left border flex items-center justify-between cursor-pointer ${
                      deliveryMethod === "courier_guy"
                        ? "border-blue-500 bg-blue-50/70 text-blue-950 font-bold"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>🚚 The Courier Guy (Nationwide Door-to-Door)</span>
                    <span className="font-black text-blue-700">
                      {subtotal >= 1200 ? "FREE" : "R100"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Coupon Code Section */}
            {items.length > 0 && (
              <div className="pt-2 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter discount code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs uppercase focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Coupon &quot;{appliedCoupon.code}&quot; applied: -R{discountAmount}!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-500 mt-1">{couponError}</p>
                )}
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-[#FAF7F5] space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#2B172A]">R{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-R{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({deliveryMethod === "store_pickup_sonpark" ? "Sonpark Hub" : "Nelspruit / SA"})</span>
                  <span className="font-bold text-[#2B172A]">
                    {shippingCost === 0 ? "FREE" : `R${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#2B172A] pt-2 border-t border-gray-200">
                  <span>Total Amount:</span>
                  <span className="font-mono text-xl text-rose-700">R{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 rounded-2xl sunset-gradient text-white font-black text-base shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-gray-500">
                🔒 Safe & Secure Nelspruit Checkout • Instant EFT, PayFlex, Card, or Cash on Pickup
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
