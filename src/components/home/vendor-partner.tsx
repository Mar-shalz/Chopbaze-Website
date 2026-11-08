"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { animate, motion, useInView } from "motion/react";
import { EASE, Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

// Every size inside the card is `--u` × Figma px, so the 1642×785 composition scales as one piece.
const u = (px: number) => `calc(var(--u) * ${px})`;
const pct = (v: number, base: number) => `${(v / base) * 100}%`;
const W = 1642;
const H = 785;

export function VendorPartner() {
  return (
    <section className="bg-red-700 pb-[clamp(40px,3.6vw,69px)]">
      <div className="container-site flex flex-col gap-[clamp(24px,1.67vw,32px)]">
        <SectionHeading
          align="right"
          tone="light"
          title="Partner With Us As A Vendor"
          subtitle="Reach more customers, get paid quickly, and grow your business with a platform built for you."
          className="[&_p]:max-w-[666px]"
        />

        <Reveal y={60}>
          <div
            className="@container relative aspect-[1642/785] w-full overflow-hidden rounded-[clamp(16px,1.25vw,24px)] bg-yellow-50 [--u:calc(100cqw/1642)] max-md:aspect-[343/420] max-md:[--u:calc(100cqw*0.46/439)]"
          >
            <motion.div
              aria-hidden
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
              className="absolute"
              style={{ left: pct(-48, W), top: pct(520, H), width: pct(1836, W), height: pct(356, H) }}
            >
              <div className="absolute inset-[-8.46%_-1.37%_-8.02%_-1.65%]">
                <Image src="/images/vendor-scribble.svg" alt="" fill />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              className="absolute max-md:!top-[5%] max-md:!left-[5%] max-md:!h-auto max-md:!w-[46%] max-md:aspect-[439/364]"
              style={{ left: pct(111, W), top: pct(80, H), width: pct(439, W), height: pct(364, H) }}
            >
              <div className="size-full animate-float">
                <OrderCard />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
              className="absolute max-md:!top-auto max-md:!bottom-[-12%] max-md:!left-[-25%] max-md:!h-auto max-md:!w-[150%] max-md:aspect-[1224/816]"
              style={{ left: pct(209, W), top: pct(38, H), width: pct(1224, W), height: pct(816, H) }}
            >
              <Image
                src="/images/vendor-chef.png"
                alt="Smiling chef in a Chopbaze apron welcoming new vendors"
                fill
                sizes="(min-width: 1920px) 1224px, 75vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
              className="absolute max-md:hidden"
              style={{ left: pct(672, W), top: pct(622, H), width: pct(297, W), height: pct(84, H) }}
            >
              <Link
                href="/launch"
                className="group flex size-full items-center justify-between rounded-[10px] bg-grey-500/50 backdrop-blur-sm transition-colors duration-300 hover:bg-grey-500/75"
                style={{ paddingInline: u(22), gap: u(24) }}
              >
                <span className="flex items-center" style={{ gap: u(10) }}>
                  <span className="relative" style={{ width: u(40), height: u(17) }}>
                    <Image src="/images/store-icons-sm.svg" alt="" fill />
                  </span>
                  <span className="w-px bg-white" style={{ height: u(22) }} />
                  <span className="font-bold text-white" style={{ fontSize: `max(12px, ${u(26)})`, letterSpacing: "-0.01em" }}>
                    Download
                  </span>
                </span>
                <span
                  className="relative -scale-y-100 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ width: u(30), height: u(30) }}
                >
                  <Image src="/images/arrow-up-right.svg" alt="" fill />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
              className="absolute max-md:!top-auto max-md:!right-[5%] max-md:!bottom-[5%] max-md:!left-auto max-md:!h-auto max-md:!w-[41%] max-md:aspect-[390/364]"
              style={{ left: pct(1219, W), top: pct(80, H), width: pct(390, W), height: pct(364, H) }}
            >
              <div className="size-full animate-float [animation-delay:-3s]">
                <StatsCard />
              </div>
            </motion.div>
          </div>

        </Reveal>
      </div>
    </section>
  );
}

function CountUp({ to, decimals = 0, className, style }: { to: number; decimals?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const format = (v: number) =>
    v.toLocaleString("en-NG", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 3.6,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => (node.textContent = format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} style={style}>
      {format(to)}
    </span>
  );
}

function OrderCard() {
  return (
    <div
      className="flex size-full flex-col justify-between border-solid border-[#e8e8e8] bg-white text-grey-500 md:opacity-80 dark:md:opacity-100"
      style={{ borderWidth: u(1.562), padding: u(24.994), borderRadius: u(24) }}
    >
      <div className="flex flex-col" style={{ gap: u(27) }}>
        <div className="flex items-center justify-between">
          <p className="font-bold text-red-500" style={{ fontSize: u(28.118), lineHeight: 1.47, letterSpacing: "-0.01em" }}>
            Order received
          </p>
          <motion.span
            className="relative"
            style={{ width: u(53.112), height: u(53.112) }}
            animate={{ rotate: [0, -14, 12, -8, 6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
          >
            <span className="absolute inset-[5.21%_11.46%_5.19%_13.54%]">
              <Image src="/images/bell.svg" alt="" fill />
            </span>
          </motion.span>
        </div>
        <div
          className="flex flex-col font-medium text-grey-500"
          style={{ gap: u(6.249), fontSize: u(21.87), lineHeight: 1.47, letterSpacing: "-0.01em" }}
        >
          <p>2.5 Litres of Jollof rice</p>
          <p>5 portion of Turkey</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold" style={{ fontSize: u(37.198), lineHeight: 1.47, letterSpacing: "-0.01em" }}>
          Total
        </p>
        <div className="flex items-center" style={{ gap: u(6.663) }}>
          <span className="relative" style={{ width: u(26.335), height: u(24.579) }}>
            <Image src="/images/naira.svg" alt="Naira" fill />
          </span>
          <CountUp
            to={85000}
            decimals={2}
            className="font-bold"
            style={{ fontSize: u(31.094), lineHeight: 1.47, letterSpacing: "-0.01em" }}
          />
        </div>
      </div>
    </div>
  );
}

function StatsCard() {
  const stat = { fontSize: u(16), lineHeight: 1.47, letterSpacing: "-0.01em" } as const;
  const caption = { fontSize: u(10), letterSpacing: "-0.01em" } as const;
  return (
    <div className="relative size-full overflow-hidden bg-red-500 text-white" style={{ borderRadius: u(24) }}>
      <div className="absolute flex items-center" style={{ left: u(24), top: u(40), gap: u(8) }}>
        <span className="relative" style={{ width: u(49), height: u(49) }}>
          <Image src="/images/avatar-ring.svg" alt="" fill />
          <span
            className="absolute overflow-hidden rounded-full bg-[#832f0f]"
            style={{ left: u(4.59), top: u(4.59), width: u(39.813), height: u(39.813) }}
          >
            <span className="absolute inset-[19.29%_8.56%_1.4%_11.07%]">
              <Image src="/images/avatar-man.svg" alt="" fill />
            </span>
          </span>
        </span>
        <span className="flex flex-col">
          <span className="flex items-center" style={{ gap: u(2) }}>
            <span className="font-bold" style={stat}>
              Josi’s Kitchen
            </span>
            <span className="relative" style={{ width: u(16), height: u(16) }}>
              <Image src="/images/verified.svg" alt="Verified" fill />
            </span>
          </span>
          <span style={{ fontSize: u(12), lineHeight: 1.47 }}>Soups and local meals</span>
        </span>
      </div>

      <div className="absolute" style={{ left: u(23), top: u(123), width: u(342), height: u(203.519) }}>
        <div className="absolute inset-x-0 bg-yellow-500/40" style={{ top: u(2), height: u(86), borderRadius: u(8) }}>
          <div
            className="absolute left-1/2 flex -translate-x-1/2 items-center justify-between"
            style={{ top: u(13.5), width: u(318) }}
          >
            <div className="flex flex-col" style={{ gap: u(2) }}>
              <div className="flex items-start justify-between" style={{ width: u(123) }}>
                <span className="font-medium" style={{ fontSize: u(14), lineHeight: 1.47 }}>
                  Referral bonus
                </span>
                <span
                  className="grid place-items-center bg-yellow-300 font-bold text-grey-500"
                  style={{ width: u(20), height: u(20), borderRadius: u(4), fontSize: u(12) }}
                >
                  0
                </span>
              </div>
              <span style={caption}>Earn more for referring other vendors</span>
            </div>
            <span className="flex items-center" style={{ gap: u(8), fontSize: u(12), lineHeight: 1.47 }}>
              View Earnings
              <span className="relative" style={{ width: u(7.4), height: u(12) }}>
                <Image src="/images/chevron-white-sm.svg" alt="" fill />
              </span>
            </span>
          </div>
        </div>

        <div
          className="absolute inset-x-0 flex flex-col bg-white text-grey-500"
          style={{ top: u(66), padding: u(16), gap: u(10), borderRadius: u(8) }}
        >
          <span className="font-medium" style={{ fontSize: u(14), lineHeight: 1.47 }}>
            Performance Overview
          </span>
          <div className="flex items-center justify-between">
            <Stat icon="/images/icon-cart.svg" label="Total Orders" caption={caption} stat={stat}>
              <CountUp to={1002} />
            </Stat>
            <Divider />
            <Stat icon="/images/icon-naira-green.svg" boxed label="Total Earnings" caption={caption} stat={stat}>
              <CountUp to={10000000} />
            </Stat>
            <Divider />
            <Stat icon="/images/icon-star.svg" label="Average Rating" caption={caption} stat={stat}>
              <CountUp to={4} decimals={1} />
            </Stat>
          </div>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <span className="self-stretch bg-[#b5b5b5]" style={{ width: u(0.5) }} />;
}

function Stat({
  icon,
  boxed,
  label,
  caption,
  stat,
  children,
}: {
  icon: string;
  boxed?: boolean;
  label: string;
  caption: CSSProperties;
  stat: CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center" style={{ gap: u(4), minWidth: u(58) }}>
      <div className="flex flex-col items-center" style={{ gap: u(2) }}>
        {boxed ? (
          <span
            className="grid place-items-center bg-[#f0fee9]"
            style={{ width: u(32), height: u(32), borderRadius: u(8) }}
          >
            <span className="relative" style={{ width: u(16), height: u(14.933) }}>
              <Image src={icon} alt="" fill />
            </span>
          </span>
        ) : (
          <span className="relative" style={{ width: u(32), height: u(32) }}>
            <Image src={icon} alt="" fill />
          </span>
        )}
        <span className="font-bold" style={stat}>
          {children}
        </span>
      </div>
      <span style={caption}>{label}</span>
    </div>
  );
}
