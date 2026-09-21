"use client";

import { CheckCircle2, Sparkles, MapPin, Phone, MessageCircle, X, ShoppingBag } from "lucide-react";
import { Order } from "@/types";
import { soundFX } from "@/utils/audio";

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderConfirmationModal({
  order,
  onClose,
}: OrderConfirmationModalProps) {
  if (!order) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi Mane Tropics Nelspruit! I just placed order #${order.orderNumber} for R${order.total}. My name is ${order.customerName}. Can I confirm fulfillment/pickup?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-300 my-8 text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Title */}
        <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Order Confirmed • Slay Locked In!
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#2B172A] font-serif mt-2 mb-1">
          Thank You, {order.customerName.split(" ")[0]}! 👑
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
          Your human hair blend is being prepped at our Nelspruit studio.
        </p>

        {/* Order Details Card */}
        <div className="my-5 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="text-gray-500 font-semibold">Order Tracking #</span>
            <span className="font-mono font-black text-rose-700 text-sm">
              {order.orderNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Destination:</span>
            <span className="font-bold text-[#2B172A]">
              {order.deliveryMethod === "store_pickup_sonpark"
                ? "Sonpark Studio Pickup (Nelspruit)"
                : `${order.suburb}, ${order.city}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment:</span>
            <span className="font-bold text-gray-800 capitalize">
              {order.paymentMethod.replace(/_/g, " ")}
            </span>
          </div>

          <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Paid:</span>
            <span className="font-mono text-sm text-emerald-700">R{order.total}</span>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="space-y-2 mb-6 text-left">
          <p className="text-[11px] font-bold uppercase text-gray-400 tracking-wider">
            Units In Your Order:
          </p>
          {order.items.map((it, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-xl border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.image} alt={it.name} className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#2B172A] truncate">{it.name}</p>
                <p className="text-[10px] text-gray-500">{it.length} • {it.color}</p>
              </div>
              <span className="text-xs font-mono font-bold text-gray-900">x{it.quantity}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp & Studio actions */}
        <div className="space-y-2.5">
          <a
            href={`https://wa.me/27720000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playSparkle()}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Connect via WhatsApp (Nelspruit Driver / Studio)
          </a>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-colors cursor-pointer"
          >
            Back to Hair Sanctuary
          </button>
        </div>

        <p className="text-[10px] text-gray-400 mt-4">
          📍 Sonpark Centre, Shop 14, Faurie St, Nelspruit • Helpline: 013 752 0000
        </p>

      </div>
    </div>
  );
}
