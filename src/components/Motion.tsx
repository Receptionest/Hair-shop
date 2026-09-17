"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 36,
  once = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const wordVariants: Variants = {
  hidden: { y: "115%", rotate: 6, opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 140, damping: 20, delay: 0.06 * i },
  }),
};

export function AnimatedWords({
  words,
  className,
  wordClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  wordClassName?: string;
}) {
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className={`inline-block origin-bottom-left will-change-transform ${wordClassName ?? ""} ${word.className ?? ""}`}
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
