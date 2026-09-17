"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Motion";

const FAQS = [
  {
    q: "Is it really human hair?",
    a: "It's a human hair blend: real human hair with a small protective synthetic weave that keeps the price sane and the style locked. You can wash it, curl it, and flat-iron it up to 180°C — but please don't lie to your glam squad about it.",
  },
  {
    q: "How long will it last?",
    a: "With decent care (bonnet at night, serum in the mornings, no sleeping in chlorine pools) our blends serve looks for 12–24 months. Several customers are on year three already — we don't have a lab explanation, just respect.",
  },
  {
    q: "How does lay-bye work?",
    a: "Pop 20% or more down, we tag your hair with your name in the safe-keeping shelf, and you have 30 days to finish paying. Collect on payday, leave looking illegal. Zero interest, zero guilt, zero lizard brain overspending.",
  },
  {
    q: "Do you deliver outside Nelspruit?",
    a: "Yes — PAXI nationwide from R60, or The Courier Guy from R99 if you're in a hurry. Inside Mbombela, orders over R800 ride for free, sometimes with a sweet treat inside the box. Waste is theft.",
  },
  {
    q: "Can I return or swap a unit?",
    a: "You have 7 days if the unit is unworn, lace uncut and tags intact. Your hygiene quality-control officer thanks you. Sale items and cut lace can't go back — that one time at a wedding counts, apologies.",
  },
  {
    q: "Do you install too?",
    a: "Upstairs, Thu–Sat, from R150. Book on WhatsApp or risk the queue — Saturdays are contact sport. Bring your own edge control if your brand power requires the exact tin.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 bg-cream-deep py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="font-hand text-2xl text-punch md:text-3xl">
            the questions we hear between the bonnets
          </p>
          <h2 className="mt-1 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-6xl">
            Cross-examine{" "}
            <span className="font-serif-accent lowercase italic font-normal text-tangerine">
              us
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.04}>
                <div
                  className={`overflow-hidden rounded-3xl border-2 border-ink transition-all duration-300 ${
                    isOpen ? "bg-butter shadow-[6px_6px_0_#2b1226]" : "bg-cream shadow-[4px_4px_0_#2b1226] hover:bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-extrabold uppercase tracking-tight md:text-xl">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-ink ${
                        isOpen ? "bg-punch text-cream" : "bg-white"
                      }`}
                    >
                      <Plus className="size-4" strokeWidth={3} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-ink/75 md:text-base">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
