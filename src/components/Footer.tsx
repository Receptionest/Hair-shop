"use client";

import { Camera, AtSign, MessageCircle, Scissors } from "lucide-react";
import { Squiggle, Ticker } from "@/components/Ticker";
import { WHATSAPP_NUMBER } from "@/lib/format";

const SOCIALS = [
  { icon: Camera, label: "Instagram" },
  { icon: AtSign, label: "@hairapy.nelspruit" },
  { icon: MessageCircle, label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-plum-deep text-cream">
      <div className="bg-cream-deep">
        <Squiggle color="var(--color-ink)" />
      </div>

      <Ticker
        items={[
          "Your crown awaits",
          "Nelspruit CBD",
          "Open 7 days",
          "Lay-bye accepted",
          "Free delivery over R800",
        ]}
        reverse
        className="border-ink bg-blush text-ink"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-full border-2 border-cream bg-punch">
                <Scissors className="size-4" strokeWidth={2.4} />
              </span>
              <p className="font-display text-2xl font-extrabold uppercase tracking-tight">
                Hairapy
              </p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              Nelspruit&apos;s therapist for your head. Human hair blends, glueless
              wigs and HD lace — with free advice you didn&apos;t ask for and genuinely
              needed.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={
                    s.label === "WhatsApp"
                      ? `https://wa.me/${WHATSAPP_NUMBER}`
                      : "#top"
                  }
                  target={s.label === "WhatsApp" ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="sticker-light flex size-11 items-center justify-center rounded-full bg-blush text-ink transition hover:-rotate-12"
                >
                  <s.icon className="size-5" strokeWidth={2.2} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-blush">
              Snoop around
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["#shop", "The Shelf"],
                ["#blendbar", "Blend-O-Meter"],
                ["#reviews", "Receipts"],
                ["#visit", "Find Us"],
                ["#faq", "FAQ"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-cream/70 transition hover:text-butter"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-blush">
              The brass tacks
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li>Shop 7, Nelcity Centre</li>
              <li>20 Bester Street, Nelspruit CBD, 1200</li>
              <li>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="transition hover:text-butter">
                  082 336 1947
                </a>
              </li>
              <li>
                <a href="mailto:howzit@hairapy.co.za" className="transition hover:text-butter">
                  howzit@hairapy.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="text-outline pointer-events-none mt-16 select-none text-center font-display text-[19vw] font-extrabold uppercase leading-[0.8] tracking-tight md:text-[13rem]"
        >
          Hairapy
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-cream/15 pt-6 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} Hairapy Nelspruit. All crowns reserved.</p>
          <p className="font-hand text-lg text-cream/50">
            made with love &amp; a little edge control in mbombela
          </p>
        </div>
      </div>
    </footer>
  );
}
