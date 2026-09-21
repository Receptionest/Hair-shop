"use client";

import { useState } from "react";
import { Sparkles, X, Check, ArrowRight, ShoppingBag, Heart, ShieldCheck } from "lucide-react";
import { soundFX } from "@/utils/audio";
import confetti from "canvas-confetti";
import { Product, CartItem } from "@/types";

interface HairQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (item: CartItem) => void;
}

export default function HairQuizModal({
  isOpen,
  onClose,
  products,
  onAddToCart,
}: HairQuizModalProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    vibe: "boss",
    routine: "quick",
    length: "midi",
    color: "black",
    name: "",
    phone: "",
  });
  const [result, setResult] = useState<Product | null>(null);

  if (!isOpen) return null;

  const handleNext = async () => {
    soundFX.playPop();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Calculate match
      let matched = products[0];
      if (answers.length === "short" || answers.vibe === "boss") {
        matched = products.find((p) => p.category === "bobs") || products[3];
      } else if (answers.color === "ginger") {
        matched = products.find((p) => p.slug.includes("copper")) || products[2];
      } else if (answers.color === "blonde") {
        matched = products.find((p) => p.slug.includes("piano") || p.slug.includes("honey")) || products[4];
      } else if (answers.routine === "quick" && answers.length === "ponytail") {
        matched = products.find((p) => p.category === "ponytails") || products[7];
      } else {
        matched = products.find((p) => p.slug.includes("wet-and-wavy")) || products[0];
      }

      setResult(matched);
      setStep(5);

      soundFX.playSparkle();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#F472B6", "#FBBF24", "#FB7185", "#C084FC"],
      });

      // Submit lead silently
      try {
        await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: answers.name || "Nelspruit Queen",
            phone: answers.phone || "0700000000",
            vibe: answers.vibe,
            lifestyle: answers.routine,
            length: answers.length,
            texture: answers.color,
          }),
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleAddResultToCart = () => {
    if (!result) return;
    soundFX.playCash();
    onAddToCart({
      id: result.id,
      name: result.name,
      price: result.price,
      quantity: 1,
      length: result.length,
      color: result.colors[0] || "Natural 1B",
      image: result.image,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-orange-200 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step < 5 ? (
          <div>
            {/* Step Progress */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    i <= step ? "bg-gradient-to-r from-rose-500 to-amber-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Question {step} of 4
            </div>

            {/* Step 1: Vibe & Lifestyle */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-[#2B172A] font-serif">
                  Where will you be rocking this hair most in Nelspruit?
                </h3>
                <div className="space-y-2.5">
                  {[
                    { id: "boss", title: "Corporate / Office / Government District", desc: "Sleek, polished, no-nonsense executive polish." },
                    { id: "groove", title: "Weekend Amapiano Grooves & Dinners", desc: "Big bouncy volume, turn heads at News Cafe & Kaapsehoop." },
                    { id: "campus", title: "Campus / Busy Lowveld Mom on-the-go", desc: "Zero fuss, humidity proof, 2-minute install." },
                    { id: "glam", title: "Weddings, Birthdays & Photoshoots", desc: "Maximum 30-inch drama, full glam melt." },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, vibe: opt.id })}
                      className={`w-full p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                        answers.vibe === opt.id
                          ? "border-[#E11D48] bg-rose-50/70 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold text-[#2B172A]">{opt.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                      </div>
                      {answers.vibe === opt.id && <Check className="w-5 h-5 text-rose-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Routine Preference */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-[#2B172A] font-serif">
                  What&#39;s your morning hair patience level?
                </h3>
                <div className="space-y-2.5">
                  {[
                    { id: "quick", title: "60 Seconds Flat (Glueless / Ponytail)", desc: "Slip on, adjust strap, walk out the door." },
                    { id: "spritz", title: "2-Minute Water Spritz (Wet & Wavy)", desc: "Quick mist with water & curl mousse for instant bounce." },
                    { id: "style", title: "I Love Styling with Heat", desc: "Flat irons, curling tongs, sleek side parts." },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, routine: opt.id })}
                      className={`w-full p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                        answers.routine === opt.id
                          ? "border-[#E11D48] bg-rose-50/70 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold text-[#2B172A]">{opt.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                      </div>
                      {answers.routine === opt.id && <Check className="w-5 h-5 text-rose-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Length Preference */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-[#2B172A] font-serif">
                  Choose your power length:
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "short", title: "10\" - 12\" Bob", sub: "Chic & sharp" },
                    { id: "midi", title: "20\" - 24\" Mid-Back", sub: "Most popular" },
                    { id: "long", title: "28\" - 32\" Waist Length", sub: "Pure drama" },
                    { id: "ponytail", title: "26\" Instant Ponytail", sub: "Grab & go" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, length: opt.id })}
                      className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        answers.length === opt.id
                          ? "border-amber-500 bg-amber-50/80 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                      }`}
                    >
                      <p className="text-sm font-black text-[#2B172A]">{opt.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{opt.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Color & Contact */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-[#2B172A] font-serif">
                  Pick your favorite color tone:
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "black", label: "Natural 1B Jet Black" },
                    { id: "ginger", label: "Sunset Copper #350" },
                    { id: "blonde", label: "Honey Piano #4/27" },
                    { id: "burgundy", label: "Wine Burgundy 99J" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswers({ ...answers, color: opt.id })}
                      className={`p-3 rounded-2xl text-left border-2 text-xs font-bold transition-all cursor-pointer ${
                        answers.color === opt.id
                          ? "border-rose-500 bg-rose-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Name (for your personalized coupon):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nandi"
                    value={answers.name}
                    onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>
            )}

            {/* Next / Submit Button */}
            <div className="mt-6 flex justify-between items-center">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-xs font-semibold text-gray-500 hover:text-black cursor-pointer"
                >
                  ← Back
                </button>
              ) : <div />}
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-2xl sunset-gradient text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{step === 4 ? "Reveal My Blend Soulmate 🎉" : "Continue"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Step 5: Result Card with Confetti */
          result && (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                  Your Blend Soulmate Match 👑
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#2B172A] mt-2 font-serif">
                  {result.name}
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto mt-1">
                  Engineered for your lifestyle! Heat safe, glueless, and humidity proof in Nelspruit.
                </p>
              </div>

              {/* Product preview */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-orange-200 max-w-xs mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm">
                  R{result.price}
                </div>
              </div>

              {/* Coupon Box */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 max-w-xs mx-auto">
                <p className="text-[11px] font-bold text-amber-900">Your Exclusive Nelspruit Code:</p>
                <p className="text-base font-black font-mono text-amber-700 tracking-wider">
                  NELSPRUITBADDIE
                </p>
                <p className="text-[10px] text-amber-800">10% OFF at checkout + Free Sonpark Pickup</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2 max-w-xs mx-auto">
                <button
                  onClick={handleAddResultToCart}
                  className="w-full py-3.5 rounded-2xl sunset-gradient text-white font-black text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-200" />
                  Claim My Match (R{result.price})
                </button>
                <button
                  onClick={onClose}
                  className="text-xs text-gray-500 hover:text-black font-medium py-1 cursor-pointer"
                >
                  Keep browsing other drops
                </button>
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}
