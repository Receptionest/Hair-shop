"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Crown,
  Loader2,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { formatRand, WHATSAPP_NUMBER } from "@/lib/format";
import type { CartItem } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "key" | "qty">) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const addItem = useCallback((item: Omit<CartItem, "key" | "qty">) => {
    const key = `${item.productId}-${item.option}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, key, qty: 1 }];
    });
    setToast(item.name);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((acc, i) => acc + i.qty, 0);
    const total = items.reduce((acc, i) => acc + i.qty * i.price, 0);
    return {
      items,
      count,
      total,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem: (key) => setItems((prev) => prev.filter((i) => i.key !== key)),
      setQty: (key, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => i.key !== key)
            : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
        ),
      clear: () => setItems([]),
    };
  }, [items, isOpen, addItem]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 80, opacity: 0, rotate: -4 }}
            animate={{ y: 0, opacity: 1, rotate: -2 }}
            exit={{ y: 80, opacity: 0, rotate: 2 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2"
          >
            <div className="sticker flex items-center gap-2.5 rounded-2xl bg-butter px-5 py-3">
              <Crown className="size-5" strokeWidth={2.4} />
              <p className="font-display text-sm font-bold">
                {toast} is in your crown bag!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CartDrawer />
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const { items, total, count, isOpen, closeCart, setQty, removeItem, clear } =
    useCart();
  const [step, setStep] = useState<"bag" | "checkout" | "done">("bag");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const reset = () => {
    setStep("bag");
    setError(null);
    setBusy(false);
  };

  const whatsappHref = useMemo(() => {
    const lines = items.map(
      (i) => `• ${i.qty}× ${i.name} (${i.option}) — ${formatRand(i.price * i.qty)}`,
    );
    const message = [
      `Howzit Hairapy! It's ${name || "a future crown-owner"}.`,
      orderCode ? `I've placed order ${orderCode}:` : "I'd love to order:",
      ...lines,
      `Total: ${formatRand(total)}`,
      fulfillment === "delivery"
        ? "Delivery please — I'll send my pin."
        : "Collecting at the shop in the CBD.",
    ].join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [items, name, total, fulfillment, orderCode]);

  const placeOrder = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, fulfillment, items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something glitched");
      setOrderCode(data.code);
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something glitched");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[85] bg-plum-deep/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col border-l-2 border-ink bg-cream"
          >
            <div className="flex items-center justify-between border-b-2 border-ink bg-butter px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-5" strokeWidth={2.4} />
                <h3 className="font-display text-xl font-extrabold uppercase tracking-tight">
                  Crown bag <span className="font-serif-accent italic lowercase">({count})</span>
                </h3>
              </div>
              <button
                onClick={() => {
                  closeCart();
                  if (step === "done") reset();
                }}
                aria-label="Close bag"
                className="sticker rounded-full bg-cream p-2"
              >
                <X className="size-4" strokeWidth={2.6} />
              </button>
            </div>

            {step === "bag" && (
              <>
                <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-5">
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                      <Crown className="size-12 text-punch" strokeWidth={1.6} />
                      <p className="font-display text-2xl font-extrabold leading-tight">
                        Your bag is empty,
                        <br />
                        <span className="font-serif-accent italic font-medium text-punch">
                          your head deserves better.
                        </span>
                      </p>
                      <p className="text-sm text-ink/60">
                        Scroll the shelves and treat yourself, love.
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {items.map((item) => (
                        <motion.li
                          layout
                          key={item.key}
                          className="flex gap-3 rounded-2xl border-2 border-ink bg-white p-3 shadow-[4px_4px_0_#2b1226]"
                        >
                          <div className="size-[74px] shrink-0 overflow-hidden rounded-xl border-2 border-ink/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-display text-sm font-bold leading-tight">
                                {item.name}
                              </p>
                              <button
                                onClick={() => removeItem(item.key)}
                                aria-label={`Remove ${item.name}`}
                                className="text-ink/40 transition hover:text-punch"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                            <p className="text-xs font-medium text-ink/60">{item.option}</p>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center gap-1 rounded-full border-2 border-ink">
                                <button
                                  onClick={() => setQty(item.key, item.qty - 1)}
                                  className="p-1.5 transition hover:text-punch"
                                  aria-label="Decrease"
                                >
                                  <Minus className="size-3.5" strokeWidth={3} />
                                </button>
                                <span className="w-5 text-center text-sm font-bold">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => setQty(item.key, item.qty + 1)}
                                  className="p-1.5 transition hover:text-punch"
                                  aria-label="Increase"
                                >
                                  <Plus className="size-3.5" strokeWidth={3} />
                                </button>
                              </div>
                              <p className="font-display text-sm font-extrabold">
                                {formatRand(item.price * item.qty)}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
                {items.length > 0 && (
                  <div className="border-t-2 border-ink bg-white px-5 py-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-ink/60">Subtotal</span>
                      <span className="font-display text-2xl font-extrabold">
                        {formatRand(total)}
                      </span>
                    </div>
                    <button
                      onClick={() => setStep("checkout")}
                      className="sticker w-full rounded-2xl bg-punch py-3.5 font-display text-base font-extrabold uppercase tracking-wide text-cream"
                    >
                      Bag it, let&apos;s go
                    </button>
                    <p className="mt-2.5 text-center font-hand text-xl text-ink/60">
                      pay on pickup / eft / card — we don&apos;t judge
                    </p>
                  </div>
                )}
              </>
            )}

            {step === "checkout" && (
              <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-6">
                <div>
                  <h4 className="font-display text-2xl font-extrabold leading-tight">
                    Almost crowned.
                    <span className="ml-2 font-serif-accent italic font-medium text-punch">
                      Just the paperwork.
                    </span>
                  </h4>
                  <p className="mt-1 text-sm text-ink/60">
                    Pop your details in and we&apos;ll have your order waiting.
                  </p>
                </div>

                <label className="block">
                  <span className="mb-1.5 block font-display text-xs font-bold uppercase tracking-widest text-ink/60">
                    Your name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Thandi M."
                    className="w-full rounded-2xl border-2 border-ink bg-white px-4 py-3 font-medium shadow-[4px_4px_0_#2b1226] outline-none transition focus:shadow-[6px_6px_0_#ff4d6d]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-display text-xs font-bold uppercase tracking-widest text-ink/60">
                    WhatsApp number
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="082 123 4567"
                    inputMode="tel"
                    className="w-full rounded-2xl border-2 border-ink bg-white px-4 py-3 font-medium shadow-[4px_4px_0_#2b1226] outline-none transition focus:shadow-[6px_6px_0_#ff4d6d]"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { value: "pickup", label: "Pickup in CBD", hint: "free, shame" },
                      { value: "delivery", label: "Deliver it", hint: "from R60" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFulfillment(opt.value)}
                      className={`rounded-2xl border-2 border-ink px-4 py-3 text-left transition ${
                        fulfillment === opt.value
                          ? "bg-butter shadow-[4px_4px_0_#2b1226]"
                          : "bg-white opacity-60 hover:opacity-100"
                      }`}
                    >
                      <p className="font-display text-sm font-extrabold">{opt.label}</p>
                      <p className="text-xs text-ink/60">{opt.hint}</p>
                    </button>
                  ))}
                </div>

                {error && (
                  <p className="rounded-xl border-2 border-ink bg-punch/10 px-4 py-2.5 text-sm font-medium text-punch">
                    {error}
                  </p>
                )}

                <div className="mt-auto space-y-3 border-t-2 border-dashed border-ink/20 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink/60">Total</span>
                    <span className="font-display text-2xl font-extrabold">
                      {formatRand(total)}
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={busy}
                    className="sticker flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 font-display text-base font-extrabold uppercase tracking-wide text-cream disabled:opacity-60"
                  >
                    {busy ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <BadgeCheck className="size-5" strokeWidth={2.4} />
                    )}
                    Place order — {formatRand(total)}
                  </button>
                  <button
                    onClick={() => setStep("bag")}
                    className="w-full text-center text-sm font-medium text-ink/50 underline underline-offset-4 hover:text-ink"
                  >
                    Wait, one more bundle…
                  </button>
                </div>
              </div>
            )}

            {step === "done" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="flex size-20 items-center justify-center rounded-full border-2 border-ink bg-mint shadow-[5px_5px_0_#2b1226]"
                >
                  <Sparkles className="size-9" strokeWidth={2} />
                </motion.div>
                <div>
                  <h4 className="font-display text-3xl font-extrabold leading-tight">
                    Order {orderCode} is in!
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    We&apos;ve saved your order{fulfillment === "delivery" ? " for delivery" : " for pickup"}.
                    Tap below to WhatsApp it straight to the shop so we can start
                    wrapping your crown.
                  </p>
                </div>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="sticker flex w-full items-center justify-center gap-2 rounded-2xl bg-mint py-4 font-display text-base font-extrabold uppercase tracking-wide"
                >
                  <MessageCircle className="size-5" strokeWidth={2.4} />
                  WhatsApp the shop
                </a>
                <button
                  onClick={() => {
                    clear();
                    closeCart();
                    setTimeout(reset, 350);
                  }}
                  className="text-sm font-medium text-ink/50 underline underline-offset-4 hover:text-ink"
                >
                  Done, keep browsing
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
