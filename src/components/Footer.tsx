"use client";

import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";
import { soundFX } from "@/utils/audio";

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenSoundboard: () => void;
}

export default function Footer({ onOpenBooking, onOpenAdmin, onOpenSoundboard }: FooterProps) {
  return (
    <footer className="bg-[#180E1A] text-white border-t border-rose-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl sunset-gradient flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 text-amber-100" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white font-serif">
                  MANE TROPICS
                </span>
                <p className="text-[10px] tracking-widest text-orange-400 uppercase font-bold">
                  Nelspruit • Mbombela
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Nelspruit&#39;s favorite hair sanctuary for premium Human Hair Blends engineered to defy the 38°C Lowveld sunshine. Unclockable lace, silky heat-locked curls, and realistic luxury without the R5,000 price tag.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  soundFX.playSparkle();
                  onOpenSoundboard();
                }}
                className="px-3 py-1.5 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/60 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>🔊 Slay Soundboard</span>
              </button>
              <button
                onClick={onOpenBooking}
                className="px-3 py-1.5 rounded-full bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700/60 text-xs font-bold transition-all cursor-pointer"
              >
                Book VIP Fitting
              </button>
            </div>
          </div>

          {/* Nelspruit Showroom Hub */}
          <div className="space-y-3 text-xs">
            <h4 className="font-black text-sm uppercase tracking-wider text-amber-400">
              Nelspruit Studio
            </h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Shop 14, Sonpark Centre, cnr Faurie & Madiba Dr, Nelspruit</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon - Sat: 08:30 - 17:30</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>013 752 0000 / 082 000 0000</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>hello@manetropics-nelspruit.co.za</span>
              </p>
            </div>
          </div>

          {/* Nelspruit Suburbs Served */}
          <div className="space-y-3 text-xs">
            <h4 className="font-black text-sm uppercase tracking-wider text-rose-400">
              Mbombela Delivery
            </h4>
            <ul className="space-y-1 text-gray-400">
              <li>✓ West Acres (Same-Day)</li>
              <li>✓ Steiltes & Stonehenge</li>
              <li>✓ Riverside Park & CBD</li>
              <li>✓ Kamagugu & Mataffin</li>
              <li>✓ White River & Rocky Drift</li>
              <li>✓ KaNyamazane & Pienaar</li>
              <li>✓ Nationwide SA Courier</li>
            </ul>
          </div>

          {/* Quick Links & Admin */}
          <div className="space-y-3 text-xs">
            <h4 className="font-black text-sm uppercase tracking-wider text-orange-400">
              Hair Sanctuary
            </h4>
            <ul className="space-y-1.5 text-gray-400">
              <li><a href="#shop" className="hover:text-white">Shop All Drops</a></li>
              <li><a href="#humidity-test" className="hover:text-white">Lowveld Heat Test</a></li>
              <li><a href="#crown-customizer" className="hover:text-white">Crown Customizer</a></li>
              <li><a href="#care-guide" className="hover:text-white">Blend Care Science</a></li>
              <li><a href="#reviews" className="hover:text-white">Nelspruit Baddies Wall</a></li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="text-gray-500 hover:text-amber-300 underline cursor-pointer text-[11px]"
                >
                  🔒 Admin Dashboard
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & playful note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © 2026 MANE TROPICS NELSPRUIT. All rights reserved. Crafted for Nelspruit queens.
          </p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>in the Lowveld, South Africa 🇿🇦</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
