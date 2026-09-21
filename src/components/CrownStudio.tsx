"use client";

import { useState } from "react";
import { Scissors, Sparkles, Check, ShoppingBag, ShieldCheck, Heart, Eye } from "lucide-react";
import { soundFX } from "@/utils/audio";
import confetti from "canvas-confetti";
import { CartItem } from "@/types";

interface CrownStudioProps {
  onAddToCart: (item: CartItem) => void;
}

const textures = [
  { id: "water-wave", label: "Juicy Water Wave", badge: "Nelspruit Best Seller", preview: "/images/hero-hair-baddie.jpg" },
  { id: "bone-straight", label: "Mbombela Bone Straight", badge: "Glass Sheen", preview: "https://images.pexels.com/photos/28801608/pexels-photo-28801608.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" },
  { id: "copper-ginger", label: "Sunset Copper #350", badge: "Trend Alert", preview: "/images/hair-ginger-curly.jpg" },
  { id: "honey-piano", label: "Honey Blonde #4/27", badge: "Dimensional Glow", preview: "/images/hair-highlight-wave.jpg" },
  { id: "blunt-bob", label: "10\" Blunt Cut Bob", badge: "Corporate Slay", preview: "/images/hair-bob-pixie.jpg" },
];

const lengths = [
  { inch: 14, label: "14 Inch", drop: "Collarbone", priceAdd: 0 },
  { inch: 18, label: "18 Inch", drop: "Armpit", priceAdd: 80 },
  { inch: 22, label: "22 Inch", drop: "Mid-back", priceAdd: 160 },
  { inch: 26, label: "26 Inch", drop: "Waist length", priceAdd: 240 },
  { inch: 30, label: "30 Inch", drop: "Hip length", priceAdd: 320 },
  { inch: 34, label: "34 Inch", drop: "Baddie Extravaganza", priceAdd: 420 },
];

const capStyles = [
  { id: "glueless-5x5", label: "5x5 HD Glueless Closure", desc: "No glue needed, pre-plucked baby hairs", priceAdd: 0 },
  { id: "frontal-13x4", label: "13x4 HD Transparent Frontal", desc: "Ear-to-ear styling freedom & side parts", priceAdd: 120 },
  { id: "ponytail-wrap", label: "Drawstring Wrap Ponytail", desc: "Installs in 2 minutes flat", priceAdd: -250 },
  { id: "bundles-pack", label: "3-Bundle Weave Pack", desc: "3x 100g bundles for sew-in or custom unit", priceAdd: -100 },
];

const densities = [
  { id: "150", label: "150% Density", desc: "Natural Everyday" },
  { id: "180", label: "180% Density", desc: "Salon Standard (Most Popular)", extra: 80 },
  { id: "250", label: "250% Mega Full", desc: "Maximum Baddie Glam", extra: 160 },
];

