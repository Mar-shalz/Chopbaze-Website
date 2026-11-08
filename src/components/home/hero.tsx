"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

type Slide = { word: string; src: string; alt: string; position: string };
import { EASE } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

// Headline word and photo rotate together so each word lands on a matching scene.
const SLIDES = [
  {
    word: "Family",
    src: "/images/hero-family.png",
    alt: "A Nigerian family sharing a home-cooked feast around the dining table",
    position: "50% 44.3%",
  },
  {
    word: "Event",
    src: "/images/hero-buffet.png",
    alt: "Chopbaze garden buffet with trays of rice, stews and salads at an event",
    position: "50% 37.2%",
  },
  {
    word: "Gathering",
    src: "/images/hero-feast.png",
    alt: "Jollof rice, egusi soup, fried plantain and suya spread on a table",
    position: "50% 50%",
  },
];

const SLIDE_MS = 5000;

export function Hero() {
  const [[index, prev], setSlide] = useState<[number, number | null]>([0, null]);
  const goTo = (i: number) => setSlide(([cur]) => (i === cur ? [cur, null] : [i, cur]));
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setSlide(([cur]) => [(cur + 1) % SLIDES.length, cur]), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused]);

  return (
    <section className="relative isolate pb-[clamp(32px,3.39vw,65px)]">
      <div className="bg-yellow-50 pt-[clamp(132px,13.39vw,257px)] pb-[clamp(32px,2.5vw,48px)]">
        <div className="container-site flex flex-col items-center gap-3.5 text-center">
          <motion.p
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="rounded-[12px] border border-yellow-500 bg-yellow-100 px-[clamp(12px,0.94vw,18px)] py-[clamp(8px,0.73vw,14px)] text-[clamp(12px,0.9375vw,18px)] leading-[1.47] font-bold tracking-[-0.01em] text-red-ink uppercase"
          >
            Better Food. Less Work. More Time.
          </motion.p>

          <h1 className="text-fluid-64 font-bold">
            <span className="sr-only">Feed Your Family, Event or Gathering With Ease</span>
            <span aria-hidden className="flex flex-wrap items-baseline justify-center gap-x-[0.25em]">
              <IntroWord delay={0.3}>Feed</IntroWord>
              <IntroWord delay={0.37}>Your</IntroWord>
              <IntroWord delay={0.44}>
                <RotatingWord word={SLIDES[index].word} />
              </IntroWord>
              <IntroWord delay={0.51}>With</IntroWord>
              <IntroWord delay={0.58}>Ease</IntroWord>
            </span>
          </h1>

          <div className="flex w-full flex-col items-center gap-5">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
              className="max-w-[52em] text-fluid-24"
            >
              Chopbaze brings you delicious, home-style Nigerian food from vetted kitchens, whether you’re
              ordering for yourself, your family, or a crowd. Choose your portions and customize your meal to
              your taste.
            </motion.p>
            <HeroCtas className="max-md:hidden" />
          </div>
        </div>
      </div>

      <div className="container-site relative">
        {/* Hero cream background continues behind the top 66.4% of the image (Figma: bg ends 391px into a 589px image) */}
        <div
          aria-hidden
          className="absolute top-0 bottom-[33.6%] left-1/2 -z-10 w-screen -translate-x-1/2 bg-yellow-50"
        />
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
          ref={stageRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative aspect-[1640/589] min-h-[220px] w-full overflow-hidden rounded-[clamp(20px,1.67vw,32px)] bg-surface"
        >
          <motion.div style={{ y: imageY }} className="absolute inset-x-0 -inset-y-[9%]">
            {prev !== null && (
              <motion.div
                key={`base-${prev}`}
                initial={{ scale: 1, filter: "brightness(1)" }}
                animate={{ scale: 1.08, filter: "brightness(0.55)" }}
                transition={{ duration: 1.4, ease: EASE }}
                className="absolute inset-0"
              >
                <SlideImage slide={SLIDES[prev]} decorative />
              </motion.div>
            )}
            <ShutterSlide key={index} slide={SLIDES[index]} animate={prev !== null} first={index === 0} />
          </motion.div>

          <motion.div
            aria-hidden
            style={{ rotate: markRotate }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 aspect-[388/373] w-[23.66%] -translate-x-1/2 -translate-y-1/2"
          >
            <Image src="/images/hero-overlay.svg" alt="" fill />
          </motion.div>

          <div className="absolute right-[clamp(16px,1.5vw,28px)] bottom-[clamp(16px,1.5vw,28px)] flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className="relative h-1.5 overflow-hidden rounded-full bg-white/40 transition-all duration-500 ease-out-expo"
                style={{ width: i === index ? 36 : 12 }}
              >
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{ duration: paused ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                    className="absolute inset-0 origin-left rounded-full bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
      {/* on mobile the CTAs follow the image */}
      <div className="container-site mt-6 md:hidden">
        <HeroCtas />
      </div>
    </section>
  );
}

function HeroCtas({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
      className={cn("flex w-full flex-col items-center justify-center gap-4 sm:flex-row", className)}
    >
      <Magnetic className="w-full sm:w-auto">
      <Link
        href="#feeding-a-crowd"
        className="inline-flex h-[clamp(52px,3.34vw,64px)] w-full items-center justify-center rounded-[14px] border border-red-ink px-6 text-fluid-24 font-bold whitespace-nowrap text-red-ink transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_rgba(193,42,41,0.45)] active:scale-[0.97] sm:w-[clamp(240px,15.52vw,298px)]"
      >
        Planning a Gathering?
      </Link>
      </Magnetic>
      <Magnetic className="w-full sm:w-auto">
      <Link
        href="/launch"
        className="group relative inline-flex h-[clamp(52px,3.34vw,64px)] w-full items-center justify-center overflow-hidden rounded-[14px] bg-red-500 px-6 text-fluid-24 font-bold whitespace-nowrap text-white transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(193,42,41,0.6)] active:scale-[0.97] sm:w-[clamp(240px,15.52vw,298px)]"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative">Download the App</span>
      </Link>
      </Magnetic>
    </motion.div>
  );
}

function IntroWord({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.span layout transition={{ layout: { duration: 0.6, ease: EASE } }} className="inline-block overflow-hidden px-[0.04em] pb-[0.18em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

function RotatingWord({ word }: { word: string }) {
  return (
    <span className="relative inline-flex text-red-ink [perspective:800px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={word} className="inline-flex">
          {word.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "60%", rotateX: -90, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: "-60%", rotateX: 90, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.035 }}
              className="inline-block origin-[50%_80%] [backface-visibility:hidden]"
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
      <svg
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="absolute inset-x-[-2%] bottom-[-0.12em] h-[0.2em] w-[104%] overflow-visible text-yellow-500"
      >
        <motion.path
          key={word}
          d="M3 10 C 45 3, 120 2, 197 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
        />
      </svg>
    </span>
  );
}

const STRIPS = 7;

function SlideImage({ slide, decorative, first }: { slide: Slide; decorative?: boolean; first?: boolean }) {
  return (
    <Image
      src={slide.src}
      alt={decorative ? "" : slide.alt}
      fill
      preload={first}
      loading="eager"
      sizes="(min-width: 1920px) 1640px, 100vw"
      className="object-cover"
      style={{ objectPosition: slide.position }}
    />
  );
}

// New photo arrives as vertical shutters that close in alternating directions, each with its own slight zoom.
function ShutterSlide({ slide, animate, first }: { slide: Slide; animate: boolean; first: boolean }) {
  return (
    <motion.div
      initial={{ scale: 1.06 }}
      animate={{ scale: 1 }}
      transition={{ duration: SLIDE_MS / 1000 + 1.5, ease: "linear" }}
      className="absolute inset-0"
    >
      {Array.from({ length: STRIPS }, (_, i) => {
        const left = (i / STRIPS) * 100;
        const right = 100 - ((i + 1) / STRIPS) * 100;
        const fromTop = i % 2 === 0;
        const closed = fromTop ? `inset(0% ${right}% 100% ${left}%)` : `inset(100% ${right}% 0% ${left}%)`;
        // overlap strips by 0.05% so no hairline gaps show between them
        const open = `inset(0% ${Math.max(right - 0.05, 0)}% 0% ${Math.max(left - 0.05, 0)}%)`;
        return (
          <motion.div
            key={i}
            initial={animate ? { clipPath: closed } : false}
            animate={{ clipPath: open }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.06 }}
            className="absolute inset-0"
          >
            <motion.div
              initial={animate ? { scale: 1.18, y: fromTop ? "-4%" : "4%" } : false}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: i * 0.06 }}
              className="absolute inset-0"
            >
              <SlideImage slide={slide} decorative={i > 0} first={first && i === 0} />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
