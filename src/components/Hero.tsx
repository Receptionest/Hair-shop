"use client";

import { Sparkles, Flame, Scissors, ShoppingBag, ShieldCheck, Heart, Award } from "lucide-react";
import Image from "next/image";
import { soundFX } from "@/utils/audio";
import confetti from "canvas-confetti";

interface HeroProps {
  onOpenQuiz: () => void;
  onOpenBooking: () => void;
  onExploreShop: () => void;
}

export default function Hero({ onOpenQuiz, onOpenBooking, onExploreShop }: HeroProps) {
  const triggerHairFlip = () => {
    soundFX.playWhoosh();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#F472B6", "#FBBF24", "#FB7185", "#C084FC"],
    });
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-[#FAF7F5] via-[#FFF1E8] to-[#FAF7F5]">
      {/* Decorative background glow circles */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-orange-200 text-orange-950 shadow-sm text-xs sm:text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Mbombela&#39;s #1 Human Hair Blend Plug</span>
              <span className="text-gray-400">|</span>
              <span className="text-rose-600 font-bold">Unapologetically Baddie</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#251224] leading-[1.12] font-serif">
              Why Spend <span className="line-through decoration-rose-500 decoration-4 text-gray-400">R5,000</span> When Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] via-[#EA580C] to-[#D97706]">
                Human Hair Blend
              </span>{" "}
              Defies Nelspruit&#39;s 38°C Heat?
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#553E51] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              70% Virgin Human Cuticles + 30% Lowveld Heat-Locked Memory Fiber.
              Retains bounce, flat irons up to <strong className="text-rose-700 font-semibold">200°C</strong>, melts like butter with zero crust, and leaves your bank account smiling. Same-day delivery straight to your door in Nelspruit!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => {
                  soundFX.playPop();
                  onExploreShop();
                }}
                className="px-7 py-3.5 rounded-2xl sunset-gradient text-white font-bold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-amber-200" />
                Shop Nelspruit Drops (From R350)
              </button>

              <button
                onClick={() => {
                  soundFX.playSparkle();
                  onOpenQuiz();
                }}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-orange-50 text-[#2B172A] font-bold text-base border-2 border-orange-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                Find Blend Soulmate Quiz
              </button>

              {/* Slay trigger */}
              <button
                onClick={triggerHairFlip}
                className="px-4 py-3.5 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-800 font-bold text-sm border border-pink-300 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Tap for a hair flip sound and confetti!"
              >
                <Scissors className="w-4 h-4 text-pink-600" />
                <span>Hair Flip! 💁‍♀️</span>
              </button>
            </div>

            {/* Highlights pill row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-orange-100">
              <div className="p-3 bg-white/70 rounded-2xl border border-orange-100 text-center">
                <p className="text-xl sm:text-2xl font-black text-[#2B172A]">1,850+</p>
                <p className="text-[11px] sm:text-xs text-[#7B5B75] font-medium">Nelspruit Queens Slain</p>
              </div>
              <div className="p-3 bg-white/70 rounded-2xl border border-orange-100 text-center">
                <p className="text-xl sm:text-2xl font-black text-[#EA580C]">200°C</p>
                <p className="text-[11px] sm:text-xs text-[#7B5B75] font-medium">Heat Safe Flat Ironing</p>
              </div>
              <div className="p-3 bg-white/70 rounded-2xl border border-orange-100 text-center">
                <p className="text-xl sm:text-2xl font-black text-emerald-600">2-Hours</p>
                <p className="text-[11px] sm:text-xs text-[#7B5B75] font-medium">Sonpark Hub Pickup</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with interactive badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-rose-400 via-amber-400 to-orange-500 opacity-30 blur-lg animate-pulse-slow" />
              
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-hair-baddie.jpg"
                  alt="Nelspruit Human Hair Blend Queen"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient overlay for bottom badge text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge 1: Lowveld Heat Test */}
                <div className="absolute top-4 left-4 glass-dark text-white px-3.5 py-2 rounded-2xl shadow-lg border border-white/20 text-xs flex items-center gap-2 animate-float">
                  <div className="w-7 h-7 rounded-full bg-orange-500/40 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <p className="font-bold text-[11px] leading-tight">Mbombela 38°C Proof</p>
                    <p className="text-[10px] text-orange-200">Zero frizz curl lock</p>
                  </div>
                </div>

                {/* Floating Badge 2: Price Comparison */}
                <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl shadow-lg text-xs font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-yellow-300" />
                  <span>Only R899</span>
                </div>

                {/* Floating Badge 3: Lace Melt Status */}
                <div className="absolute bottom-5 left-4 right-4 glass-panel p-3.5 rounded-2xl shadow-xl border border-orange-200/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-black text-[#2B172A]">
                        <span>The Lowveld Bounce 28&quot;</span>
                        <span className="text-amber-500">★★★★★</span>
                      </div>
                      <p className="text-[11px] text-[#694762] font-medium">
                        &quot;Melted like butter at Riverside Mall!&quot; — Nompumelelo
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        soundFX.playSparkle();
                        onOpenBooking();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#2B172A] text-white text-[11px] font-bold hover:bg-[#3D1F3C] cursor-pointer shrink-0"
                    >
                      Try On 🪞
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
