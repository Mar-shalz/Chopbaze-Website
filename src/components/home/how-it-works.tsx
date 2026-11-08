"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { EASE, Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { StoreButton } from "@/components/site/store-button";
import { PhoneMockup } from "@/components/site/phone-mockup";
import { cn } from "@/lib/utils";

type Step = {
  label: string;
  title: string;
  body: string;
  panel: string;
  bar: string;
  dark: string;
  bubble: string;
  arrow: string;
};

const STEPS: Step[] = [
  {
    label: "Download the App",
    title: "Get the Chopbaze App",
    body: "Your favourite meals are just a tap away. Download Chopbaze to order freshly prepared food for yourself, your family, or your next gathering.",
    panel: "#ecbdbd",
    bar: "#ecbdbd",
    dark: "#542222",
    bubble: "#ba9595",
    arrow: "/images/arrow-s1-next.svg",
  },
  {
    label: "Select from a Vendor",
    title: "Explore List of Vendors",
    body: "Browse our vetted food vendors and discover meals made to satisfy your cravings.",
    panel: "#fde0ba",
    bar: "#fcd199",
    dark: "#4e402e",
    bubble: "#c9bdad",
    arrow: "/images/arrow-s2-next.svg",
  },
  {
    label: "Customize & Pay",
    title: "Customise Your Order",
    body: "Choose your favourite dishes, select your portions, and tell us how you like your food prepared.",
    panel: "#beede6",
    bar: "#beede6",
    dark: "#22544d",
    bubble: "#97bdb8",
    arrow: "/images/arrow-s3-next.svg",
  },
  {
    label: "Track Your Order",
    title: "Track, Receive & Enjoy",
    body: "Follow your order in real time, get your food delivered, and enjoy every bite.",
    panel: "#edbeed",
    bar: "#edbeed",
    dark: "#542254",
    bubble: "#ba95ba",
    arrow: "/images/arrow-s4-prev.svg",
  },
];

const AUTOPLAY_MS = 10000;

