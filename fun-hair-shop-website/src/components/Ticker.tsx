"use client";

import { Sparkle } from "lucide-react";

export function Ticker({
  items,
  className = "",
  fast = false,
  reverse = false,
}: {
  items: string[];
  className?: string;
  fast?: boolean;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden border-y-2 border-ink ${className}`}>
      <div
        className={`flex w-max items-center gap-6 whitespace-nowrap py-3 pr-6 ${
          reverse
            ? "animate-marquee-rev"
            : fast
              ? "animate-marquee-fast"
              : "animate-marquee"
        }`}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-6" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-6 font-display text-sm font-extrabold uppercase tracking-[0.2em]"
              >
                <Sparkle className="size-4 shrink-0" strokeWidth={2.4} />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Squiggle({
  className = "",
  color = "var(--color-ink)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 40"
      fill="none"
      preserveAspectRatio="none"
      className={`block h-6 w-full md:h-8 ${className}`}
      aria-hidden
    >
      <path
        d="M0 20 Q 60 2, 120 20 T 240 20 T 360 20 T 480 20 T 600 20 T 720 20 T 840 20 T 960 20 T 1080 20 T 1200 20 T 1320 20 T 1440 20"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        className="strand"
      />
    </svg>
  );
}

export function SpinningBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <svg viewBox="0 0 120 120" className="animate-spin-slower size-full">
        <defs>
          <path
            id="badge-circle"
            d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text
          fill="currentColor"
          fontSize="10.5"
          fontWeight="800"
          letterSpacing="2.2"
          style={{ fontFamily: "var(--font-body)", textTransform: "uppercase" }}
        >
          <textPath href="#badge-circle">
            100% HUMAN BLEND • NELSPRUIT&apos;S FINEST •
          </textPath>
        </text>
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2"
        fill="currentColor"
      >
        <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
      </svg>
    </div>
  );
}
