"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

type Cta = { label: string; href: string };

// Cream hero shared by the guide pages: eyebrow pill, H1, intro, two CTAs and an optional photo strip.
export function PageHero({
  eyebrow,
  title,
  intro,
  primary,
  secondary,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  primary: Cta;
  secondary?: Cta;
  image?: { src: string; alt: string };
}) {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section className="relative isolate pb-[clamp(32px,3.4vw,65px)]">
      <div className="bg-yellow-50 pt-[clamp(140px,12.5vw,240px)] pb-[clamp(32px,2.5vw,48px)]">
        <div className="container-site flex flex-col items-center gap-[clamp(14px,1.1vw,22px)] text-center">
          <motion.p
            {...rise(0.15)}
            className="rounded-[12px] border border-yellow-500 bg-yellow-100 px-[clamp(12px,0.94vw,18px)] py-[clamp(8px,0.6vw,12px)] text-[clamp(12px,0.94vw,18px)] font-bold text-red-ink uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h1 {...rise(0.25)} className="max-w-[18em] text-fluid-64 leading-[1.15] font-bold">
            {title}
          </motion.h1>
          <motion.p {...rise(0.4)} className="max-w-[46em] text-fluid-24">
            {intro}
          </motion.p>
          {/* outline action left, filled action right (as on the homepage); equal-width columns */}
          <motion.div {...rise(0.55)} className="mt-2 grid w-full gap-4 sm:inline-grid sm:w-auto sm:grid-cols-2">
            {secondary && (
              <Magnetic className="w-full">
                <Link
                  href={secondary.href}
                  className="inline-flex h-[clamp(52px,3.34vw,64px)] w-full items-center justify-center rounded-[14px] border border-red-ink px-8 text-fluid-20 font-bold whitespace-nowrap text-red-ink transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-red-500 hover:text-white active:scale-[0.97]"
                >
                  {secondary.label}
                </Link>
              </Magnetic>
            )}
            <Magnetic className="w-full">
              <Link
                href={primary.href}
                className="group relative inline-flex h-[clamp(52px,3.34vw,64px)] w-full items-center justify-center overflow-hidden rounded-[14px] bg-red-500 px-8 text-fluid-20 font-bold whitespace-nowrap text-white transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(193,42,41,0.6)] active:scale-[0.97]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{primary.label}</span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {image && <HeroImage {...image} />}
    </section>
  );
}

// Owns the parallax hook so useScroll only runs when the photo (its target) is rendered.
function HeroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div className="container-site relative">
      <div aria-hidden className="absolute top-0 bottom-[40%] left-1/2 -z-10 w-screen -translate-x-1/2 bg-yellow-50" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
        className="relative aspect-[1640/560] min-h-[220px] w-full overflow-hidden rounded-[clamp(20px,1.67vw,32px)]"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-x-0 -inset-y-[9%]">
          <Image src={src} alt={alt} fill preload sizes="(min-width: 1920px) 1640px, 100vw" className="object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
}
