"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/components/Cart";
import { Reveal } from "@/components/Motion";
import { formatRand, fromPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

const FILTERS = [
  { key: "all", label: "Everything" },
  { key: "bundles", label: "Bundles" },
  { key: "wigs", label: "Wigs" },
  { key: "lace", label: "Frontals & Closures" },
  { key: "care", label: "Care" },
] as const;

export function Shop({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  const visible = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter, products],
  );

  return (
    <section id="shop" className="relative scroll-mt-24 bg-plum py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="font-hand text-2xl text-butter md:text-3xl">
            psst… everything here is burn-tested before it hits the shelf
          </p>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-cream md:text-7xl">
              The{" "}
              <span className="font-serif-accent lowercase italic font-normal text-blush">
                shelf
              </span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-cream/60 md:text-base">
              Human hair blends that behave like the real thing — because they
              basically are. Pick a length, bag it, and we&apos;ll have it wrapped
              before you finish your lunch.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`shrink-0 rounded-full border-2 px-5 py-2.5 font-display text-sm font-extrabold uppercase tracking-wide transition-all ${
                  filter === f.key
                    ? "border-cream bg-butter text-ink shadow-[4px_4px_0_rgba(255,246,236,0.9)]"
                    : "border-cream/25 bg-transparent text-cream/70 hover:border-cream hover:text-cream"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const [option, setOption] = useState(product.options[0]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? 2 : -2 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 110, damping: 17, delay: (index % 3) * 0.06 }}
      className="group relative flex flex-col rounded-3xl border-2 border-cream/90 bg-cream p-3.5 shadow-[7px_7px_0_rgba(255,246,236,0.85)] transition-transform duration-300 hover:-rotate-1 hover:-translate-y-1.5"
    >
      <div className="relative overflow-hidden rounded-2xl border-2 border-ink/80" style={{ backgroundColor: product.bg }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:-rotate-1"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 -rotate-6 rounded-full border-2 border-ink bg-butter px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-wider shadow-[2px_2px_0_#2b1226]">
            {product.badge}
          </span>
        )}
        {product.featured && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border-2 border-ink bg-punch px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-wider text-cream">
            <Star className="size-3 fill-cream" strokeWidth={2} />
            Staff pick
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-extrabold uppercase leading-tight tracking-tight">
              {product.name}
            </h3>
            <p className="font-hand text-xl leading-tight text-punch">{product.tagline}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink/40">from</p>
            <p className="font-display text-xl font-extrabold">{formatRand(fromPrice(product.options))}</p>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
          {product.description}
        </p>

        <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto">
          {product.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setOption(opt)}
              className={`shrink-0 rounded-full border-2 border-ink px-3 py-1.5 text-xs font-bold transition-all ${
                option.label === opt.label
                  ? "bg-ink text-cream shadow-[2px_2px_0_#ff4d6d]"
                  : "bg-cream hover:bg-cream-deep"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t-2 border-dashed border-ink/15 pt-4">
          <p className="font-display text-lg font-extrabold">
            {formatRand(option.price)}
            <span className="ml-1.5 font-body text-xs font-medium text-ink/40">{option.label}</span>
          </p>
          <button
            onClick={() =>
              addItem({
                productId: product.id,
                name: product.name,
                option: option.label,
                price: option.price,
                image: product.image,
              })
            }
            className="sticker flex items-center gap-1.5 rounded-full bg-butter px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wide"
          >
            <Plus className="size-4" strokeWidth={3} />
            Bag it
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function ShopCta() {
  const { openCart, count } = useCart();
  return (
    <Reveal className="mx-auto mt-12 w-fit">
      <button
        onClick={openCart}
        className="sticker-light flex items-center gap-3 rounded-full bg-punch px-8 py-4 font-display text-base font-extrabold uppercase tracking-wide text-cream"
      >
        <ShoppingBag className="size-5" strokeWidth={2.4} />
        {count > 0 ? `Open your crown bag (${count})` : "Your bag awaits, gorgeous"}
      </button>
    </Reveal>
  );
}
