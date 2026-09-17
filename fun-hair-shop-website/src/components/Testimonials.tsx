"use client";

import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/Motion";
import type { Testimonial } from "@/lib/types";

function Card({ t, tilt }: { t: Testimonial; tilt: number }) {
  return (
    <figure
      className="mx-3 w-[300px] shrink-0 rounded-3xl border-2 border-ink bg-cream p-5 shadow-[5px_5px_0_#2b1226] transition-transform duration-300 hover:!rotate-0 hover:-translate-y-1 md:w-[340px]"
      style={{ rotate: `${tilt}deg` }}
    >
      <div className="flex items-center justify-between">
        <span className="flex text-butter">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-butter text-ink" strokeWidth={1.2} />
          ))}
        </span>
        <Quote className="size-5 text-punch" strokeWidth={2.4} />
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-ink/80">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 border-t-2 border-dashed border-ink/15 pt-3">
        <p className="font-display text-sm font-extrabold uppercase">{t.author}</p>
        <p className="text-xs text-ink/50">
          {t.from} · <span className="font-hand text-base text-punch">{t.style}</span>
        </p>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const half = Math.ceil(testimonials.length / 2);
  const rows = [testimonials.slice(0, half), testimonials.slice(half)];

  return (
    <section id="reviews" className="relative scroll-mt-24 overflow-hidden bg-punch py-20 md:py-28">
      <p
        aria-hidden
        className="text-outline pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[22vw] font-extrabold uppercase leading-none opacity-60"
      >
        RECEIPTS RECEIPTS
      </p>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-hand text-2xl text-butter md:text-3xl">
                don&apos;t believe us, believe the girlies
              </p>
              <h2 className="mt-1 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-cream md:text-7xl">
                The{" "}
                <span className="font-serif-accent lowercase italic font-normal text-butter">
                  receipts
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-cream/80 md:text-base">
              Real words from real heads across KaNyamazane, White River, Hazyview
              and the CBD. Names shortened because some of these stories involve exes.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-12 space-y-6">
        {rows.map((row, ri) => (
          <div key={ri} className="overflow-hidden">
            <div
              className={`flex w-max py-3 ${ri === 0 ? "animate-marquee" : "animate-marquee-rev"}`}
              style={{ animationDuration: ri === 0 ? "52s" : "60s" }}
            >
              {[0, 1].map((dup) => (
                <div key={dup} className="flex" aria-hidden={dup === 1}>
                  {[...row, ...row].map((t, i) => (
                    <Card key={`${dup}-${i}`} t={t} tilt={i % 2 === 0 ? -1.2 : 1.2} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
