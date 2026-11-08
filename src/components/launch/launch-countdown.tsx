"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { EASE } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { WordReveal } from "@/components/motion/word-reveal";

// shortcut: placeholder launch moment (WAT), replace with the confirmed date before going live
const LAUNCH_AT = new Date("2027-01-01T00:00:00+01:00").getTime();
const BUILD_STARTED_AT = new Date("2026-09-01T00:00:00+01:00").getTime();

const NOTIFY_URL =
  "https://wa.me/2348116164485?text=Hello%20Chopbaze!%20Please%20notify%20me%20when%20the%20app%20launches.";
const VENDOR_URL = "https://wa.me/2348116164485?text=I%20want%20to%20be%20a%20vendor%20on%20the%20platform";

// Square crops of the 1566×1044 soup sprite: a 300px window around each dish centre
const DISHES = [
  { name: "Egusi soup", left: "-18.67%", top: "-37.83%", pos: { left: "6%", top: "22%" }, size: "clamp(84px,9vw,170px)", depth: 30, rotate: -8 },
  { name: "Oha soup", left: "-148.33%", top: "-37.83%", pos: { left: "84%", top: "16%" }, size: "clamp(70px,7.5vw,140px)", depth: 18, rotate: 10 },
  { name: "Tomato stew", left: "-18.67%", top: "-144.5%", pos: { left: "10%", top: "68%" }, size: "clamp(64px,6.5vw,124px)", depth: 22, rotate: 6 },
  { name: "Pepper soup", left: "-148.67%", top: "-144.5%", pos: { left: "80%", top: "64%" }, size: "clamp(80px,8.5vw,160px)", depth: 36, rotate: -12 },
];

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    // first tick deferred so server and client render the same placeholder
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  if (now === null) return null;
  const left = Math.max(0, LAUNCH_AT - now);
  const progress = Math.min(1, Math.max(0, (now - BUILD_STARTED_AT) / (LAUNCH_AT - BUILD_STARTED_AT)));
  return {
    done: left === 0,
    progress,
    parts: [
      { label: "Days", value: Math.floor(left / 86_400_000) },
      { label: "Hours", value: Math.floor(left / 3_600_000) % 24 },
      { label: "Minutes", value: Math.floor(left / 60_000) % 60 },
      { label: "Seconds", value: Math.floor(left / 1000) % 60 },
    ],
  };
}

