"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle, Sparkles, Star } from "lucide-react";
import { AnimatedWords } from "@/components/Motion";
import { SpinningBadge, Ticker } from "@/components/Ticker";
import { WHATSAPP_NUMBER } from "@/lib/format";

export function Hero() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 600], [0, 90]);
  const ySticker = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <header id="top" className="relative overflow-hidden bg-cream pt-24 md:pt-28">
      {/* background squiggles */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
        aria-hidden
      >
        <path
          d="M-40 140 Q 230 60 460 160 T 940 140 T 1500 200"
          stroke="var(--color-punch)"
          strokeWidth="2.5"
          className="strand"
        />
        <path
          d="M-40 780 Q 300 700 560 800 T 1060 760 T 1500 830"
          stroke="var(--color-tangerine)"
          strokeWidth="2.5"
          className="strand"
        />
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-6 lg:pb-24">
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, rotate: -6, y: 10 }}
            animate={{ opacity: 1, rotate: -3, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-4 inline-block font-hand text-2xl text-punch md:text-3xl"
          >
            howzit, gorgeous — welcome to nelspruit&apos;s crown supplier
          </motion.p>

          <h1 className="font-display text-[15.5vw] font-extrabold uppercase leading-[0.88] tracking-tight sm:text-[11vw] lg:text-[6.6rem] xl:text-[7.6rem]">
            <AnimatedWords
              words={[
                { text: "Good" },
                { text: "hair.", className: "text-punch" },
              ]}
              className="flex flex-wrap gap-x-[0.22em]"
            />
            <AnimatedWords
              words={[
                { text: "Great" },
                {
                  text: "day.",
                  className: "font-serif-accent italic normal-case font-normal text-tangerine",
                },
              ]}
              className="flex flex-wrap gap-x-[0.22em]"
            />
            <AnimatedWords
              words={[{ text: "Every day." }]}
              className="flex flex-wrap gap-x-[0.22em]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg"
          >
            100% human hair blends, glueless wigs and HD lace that melts —
            without the Sandton markup. Burn-tested, tangle-tested,
            tjommie-approved. Lay-bye welcome, egos not required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#shop"
              className="sticker group flex items-center gap-2 rounded-full bg-punch px-7 py-4 font-display text-base font-extrabold uppercase tracking-wide text-cream"
            >
              Shop the blends
              <ArrowDown className="size-5 transition-transform group-hover:translate-y-1" strokeWidth={2.6} />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Howzit Hairapy! I need crown guidance please.")}`}
              target="_blank"
              rel="noreferrer"
              className="sticker flex items-center gap-2 rounded-full bg-cream px-7 py-4 font-display text-base font-extrabold uppercase tracking-wide"
            >
              <MessageCircle className="size-5" strokeWidth={2.6} />
              WhatsApp us
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex items-center gap-3"
          >
            <span className="flex text-butter drop-shadow-[1px_1px_0_#2b1226]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-butter text-ink" strokeWidth={1.4} />
              ))}
            </span>
            <p className="text-sm font-semibold text-ink/70">
              4.9 from 2,300+ crowns across Mbombela
            </p>
          </motion.div>
        </div>

        {/* image cluster */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.25 }}
            style={{ y: yImage }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-t-full rounded-b-[36px] bg-ink" aria-hidden />
            <div className="relative overflow-hidden rounded-t-full rounded-b-3xl border-2 border-ink">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero.jpg"
                alt="Model wearing long glossy human hair blend from Hairapy Nelspruit"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-deep/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <p className="rounded-full border-2 border-cream bg-cream px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-widest text-ink">
                  the mswenko set
                </p>
                <p className="rounded-full border-2 border-cream bg-punch px-3 py-1.5 font-display text-xs font-extrabold uppercase text-cream">
                  from R1,899
                </p>
              </div>
            </div>

            <SpinningBadge className="absolute -right-6 -top-8 size-28 text-ink drop-shadow-[3px_3px_0_rgba(255,214,63,0.9)] md:-right-10 md:size-36" />

            <motion.div
              style={{ y: ySticker }}
              className="animate-wiggle absolute -left-4 bottom-24 hidden rounded-2xl border-2 border-ink bg-butter px-4 py-2 shadow-[4px_4px_0_#2b1226] md:block"
            >
              <p className="font-display text-sm font-extrabold uppercase">Bundles from R480</p>
              <p className="font-hand text-lg leading-none text-ink/60">yes, really</p>
            </motion.div>

            <div
              className="animate-float absolute -left-8 top-16 hidden -rotate-6 md:block"
              style={{ "--r": "-6deg" } as React.CSSProperties}
            >
              <span className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-mint px-3.5 py-1.5 font-display text-xs font-extrabold uppercase tracking-wide shadow-[3px_3px_0_#2b1226]">
                <Sparkles className="size-3.5" strokeWidth={2.6} />
                lay-bye friendly
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <Ticker
        items={[
          "Bundles",
          "Glueless wigs",
          "HD lace frontals",
          "Closures",
          "Same-day CBD pickup",
          "Lay-bye accepted",
          "Free delivery over R800",
        ]}
        className="relative z-10 -rotate-1 scale-[1.02] bg-butter text-ink shadow-[0_4px_0_#2b1226]"
        fast
      />
    </header>
  );
}
