"use client";

import { ShoppingBag, Sparkles, Flame, Scissors, Volume2, ShieldCheck, Calendar, Menu, X } from "lucide-react";
import { useState } from "react";
import { soundFX } from "@/utils/audio";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenBooking: () => void;
  onOpenSoundboard: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenQuiz,
  onOpenBooking,
  onOpenSoundboard,
  onOpenAdmin,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (hash: string) => {
    setMobileMenuOpen(false);
    soundFX.playPop();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F5]/90 backdrop-blur-md border-b border-[#F5E6D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          onClick={() => soundFX.playSparkle()}
        >
          <div className="w-10 h-10 rounded-2xl sunset-gradient flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#2B172A] font-serif">
                MANE TROPICS
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md">
                Nelspruit
              </span>
            </div>
            <p className="text-[10px] tracking-widest text-[#885A7E] uppercase font-semibold">
              Human Hair Blend Haven • Lowveld
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4A3245]">
          <button
            onClick={() => handleLinkClick("#shop")}
            className="hover:text-[#E11D48] transition-colors cursor-pointer"
          >
            Shop Blends
          </button>
          <button
            onClick={() => handleLinkClick("#humidity-test")}
            className="hover:text-[#E11D48] transition-colors flex items-center gap-1 cursor-pointer text-orange-600 font-semibold"
          >
            <Flame className="w-3.5 h-3.5" />
            Heat Test ☀️
          </button>
          <button
            onClick={() => handleLinkClick("#crown-customizer")}
            className="hover:text-[#E11D48] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Scissors className="w-3.5 h-3.5 text-pink-500" />
            Crown Studio
          </button>
          <button
            onClick={() => handleLinkClick("#care-guide")}
            className="hover:text-[#E11D48] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Blend Science
          </button>
          <button
            onClick={() => handleLinkClick("#reviews")}
            className="hover:text-[#E11D48] transition-colors cursor-pointer"
          >
            Nelspruit Baddies 💅
          </button>
          <button
            onClick={onOpenBooking}
            className="hover:text-[#E11D48] transition-colors flex items-center gap-1 text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700 px-2.5 py-1 rounded-full cursor-pointer"
          >
            <Calendar className="w-3 h-3" />
            Book Studio Fitting
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Soundboard Button */}
          <button
            onClick={() => {
              soundFX.playSparkle();
              onOpenSoundboard();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold transition-all cursor-pointer border border-purple-200"
            title="Open Fun Hair Slay Soundboard"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Slay Sounds 🔊</span>
          </button>

          {/* Quiz Button */}
          <button
            onClick={() => {
              soundFX.playPop();
              onOpenQuiz();
            }}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            Quiz Match
          </button>

          {/* Cart Button */}
          <button
            onClick={() => {
              soundFX.playPop();
              onOpenCart();
            }}
            className="relative p-2.5 rounded-2xl bg-[#2B172A] hover:bg-[#3D1F3C] text-white shadow-md shadow-[#2B172A]/20 transition-all cursor-pointer"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#E11D48] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-black cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F5] border-b border-[#F5E6D8] px-4 py-4 space-y-3">
          <button
            onClick={() => handleLinkClick("#shop")}
            className="block w-full text-left py-2 font-medium text-gray-800"
          >
            🛍️ Shop All Blends & Wigs
          </button>
          <button
            onClick={() => handleLinkClick("#humidity-test")}
            className="block w-full text-left py-2 font-semibold text-orange-600"
          >
            ☀️ Lowveld Heat & Humidity Test
          </button>
          <button
            onClick={() => handleLinkClick("#crown-customizer")}
            className="block w-full text-left py-2 font-medium text-pink-600"
          >
            ✂️ Crown Studio (Wig Customizer)
          </button>
          <button
            onClick={() => handleLinkClick("#care-guide")}
            className="block w-full text-left py-2 font-medium text-emerald-700"
          >
            🛡️ Blend Care & Heat Guide
          </button>
          <button
            onClick={() => handleLinkClick("#reviews")}
            className="block w-full text-left py-2 font-medium text-gray-800"
          >
            💅 Nelspruit Baddies Wall
          </button>
          <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-2.5 rounded-xl bg-rose-100 text-rose-800 font-bold text-sm"
            >
              📅 Book Studio Fitting (Sonpark)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSoundboard();
              }}
              className="w-full text-center py-2.5 rounded-xl bg-purple-100 text-purple-800 font-bold text-sm"
            >
              🔊 Hair Slay Soundboard
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full text-center py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm"
            >
              ✨ Take 30-Second Hair Quiz
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-center py-2 text-xs text-gray-500 underline"
            >
              🔒 Store Management Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
