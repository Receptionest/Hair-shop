"use client";

import {
  CalendarClock,
  Flame,
  RotateCcw,
  Scissors,
  Truck,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/Motion";

const PERKS = [
  {
    icon: Zap,
    title: "Same-day CBD pickup",
    copy: "Order before 15:00, collect by knock-off. Your Friday plans are officially secured.",
    bg: "#FFD23F",
    rotate: "-rotate-1",
  },
  {
    icon: CalendarClock,
    title: "Lay-bye, baby",
    copy: "20% deposit holds your hair for 30 days. Payday problems solved — no judgement, just patience.",
    bg: "#C9B6FF",
    rotate: "rotate-1",
  },
  {
    icon: Scissors,
    title: "Install bar upstairs",
    copy: "Our stylists melt lace Thu–Sat from R150. Walk in, float out, take zero prisoners.",
    bg: "#9BF0C0",
    rotate: "-rotate-1",
  },
  {
    icon: Flame,
    title: "Burn-tested blends",
    copy: "Every batch passes the lighter test. If it smells like plastic, it never reaches the shelf. Simple.",
    bg: "#FFB3C7",
    rotate: "rotate-1",
  },
  {
    icon: Truck,
    title: "Delivery that delivers",
    copy: "Free in Mbombela over R800. PAXI countrywide from R60 — KaNyamazane to Kuruman, we got you.",
    bg: "#A8D8FF",
    rotate: "-rotate-1",
  },
  {
    icon: RotateCcw,
    title: "7-day swagger back",
    copy: "Unworn, lace intact, receipts kept? Swap it or refund it. We want you obsessed, not obligated.",
    bg: "#FFD9B8",
    rotate: "rotate-1",
  },
];

export function Perks() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-hand text-2xl text-punch md:text-3xl">
                more than a shop — a full hair ministry
              </p>
              <h2 className="mt-1 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
                Good{" "}
                <span className="font-serif-accent lowercase italic font-normal text-tangerine">
                  manners,
                </span>
                <br />
                included free
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink/60 md:text-base">
              Six reasons the whole of Nelspruit keeps showing up at our door —
              and it&apos;s not just the aircon (it&apos;s 38° out there, we understand).
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((perk, i) => (
            <Reveal key={perk.title} delay={(i % 3) * 0.08}>
              <div
                className={`group h-full rounded-3xl border-2 border-ink p-6 shadow-[6px_6px_0_#2b1226] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[9px_9px_0_#2b1226] ${perk.rotate}`}
                style={{ backgroundColor: perk.bg }}
              >
                <div className="flex size-13 items-center justify-center rounded-2xl border-2 border-ink bg-cream transition-transform duration-300 group-hover:-rotate-12">
                  <perk.icon className="size-6" strokeWidth={2.2} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight">
                  {perk.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{perk.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="grid gap-px overflow-hidden rounded-3xl border-2 border-ink bg-ink sm:grid-cols-3">
            {[
              { big: "2,300+", small: "crowns crowned since 2019" },
              { big: "38 min", small: "record: order to on-head" },
              { big: "0", small: "plastic-hair days tolerated" },
            ].map((stat) => (
              <div key={stat.big} className="bg-cream-deep px-6 py-7 text-center">
                <p className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                  {stat.big}
                </p>
                <p className="mt-1 font-hand text-xl text-ink/60">{stat.small}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