export function HowItWorks() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const step = STEPS[index];

  const go = useCallback((next: number) => {
    setState(([cur]) => {
      const clamped = Math.max(0, Math.min(STEPS.length - 1, next));
      return [clamped, clamped >= cur ? 1 : -1];
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setState(([cur]) => [(cur + 1) % STEPS.length, 1]), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(index + 1);
    else if (info.offset.x > 60) go(index - 1);
  };

  return (
    <section id="how-it-works" className="relative isolate scroll-mt-24 bg-background pt-[clamp(48px,3.13vw,60px)] pb-[clamp(40px,3.75vw,72px)]">
      <div className="container-site relative flex flex-col gap-[clamp(32px,2.5vw,48px)]">
        <SectionHeading
          title="How Chopbaze Works"
          subtitle="From choosing your favourite vendor to getting your meals delivered, ordering with Chopbaze is easy."
        />

        <div className="relative">
        {/* Dark red band starts 48.4% down the stepper (Figma y=2676) and runs into the vendor section */}
        <div
          aria-hidden
          className="absolute top-[48.4%] bottom-[calc(-1*clamp(40px,3.75vw,72px))] left-1/2 -z-10 w-screen -translate-x-1/2 bg-red-700"
        />
        <Reveal
          className="flex flex-col gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(index + 1);
            if (e.key === "ArrowLeft") go(index - 1);
          }}
        >
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="How Chopbaze works"
            className="relative overflow-hidden rounded-[24px] max-lg:h-[480px] lg:aspect-[1634/656]"
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={index}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 80 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -80 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1.1, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={onDragEnd}
                aria-label={`Step ${index + 1} of ${STEPS.length}`}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <StepSlide index={index} />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            animate={{ backgroundColor: step.bar }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex h-[clamp(84px,7.4vw,142px)] items-center justify-between rounded-[24px] px-[clamp(16px,1.9vw,36.5px)] max-md:justify-center"
          >
            <div className="flex items-center gap-[clamp(8px,0.78vw,15px)]">
              {STEPS.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Step ${i + 1}: ${s.label}`}
                  aria-current={i === index ? "step" : undefined}
                  className={cn(
                    "relative grid size-[clamp(44px,4.17vw,80px)] place-items-center rounded-full text-[clamp(22px,2.27vw,43.6px)] leading-none text-white transition-[opacity,transform,background-color] duration-500 ease-out-expo hover:scale-105 active:scale-95",
                    i === index ? "font-bold opacity-100" : "opacity-30 hover:opacity-60",
                  )}
                  style={{ backgroundColor: step.dark }}
                >
                  {i + 1}
                  {i === index && !paused && (
                    <svg aria-hidden viewBox="0 0 80 80" className="absolute inset-0 -rotate-90">
                      <motion.circle
                        key={index}
                        cx="40"
                        cy="40"
                        r="38"
                        fill="none"
                        stroke="white"
                        strokeOpacity="0.95"
                        strokeWidth="4.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            {/* mobile: swipe or tap a number instead */}
            <div className="flex items-center gap-3 max-md:hidden">
              <ArrowButton src={step.arrow} label="Previous step" flip disabled={index === 0} onClick={() => go(index - 1)} />
              <ArrowButton src={step.arrow} label="Next step" disabled={index === STEPS.length - 1} onClick={() => go(index + 1)} />
            </div>
          </motion.div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  src,
  label,
  flip,
  disabled,
  onClick,
}: {
  src: string;
  label: string;
  flip?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative size-[clamp(44px,4.17vw,80px)] rounded-full transition-all duration-300 ease-out-expo",
        disabled ? "opacity-20" : "hover:scale-110 active:scale-95",
        flip && "rotate-180",
      )}
    >
      <Image src={src} alt="" fill />
    </button>
  );
}

const pct = (v: number, base: number) => `${(v / base) * 100}%`;
const PANEL_W = 1634;
const PANEL_H = 656;
const SIDE_W = 950;

function StepText({ index, align = "left", children }: { index: number; align?: "left" | "center"; children?: ReactNode }) {
  const s = STEPS[index];
  const center = align === "center";
  return (
    <Stagger className={cn("flex flex-col gap-[clamp(16px,1.15vw,22px)]", center && "items-center text-center")}>
      <div className={cn("flex flex-col gap-3", center && "items-center")}>
        <Item className="flex items-center gap-4">
          <span
            className="grid size-[clamp(36px,2.5vw,48px)] shrink-0 place-items-center rounded-full text-fluid-24 font-bold"
            style={{ backgroundColor: s.bubble }}
          >
            {index + 1}
          </span>
          <span className="text-fluid-24">{s.label}</span>
        </Item>
        <Item className={cn("flex flex-col gap-1", center && "items-center")}>
          <h3 className="text-fluid-32 font-bold">{s.title}</h3>
          <p className="text-fluid-24">{s.body}</p>
        </Item>
      </div>
      {children && <Item>{children}</Item>}
    </Stagger>
  );
}

function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Pop({ children, className, style, delay = 0.2 }: { children: ReactNode; className?: string; style?: CSSProperties; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={cn("absolute", className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function BrandMark({ style, src = "/images/brand-mark.svg" }: { style: CSSProperties; src?: string }) {
  return (
    <div aria-hidden className="absolute aspect-[388/373] max-lg:hidden" style={style}>
      <Image src={src} alt="" fill />
    </div>
  );
}

function StepSlide({ index }: { index: number }) {
  const s = STEPS[index];
  const textBox = "absolute w-[calc(100%-32px)] max-lg:!left-4 max-lg:!top-6 lg:w-[37.94%]";

  if (index === 0) {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-[24px] text-grey-500" style={{ backgroundColor: s.panel }}>
        <BrandMark style={{ left: pct(-61, PANEL_W), bottom: pct(-39.98, PANEL_H), width: pct(388, PANEL_W) }} />
        <Pop
          className="max-lg:!top-auto max-lg:!right-[-8%] max-lg:!bottom-0 max-lg:!left-auto max-lg:!h-[56%] max-lg:!w-auto"
          style={{ left: pct(887.86, PANEL_W), top: pct(30, PANEL_H), width: pct(645.04, PANEL_W), aspectRatio: "645.04 / 799" }}
        >
          <Image src="/images/step1-man.png" alt="Excited man holding up the Chopbaze app on his phone" fill sizes="40vw" className="object-cover object-top" />
        </Pop>
        <div className={textBox} style={{ left: pct(132, PANEL_W), top: pct(94, PANEL_H) }}>
          <StepText index={0}>
            <StoreButton href="/launch" label="Download" className="h-[clamp(54px,3.65vw,70px)] w-[clamp(190px,12.5vw,240px)] gap-4 text-fluid-20" />
          </StepText>
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-[24px] text-grey-500" style={{ backgroundColor: s.panel }}>
        <BrandMark src="/images/brand-mark-teal.svg" style={{ left: pct(-61, PANEL_W), top: pct(337, PANEL_H), width: pct(388, PANEL_W) }} />
        <div className="absolute top-[7.62%] left-1/2 w-[calc(100%-32px)] -translate-x-1/2 lg:w-[37.94%]">
          <StepText index={2} align="center" />
        </div>
        <Pop
          className="-translate-x-1/2 max-lg:!top-auto max-lg:!bottom-[-14%] max-lg:!w-[min(125%,440px)] max-lg:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          style={{ left: "calc(50% - 0.02%)", top: pct(228, PANEL_H), width: pct(901.22, PANEL_W), aspectRatio: "901.22 / 685" }}
        >
          <Image src="/images/step3-hands.png" alt="Hands holding two phones showing a meal and the Chopbaze checkout" fill sizes="60vw" className="object-cover object-top" />
        </Pop>
      </div>
    );
  }

  const isTrack = index === 3;
  return (
    <div className="absolute inset-0 flex gap-5 text-grey-500">
      <div
        className="relative hidden h-full w-[40.64%] shrink-0 overflow-hidden rounded-[24px] lg:block"
        style={
          isTrack
            ? { backgroundColor: s.panel }
            : { background: "radial-gradient(50% 50% at 50% 50%, #ca8c3b 0%, #e3ae6a 50%, #fcd199 100%)" }
        }
      >
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
          className="absolute"
          style={
            isTrack
              ? { left: pct(-4, 664), top: pct(-31, PANEL_H), width: pct(681.13, 664), aspectRatio: "681.13 / 1021.02" }
              : { left: pct(-6, 664), top: pct(-126, PANEL_H), width: pct(670.65, 664), aspectRatio: "670.65 / 1137.25" }
          }
        >
          <Image
            src={isTrack ? "/images/step4-man.png" : "/images/step2-man.png"}
            alt={isTrack ? "Smiling man checking his order status on the Chopbaze app" : "Man browsing Chopbaze vendors on his phone"}
            fill
            sizes="40vw"
            className="object-cover"
          />
        </motion.div>
      </div>
      <div className="relative h-full flex-1 overflow-hidden rounded-[24px]" style={{ backgroundColor: s.panel }}>
        <BrandMark
          style={
            isTrack
              ? { left: pct(-61, SIDE_W), bottom: pct(-28.98, PANEL_H), width: pct(388, SIDE_W) }
              : { left: pct(-61, SIDE_W), top: pct(337, PANEL_H), width: pct(388, SIDE_W) }
          }
        />
        <div
          className={cn(textBox, "lg:w-[65.26%]")}
          style={isTrack ? { left: pct(75, SIDE_W), top: pct(65, PANEL_H) } : { left: pct(74, SIDE_W), top: pct(57, PANEL_H) }}
        >
          <StepText index={index} />
        </div>
        {isTrack ? (
          <Pop className="max-lg:!top-[40%] max-lg:!left-1/2 max-lg:!w-[190px] max-lg:-translate-x-1/2" style={{ left: pct(373.39, SIDE_W), top: pct(294, PANEL_H), width: pct(496.09, SIDE_W) }}>
            <PhoneMockup screen="/images/step4-screen.png" alt="Chopbaze Track Order screen" />
          </Pop>
        ) : (
          <Pop
            className="max-lg:!top-[38%] max-lg:!left-1/2 max-lg:!h-auto max-lg:!w-[310px] max-lg:-translate-x-1/2"
            style={{ left: pct(98, SIDE_W), top: pct(228, PANEL_H), width: pct(751.52, SIDE_W), height: pct(1001.15, PANEL_H) }}
          >
            <div className="flex size-full items-center justify-center">
              <div className="w-[58.24%] rotate-[22.66deg]">
                <PhoneMockup screen="/images/step2-screen.png" alt="Chopbaze vendor list screen" />
              </div>
            </div>
          </Pop>
        )}
      </div>
    </div>
  );
}
