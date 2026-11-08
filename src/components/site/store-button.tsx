import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const VARIANTS = {
  red: {
    box: "h-[clamp(48px,3.02vw,58px)] rounded-[8px] bg-red-500 px-4 text-white text-[clamp(15px,0.9375vw,18px)] hover:bg-red-700",
    icons: { src: "/images/store-icons.svg", w: 41, h: 17.49, cls: "w-[clamp(32px,2.14vw,41px)]" },
    divider: { src: "/images/divider-white.svg", h: 26 },
    gap: "gap-3",
  },
  "outline-light": {
    box: "h-[clamp(52px,3.34vw,64px)] rounded-[14px] border border-white px-6 text-white text-fluid-24 font-bold hover:bg-white/10",
    icons: { src: "/images/store-icons-white.svg", w: 47, h: 20.05, cls: "w-[clamp(36px,2.45vw,47px)]" },
    divider: { src: "/images/divider-white-2.svg", h: 16.5 },
    gap: "gap-2.5",
  },
  light: {
    box: "h-[clamp(52px,3.34vw,64px)] rounded-[14px] bg-white px-6 text-red-500 text-fluid-24 font-bold hover:bg-[#fef5e9]",
    icons: { src: "/images/store-icons-red.svg", w: 47, h: 20.05, cls: "w-[clamp(36px,2.45vw,47px)]" },
    divider: { src: "/images/divider-red.svg", h: 16.5 },
    gap: "gap-2.5",
  },
} as const;

type StoreButtonProps = {
  href: string;
  label: string;
  variant?: keyof typeof VARIANTS;
  className?: string;
};

export function StoreButton({ href, label, variant = "red", className }: StoreButtonProps) {
  const v = VARIANTS[variant];
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex shrink-0 items-center justify-center font-bold tracking-[-0.01em] whitespace-nowrap transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.35)] active:translate-y-0 active:scale-[0.97]",
        v.box,
        v.gap,
        className,
      )}
    >
      <Image
        src={v.icons.src}
        alt="Google Play and App Store"
        width={v.icons.w}
        height={v.icons.h}
        className={cn("h-auto transition-transform duration-300 group-hover:scale-110", v.icons.cls)}
      />
      <Image src={v.divider.src} alt="" width={2} height={v.divider.h} style={{ width: 2, height: v.divider.h }} />
      <span>{label}</span>
    </Link>
  );
}
