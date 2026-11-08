"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Scale, ShieldCheck, Soup, Target, Telescope, Users } from "lucide-react";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

/* ---------------------------------- Hero ---------------------------------- */

const FLOATERS = [
  { src: "/images/about-kitchen.png", alt: "A family cooking together in a home kitchen", pos: "top-[clamp(160px,14.6vw,280px)] left-[4.6%]", shape: "w-[clamp(150px,15.6vw,300px)] aspect-[212/142] rounded-[16px]", delay: 0.5, float: 6 },
  { src: "/images/about-dining-1.png", alt: "Colleagues planning a meal order around a table", pos: "top-[clamp(210px,18.2vw,350px)] right-[4.6%]", shape: "w-[clamp(140px,14.6vw,280px)] aspect-[212/142] rounded-[16px]", delay: 0.65, float: 7 },
];

export function AboutHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background pt-[clamp(220px,18.2vw,350px)] pb-[clamp(110px,10vh,150px)]">
      {FLOATERS.map((f) => (
        <motion.div
          key={f.src}
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: EASE, delay: f.delay }}
          className={cn("absolute max-md:hidden", f.pos)}
        >
          <motion.div
            animate={{ y: [0, -f.float * 2, 0] }}
            transition={{ duration: f.float, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "relative overflow-hidden shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)] ring-4 ring-white",
              f.shape,
            )}
          >
            <Image src={f.src} alt={f.alt} fill sizes="300px" className="object-cover" />
          </motion.div>
        </motion.div>
      ))}

      <div className="container-site flex flex-col items-center gap-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="rounded-[10px] border border-yellow-500 bg-yellow-100 px-4 py-2 text-fluid-16 font-bold text-red-ink uppercase"
        >
          Our Story
        </motion.span>
        <h1 className="text-fluid-56 font-bold">
          <WordReveal immediate text="We're Making" delay={0.3} />{" "}
          <span className="text-red-ink">
            <WordReveal immediate text="Good Food" delay={0.42} />
          </span>
          <br className="max-sm:hidden" />{" "}
          <WordReveal immediate text="Work Better for Everyday Life." delay={0.54} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          className="max-w-[900px] text-fluid-24"
        >
          At Chopbaze, enjoy delicious, home-style Nigerian meals from vetted kitchens, on your terms. Whether you&apos;re
          feeding yourself, your family, or a crowd, we make good food easier.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
          className="mt-[clamp(12px,1.5vw,28px)]"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-[150/100] w-[clamp(130px,11.5vw,220px)] overflow-hidden rounded-full shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)] ring-4 ring-white"
          >
            <Image src="/images/about-dining-2.png" alt="A team sharing food during a work session" fill sizes="220px" className="object-cover" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="absolute bottom-[clamp(24px,4vh,48px)] left-1/2 -translate-x-1/2"
        >
          <Link href="#our-story" className="group flex flex-col items-center gap-2 text-fluid-24 font-bold text-red-ink">
            Explore Our Story
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <span className="h-9 w-px bg-grey-500 dark:bg-white" />
              <ChevronRight className="-mt-2.5 size-4 rotate-90 text-grey-500 dark:text-white" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ Reason behind ------------------------------ */

