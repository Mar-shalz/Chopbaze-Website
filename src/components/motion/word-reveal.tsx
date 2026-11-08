"use client";

import { motion } from "motion/react";
import { EASE } from "@/components/motion/reveal";

// `immediate` plays on mount (above-the-fold headings) instead of waiting for the scroll observer
export function WordReveal({ text, delay = 0.1, immediate }: { text: string; delay?: number; immediate?: boolean }) {
  return (
    <motion.span
      initial="hidden"
      animate={immediate ? "show" : undefined}
      whileInView={immediate ? undefined : "show"}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      className="inline"
      aria-label={text}
    >
      {text.split(" ").map((word, i, words) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 && "\u00a0"}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
