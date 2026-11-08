import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Cake,
  CalendarClock,
  Clock,
  CookingPot,
  Gift,
  HandHeart,
  Heart,
  PartyPopper,
  Salad,
  SlidersHorizontal,
  Soup,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";

/* --------------------------- Food for Gatherings --------------------------- */

// Illustrated cards (no photos) so this page doesn't repeat imagery used elsewhere on the site.
const OCCASIONS: { t: string; d: string; icons: [LucideIcon, LucideIcon, LucideIcon]; tone: string }[] = [
  {
    t: "Family Reunions",
    d: "Bring everyone back to the table with home-style dishes in the quantities your family needs.",
    icons: [Users, Heart, UtensilsCrossed],
    tone: "from-[#c12a29] to-[#891e1d]",
  },
  {
    t: "Birthdays and Celebrations",
    d: "From jollof rice to small chops, find food for the party in one place.",
    icons: [Cake, PartyPopper, Gift],
    tone: "from-[#f89c22] to-[#e07a1a] text-grey-500",
  },
  {
    t: "Corporate Lunches",
    d: "Feed your team with home-style meals for meetings, work sessions and office events.",
    icons: [Briefcase, Salad, Clock],
    tone: "from-[#2f5d50] to-[#173a31]",
  },
  {
    t: "Community and Group Meals",
    d: "Plan food for community gatherings, group meetings and the occasions that bring people together.",
    icons: [HandHeart, CookingPot, Soup],
    tone: "from-[#5b2a6e] to-[#33163f]",
  },
];

export function Occasions() {
  return (
    <section className="bg-background py-[clamp(48px,4.2vw,80px)]">
      <div className="container-site flex flex-col gap-[clamp(28px,2.5vw,48px)]">
        <SectionHeading title="Food for Every Occasion" subtitle="Whatever brings your people together, plan the food in one place." />
        <Stagger gap={0.08} className="grid gap-4 md:grid-cols-2">
          {OCCASIONS.map(({ t, d, icons: [Big, Mid, Small], tone }) => (
            <StaggerItem key={t}>
              <article className={`group relative isolate flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-[24px] bg-gradient-to-br p-[clamp(20px,2vw,36px)] ${tone.includes("text-") ? tone : `text-white ${tone}`}`}>
                {/* icon still life: three outlined objects at different scales */}
                <div aria-hidden className="absolute inset-0 -z-10">
                  <span className="absolute -top-[12%] -right-[6%] aspect-square w-[52%] rounded-full bg-white/[0.07]" />
                  <Big className="absolute top-[10%] right-[8%] size-[34%] text-white/25 transition-transform duration-[1.2s] ease-out-expo group-hover:-rotate-6 group-hover:scale-105" strokeWidth={1.2} />
                  <Mid className="absolute top-[14%] right-[44%] size-[16%] rotate-[-10deg] text-yellow-300/70 transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-2" strokeWidth={1.4} />
                  <Small className="absolute top-[46%] right-[40%] size-[11%] rotate-[12deg] text-white/40 transition-transform duration-[1.2s] ease-out-expo group-hover:translate-x-2" strokeWidth={1.6} />
                </div>
                <h3 className="text-fluid-32 font-bold">{t}</h3>
                <p className="mt-2 max-w-[30em] text-fluid-18 opacity-90">{d}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const PLAN: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Users, t: "Count Your Guests", d: "Start with how many people you're feeding and how many dishes you'd like to serve." },
  { icon: UtensilsCrossed, t: "Choose Dishes and Quantities", d: "Pick from available soups, rice dishes, swallow and small chops, in the quantities each kitchen offers." },
  { icon: SlidersHorizontal, t: "Add Your Preferences", d: "Tell the kitchen how you'd like your food prepared, within the options it can accommodate." },
  { icon: CalendarClock, t: "Order Ahead", d: "Choose the date and time you need your food, then place your order in the Chopbaze app." },
];

export function PlanSteps() {
  return (
    <section className="bg-mist py-[clamp(48px,4.2vw,80px)]">
      <div className="container-site flex flex-col gap-[clamp(28px,2.5vw,48px)]">
        <SectionHeading align="right" title="Plan Your Gathering" subtitle="Four simple steps from guest list to table." />
        <Stagger gap={0.08} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PLAN.map(({ icon: Icon, t, d }, i) => (
            <StaggerItem key={t}>
              <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-[24px] bg-surface p-[clamp(20px,1.8vw,34px)]">
                <span aria-hidden className="absolute -top-2 right-3 text-[clamp(64px,5.5vw,104px)] leading-none font-bold text-red-ink/[0.07] select-none">
                  0{i + 1}
                </span>
                <span className="grid size-[clamp(48px,3.4vw,64px)] place-items-center rounded-full bg-red-50 text-red-ink">
                  <Icon className="size-[44%]" strokeWidth={2.2} />
                </span>
                <h3 className="text-fluid-24 font-bold">{t}</h3>
                <p className="text-fluid-18 text-grey-400">{d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function BiggerOrderCta() {
  return (
    <section className="bg-background py-[clamp(40px,3.5vw,64px)]">
      <div className="container-site">
        <Reveal y={40}>
          <div className="relative isolate flex flex-col items-start gap-6 overflow-hidden rounded-[28px] bg-grey-500 p-[clamp(24px,3.4vw,64px)] text-white ring-white/10 lg:flex-row dark:ring-1 lg:items-center lg:justify-between">
            <div aria-hidden className="absolute -top-1/3 -right-[10%] -z-10 aspect-square w-[45%] rounded-full bg-red-500/40 blur-[90px]" />
            <div className="flex max-w-[40em] flex-col gap-3">
              <h2 className="text-fluid-40 font-bold">Planning Something Bigger?</h2>
              <p className="text-fluid-20 text-white/80">
                Larger orders are a core part of Chopbaze. Tell us about your event and we&apos;ll help you explore the
                available options.
              </p>
            </div>
            <div className="grid w-full shrink-0 gap-3 sm:w-auto sm:grid-cols-2">
              <Link
                href="/contact"
                className="inline-flex h-[clamp(52px,3.34vw,64px)] items-center justify-center rounded-[14px] bg-yellow-500 px-8 text-fluid-20 font-bold whitespace-nowrap text-grey-500 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-yellow-300 active:scale-[0.97]"
              >
                Contact Us
              </Link>
              <Link
                href="/launch"
                className="inline-flex h-[clamp(52px,3.34vw,64px)] items-center justify-center rounded-[14px] border border-white px-8 text-fluid-20 font-bold whitespace-nowrap transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.97]"
              >
                Get the Chopbaze App
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
