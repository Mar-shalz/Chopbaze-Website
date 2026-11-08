"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";

// Red-to-amber banner whose lower half fades to white; the page card overlaps the seam.
// `still` renders without entrance motion so sibling pages (legal tabs) swap instantly.
export function PageBanner({ title, children, still }: { title: string; children: ReactNode; still?: boolean }) {
  return (
    <section className="relative isolate pt-[clamp(150px,15.1vw,290px)] pb-[clamp(48px,4.2vw,80px)]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[clamp(470px,49.4vw,948px)] bg-gradient-to-b from-[#bd3a2a] via-[#d4672f] to-[#f0a040]"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-[10%] right-[8%] -z-10 size-[30vw] max-w-[520px] rounded-full bg-yellow-300/40 blur-[90px]"
      />
      <div className="container-site flex flex-col gap-[clamp(24px,2.1vw,40px)]">
        <div className="flex items-center gap-[clamp(16px,1.6vw,30px)] text-white">
          <h1 className="shrink-0 text-fluid-48 font-bold uppercase">
            {still ? title : <WordReveal immediate text={title} />}
          </h1>
          <motion.span
            initial={still ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
            className="h-[3px] flex-1 origin-left rounded-full bg-white"
          />
        </div>
        <motion.div
          initial={still ? false : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          className="rounded-[clamp(18px,1.4vw,26px)] bg-surface p-[clamp(20px,3vw,58px)] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)]"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
