"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { CalendarClock, ChefHat, LockKeyhole, Scale, ShieldCheck, Truck } from "lucide-react";
import { EASE, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

const SMALL: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: CalendarClock, t: "Order Ahead", d: "Place your order in advance and choose the date and time that suits you." },
  { icon: ShieldCheck, t: "Vetted Kitchens", d: "Every kitchen must meet our vetting and food-quality requirements before it joins." },
  { icon: LockKeyhole, t: "Secure Payments", d: "Pay for your order securely inside the Chopbaze app." },
  { icon: Truck, t: "Delivery Options", d: "See the available delivery options, and any delivery fee, before you pay." },
];

const LITRES = ["1L", "2L", "3L", "4L"];
const NOTE = "Less pepper, and please fry the plantain well done.";

// Dark red continues the How It Works band, so the stepper flows straight into this bento and on into the vendor section.
export function YouControl() {
  return (
    <section className="-mt-px bg-red-700 pt-[clamp(32px,3vw,56px)] pb-[clamp(48px,4.2vw,80px)] text-white">
      <div className="container-site flex flex-col gap-[clamp(28px,2.5vw,48px)]">
        <SectionHeading
          align="center"
          tone="light"
          title="What You Control"
          subtitle="Every order is shaped around what you need, not the other way round."
        />

        <Stagger gap={0.07} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <StaggerItem className="sm:col-span-2 lg:col-span-7">
            <Card icon={Scale} t="Quantities That Fit" d="Order by the litre or in larger quantities, from the options each kitchen offers.">
              {/* each size is its own full container; the dashed one stands for larger orders */}
              <div aria-hidden className="mt-2 flex items-end justify-between gap-[clamp(8px,1vw,18px)]">
                {LITRES.map((l, i) => (
                  <motion.div
                    key={l}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.12 }}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex w-full flex-col items-center" style={{ width: `${56 + i * 14}%` }}>
                      <span className="h-[clamp(5px,0.45vw,8px)] w-[108%] rounded-full bg-white/80" />
                      <span
                        className="mt-[2px] w-full rounded-t-[4px] rounded-b-[12px] bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-[inset_0_-6px_12px_rgba(137,30,29,0.25)]"
                        style={{ height: `clamp(${30 + i * 14}px, ${2.6 + i * 1.2}vw, ${52 + i * 24}px)` }}
                      />
                    </div>
                    <span className="text-fluid-18 font-bold">{l}</span>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.25 + LITRES.length * 0.12 }}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="grid h-[clamp(86px,7.4vw,142px)] w-full place-items-center rounded-t-[6px] rounded-b-[14px] border-2 border-dashed border-white/45 text-fluid-32 font-bold text-white/80">
                    +
                  </span>
                  <span className="text-fluid-18 font-bold whitespace-nowrap">Larger</span>
                </motion.div>
              </div>
            </Card>
          </StaggerItem>

          <StaggerItem className="sm:col-span-2 lg:col-span-5">
            <Card icon={ChefHat} t="Your Preparation Preferences" d="Tell the kitchen how you'd like your food prepared, within the options it can accommodate.">
              <div aria-hidden className="mt-2 rounded-[16px] bg-white p-4 text-grey-500">
                <p className="text-[clamp(13px,0.83vw,16px)] font-bold">Note for the kitchen</p>
                <p className="mt-2 min-h-[3em] rounded-[10px] bg-mist px-3 py-2.5 text-[clamp(13px,0.83vw,16px)] text-grey-400">
                  {NOTE.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.01, delay: 0.6 + i * 0.035 }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                  <span className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.15em] animate-pulse bg-red-500" />
                </p>
              </div>
            </Card>
          </StaggerItem>

          {SMALL.map((s) => (
            <StaggerItem key={s.t} className="lg:col-span-3">
              <Card icon={s.icon} t={s.t} d={s.d} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// Glass card with a soft spotlight that follows the pointer.
function Card({ icon: Icon, t, d, children }: { icon: LucideIcon; t: string; d: string; children?: ReactNode }) {
  const follow = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onPointerMove={follow}
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.06] p-[clamp(20px,1.8vw,34px)]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,50%),rgba(246,207,150,0.16),transparent_45%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
      )}
    >
      <span className="relative grid size-[clamp(48px,3.4vw,64px)] place-items-center rounded-[16px] bg-yellow-500 text-red-700 transition-transform duration-500 ease-out-expo group-hover:-rotate-6">
        <Icon className="size-[46%]" strokeWidth={2.2} />
      </span>
      <h3 className="relative text-fluid-24 font-bold">{t}</h3>
      <p className="relative text-fluid-18 text-white/80">{d}</p>
      {children && <div className="relative mt-auto">{children}</div>}
    </div>
  );
}
