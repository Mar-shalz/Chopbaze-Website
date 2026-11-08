import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "right" | "center";
  tone?: "red" | "light";
  className?: string;
};

export function SectionHeading({ title, subtitle, align = "left", tone = "red", className }: SectionHeadingProps) {
  const right = align === "right";
  const center = align === "center";
  const line = (extra?: string) => (
    <span
      aria-hidden
      className={cn("relative h-[clamp(5px,0.42vw,8px)] w-[clamp(48px,7.6vw,146px)] shrink-0 overflow-hidden", extra)}
    >
      {tone === "red" ? (
        <Image src="/images/line-red.svg" alt="" fill className="object-fill dark:brightness-[1.7]" />
      ) : (
        <span className="absolute inset-0 bg-white" />
      )}
    </span>
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        right ? "items-end text-right" : center ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <Reveal x={center ? 0 : right ? 40 : -40} y={center ? 24 : 0} className="flex items-center gap-[clamp(16px,1.93vw,37px)]">
        {!right && line(center ? "max-sm:hidden" : undefined)}
        <h2 className={cn("text-fluid-32 font-bold uppercase", tone === "red" ? "text-red-ink" : "text-white")}>
          <WordReveal text={title} />
        </h2>
        {(right || center) && line("max-sm:hidden")}
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={cn("max-w-[847px] text-fluid-24 font-bold", tone === "red" ? "text-foreground" : "text-white")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
