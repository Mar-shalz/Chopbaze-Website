"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { EASE } from "@/components/motion/reveal";

type Phase = "cover" | "reveal";

// Intercepts internal link clicks: curtain rises, route changes underneath, curtain lifts off the new page.
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("reveal");
  const pending = useRef<string | null>(null);

  useEffect(() => {
    if (reduce) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.hasAttribute("data-no-transition")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      // a hash that exists on this page (e.g. the footer FAQ link) scrolls in place instead
      if (url.hash && document.getElementById(url.hash.slice(1))) return;
      e.preventDefault();
      pending.current = url.pathname + url.search + url.hash;
      setPhase("cover");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduce]);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    if (!location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
    setPhase("reveal");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Safety net: never leave the curtain down if navigation stalls.
  useEffect(() => {
    if (phase !== "cover") return;
    const id = setTimeout(() => setPhase("reveal"), 4000);
    return () => clearTimeout(id);
  }, [phase]);

  if (reduce) return null;

  const covered = phase === "cover";
  const panel = (delay: number) => ({
    initial: false as const,
    animate: { scaleY: covered ? 1 : 0 },
    transition: { duration: 0.75, ease: EASE, delay: covered ? delay : 0.15 + (0.12 - delay) },
    style: { originY: covered ? 1 : 0 },
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
      <motion.div {...panel(0)} className="absolute inset-0 bg-yellow-500" />
      <motion.div
        {...panel(0.12)}
        onAnimationComplete={() => {
          if (covered && pending.current) router.push(pending.current);
        }}
        className="absolute inset-0 grid place-items-center bg-red-500"
      >
        <motion.div
          initial={false}
          animate={{ opacity: covered ? 1 : 0, scale: covered ? 1 : 1.3, rotate: covered ? 0 : 20 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative aspect-[388/373] w-[clamp(120px,14vw,260px)]"
        >
          <Image src="/images/hero-overlay.svg" alt="" fill />
        </motion.div>
      </motion.div>
    </div>
  );
}
