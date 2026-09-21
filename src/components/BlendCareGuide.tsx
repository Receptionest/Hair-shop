"use client";

import { useState } from "react";
import { ShieldCheck, Flame, Droplets, Moon, Check, Sparkles, AlertCircle } from "lucide-react";
import { soundFX } from "@/utils/audio";

export default function BlendCareGuide() {
  const [activeTab, setActiveTab] = useState<"heat" | "wash" | "curls" | "night">("heat");

  return (
    <section id="care-guide" className="py-16 sm:py-20 bg-white border-t border-[#F5E6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Lowveld Longevity Secrets
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-[#2B172A] tracking-tight">
            The Human Hair Blend Masterclass
          </h2>
          <p className="text-xs sm:text-sm text-[#6A4963] mt-2">
            Follow these 4 simple steps to keep your Mane Tropics blend bouncy, silky, and tangle-free for up to 14 months in Nelspruit!
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 border border-gray-200 max-w-full overflow-x-auto scrollbar-none">
            {[
              { id: "heat", label: "🔥 Heat Styling Guide", icon: Flame },
              { id: "curls", label: "💧 60-Sec Curl Revival", icon: Droplets },
              { id: "wash", label: "🧼 Wash & Conditioner Routine", icon: ShieldCheck },
              { id: "night", label: "🌙 Night Sleep Protection", icon: Moon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundFX.playPop();
                  setActiveTab(tab.id as "heat" | "wash" | "curls" | "night");
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-white text-[#2B172A] shadow-md border border-gray-200"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          
          {/* Heat Tab */}
          {activeTab === "heat" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#2B172A]">Safe Flat Ironing & Tonging Temperatures</h3>
                  <p className="text-xs text-gray-500">Engineered with high-temperature protein silk + virgin human cuticle fibers.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-gray-200">
                  <p className="text-sm font-black text-emerald-600">140°C - 160°C</p>
                  <p className="text-xs font-bold text-gray-800 mt-1">Gentle Restyle & Touch-ups</p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Perfect for smoothing out flyaways and touching up fringe or baby hairs in the morning.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-orange-200 shadow-sm">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-black text-orange-600">170°C - 190°C</p>
                    <span className="text-[9px] font-bold bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">Optimal</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 mt-1">Silk Press & Curling Wand</p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Delivers razor-sharp bone straight silk presses or tight Hollywood barrel waves with long hold.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-red-200">
                  <p className="text-sm font-black text-rose-600">200°C (MAX LIMIT)</p>
                  <p className="text-xs font-bold text-gray-800 mt-1">Never Exceed 200°C</p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Always apply heat protectant spray beforehand. Avoid staying in one spot for longer than 4 seconds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Curls Tab */}
          {activeTab === "curls" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#2B172A]">The 60-Second Lowveld Curl Revival Trick</h3>
                  <p className="text-xs text-gray-500">Bring juicy curls back to life before heading to work or a weekend groove.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs space-y-2">
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center">1</span>
                  <p className="font-bold text-gray-900">Spritz with Lukewarm Water</p>
                  <p className="text-gray-500 text-[11px]">
                    Use a continuous mist spray bottle filled with 80% water and 20% leave-in conditioner.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs space-y-2">
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center">2</span>
                  <p className="font-bold text-gray-900">Finger-Detangle & Scrunch</p>
                  <p className="text-gray-500 text-[11px]">
                    Gently rake fingers through from tips up towards roots. Scrunch curls upward to activate wave memory.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs space-y-2">
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center">3</span>
                  <p className="font-bold text-gray-900">Apply Curl Mousse & Air Dry</p>
                  <p className="text-gray-500 text-[11px]">
                    Pump 2 dollops of alcohol-free mousse and let air dry for 10 minutes. Zero crunch, glossy bounce!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Wash Tab */}
          {activeTab === "wash" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#2B172A]">Washing Your Human Hair Blend Unit</h3>
                  <p className="text-xs text-gray-500">Wash once every 2 to 3 weeks or when styling build-up occurs.</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-gray-700">
                <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fill basin with cool to lukewarm water:</strong> Never use scalding hot water as it can weaken the lace knots.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Use Sulfate-Free Shampoo:</strong> Swish the hair gently in downward motions. Never rub or scrub bundles together aggressively.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Deep Condition for 15 minutes:</strong> Coat ends in rich moisturizing conditioner or argan oil mask.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Air-Dry on Wig Stand:</strong> Pat gently with a microfiber towel (never wring dry) and let dry naturally in a cool room.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Night Tab */}
          {activeTab === "night" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#2B172A]">Night Care & Sleep Protection</h3>
                  <p className="text-xs text-gray-500">Prevent friction tangling and preserve your lace melt while you sleep.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-purple-200 space-y-2">
                  <p className="font-bold text-purple-900">For Glueless Installed Units:</p>
                  <p className="text-gray-600 leading-relaxed">
                    Tie your edges with an elastic satin melt band to prevent slipping. Braid hair into 2 loose plaits, then tuck into an extra-large satin bonnet.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-purple-200 space-y-2">
                  <p className="font-bold text-purple-900">For Daily Wear Queens:</p>
                  <p className="text-gray-600 leading-relaxed">
                    The easiest option! Take the unit off before bed (takes 10 seconds), brush out gently with a loop paddle brush, and store on a mannequin head or inside our silk storage bag.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