export function ReasonBehind() {
  return (
    <section id="our-story" className="scroll-mt-24 overflow-hidden bg-red-500 py-[clamp(48px,4.2vw,80px)] text-white">
      <div className="container-site grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <motion.div
          initial={{ opacity: 0, rotate: -25, scale: 0.7 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative mx-auto aspect-[388/373] w-[min(70%,420px)] md:mx-0 md:ml-[8%]"
        >
          <Image src="/images/brand-mark-solid.svg" alt="" fill />
        </motion.div>
        <Reveal className="flex flex-col items-start gap-5">
          <span className="rounded-[8px] bg-white px-4 py-2 text-fluid-16 font-bold text-red-500 uppercase">
            The Reason Behind Chopbaze
          </span>
          <h2 className="text-fluid-28 font-bold">Feeding People Shouldn&apos;t Take Over Your Day.</h2>
          <div className="flex flex-col gap-4 text-fluid-20 text-white/90">
            <p>Every meal matters, but making it happen takes work.</p>
            <p>
              There&apos;s the shopping, the preparation, the cooking and the cleanup. When more people are involved,
              there can be even more to coordinate. And when you turn to an outside kitchen, you want confidence that
              the food will suit your needs.
            </p>
            <p>We believe there should be a better way.</p>
            <p>
              Chopbaze exists to make home-style food easier to enjoy, helping people spend less time managing meals
              and more time living their lives.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Founder story ------------------------------ */

const STORY = [
  "Why We Built Chopbaze",
  "Good Food. More Time for Life.",
  "Chopbaze started with a problem I experienced while working from home: figuring out what to eat, finding it, and cooking it were taking too much of my time and energy.",
  "Between work, deadlines and daily responsibilities, I often found myself too busy to cook and too drained to figure out what to eat. I wanted to eat good food without sacrificing the time and energy I needed for other important things.",
  "Then I realised I wasn't alone. Many professionals, busy couples and families face the same challenge every day.",
  "That inspired us to build Chopbaze, a platform connecting people with verified food vendors and home chefs, making it easier to access quality Nigerian meals, from everyday dishes to bulk meals that last for days.",
  "But our mission goes beyond food. We want to give people back their time and energy — to build businesses, grow their careers, enjoy family, rest and focus on what truly matters.",
  "At Chopbaze, food is what we provide. Time and energy are what we give back.",
  "Chopbaze — Good Food. More Time for Life.",
];

export function FounderStory() {
  return (
    <section className="bg-yellow-50 py-[clamp(48px,4.2vw,80px)]">
      <div className="container-site grid gap-0 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
        <Reveal x={-40} y={0} className="flex flex-col">
          <div className="flex items-center gap-6 bg-[#d98e3a] px-5 py-4 text-grey-500">
            <h2 className="text-fluid-24 font-bold uppercase">Founder&apos;s Story</h2>
            <span className="h-[3px] w-[clamp(60px,6vw,120px)] bg-grey-500" />
          </div>
          <div className="flex flex-col items-center gap-3 px-6 pt-8 pb-10">
            <div className="group relative aspect-[526/566] w-[78%] max-w-[526px] overflow-hidden rounded-[clamp(16px,1.25vw,24px)] bg-grey-50">
              {/* Figma crops the full-length photo to the upper body: 578×622px window centred on the founder */}
              <div className="absolute top-[-28.6%] left-[-50.9%] h-[225%] w-[194%] transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
                <Image
                  src="/images/founder.png"
                  alt="Olofinnika Oluwafemi, CEO and co-founder of Chopbaze, arms crossed in the Chopbaze office"
                  fill
                  sizes="(min-width: 1024px) 50vw, 160vw"
                  className="object-cover"
                />
              </div>
              {/* Figma notch: a trapezoid cut into the top edge with rounded shoulders, filled with the section colour */}
              <svg
                aria-hidden
                viewBox="0 0 200 72"
                preserveAspectRatio="none"
                className="absolute top-0 left-1/2 h-[15.2%] w-[45%] -translate-x-1/2 text-yellow-50"
              >
                <path
                  fill="currentColor"
                  d="M0 0 C14 0 20 3 24 10 L45 60 C48 68 53 72 60 72 L140 72 C147 72 152 68 155 60 L176 10 C180 3 186 0 200 0 Z"
                />
              </svg>
              <span className="absolute top-[7.6%] left-1/2 aspect-[388/373] w-[10%] -translate-x-1/2 -translate-y-1/2 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]">
                <Image src="/images/brand-mark-solid.svg" alt="" fill />
              </span>
            </div>
            <p className="text-fluid-24 font-bold">Olofinnika Oluwafemi</p>
            <p className="-mt-2 text-fluid-16 tracking-wide uppercase">CEO/Co-Founder</p>
          </div>
        </Reveal>
        <Reveal x={40} y={0} className="relative border-2 border-[#f0a040] bg-surface px-[clamp(20px,2.5vw,48px)] py-[clamp(28px,2.5vw,48px)]">
          <span className="absolute -top-px left-1/2 mt-4 size-4 -translate-x-1/2 rounded-full border-4 border-[#f5c27a] bg-[#f0a040]" />
          <div className="mt-6 flex flex-col gap-4 text-fluid-18">
            {STORY.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- Mission & vision ----------------------------- */

const MV = [
  {
    label: "Our Mission",
    icon: Target,
    body: [
      "Our mission is to make home-style food easier to access, personalise and order for everyday life and the occasions that bring people together.",
      "We are starting in Lagos, with a vision to serve more families and gatherings as Chopbaze grows.",
    ],
    tagline: "More Time for Life. Good Food Along the Way.",
  },
  {
    label: "Our Vision",
    icon: Telescope,
    body: [
      "We envision a future where finding good home-style food is a natural part of everyday life, and where the same trusted experience can extend from individual meals to the biggest gatherings.",
      "We're building toward that future one meal, one kitchen and one customer experience at a time.",
    ],
    tagline: "A Trusted Part of How People Eat.",
  },
];

export function MissionVision() {
  return (
    <section className="bg-background py-[clamp(48px,4.2vw,80px)]">
      <div className="container-site flex flex-col gap-[clamp(28px,2.5vw,48px)]">
        <SectionHeading title="Our Mission & Vision" align="center" />
        <Stagger className="grid gap-5 md:grid-cols-2">
          {MV.map(({ label, icon: Icon, body, tagline }) => (
            <StaggerItem key={label}>
              <article className="group h-full overflow-hidden rounded-[16px] bg-surface shadow-[0_10px_40px_-18px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out-expo hover:-translate-y-1.5">
                {/* shortcut: Figma uses 3D target/telescope renders that weren't exportable, an animated icon stands in until the image files are provided */}
                <div className="relative flex h-[clamp(140px,11vw,210px)] items-center justify-center overflow-hidden bg-grey-500">
                  {[0, 1, 2].map((r) => (
                    <motion.span
                      key={r}
                      aria-hidden
                      animate={{ scale: [0.6, 1.6], opacity: [0.35, 0] }}
                      transition={{ duration: 3.6, repeat: Infinity, delay: r * 1.2, ease: "easeOut" }}
                      className="absolute size-[clamp(90px,7vw,140px)] rounded-full border border-white/40"
                    />
                  ))}
                  <Icon
                    strokeWidth={1.25}
                    className="relative size-[clamp(72px,6vw,120px)] text-white/80 transition-transform duration-700 ease-out-expo group-hover:scale-110 group-hover:-rotate-6"
                  />
                </div>
                <div className="flex flex-col gap-5 p-[clamp(20px,2vw,36px)]">
                  <span className="relative w-fit rounded-[10px] border-2 border-grey-500 px-4 py-2 dark:border-foreground text-fluid-18 font-bold uppercase">
                    {label}
                    <span className="absolute -top-1.5 -right-1.5 size-2.5 bg-grey-500" />
                    <span className="absolute -bottom-1.5 -left-1.5 size-2.5 bg-grey-500" />
                  </span>
                  <div className="flex flex-col gap-4 text-fluid-18">
                    {body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  <p className="text-right text-fluid-16 font-bold">{tagline}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------- Core values -------------------------------- */

const VALUES = [
  { t: "Trust Comes First", d: "Good food starts with confidence. We take kitchen vetting, food quality and honest communication seriously because trust is earned through the things we do, not just the things we say." },
  { t: "Food, Your Way", d: "Everyone has their own tastes, preferences and traditions. We believe the food experience should leave room for personal choice, from how food is prepared to the quantity that fits your needs." },
  { t: "Time Matters", d: "Life is bigger than the work it takes to get a meal on the table. We look for better, simpler ways to help people enjoy good food with less effort and more time for what matters." },
  { t: "Care in Every Detail", d: "The little things shape the whole experience. From clear food information to the way we work with kitchens, we pay attention to the details that help customers make informed choices and enjoy their meals." },
  { t: "Own the Experience", d: "We take responsibility for the work we do and the impact it has on others. When challenges arise, we face them honestly, learn from them and work towards better outcomes for customers and kitchens." },
  { t: "Always Getting Better", d: "Building something meaningful requires curiosity, honest feedback and a willingness to improve. We keep learning from the people who use our platform and the kitchens that make it possible, so we can create a better experience over time." },
];

export function CoreValues() {
  return (
    <section className="bg-yellow-50 py-[clamp(48px,4.2vw,80px)]">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
        <Reveal x={-40} y={0} className="flex flex-col justify-between gap-8">
          <span className="w-fit rounded-[10px] border border-yellow-500 bg-yellow-100 px-4 py-2 text-fluid-18 uppercase">
            What Guides Us
          </span>
          <div className="flex flex-col gap-3 lg:mb-[40%]">
            <h2 className="text-fluid-32 font-bold text-red-ink uppercase">Core Values</h2>
            <p className="max-w-[340px] text-fluid-16 font-bold">
              Our values shape how we work, the decisions we make, and the experience we create for everyone who
              becomes part of Chopbaze.
            </p>
          </div>
        </Reveal>
        <Stagger gap={0.08} className="grid gap-x-[clamp(24px,3vw,56px)] gap-y-8 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <StaggerItem key={v.t}>
              <div className="group relative flex flex-col gap-2 pl-0 transition-transform duration-500 ease-out-expo hover:translate-x-1.5">
                <span className="absolute -top-3 -left-1 text-[clamp(40px,3.5vw,64px)] leading-none font-bold text-red-ink/10 select-none dark:text-white/20">
                  0{i + 1}
                </span>
                <h3 className="relative text-fluid-20 font-bold text-red-ink">{v.t}</h3>
                <p className="relative text-fluid-16">{v.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Differentiators ----------------------------- */

const DIFFS = [
  { t: "Food That Fits Your Preferences", d: "Food is personal. Chopbaze gives customers a way to specify how they prefer their food prepared, within the options the kitchen can accommodate.", icon: Soup, tab: "bg-[#ecbdbd]", panel: "bg-[#ecbdbd]", ring: "bg-[#f6dede]" },
  { t: "Vetted Kitchens", d: "We vet kitchens and check food quality because trust matters when someone else is preparing your meal.", icon: ShieldCheck, tab: "bg-[#beede6]", panel: "bg-[#beede6]", ring: "bg-[#dff6f2]" },
  { t: "Quantities for Different Needs", d: "From food by the litre to larger quantities for sharing, customers can explore available options that suit their table.", icon: Scale, tab: "bg-[#fde0ba]", panel: "bg-[#fde0ba]", ring: "bg-[#fef0dc]" },
  { t: "Everyday Meals to Larger Gatherings", d: "We are building for the food people need regularly as well as the occasions that bring more people around the table.", icon: Users, tab: "bg-[#e4bfe9]", panel: "bg-[#e4bfe9]", ring: "bg-[#f2dff4]" },
];

export function Differentiators() {
  return (
    <section className="bg-background py-[clamp(48px,4.2vw,80px)]">
      <div className="container-site flex flex-col gap-[clamp(28px,2.5vw,48px)]">
        <SectionHeading title="What Makes Chopbaze Different?" align="center" />
        <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {DIFFS.map(({ t, d, icon: Icon, tab, panel, ring }) => (
            <StaggerItem key={t}>
              <div className="group relative flex h-full flex-col items-center gap-4 rounded-[16px] bg-surface p-3 pt-6 shadow-[0_10px_36px_-16px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out-expo hover:-translate-y-2">
                <span className={cn("absolute top-0 left-1/2 h-2 w-[40%] -translate-x-1/2 rounded-b-full", tab)} />
                <span
                  className={cn(
                    "grid size-[clamp(48px,3.6vw,68px)] place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:rotate-[-8deg]",
                    ring,
                  )}
                >
                  <Icon className="size-1/2 text-grey-500" strokeWidth={1.6} />
                </span>
                <div className={cn("flex flex-1 flex-col items-center gap-2 rounded-[12px] px-4 py-5 text-center text-grey-500", panel)}>
                  <h3 className="text-fluid-18 font-bold">{t}</h3>
                  <p className="text-fluid-16">{d}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------ People behind ------------------------------ */

const PEOPLE = [
  {
    name: "Oloruntoba Olajide",
    role: "Graphics Designer",
    quote:
      "I believe every great idea deserves to be seen. Through design, I turn ideas into visual stories that capture attention, communicate purpose, and leave a lasting impression.",
    src: "/images/team-oloruntoba.png",
    position: "50% 18%",
  },
  {
    name: "Sikiru Amusa",
    role: "Logistic Manager",
    quote: "Every order matters, no matter the size.",
    src: "/images/team-sikiru.png",
    position: "50% 18%",
  },
  {
    name: "Oluwakemi Alfred",
    role: "Social Media Manager",
    quote:
      "We’re not up creating content just to post on instagram with cool CTA’s and captions, we actually want your boss to start caring about what you eat as his employee and team member",
    src: "/images/team-oluwakemi.png",
    position: "50% 18%",
  },
  {
    name: "Adekunle Ebitanmi",
    role: "Product Designer",
    quote:
      "Designing Chopbaze goes beyond attractive screens and polished layouts. Every section is thoughtfully designed to support the business and serve people better.",
    src: "/images/team-adekunle.png",
    position: "50% 20%",
  },
  {
    name: "Taofiq Ojuolape",
    role: "Data Analyst",
    quote:
      "Chopbaze’s vision of making food more accessible and convenient while helping people save time and enjoy better value. Being part of a team that uses technology and innovation to solve everyday problems makes the work meaningful to me.",
    src: "/images/team-laptop.png",
    position: "38% 30%",
  },
];

// Figma card shapes (1574×563 card, 458×432 photo) as SVG masks, so every corner of the notches stays rounded.
const svgMask = (w: number, h: number, d: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'><path d='${d}'/></svg>`,
  )}")`;
const CARD_MASK = svgMask(
  1574,
  563,
  "M24 0H1550Q1574 0 1574 24V390Q1574 414 1550 414H1249.6Q1237.6 414 1226.7 422.8L1065.5 554.2Q1054.6 563 1040.6 563H24Q0 563 0 539V24Q0 0 24 0Z",
);
const PHOTO_MASK = svgMask(
  458,
  432,
  "M16 0H442Q458 0 458 16V348Q458 364 442 364H357.8Q347.8 364 343.9 373.2L323.1 422.8Q319.2 432 309.2 432H16Q0 432 0 416V16Q0 0 16 0Z",
);
const maskClass = "lg:[mask-image:var(--mask)] lg:[mask-size:100%_100%] lg:[mask-repeat:no-repeat]";

export function PeopleBehind() {
  const [[i, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const last = PEOPLE.length - 1;
  const go = (d: number) => setState(([cur]) => [Math.min(last, Math.max(0, cur + d)), d]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setState(([cur]) => [cur === last ? 0 : cur + 1, 1]), 7000);
    return () => clearTimeout(id);
  }, [i, paused, last]);

  const p = PEOPLE[i];

  return (
    <section className="bg-background">
      <div className="bg-mist py-[clamp(40px,3.5vw,64px)]">
        <Reveal className="container-site flex flex-col items-center gap-2 text-center">
          <h2 className="text-fluid-32 font-bold text-red-ink">The People Behind Chopbaze</h2>
          <p className="max-w-[640px] text-fluid-20">
            We&apos;re building a better way to enjoy home-style food, and it starts with people who care.
          </p>
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mt-3 h-10 w-[3px] origin-top rounded-full bg-gradient-to-b from-red-500 to-transparent"
          />
        </Reveal>
      </div>

      <div className="container-site py-[clamp(40px,3.5vw,64px)]">
        <Reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto w-full max-w-[1575px] lg:aspect-[1574/563]"
        >
          <div
            className={cn("relative overflow-hidden rounded-[clamp(16px,1.2vw,23px)] bg-grey-500 text-white max-lg:p-5 lg:absolute lg:inset-0 lg:rounded-none", maskClass)}
            style={{ "--mask": CARD_MASK } as React.CSSProperties}
          >
            <div aria-hidden className="absolute top-[14.6%] left-[79.7%] aspect-[388/373] w-[17.5%] opacity-[0.06] max-lg:hidden">
              <Image src="/images/brand-mark-solid.svg" alt="" fill />
            </div>

            {/* photo frame with the small stepped cut at its bottom-right corner */}
            <div
              className={cn("relative overflow-hidden rounded-[clamp(10px,0.85vw,16px)] bg-grey-50 max-lg:aspect-[202/190] lg:absolute lg:top-[9.06%] lg:left-[6.54%] lg:h-[76.73%] lg:w-[29.1%] lg:rounded-none", maskClass)}
              style={{ "--mask": PHOTO_MASK } as React.CSSProperties}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={p.src}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image src={p.src} alt={`${p.name}, ${p.role}`} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" style={{ objectPosition: p.position }} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative flex flex-col gap-[clamp(10px,0.9vw,18px)] max-lg:mt-6 lg:absolute lg:top-[8.9%] lg:left-[41.8%] lg:w-[43.6%]">
              <Quote />
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex flex-col gap-[clamp(24px,2.6vw,50px)]"
                >
                  <p className="text-fluid-24 leading-[1.4]">{p.quote}</p>
                  <div className="leading-[1.47]">
                    <p className="text-fluid-24 font-bold">{p.name}</p>
                    <p className="text-fluid-20">{p.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3 lg:absolute lg:top-[92.9%] lg:left-[80.24%] lg:mt-0 lg:w-[10.93%] lg:-translate-y-1/2 lg:justify-between lg:gap-0 lg:[&>button]:w-[46.5%]">
            <NavButton label="Previous team member" disabled={i === 0} onClick={() => go(-1)}>
              <ChevronLeft className="size-[34%]" strokeWidth={2.5} />
            </NavButton>
            <NavButton label="Next team member" disabled={i === last} onClick={() => go(1)}>
              <ChevronRight className="size-[34%]" strokeWidth={2.5} />
            </NavButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NavButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid aspect-square w-[clamp(44px,3.4vw,65px)] place-items-center rounded-full transition-all duration-300 ease-out-expo",
        disabled
          ? "cursor-default bg-[#fdf0dc] text-[#e9c99a]"
          : "bg-[#f6cf96] text-grey-500 hover:scale-110 hover:bg-yellow-300 active:scale-95",
      )}
    >
      {children}
    </button>
  );
}

function Quote() {
  return (
    <svg aria-hidden viewBox="0 0 48 36" className="h-[clamp(20px,1.85vw,36px)] w-auto self-start text-[#5a5a5a]">
      <path
        fill="currentColor"
        d="M0 36V20.4C0 9.6 5.2 2.8 15.6 0l2.2 4.6C12 6.6 9.2 10.4 9 16h8.4v20H0Zm27 0V20.4C27 9.6 32.2 2.8 42.6 0l2.2 4.6C39 6.6 36.2 10.4 36 16h8.4v20H27Z"
      />
    </svg>
  );
}

