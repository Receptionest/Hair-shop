"use client";

import { useState } from "react";
import { X, Lock, CreditCard, Banknote, ShieldCheck, Truck, MapPin, Sparkles, AlertCircle } from "lucide-react";
import { CartItem, Order } from "@/types";
import { soundFX } from "@/utils/audio";
import confetti from "canvas-confetti";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  couponCode: string;
  deliveryMethod: string;
  onOrderComplete: (order: Order) => void;
}

const nelspruitSuburbs = [
  "West Acres",
  "Steiltes",
  "Riverside Park",
  "Nelspruit Central (CBD)",
  "Sonpark Centre Area",
  "Kamagugu",
  "Mataffin",
  "KaNyamazane / Pienaar",
  "Rocky Drift / White River",
  "Kaapsehoop Road",
  "Other Mpumalanga / SA Location",
];

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shippingFee,
  couponCode,
  deliveryMethod,
  onOrderComplete,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    suburb: "West Acres",
    streetAddress: "",
    notes: "",
    paymentMethod: "instant_eft",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.phone.trim()) {
      setError("Please fill in your name and phone number for delivery.");
      return;
    }

    setLoading(true);
    soundFX.playPop();

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, "")}@nelspruit-client.co.za`,
          suburb: formData.suburb,
          streetAddress: formData.streetAddress || "Nelspruit Hub Collection",
          city: "Nelspruit",
          deliveryMethod,
          paymentMethod: formData.paymentMethod,
          items,
          subtotal,
          discount,
          shippingFee,
          total,
          notes: formData.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process order");
      }

      soundFX.playCash();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#F472B6", "#FBBF24", "#10B981", "#6366F1"],
      });

      onOrderComplete(data.order);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-orange-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-2xl sunset-gradient text-white flex items-center justify-center shadow-md">
            <Lock className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#2B172A] font-serif">Nelspruit Fast Checkout</h2>
            <p className="text-xs text-rose-600 font-semibold">
              {deliveryMethod === "store_pickup_sonpark"
                ? "Sonpark Studio Collection • Ready in 2 Hours"
                : "Same-Day Nelspruit Delivery • Door-to-Door"}
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nandi Dlamini"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                WhatsApp / Cell Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 082 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Email Address (for order receipt)
            </label>
            <input
              type="email"
              placeholder="e.g. nandi@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          {/* Suburb & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Nelspruit Suburb *
              </label>
              <select
                value={formData.suburb}
                onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none bg-white font-medium"
              >
                {nelspruitSuburbs.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Street Address / Complex Name
              </label>
              <input
                type="text"
                placeholder={
                  deliveryMethod === "store_pickup_sonpark"
                    ? "Collecting at Sonpark Centre"
                    : "e.g. 24 Bell Street, Unit 12"
                }
                value={formData.streetAddress}
                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Delivery Note */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Special Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Leave at security, or call when arriving at gate"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          {/* Payment Method Selector */}
          <div className="pt-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-[#2B172A] mb-2">
              Select South African Payment Option:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  formData.paymentMethod === "instant_eft"
                    ? "border-rose-500 bg-rose-50/70 font-bold"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === "instant_eft"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "instant_eft" })}
                  className="accent-rose-600"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">Instant EFT / Ozow</p>
                  <p className="text-[10px] text-gray-500">Capitec Pay, FNB, Absa, Nedbank</p>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  formData.paymentMethod === "payflex"
                    ? "border-emerald-500 bg-emerald-50/70 font-bold"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === "payflex"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "payflex" })}
                  className="accent-emerald-600"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">PayFlex (4x Installments)</p>
                  <p className="text-[10px] text-gray-500">Pay 4x R{Math.round(total / 4)} interest-free</p>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  formData.paymentMethod === "card"
                    ? "border-blue-500 bg-blue-50/70 font-bold"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === "card"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "card" })}
                  className="accent-blue-600"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">Credit / Debit Card</p>
                  <p className="text-[10px] text-gray-500">Visa, Mastercard 3D Secure</p>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  formData.paymentMethod === "cash_on_collection"
                    ? "border-amber-500 bg-amber-50/70 font-bold"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === "cash_on_collection"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "cash_on_collection" })}
                  className="accent-amber-600"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">Cash / Card on Sonpark Collection</p>
                  <p className="text-[10px] text-gray-500">Pay at Nelspruit Studio Hub</p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary Pill */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Due ({items.length} units)</p>
              <p className="text-lg font-black font-mono text-[#2B172A]">R{total}</p>
            </div>
            <div className="text-right">
              {discount > 0 && <p className="text-emerald-600 font-bold">Includes R{discount} discount</p>}
              <p className="text-gray-500">
                Delivery: {shippingFee === 0 ? "FREE" : `R${shippingFee}`}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl sunset-gradient text-white font-black text-sm sm:text-base shadow-lg shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Confirming with Nelspruit Hub...
              </span>
            ) : (
              <span>Confirm Order & Lock Lowveld Slay (R{total})</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