export function LaunchCountdown() {
  const countdown = useCountdown();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  return (
    <section
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#c12a29_0%,#a32322_45%,#6e1716_100%)] text-white"
    >
      {/* drifting brand pattern */}
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 4, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-[-10%] left-1/2 -z-10 aspect-[1916/1083] w-[140%] min-w-[1100px] -translate-x-1/2 mix-blend-color-burn"
      >
        <Image src="/images/cta-pattern.svg" alt="" fill unoptimized />
      </motion.div>
      {/* warm glow following the cursor */}
      <motion.div
        aria-hidden
        style={{ x: useTransform(sx, (v) => v * 240), y: useTransform(sy, (v) => v * 160) }}
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[60vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/25 blur-[120px]"
      />

      {DISHES.map((d, i) => (
        <OrbitingDish key={d.name} dish={d} index={i} sx={sx} sy={sy} />
      ))}

      <div className="container-site relative z-10 flex flex-1 flex-col items-center justify-center gap-[clamp(22px,2.2vw,40px)] pt-[clamp(140px,11vw,210px)] pb-[clamp(140px,12vw,230px)] text-center">
        <motion.span
          initial={{ opacity: 0, y: -12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-fluid-16 font-semibold tracking-wide uppercase backdrop-blur-md"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-yellow-300 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-yellow-500" />
          </span>
          {countdown?.done ? "Now serving" : "Still in the kitchen"}
        </motion.span>

        <h1 className="max-w-[16ch] text-fluid-64 font-bold">
          {countdown?.done ? (
            <WordReveal immediate text="The Chopbaze app is live!" />
          ) : (
            <>
              <WordReveal immediate text="Something" delay={0.3} />{" "}
              <span className="relative inline-block text-yellow-500">
                <WordReveal immediate text="delicious" delay={0.38} />
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 bottom-[-0.1em] h-[0.18em] w-full overflow-visible"
                >
                  <motion.path
                    d="M3 10 C 45 3, 120 2, 197 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: EASE, delay: 1 }}
                  />
                </motion.svg>
              </span>{" "}
              <WordReveal immediate text="is almost ready" delay={0.46} />
            </>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          className="max-w-[640px] text-fluid-24 text-white/85"
        >
          Home-style Nigerian meals for your family, your event and every gathering, a tap away. Our kitchens are
          plating up the Chopbaze app right now.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
          role="timer"
          aria-live="off"
          aria-label="Time until the Chopbaze app launches"
          className="grid w-full max-w-[880px] grid-cols-4 gap-[clamp(8px,1.04vw,20px)]"
        >
          {(countdown?.parts ?? PLACEHOLDER).map((p, i) => (
            <TimeTile key={p.label} label={p.label} value={p.value} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex w-full max-w-[880px] flex-col gap-2"
        >
          <div className="flex justify-between text-fluid-16 text-white/75">
            <span>Kitchen progress</span>
            <span className="tabular-nums">{countdown ? Math.round(countdown.progress * 100) : 0}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: countdown?.progress ?? 0 }}
              transition={{ duration: 1.6, ease: EASE }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
          className="grid w-full gap-4 sm:inline-grid sm:w-auto sm:grid-cols-2"
        >
          <Magnetic className="w-full">
            <a
              href={NOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-[clamp(52px,3.34vw,64px)] w-full items-center justify-center gap-3 overflow-hidden rounded-[14px] bg-white px-7 text-fluid-24 font-bold whitespace-nowrap text-red-500 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-yellow-100/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative size-[22px] rounded-[6px] bg-red-500 p-[3px]">
                <Image src="/images/social-whatsapp.svg" alt="" width={16} height={16} className="size-4" />
              </span>
              <span className="relative">Notify me on WhatsApp</span>
            </a>
          </Magnetic>
          <Magnetic className="w-full">
            <a
              href={VENDOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[clamp(52px,3.34vw,64px)] w-full items-center justify-center rounded-[14px] border border-white/70 px-7 text-fluid-24 font-bold whitespace-nowrap text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white active:scale-[0.97] sm:w-auto"
            >
              Join as an early vendor
            </a>
          </Magnetic>
        </motion.div>

        <Link href="/" className="group text-fluid-18 text-white/70 transition-colors hover:text-white">
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span> Back
          to home
        </Link>
      </div>

      <Marquee />
    </section>
  );
}

const PLACEHOLDER = ["Days", "Hours", "Minutes", "Seconds"].map((label) => ({ label, value: null as number | null }));

function TimeTile({ label, value, index }: { label: string; value: number | null; index: number }) {
  const digits = value === null ? ["-", "-"] : String(value).padStart(2, "0").split("");
  return (
    <div className="relative flex flex-col items-center gap-1 overflow-hidden rounded-[clamp(14px,1.25vw,24px)] border border-white/20 bg-white/10 px-2 py-[clamp(14px,1.6vw,30px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <span className="flex text-[clamp(36px,5.8vw,112px)] leading-none font-bold tabular-nums">
        {digits.map((d, i) => (
          <Digit key={`${index}-${i}-${digits.length}`} char={d} />
        ))}
      </span>
      <span className="text-fluid-16 tracking-[0.12em] text-white/70 uppercase">{label}</span>
    </div>
  );
}

// Each digit rolls in from above and drops out below when it changes
function Digit({ char }: { char: string }) {
  return (
    <span className="relative inline-flex h-[1.05em] w-[0.62em] justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={char}
          initial={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-block"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

type SpringValue = ReturnType<typeof useSpring>;

function OrbitingDish({
  dish,
  index,
  sx,
  sy,
}: {
  dish: (typeof DISHES)[number];
  index: number;
  sx: SpringValue;
  sy: SpringValue;
}) {
  const x = useTransform(sx, (v) => v * -dish.depth * 2);
  const y = useTransform(sy, (v) => v * -dish.depth * 2);
  const style: CSSProperties = { left: dish.pos.left, top: dish.pos.top, width: dish.size };
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.4, rotate: dish.rotate * 3 }}
      animate={{ opacity: 1, scale: 1, rotate: dish.rotate }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.6 + index * 0.12 }}
      className="pointer-events-none absolute z-0 max-sm:opacity-40"
      style={style}
    >
      <motion.div style={{ x, y }}>
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
          className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-white/80 bg-white shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)]"
        >
          <div className="absolute h-[348%] w-[522%]" style={{ left: dish.left, top: dish.top }}>
            <Image src="/images/soup-collection.png" alt="" fill sizes="40vw" className="object-cover" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Marquee() {
  const words = ["Better Food", "Less Work", "More Time", "Family", "Events", "Gatherings"];
  const row = [...words, ...words];
  return (
    <div aria-hidden className="absolute inset-x-[-5%] bottom-[clamp(28px,3vw,56px)] z-20 -rotate-2 bg-yellow-500 py-[clamp(10px,1vw,18px)] text-red-700 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-[clamp(24px,2.5vw,48px)] text-fluid-28 font-bold whitespace-nowrap uppercase"
      >
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-[clamp(24px,2.5vw,48px)]">
            {w}
            <span className="size-2.5 rounded-full bg-red-700" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
