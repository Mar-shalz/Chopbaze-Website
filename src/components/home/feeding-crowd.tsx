"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

// Figma: cards rest in greyscale under a full-card shade; hover fades in the colour photo.
// Overlay values were fitted against the Figma prototype render (family: warm multiply; celebrations: dark shade).
const OCCASIONS = [
  {
    title: ["Family Reunions"],
    src: "/images/crowd-family.png",
    color: "/images/crowd-family-color.png",
    alt: "Family laughing together around a table of Nigerian dishes",
    rest: "bg-black/30",
    hoverBase: "bg-[#d0ae54]",
    hoverImage: "mix-blend-multiply opacity-[0.82]",
    hoverShade: "",
    image: { left: "-0.12%", top: "-3.02%", width: "100.16%", height: "106.26%" },
  },
  {
    title: ["Birthdays, Celebrations", "and other Gatherings"],
    src: "/images/crowd-celebration.png",
    color: "/images/crowd-celebration-color.png",
    alt: "Guests serving themselves from a festive buffet at a celebration",
    rest: "bg-[#5e5e5e]/[0.13]",
    hoverBase: "",
    hoverImage: "",
    hoverShade: "bg-[#1e1d27]/[0.46]",
    image: { left: "-0.12%", top: "-3.25%", width: "100.18%", height: "106.29%" },
  },
];

export function FeedingCrowd() {
  return (
    <section id="feeding-a-crowd" className="scroll-mt-28 bg-mist pt-[clamp(40px,2.71vw,52px)] pb-[clamp(40px,2.86vw,55px)]">
      <div className="container-site flex flex-col items-center gap-[clamp(24px,1.67vw,32px)]">
        <Reveal>
          <h2 className="text-center text-fluid-56 font-bold">
            Feeding a <span className="text-yellow-500">Crowd</span>? Let&apos;s Talk{" "}
            <span className="relative inline-block px-[0.17em] text-white">
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
                className="absolute inset-x-0 top-[-0.04em] bottom-[-0.13em] -z-0 origin-left rounded-[10px] bg-yellow-500"
              />
              <span className="relative">Food.</span>
            </span>
          </h2>
        </Reveal>

        <Stagger className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {OCCASIONS.map((o) => (
            <StaggerItem key={o.src}>
              <div className="group relative aspect-[812.5/431] overflow-hidden rounded-[24px] bg-grey-500">
                <div className="absolute transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]" style={o.image}>
                  <Image src={o.src} alt={o.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  <span className={`absolute inset-0 ${o.rest}`} />
                  <div className={`absolute inset-0 isolate opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 ${o.hoverBase}`}>
                    <Image src={o.color} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className={`object-cover ${o.hoverImage}`} />
                    {o.hoverShade && <span className={`absolute inset-0 ${o.hoverShade}`} />}
                  </div>
                </div>
                <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-fluid-40 font-bold text-white">
                  {o.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <Link
            href="/launch"
            className="group inline-flex items-center gap-2.5 rounded-[8px] border border-yellow-500 px-3.5 py-2.5 text-fluid-24 font-bold text-yellow-500 transition-all duration-300 ease-out-expo hover:bg-yellow-500 hover:text-white active:scale-[0.97]"
          >
            Get the App
            <Image
              src="/images/chevron-yellow.svg"
              alt=""
              width={10}
              height={16}
              className="h-4 w-[9.87px] transition-all duration-300 group-hover:translate-x-1 group-hover:brightness-0 group-hover:invert"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
