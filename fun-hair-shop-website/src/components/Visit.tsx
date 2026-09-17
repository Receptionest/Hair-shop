"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { WHATSAPP_NUMBER } from "@/lib/format";

const HOURS = [
  { day: "Mon – Fri", time: "08:30 – 18:00" },
  { day: "Saturday", time: "08:00 – 17:00" },
  { day: "Sunday", time: "09:00 – 14:00" },
  { day: "Pension day", time: "Open early, sharp" },
];

export function Visit() {
  return (
    <section id="visit" className="relative scroll-mt-24 overflow-hidden bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="font-hand text-2xl text-punch md:text-3xl">
            next to the taxi rank, past the braai smoke, listen for the laughter
          </p>
          <h2 className="mt-1 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
            Come touch{" "}
            <span className="font-serif-accent lowercase italic font-normal text-punch">
              the hair
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal delay={0.08}>
            <motion.div
              whileHover={{ rotate: -1.5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="relative mx-auto max-w-xl lg:max-w-none"
            >
              <div className="rotate-1 rounded-3xl border-2 border-ink bg-white p-3 pb-5 shadow-[8px_8px_0_#2b1226]">
                <div className="overflow-hidden rounded-2xl border-2 border-ink/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/store.jpg"
                    alt="Inside the Hairapy shop in Nelspruit CBD"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-center font-hand text-2xl text-ink/70">
                  the shop, looking like a snack (as always)
                </p>
              </div>
              <span className="absolute -right-3 -top-4 rotate-12 rounded-2xl border-2 border-ink bg-butter px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wider shadow-[4px_4px_0_#2b1226]">
                Est. 2019
              </span>
            </motion.div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.12}>
              <div className="sticker rounded-3xl bg-white p-6">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-punch text-cream">
                    <MapPin className="size-6" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-extrabold uppercase">
                      Nelcity Centre, Shop 7
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">
                      20 Bester Street, Nelspruit CBD, 1200 — upstairs from the
                      beauty supply with the green awning. If you hit Paul Kruger
                      Street, turn around, gorgeous.
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=20+Bester+Street+Nelspruit+CBD"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-extrabold uppercase tracking-wide text-punch underline decoration-2 underline-offset-4 hover:text-ink"
                    >
                      <Navigation className="size-4" strokeWidth={2.4} />
                      Get directions
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="sticker rounded-3xl bg-butter p-6">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-white">
                    <Clock className="size-6" strokeWidth={2.2} />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-extrabold uppercase">
                      When to pull up
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {HOURS.map((h) => (
                        <li key={h.day} className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="font-bold">{h.day}</span>
                          <span className="flex-1 border-b-2 border-dotted border-ink/25" />
                          <span className="font-medium text-ink/70">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="sticker flex items-center gap-4 rounded-3xl bg-ink p-6 text-cream">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-cream bg-mint text-ink">
                  <Phone className="size-6" strokeWidth={2.2} />
                </span>
                <div className="flex-1">
                  <p className="font-display text-lg font-extrabold uppercase">Ring or WhatsApp</p>
                  <p className="text-sm text-cream/60">082 336 1947 — we reply fast, like F1 fast</p>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Howzit! Quick question from the website.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sticker-light shrink-0 rounded-full bg-mint px-4 py-2.5 font-display text-xs font-extrabold uppercase text-ink"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="size-4" strokeWidth={2.4} />
                    Chat
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
