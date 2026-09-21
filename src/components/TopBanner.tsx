"use client";

import { Sparkles, MapPin, Truck, Flame } from "lucide-react";
import { useState } from "react";

export default function TopBanner({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyCoupon = () => {
    navigator.clipboard.writeText("NELSPRUITBADDIE");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1A0E1A] text-white border-b border-[#F472B6]/20 text-xs sm:text-sm py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none justify-center">
          <span className="flex items-center gap-1 text-[#FBBF24] font-medium shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#F472B6]" />
            Nelspruit Local Plug:
          </span>
          <span className="text-gray-300 shrink-0">
            Free 2-Hour Pickup at <strong className="text-white">Sonpark Centre</strong>
          </span>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <span className="text-gray-300 shrink-0 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            Same-Day Delivery in Mbombela (R60)
          </span>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <span className="text-gray-300 shrink-0 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            Lowveld Heat & Humidity Tested
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={copyCoupon}
            className="inline-flex items-center gap-1.5 bg-[#F472B6]/20 hover:bg-[#F472B6]/30 text-[#F9A8D4] border border-[#F472B6]/40 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
            title="Click to copy 10% discount code"
          >
            <Sparkles className="w-3 h-3 text-[#FBBF24]" />
            {copied ? "COPIED! 🎉" : "CODE: NELSPRUITBADDIE (10% OFF)"}
          </button>
          <button
            onClick={onOpenQuiz}
            className="underline underline-offset-2 text-gray-300 hover:text-white font-medium text-xs cursor-pointer"
          >
            Find Your Match ✨
          </button>
        </div>
      </div>
    </div>
  );
}
