"use client";

import Image from "next/image";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { StoreButton } from "@/components/site/store-button";
import { Magnetic } from "@/components/motion/magnetic";
import { WordReveal } from "@/components/motion/word-reveal";

export function DownloadCta() {
  // the launch page is itself the download destination
  return ["/launch", "/vendor"].includes(usePathname()) ? null : <DownloadBanner />;
}

function DownloadBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const womanY = useTransform(scrollYProgress, [0, 1], ["14%", "-4%"]);
  const manY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const patternY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      id="get-the-app"
      className="relative scroll-mt-24 overflow-hidden bg-red-500 pt-[clamp(48px,3.44vw,66px)]"
    >
      <motion.div
        aria-hidden
        style={{ y: patternY }}
        className="pointer-events-none absolute top-[-8.5%] left-1/2 aspect-[1916/1083] w-[99.8%] min-w-[900px] -translate-x-1/2 mix-blend-color-burn"
      >
        <div className="absolute inset-[-6.02%_-2.02%_-5.34%_-2%]">
          <Image src="/images/cta-pattern.svg" alt="" fill unoptimized />
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center text-white">
        <Reveal className="flex flex-col items-center gap-2.5">
          <h2 className="text-fluid-48 font-bold uppercase">
            <WordReveal text="Better Food. Less Work. More Time." />
          </h2>
          <p className="max-w-[640px] text-fluid-32 tracking-[-0.02em]">
            Discover what a more convenient home-style food experience can look like.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic className="w-full sm:w-auto">
          <StoreButton
            href="/launch"
            variant="outline-light"
            label="Become a Vendor"
            className="w-full sm:w-[clamp(260px,19.69vw,378px)]"
          />
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
          <StoreButton
            href="/launch"
            variant="light"
            label="Get the Chopbaze App"
            className="w-full sm:w-[clamp(260px,19.69vw,378px)]"
          />
          </Magnetic>
        </Reveal>
      </div>

      {/* Stage starts at Figma y=356 of an 845px-tall section; people overflow and are clipped */}
      <div className="relative mt-[clamp(24px,2.4vw,46px)] aspect-[1920/489] min-h-[320px] w-full">
        <motion.div
          style={{ y: womanY }}
          className="absolute top-[14.38%] left-[29.01%] aspect-[606.12/1201.69] w-[31.57%] max-md:top-[10%] max-md:left-[4%] max-md:w-[52%]"
        >
          <div className="absolute top-[-0.01%] left-[-13.06%] h-[100.03%] w-[132.21%]">
            <Image
              src="/images/cta-woman.png"
              alt="Smiling woman showing the Chopbaze customer app on her phone"
              fill
              sizes="(min-width: 768px) 42vw, 60vw"
              className="object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          style={{ y: manY }}
          className="absolute top-0 left-[43.31%] aspect-[600.4/1190.92] w-[31.27%] max-md:left-[40%] max-md:w-[52%]"
        >
          <div className="absolute top-0 left-[-23.07%] h-[99.99%] w-[132.23%]">
            <Image
              src="/images/cta-man.png"
              alt="Excited man holding the Chopbaze vendor app"
              fill
              sizes="(min-width: 768px) 42vw, 60vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
