"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Apple, ChefHat, Play } from "lucide-react";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { WordReveal } from "@/components/motion/word-reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { PhoneMockup } from "@/components/site/phone-mockup";
import { cn } from "@/lib/utils";

/* ---------------------------------- Hero ---------------------------------- */

// The four Figma hero variants: each photo is the whole card background, so text colours follow it.
const HERO_SLIDES = [
  {
    src: "/images/vendor-hero-red.png",
    alt: "Smiling chef inviting you in through a red Chopbaze portal",
    bg: "#a8201f",
    dark: true,
  },
  {
    src: "/images/vendor-hero-cream.jpg",
    alt: "Chef holding a plate of jollof rice inside a red Chopbaze portal",
    bg: "#f3cf9c",
    dark: false,
  },
  {
    src: "/images/vendor-hero-light.jpg",
    alt: "Smiling cook presenting a plate of fried rice through a soft cream portal",
    bg: "#f8e8d4",
    dark: false,
  },
  {
    src: "/images/vendor-hero-dark.jpg",
    alt: "A steaming pot of stew framed by a golden Chopbaze portal",
    bg: "#3a1410",
    dark: true,
  },
];

export function VendorHero() {
  // [current, previous]: the previous slide stays fully opaque underneath while the next one fades in over it
  const [[index, prev], setSlide] = useState<[number, number]>([0, 0]);
  const show = (i: number) => setSlide((s) => (s[0] === i ? s : [i, s[0]]));
  const slide = HERO_SLIDES[index];

  useEffect(() => {
    const id = setTimeout(() => setSlide(([cur]) => [(cur + 1) % HERO_SLIDES.length, cur]), 5000);
    return () => clearTimeout(id);
  }, [index]);

  const ink = slide.dark ? "text-white" : "text-[#5a2018]";
  return (
    <section className="bg-background pt-[clamp(110px,9.5vw,180px)] pb-[clamp(40px,3vw,60px)]">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1, backgroundColor: slide.bg }}
          transition={{ duration: 1, ease: EASE, backgroundColor: { duration: 1.2 } }}
          className="relative isolate flex flex-col overflow-hidden rounded-[clamp(18px,1.6vw,28px)] md:block md:aspect-[1376/768]"
        >
          <div className="relative -z-10 order-last aspect-[1376/768] w-full max-md:hidden md:absolute md:inset-0 md:aspect-auto">
          {/* every slide stays mounted so the next photo is already decoded when its turn comes */}
          {HERO_SLIDES.map((h, i) => (
            <motion.div
              key={h.src}
              initial={false}
              animate={{ opacity: i === index || i === prev ? 1 : 0, scale: i === index || i === prev ? 1 : 1.05 }}
              transition={{ opacity: { duration: 1.4, ease: [0.45, 0, 0.25, 1] }, scale: { duration: 2.4, ease: EASE } }}
              style={{ zIndex: i === index ? 2 : i === prev ? 1 : 0 }}
              aria-hidden={i !== index}
              className="absolute inset-0"
            >
              <Image
                src={h.src}
                alt={h.alt}
                fill
                preload={i === 0}
                sizes="(min-width: 1920px) 1640px, 100vw"
                className="object-cover object-right max-md:object-[72%_50%]"
              />
            </motion.div>
          ))}
          </div>

          <div className={cn("relative flex flex-col items-start gap-5 p-6 transition-colors duration-700 md:absolute md:top-1/2 md:left-[5.2%] md:w-[42%] md:-translate-y-1/2 md:p-0", ink)}>
            <span
              className={cn(
                "rounded-[8px] px-4 py-2 text-fluid-16 uppercase transition-colors duration-700",
                slide.dark ? "bg-[#fde0ba] text-[#5a2018]" : "bg-[#5a2018] text-[#fde0ba]",
              )}
            >
              For Food Businesses
            </span>
            <h1 className="text-fluid-56 font-bold">
              <WordReveal immediate text="Your Food Has a Place at the Table." delay={0.5} />
            </h1>
            <p className="max-w-[520px] text-fluid-20">
              Bring your kitchen to Chopbaze. Share your homemade meals with people who love good food.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Magnetic className="w-full sm:w-auto">
                <Link
                  href="#why-join"
                  className={cn(
                    "inline-flex h-[clamp(48px,3vw,58px)] w-full items-center justify-center rounded-[10px] border px-8 text-fluid-20 font-bold whitespace-nowrap transition-all duration-300 ease-out-expo hover:-translate-y-0.5 active:scale-[0.97] sm:w-[clamp(170px,12.5vw,240px)]",
                    slide.dark ? "border-white text-white" : "border-[#5a2018] text-[#5a2018]",
                  )}
                >
                  How It Works
                </Link>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto">
                <Link
                  href="/launch"
                  className="group relative inline-flex h-[clamp(48px,3vw,58px)] w-full items-center justify-center overflow-hidden rounded-[10px] bg-red-500 px-8 text-fluid-20 font-bold whitespace-nowrap text-white transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(193,42,41,0.6)] active:scale-[0.97] sm:w-[clamp(170px,12.5vw,240px)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Become a Vendor</span>
                </Link>
              </Magnetic>
            </div>
          </div>

            <div className="relative flex gap-2 px-6 pb-6 md:absolute md:bottom-[6%] md:left-[5.2%] md:p-0">
              {HERO_SLIDES.map((h, i) => (
                <button
                  key={h.src}
                  type="button"
                  aria-label={`Show hero ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => show(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500 ease-out-expo",
                    i === index ? "w-8" : "w-3 opacity-40",
                    slide.dark ? "bg-white" : "bg-[#5a2018]",
                  )}
                />
              ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- Why join --------------------------------- */

const REASONS = [
  {
    t: "Join Our Kitchen Network",
    d: "Chopbaze vets kitchens and food quality as part of its commitment to customer trust. Vendors should be prepared to meet the applicable requirements.",
    screen: "/images/vendor-screen-start.png",
    bg: "bg-[#f8dcb2]",
  },
  {
    t: "Showcase Your Menu",
    d: "Chopbaze is building around everyday meals as well as larger group orders. This creates opportunities for kitchens offering suitable dishes.",
    screen: "/images/vendor-screen-menu.png",
    bg: "bg-[#d8cfc0]",
  },
  {
    t: "Manage your Orders Easily",
    d: "Give customers a place to discover the dishes your kitchen prepares and understand the options available. Serve Different Food Needs.",
    screen: "/images/vendor-screen-orders.png",
    bg: "bg-[#ecbdbd]",
  },
];

export function WhyJoin() {
  return (
    <section id="why-join" className="scroll-mt-24 bg-cream py-[clamp(48px,4.2vw,80px)]">
      <div className="container-site flex flex-col gap-[clamp(28px,2.5vw,48px)]">
        <SectionHeading
          title="Why Join Chopbaze as a Vendor?"
          subtitle="Grow with the Right Opportunities. Let Your Food Speak to More People."
          align="center"
        />
        <div className="relative overflow-hidden rounded-[24px] bg-yellow-50 px-[clamp(16px,2vw,36px)] pt-[clamp(20px,2vw,36px)]">
          <div aria-hidden className="absolute inset-x-[-5%] bottom-[8%] h-[38%] opacity-90">
            <Image src="/images/vendor-scribble.svg" alt="" fill className="object-fill" />
          </div>
          <Stagger className="relative grid gap-5 md:grid-cols-3">
            {REASONS.map((r) => (
              <StaggerItem key={r.t}>
                <div className={cn("group flex h-full flex-col items-center overflow-hidden rounded-t-[24px] text-grey-500", r.bg)}>
                  {/* white header spans the card; the phone slides up underneath it on hover */}
                  <div className="relative z-10 w-full rounded-t-[24px] rounded-b-[18px] bg-white px-6 py-6 text-center shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)]">
                    <h3 className="text-fluid-24 font-bold">{r.t}</h3>
                    <p className="mt-2 text-fluid-16">{r.d}</p>
                  </div>
                  <div className="relative mt-6 h-[clamp(300px,24vw,460px)] w-[72%]">
                    <div className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-[22%]">
                      <PhoneMockup screen={r.screen} alt={`Chopbaze vendor app: ${r.t}`} />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal className="flex justify-center">
          <div className="flex flex-col items-center gap-4 rounded-[16px] bg-yellow-100 px-6 py-4 text-center sm:flex-row sm:text-left">
            <p className="text-fluid-20 font-bold">Feel like making a difference in the Food Vendor Space?</p>
            <Magnetic>
              <Link
                href="/launch"
                className="inline-flex h-[clamp(44px,2.8vw,54px)] items-center rounded-[10px] bg-red-500 px-7 text-fluid-20 font-bold whitespace-nowrap text-white transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(193,42,41,0.6)] active:scale-[0.97]"
              >
                Become a Vendor
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Who should apply ------------------------------ */

const CRITERIA = [
  "Prepares home-style meals or other suitable food offerings.",
  "Can provide clear menu details, prices and available quantities.",
  "Can communicate the preparation preferences it can accommodate.",
  "Is prepared to meet Chopbaze's kitchen-vetting and food-quality requirements.",
  "Can fulfil the kinds of orders it chooses to accept.",
];

export function WhoShouldApply() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="bg-yellow-50 py-[clamp(48px,4.2vw,80px)]">
      <div className="container-site">
        <div ref={ref} className="grid items-center gap-[clamp(24px,3vw,56px)] rounded-[24px] bg-surface p-[clamp(16px,1.6vw,30px)] md:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
          <Reveal x={-40} y={0} className="relative aspect-[4/5] overflow-hidden rounded-[16px] max-md:hidden">
            <motion.div style={{ y: imgY }} className="absolute -inset-y-[7%] inset-x-0">
              <Image
                src="/images/vendor-apply.png"
                alt="Chef holding a whisk and frying pan, ready to cook"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </Reveal>
          <div className="flex flex-col gap-5 py-4 md:pr-[clamp(0px,2vw,40px)]">
            <Reveal x={30} y={0} className="flex items-center gap-4">
              <span className="h-1.5 w-14 rounded-full bg-red-500" />
              <h2 className="text-fluid-24 font-bold text-red-ink">Who Should Apply as a Vendor?</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="text-fluid-32 font-bold">Good Food Starts with the Right Kitchens.</h3>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-fluid-18">
                We&apos;re interested in hearing from food businesses that care about the quality of their meals. Your
                business may be a good fit if it:
              </p>
            </Reveal>
            <Stagger gap={0.07} className="flex flex-col gap-3">
              {CRITERIA.map((c) => (
                <StaggerItem key={c}>
                  <p className="group flex items-start gap-3 text-fluid-18">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-red-50 text-red-ink transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
                      <ChefHat className="size-4" />
                    </span>
                    {c}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <p className="rounded-[10px] border border-yellow-500 bg-yellow-50 px-4 py-3 text-fluid-16 text-[#8a5a14] dark:text-yellow-300">
                Final eligibility depends on the actual vendor requirements and onboarding review.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Ready CTA --------------------------------- */

export function VendorReadyCta() {
  return (
    <section className="relative overflow-hidden bg-grey-500 py-[clamp(56px,5vw,96px)] text-white">
      <motion.div
        aria-hidden
        animate={{ x: ["-2%", "2%", "-2%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-[-30%] left-1/2 aspect-[1916/1083] w-[110%] min-w-[900px] -translate-x-1/2 opacity-25 mix-blend-luminosity [filter:grayscale(1)_brightness(0.5)]"
      >
        <Image src="/images/cta-pattern.svg" alt="" fill unoptimized />
      </motion.div>
      <Reveal className="container-site relative flex flex-col items-center gap-5 text-center">
        <h2 className="text-fluid-40 font-bold uppercase">
          <WordReveal text="Ready to Bring Your Food to Chopbaze?" />
        </h2>
        <p className="max-w-[720px] text-fluid-20 text-white/85">
          Bring your kitchen to more customers. Download the Chopbaze Vendor App to get started and manage your food
          business with ease.
        </p>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <StoreBadge icon={<Play className="size-6 fill-white" />} top="Get it on" bottom="Google Play" />
          <StoreBadge icon={<Apple className="size-6 fill-white" />} top="Download on the" bottom="App Store" />
        </div>
      </Reveal>
    </section>
  );
}

function StoreBadge({ icon, top, bottom }: { icon: React.ReactNode; top: string; bottom: string }) {
  return (
    <Magnetic>
      <Link
        href="/launch"
        className="flex h-[clamp(52px,3.3vw,62px)] w-full min-w-[200px] items-center gap-3 rounded-[12px] border border-white/80 bg-black px-5 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-yellow-500 hover:shadow-[0_14px_30px_-14px_rgba(248,156,34,0.6)] active:scale-[0.97]"
      >
        {icon}
        <span className="flex flex-col text-left leading-tight">
          <span className="text-[11px] uppercase">{top}</span>
          <span className="text-fluid-20 font-bold">{bottom}</span>
        </span>
      </Link>
    </Magnetic>
  );
}
