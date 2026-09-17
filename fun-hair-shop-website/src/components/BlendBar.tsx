"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Info, Wand2 } from "lucide-react";
import { useCart } from "@/components/Cart";
import { Reveal } from "@/components/Motion";
import { formatRand } from "@/lib/format";
import type { Product } from "@/lib/types";

const LEVELS: { max: number; label: string; sub: string }[] = [
  { max: 12, label: "Soft launch", sub: "cute, low drama, big impact" },
  { max: 16, label: "Errands, but make it fashion", sub: "groceries? darling, please" },
  { max: 20, label: "Main character", sub: "the weekly shop becomes a runway" },
  { max: 24, label: "Certified content", sub: "your TikTok just levelled up" },
  { max: 30, label: "FULL MERMAID", sub: "crossing the street takes 4 minutes now" },
];

export function BlendBar({ products }: { products: Product[] }) {
  const { addItem } = useCart();
  const bundles = products.filter((p) => p.category === "bundles" && p.slug !== "mswenko-set");
  const lace = products.filter((p) => p.category === "lace");

  const [texture, setTexture] = useState(bundles[0]?.slug ?? "");
  const [lenIdx, setLenIdx] = useState(2);
  const [lacePick, setLacePick] = useState<string>("none");

  const current = bundles.find((b) => b.slug === texture) ?? bundles[0];
  const options = current?.options ?? [];

  const { bundleCount, unit, laceItem, level, total } = useMemo(() => {
    const option = options[Math.min(lenIdx, options.length - 1)];
    const inches = parseInt(option.label, 10) || 12;
    const count = inches >= 18 ? 3 : 2;
    const lc =
      lacePick === "none" ? null : (lace.find((l) => l.slug === lacePick) ?? null);
    const lacePrice = lc ? lc.options[0].price : 0;
    const lvl =
      LEVELS.find((l) => inches <= l.max) ?? LEVELS[LEVELS.length - 1];
    return {
      bundleCount: count,
      unit: option,
      laceItem: lc,
      level: lvl,
      total: option.price * count + lacePrice,
    };
  }, [options, lenIdx, lacePick, lace]);

  if (!current) return null;

  const inches = parseInt(unit.label, 10) || 12;

  const buildIt = () => {
    for (let i = 0; i < bundleCount; i++) {
      addItem({
        productId: current.id,
        name: `${current.name} bundle`,
        option: unit.label,
        price: unit.price,
        image: current.image,
      });
    }
    if (laceItem) {
      addItem({
        productId: laceItem.id,
        name: laceItem.name,
        option: laceItem.options[0].label,
        price: laceItem.options[0].price,
        image: laceItem.image,
      });
    }
  };

  return (
    <section id="blendbar" className="relative scroll-mt-24 overflow-hidden bg-butter py-20 md:py-28">
      <svg
        viewBox="0 0 1440 700"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        aria-hidden
      >
        <path d="M-40 500 Q 300 380 640 500 T 1500 460" stroke="#2b1226" strokeWidth="2.5" className="strand" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="font-hand text-2xl text-punch md:text-3xl">
            too many choices? let the machine decide your hair destiny
          </p>
          <h2 className="mt-1 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
            The{" "}
            <span className="font-serif-accent lowercase italic font-normal text-punch">
              Blend-O-Meter
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* controls */}
          <Reveal delay={0.08}>
            <div className="sticker rounded-3xl bg-cream p-6 md:p-8">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-ink/40">
                Step 1 — pick your texture
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {bundles.map((b) => (
                  <button
                    key={b.slug}
                    onClick={() => {
                      setTexture(b.slug);
                      setLenIdx(2);
                    }}
                    className={`rounded-2xl border-2 px-2 py-3 text-center transition-all ${
                      texture === b.slug
                        ? "border-ink bg-ink text-cream shadow-[3px_3px_0_#ff4d6d]"
                        : "border-ink/15 bg-white hover:border-ink"
                    }`}
                  >
                    <div className="mx-auto mb-2 size-12 overflow-hidden rounded-full border-2 border-ink/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.image} alt={b.name} className="h-full w-full object-cover" />
                    </div>
                    <p className="font-display text-[11px] font-extrabold uppercase leading-tight">
                      {b.name}
                    </p>
                  </button>
                ))}
              </div>

              <p className="mt-7 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-ink/40">
                Step 2 — how far should she fall?
              </p>
              <div className="mt-4">
                <div className="flex items-end justify-between">
                  <p className="font-display text-6xl font-extrabold leading-none tracking-tight">
                    {unit.label.replace(/"/g, "″")}
                  </p>
                  <p className="text-right font-hand text-2xl leading-none text-punch">
                    {bundleCount} bundles
                    <br />
                    recommended
                  </p>
                </div>
                <input
                  type="range"
                  min={0}
                  max={options.length - 1}
                  step={1}
                  value={Math.min(lenIdx, options.length - 1)}
                  onChange={(e) => setLenIdx(Number(e.target.value))}
                  aria-label="Hair length"
                  className="mt-4 h-3 w-full cursor-pointer appearance-none rounded-full border-2 border-ink bg-white accent-punch
                    [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-punch [&::-webkit-slider-thumb]:shadow-[3px_3px_0_#2b1226]"
                />
                <div className="mt-2 flex justify-between text-[10px] font-bold uppercase tracking-wide text-ink/40">
                  {options.map((o, i) => (
                    <span key={o.label} className={i === Math.min(lenIdx, options.length - 1) ? "text-ink" : ""}>
                      {o.label}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-7 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-ink/40">
                Step 3 — lace it or leave it
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { slug: "none", name: "Just bundles", hint: "old school" },
                  ...lace.map((l) => ({
                    slug: l.slug,
                    name: l.name.replace("HD Lace ", ""),
                    hint: `+${formatRand(l.options[0].price)}`,
                  })),
                ].map((l) => (
                  <button
                    key={l.slug}
                    onClick={() => setLacePick(l.slug)}
                    className={`rounded-2xl border-2 px-2 py-3 font-display text-[11px] font-extrabold uppercase leading-tight transition-all ${
                      lacePick === l.slug
                        ? "border-ink bg-ink text-cream shadow-[3px_3px_0_#ff4d6d]"
                        : "border-ink/15 bg-white hover:border-ink"
                    }`}
                  >
                    {l.name}
                    <span className={`block text-[10px] font-bold normal-case ${lacePick === l.slug ? "text-cream/60" : "text-ink/40"}`}>
                      {l.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* readout */}
          <Reveal delay={0.16}>
            <div className="relative flex h-full flex-col rounded-3xl border-2 border-ink bg-plum p-6 text-cream shadow-[7px_7px_0_#2b1226] md:p-8">
              <div className="absolute right-5 top-5 -rotate-6 rounded-full border-2 border-cream bg-punch px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-wider text-cream">
                live readout
              </div>
              <div className="flex items-center gap-3 text-butter">
                <Crown className="size-6" strokeWidth={2.2} />
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-cream/50">
                  crown level reached
                </p>
              </div>
              <motion.p
                key={level.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl"
              >
                {level.label}
              </motion.p>
              <p className="mt-2 font-hand text-2xl text-blush">{level.sub}</p>

              <div className="mt-6 space-y-2.5 border-t border-cream/15 pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-cream/70">
                    {bundleCount}× {current.name} — {unit.label}
                  </span>
                  <span className="font-bold">{formatRand(unit.price * bundleCount)}</span>
                </div>
                {laceItem && (
                  <div className="flex justify-between">
                    <span className="text-cream/70">
                      1× {laceItem.name} — {laceItem.options[0].label}
                    </span>
                    <span className="font-bold">{formatRand(laceItem.options[0].price)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 pt-1 text-xs text-cream/50">
                  <Info className="size-3.5" />
                  lace takes a {inches <= 14 ? "12" : "14"}″ recommended by the machine
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex items-end justify-between">
                  <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-cream/50">
                    your total
                  </p>
                  <motion.p
                    key={total}
                    initial={{ scale: 1.15, color: "#ffd23f" }}
                    animate={{ scale: 1, color: "#fff6ec" }}
                    className="font-display text-5xl font-extrabold tracking-tight md:text-6xl"
                  >
                    {formatRand(total)}
                  </motion.p>
                </div>
                <button
                  onClick={buildIt}
                  className="sticker mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-butter py-4 font-display text-base font-extrabold uppercase tracking-wide text-ink"
                >
                  <Wand2 className="size-5" strokeWidth={2.4} />
                  Build my crown
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-cream/50">
                  <Check className="size-3.5" /> adds everything to your crown bag
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
