"use client";

import { Volume2, X, Sparkles, Scissors, Flame, DollarSign, Heart, PartyPopper } from "lucide-react";
import { soundFX } from "@/utils/audio";
import confetti from "canvas-confetti";
import { useState } from "react";

interface SoundboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Soundboard({ isOpen, onClose }: SoundboardProps) {
  const [activePhrase, setActivePhrase] = useState<string | null>(null);

  if (!isOpen) return null;

  const playEffect = (type: string, phrase: string) => {
    setActivePhrase(phrase);
    switch (type) {
      case "whoosh":
        soundFX.playWhoosh();
        confetti({ particleCount: 30, spread: 50 });
        break;
      case "sparkle":
        soundFX.playSparkle();
        confetti({ particleCount: 25, spread: 40 });
        break;
      case "cash":
        soundFX.playCash();
        confetti({ particleCount: 35, spread: 60 });
        break;
      case "sizzle":
        soundFX.playSizzle();
        break;
      case "pop":
        soundFX.playPop();
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-purple-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#2B172A]">Lowveld Mane Soundboard</h3>
            <p className="text-xs text-purple-600 font-semibold">Tap to unleash hair confidence sounds!</p>
          </div>
        </div>

        {/* Relatable Nelspruit Hair quote banner */}
        {activePhrase && (
          <div className="my-3 p-3 bg-purple-50 rounded-2xl border border-purple-200 text-center animate-bounce">
            <p className="text-xs font-bold text-purple-900">✨ &quot;{activePhrase}&quot;</p>
          </div>
        )}

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => playEffect("whoosh", "Hair Flip: Lowveld Heat Can't Touch This!")}
            className="p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-left transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-200 text-rose-800 flex items-center justify-center mb-2">
              <Scissors className="w-4 h-4" />
            </div>
            <p className="text-xs font-black text-[#2B172A]">Hair Flip Whoosh</p>
            <p className="text-[10px] text-gray-500">Instant confidence check</p>
          </button>

          <button
            onClick={() => playEffect("sparkle", "HD Lace Melted Like Warm Kerrygold Butter!")}
            className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs font-black text-[#2B172A]">Lace Melt Chime</p>
            <p className="text-[10px] text-gray-500">Unclockable hairline</p>
          </button>

          <button
            onClick={() => playEffect("cash", "Payday Friday + Fresh Sonpark Wig Collection!")}
            className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center mb-2">
              <DollarSign className="w-4 h-4" />
            </div>
            <p className="text-xs font-black text-[#2B172A]">Payday Slay</p>
            <p className="text-[10px] text-gray-500">Saved R3k vs virgin hair</p>
          </button>

          <button
            onClick={() => playEffect("sizzle", "38°C Nelspruit Sun: Blend Curls Still Locked In!")}
            className="p-4 rounded-2xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-left transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-orange-200 text-orange-800 flex items-center justify-center mb-2">
              <Flame className="w-4 h-4" />
            </div>
            <p className="text-xs font-black text-[#2B172A]">Heat Sizzle</p>
            <p className="text-[10px] text-gray-500">Lowveld heat defiance</p>
          </button>

          <button
            onClick={() => playEffect("pop", "Water Spritz: Wet & Wavy Ringlets Popped!")}
            className="p-4 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-left transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-200 text-sky-800 flex items-center justify-center mb-2">
              <PartyPopper className="w-4 h-4" />
            </div>
            <p className="text-xs font-black text-[#2B172A]">Curl Pop</p>
            <p className="text-[10px] text-gray-500">60-second water revival</p>
          </button>

          <button
            onClick={() => playEffect("sparkle", "Mbombela Baddie Certified! All eyes on you!")}
            className="p-4 rounded-2xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-left transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-pink-200 text-pink-800 flex items-center justify-center mb-2">
              <Heart className="w-4 h-4" />
            </div>
            <p className="text-xs font-black text-[#2B172A]">Crown Roar</p>
            <p className="text-[10px] text-gray-500">Riverside Queen mood</p>
          </button>
        </div>

        <div className="mt-5 text-center">
          <p className="text-[11px] text-gray-400">
            Powered by Web Audio API • 100% Nelspruit Mane Energy 👑
          </p>
        </div>

      </div>
    </div>
  );
}
