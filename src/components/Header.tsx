"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Scissors, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/Cart";

const LINKS = [
  { href: "#shop", label: "The Shelf" },
  { href: "#blendbar", label: "Blend-O-Meter" },
  { href: "#reviews", label: "Receipts" },
  { href: "#visit", label: "Find Us" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-all duration-300 ${
            scrolled ? "bg-cream/90 shadow-[0_2px_0_#2b1226] backdrop-blur-md" : ""
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <a href="#top" className="group flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full border-2 border-ink bg-punch text-cream transition-transform duration-300 group-hover:rotate-180">
                <Scissors className="size-4" strokeWidth={2.4} />
              </span>
              <span className="font-display text-lg font-extrabold uppercase leading-none tracking-tight">
                Hairapy
                <span className="block font-hand text-sm font-normal normal-case text-punch">
                  nelspruit, baby
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 lg:flex">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3.5 py-1.5 font-display text-sm font-bold uppercase tracking-wide transition hover:bg-ink hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={openCart}
                className="sticker relative flex items-center gap-2 rounded-full bg-butter px-4 py-2.5"
              >
                <ShoppingBag className="size-4" strokeWidth={2.6} />
                <span className="hidden font-display text-sm font-extrabold uppercase sm:block">
                  Bag
                </span>
                <AnimatePresence mode="popLayout">
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border-2 border-ink bg-punch font-display text-xs font-extrabold text-cream"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                className="sticker rounded-full bg-cream p-2.5 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" strokeWidth={2.6} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[92] bg-plum-deep/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-sm flex-col border-l-2 border-ink bg-ink text-cream"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <p className="font-display text-xl font-extrabold uppercase">
                  Where to, <span className="font-serif-accent lowercase italic text-blush">gorgeous?</span>
                </p>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="sticker-light rounded-full p-2"
                >
                  <X className="size-4" strokeWidth={2.6} />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 px-6 py-4">
                {LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                    className="group flex items-baseline gap-3 border-b border-cream/15 py-4 font-display text-4xl font-extrabold uppercase tracking-tight transition hover:text-blush"
                  >
                    <span className="font-hand text-lg text-punch">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <p className="px-6 pb-8 font-hand text-2xl text-cream/50">
                shop 7, nelcity centre — bester street, nelspruit cbd
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
