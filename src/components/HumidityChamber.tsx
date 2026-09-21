"use client";

import { useState } from "react";
import { Flame, Droplets, Sun, AlertTriangle, CheckCircle2, XCircle, Sparkles, Zap } from "lucide-react";
import { soundFX } from "@/utils/audio";

export default function HumidityChamber() {
  const [temp, setTemp] = useState<number>(36);
  const [humidity, setHumidity] = useState<number>(85);

  const handleTempChange = (val: number) => {
    setTemp(val);
    if (val >= 38) {
      soundFX.playSizzle();
    }
  };

  const getHeatLevelDescription = () => {
    if (temp < 26) return "Mild Morning in Kaapsehoop / Steiltes";
    if (temp < 32) return "Warm Afternoon at Riverside Mall";
    if (temp < 38) return "True Nelspruit Summer Heat (Braai & Groove)";
    return "Mbombela Scorcher! Extreme Lowveld Humidity!";
  };

  return (
    <section id="humidity-test" className="py-16 bg-[#180E1A] text-white relative overflow-hidden">
      {/* Background glow styling */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            Interactive Lowveld Weather Test
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
            The Blend vs. The Lowveld Heat Chamber
          </h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base">
            Nelspruit humidity doesn&#39;t play. Drag the sliders to test how different hair grades react when the temperature spikes from 20°C to 42°C in Mbombela!
          </p>
        </div>

        {/* Interactive Sliders Board */}
        <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-orange-500/20 shadow-2xl mb-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Slider 1: Temperature */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-orange-300">
                  <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
                  Nelspruit Temperature
                </span>
                <span className="text-2xl font-black font-mono text-orange-400">
                  {temp}°C
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={42}
                value={temp}
                onChange={(e) => handleTempChange(Number(e.target.value))}
                className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>20°C (Pleasant)</span>
                <span>32°C (Typical)</span>
                <span className="text-orange-400 font-bold">42°C (Mbombela Heatwave!)</span>
              </div>
            </div>

            {/* Slider 2: Humidity */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-sky-300">
                  <Droplets className="w-4 h-4 text-sky-400" />
                  Relative Lowveld Humidity
                </span>
                <span className="text-2xl font-black font-mono text-sky-400">
                  {humidity}%
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={98}
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>30% (Dry Berg Wind)</span>
                <span>65% (Normal)</span>
                <span className="text-sky-400 font-bold">98% (Post-Storm Steam)</span>
              </div>
            </div>

          </div>

          {/* Current weather simulation readout */}
          <div className="mt-6 pt-5 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
              <span>Lowveld Condition: <strong className="text-white">{getHeatLevelDescription()}</strong></span>
            </div>
            <button
              onClick={() => {
                soundFX.playSizzle();
                setTemp(40);
                setHumidity(92);
              }}
              className="px-3.5 py-1.5 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3 text-yellow-400" />
              Simulate 40°C Heatwave Test! 🔥
            </button>
          </div>
        </div>

        {/* 3-Column Comparison: Cheap Synthetic vs 100% Virgin vs Mane Tropics Blend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Cheap 100% Synthetic */}
          <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Option A</span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-900/40 text-red-300 border border-red-700/50 text-[11px] font-bold">
                  Cheap Synthetic (R250)
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-200 mb-2">Cheap Toy Fiber Unit</h3>
              <p className="text-xs text-gray-400 mb-4">
                Plastic-based fibers with no natural cuticle coating.
              </p>

              {/* Behavior at current slider settings */}
              <div className="space-y-3 py-3 border-y border-gray-800 text-xs">
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    {temp >= 32
                      ? "Nape clumps into a bird's nest within 45 minutes of walking outside."
                      : "Stiff movement and visible unnatural plastic gloss."}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    {humidity >= 70
                      ? "Fibers trap sweat against scalp; plastic fringe bunches up."
                      : "Can never be flat ironed; melts if exposed to curling tong above 130°C."}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400">Lifespan: 1 to 3 weeks max before binning.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-red-400 font-medium">
              ❌ Verdict: Unwearable in Nelspruit heat.
            </div>
          </div>

          {/* Card 2: Mane Tropics Human Hair Blend (WINNER!) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#381B34] to-[#251224] border-2 border-[#F472B6] shadow-2xl shadow-rose-900/30 flex flex-col justify-between relative transform md:-translate-y-2">
            
            {/* Top winner badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full sunset-gradient text-white text-xs font-black shadow-md flex items-center gap-1 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Lowveld Champion 👑
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="text-xs font-black uppercase text-amber-300 tracking-wider">The Sweet Spot</span>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/50 text-[11px] font-bold">
                  From R599 - R980
                </span>
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                Mane Tropics Human Hair Blend
              </h3>
              <p className="text-xs text-rose-200 mb-4">
                70% Cuticle-Intact Virgin Hair + 30% Heat-Locked Protein Memory Silk.
              </p>

              {/* Behavior at current slider settings */}
              <div className="space-y-3 py-3 border-y border-rose-500/30 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white font-medium">
                    {temp >= 32
                      ? "Curls stay locked! The memory fiber prevents the human hair from collapsing in humidity."
                      : "Liquid silk movement, natural scalp fall, no synthetic shine."}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white font-medium">
                    {humidity >= 70
                      ? "Water spritz immediately revives bounce! Dries soft with zero sticky build-up."
                      : "Heat safe up to 200°C: Flat iron sleek or tong spiral curls."}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-amber-200">
                    Lifespan: 6 to 14 months with basic satin bonnet care.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                ✓ Verified 100% Nelspruit Heat Proof
              </span>
            </div>
          </div>

          {/* Card 3: Overpriced 100% Virgin Hair */}
          <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Option C</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-900/40 text-amber-300 border border-amber-700/50 text-[11px] font-bold">
                  Raw Virgin Hair (R4,500 - R7,000)
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-200 mb-2">100% Raw Virgin Hair</h3>
              <p className="text-xs text-gray-400 mb-4">
                Gorgeous quality, but costs a full month&#39;s flat rent in Nelspruit!
              </p>

              {/* Behavior at current slider settings */}
              <div className="space-y-3 py-3 border-y border-gray-800 text-xs">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    {humidity >= 75
                      ? "Loses curl pattern after 30 minutes in humidity unless coated in heavy wax."
                      : "Looks great, but takes 45 minutes of flat ironing every morning."}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Costs 5x to 7x more. Constant fear of rain or outdoor heat ruining styling.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-400">Can be bleached to #613 blonde.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-amber-300 font-medium">
              ⚠️ Verdict: Great hair, but why burn R5,000 when our blend looks identical?
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