export default function CrownStudio({ onAddToCart }: CrownStudioProps) {
  const [selectedTexture, setSelectedTexture] = useState(textures[0]);
  const [selectedLength, setSelectedLength] = useState(lengths[3]); // 26"
  const [selectedCap, setSelectedCap] = useState(capStyles[0]);
  const [selectedDensity, setSelectedDensity] = useState(densities[1]); // 180%
  const [selectedColor, setSelectedColor] = useState("Natural 1B Jet Black");

  // Calculate live dynamic price
  const basePrice = 650;
  const totalPrice = Math.max(350, basePrice + selectedLength.priceAdd + selectedCap.priceAdd + (selectedDensity.extra || 0));

  const handleAddCustomUnit = () => {
    soundFX.playCash();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#F59E0B", "#EC4899", "#8B5CF6"],
    });

    onAddToCart({
      id: 9999 + Math.floor(Math.random() * 1000),
      name: `Custom Crown: ${selectedTexture.label} (${selectedCap.label})`,
      price: totalPrice,
      quantity: 1,
      length: `${selectedLength.label} (${selectedLength.drop})`,
      color: `${selectedColor} • ${selectedDensity.label}`,
      image: selectedTexture.preview,
    });
  };

  return (
    <section id="crown-customizer" className="py-16 sm:py-20 bg-gradient-to-b from-[#FFF5EE] via-[#FAF7F5] to-[#FFF5EE] border-t border-[#F5E6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 border border-pink-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Scissors className="w-3.5 h-3.5 text-pink-600" />
            Nelspruit Interactive Studio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-[#2B172A]">
            Customize Your Dream Nelspruit Crown
          </h2>
          <p className="mt-3 text-[#6A4862] text-sm sm:text-base">
            Select your preferred texture, inch length, cap style, and density. Watch the price update live in Rands (ZAR) with instant Nelspruit fulfillment!
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-orange-100 shadow-xl">
            
            {/* Step 1: Pick Texture */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-[#2B172A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-black flex items-center justify-center">1</span>
                  Choose Texture & Look
                </span>
                <span className="text-xs font-semibold text-rose-600">{selectedTexture.label}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {textures.map((tex) => (
                  <button
                    key={tex.id}
                    onClick={() => {
                      soundFX.playPop();
                      setSelectedTexture(tex);
                    }}
                    className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      selectedTexture.id === tex.id
                        ? "border-[#E11D48] bg-rose-50/70 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-md inline-block mb-1.5">
                        {tex.badge}
                      </span>
                      <p className="text-xs font-bold text-[#2B172A]">{tex.label}</p>
                    </div>
                    {selectedTexture.id === tex.id && (
                      <div className="mt-2 self-end text-rose-600">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pick Inch Length */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-[#2B172A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center">2</span>
                  Select Length
                </span>
                <span className="text-xs font-bold text-amber-700">
                  {selectedLength.label} — <span className="text-gray-500 font-normal">Falls at {selectedLength.drop}</span>
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {lengths.map((len) => (
                  <button
                    key={len.inch}
                    onClick={() => {
                      soundFX.playPop();
                      setSelectedLength(len);
                    }}
                    className={`p-2.5 rounded-2xl text-center border-2 transition-all cursor-pointer ${
                      selectedLength.inch === len.inch
                        ? "border-amber-500 bg-amber-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                    }`}
                  >
                    <p className="text-sm font-black text-[#2B172A]">{len.inch}&quot;</p>
                    <p className="text-[10px] text-gray-500">{len.drop}</p>
                    <p className="text-[10px] font-bold text-amber-600 mt-1">
                      {len.priceAdd === 0 ? "Base" : `+R${len.priceAdd}`}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pick Cap Construction */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-[#2B172A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-black flex items-center justify-center">3</span>
                  Cap Construction & Install Type
                </span>
                <span className="text-xs font-semibold text-purple-700">{selectedCap.label}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {capStyles.map((cap) => (
                  <button
                    key={cap.id}
                    onClick={() => {
                      soundFX.playPop();
                      setSelectedCap(cap);
                    }}
                    className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                      selectedCap.id === cap.id
                        ? "border-purple-600 bg-purple-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-[#2B172A]">{cap.label}</p>
                      <span className="text-[11px] font-bold text-purple-700">
                        {cap.priceAdd > 0 ? `+R${cap.priceAdd}` : cap.priceAdd < 0 ? `-R${Math.abs(cap.priceAdd)}` : "Included"}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">{cap.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Density & Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#2B172A] block mb-2">
                  Fullness / Density:
                </label>
                <div className="space-y-1.5">
                  {densities.map((den) => (
                    <button
                      key={den.id}
                      onClick={() => {
                        soundFX.playPop();
                        setSelectedDensity(den);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedDensity.id === den.id
                          ? "border-rose-500 bg-rose-50/50 text-[#2B172A] font-bold"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{den.label} ({den.desc})</span>
                      {den.extra && <span className="text-[11px] text-rose-600 font-bold">+R{den.extra}</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2B172A] block mb-2">
                  Select Shade:
                </label>
                <div className="space-y-1.5">
                  {["Natural 1B Jet Black", "Honey Blonde Piano #4/27", "Copper Ginger #350", "Wine Burgundy 99J"].map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        soundFX.playPop();
                        setSelectedColor(color);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedColor === color
                          ? "border-amber-500 bg-amber-50 text-[#2B172A] font-bold"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{color}</span>
                      {selectedColor === color && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Crown Preview & Price Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-3xl border-2 border-orange-200 shadow-2xl p-6 sm:p-7 relative overflow-hidden">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Live Custom Unit Summary
              </div>

              {/* Visual preview box */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 border-2 border-orange-100 bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedTexture.preview}
                  alt={selectedTexture.label}
                  className="w-full h-full object-cover object-top transition-all duration-500"
                />

                {/* Overlaid Inch Tag */}
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                  <span>{selectedLength.label}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-amber-300">{selectedLength.drop}</span>
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-gray-200 shadow-sm">
                  {selectedCap.label}
                </div>
              </div>

              {/* Specification checklist */}
              <div className="space-y-2 text-xs text-gray-600 py-3 border-y border-gray-100 mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Texture:</span>
                  <span className="font-bold text-[#2B172A]">{selectedTexture.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Length:</span>
                  <span className="font-bold text-[#2B172A]">{selectedLength.label} ({selectedLength.drop})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Construction:</span>
                  <span className="font-bold text-[#2B172A]">{selectedCap.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Color & Density:</span>
                  <span className="font-bold text-[#2B172A]">{selectedColor} ({selectedDensity.label})</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Nelspruit Pickup / Delivery:</span>
                  <span className="font-bold">Ready in 2 Hours (Sonpark Hub)</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Unit Price</p>
                  <p className="text-3xl sm:text-4xl font-black font-mono text-[#2B172A]">
                    R{totalPrice}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Save ~R3,500 vs virgin hair
                </span>
              </div>

              {/* Add Custom Unit Button */}
              <button
                onClick={handleAddCustomUnit}
                className="w-full py-4 rounded-2xl sunset-gradient text-white font-black text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-amber-200" />
                Add Custom Crown To Bag (R{totalPrice})
              </button>

              <p className="text-[11px] text-center text-gray-500 mt-3">
                🔒 Includes 100% Lowveld heat guarantee & free satin storage bag
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
