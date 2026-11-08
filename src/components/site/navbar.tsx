"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { EASE } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/vendor", label: "Become Vendor" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn(
        "fixed inset-x-0 z-50 transition-[top] duration-500 ease-out-expo",
        scrolled ? "top-3" : "top-[clamp(12px,2.6vw,50px)]",
      )}
    >
      <div className="container-site">
        <nav
          aria-label="Main"
          className={cn(
            "relative flex items-center justify-between overflow-hidden rounded-[clamp(16px,1.25vw,24px)] border border-white/70 px-[clamp(18px,1.67vw,32px)] backdrop-blur-2xl dark:border-white/10 backdrop-saturate-[1.8] transition-all duration-500 ease-out-expo",
            "shadow-[0_10px_40px_-12px_rgba(193,42,41,0.18),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.25)]",
            "h-[clamp(78px,6.25vw,120px)]",
            // the launch page sits on deep red, so the glass needs more white to keep the logo readable
            pathname === "/launch" ? "bg-white/80 dark:bg-[#131211]/80" : scrolled ? "bg-white/55 dark:bg-[#131211]/70" : "bg-white/35 dark:bg-[#131211]/45",
          )}
        >
          {/* glass sheen */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-white/10 to-yellow-100/30 dark:from-white/[0.06] dark:via-transparent dark:to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-700 [animation:nav-sheen_7s_ease-in-out_infinite] md:opacity-100"
          />

          <Link href="/" aria-label="Chopbaze home" className="group relative shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Chopbaze"
              width={245}
              height={40}
              preload
              loading="eager"
              className="h-auto w-[clamp(140px,12.77vw,245px)] transition-transform duration-300 group-hover:scale-[1.03] dark:brightness-125"
            />
          </Link>

          <div
            className="relative hidden items-center gap-[clamp(20px,3.13vw,60px)] md:flex"
          >
            <ul className="flex items-center gap-[clamp(4px,0.52vw,10px)]">
              {LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-[clamp(12px,1.15vw,22px)] py-2.5 text-fluid-20 transition-colors duration-300",
                        active ? "font-bold text-red-ink" : "text-foreground hover:text-red-ink",
                      )}
                    >
                      <span className="relative">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ThemeToggle />
            <Magnetic strength={0.25}>
              <GetAppButton />
            </Magnetic>
          </div>

          <div className="relative flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid size-11 place-items-center rounded-xl text-foreground transition-colors hover:bg-white/60 md:hidden dark:hover:bg-white/10"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-2 flex flex-col gap-1 rounded-[20px] border border-white/70 bg-white/60 p-3 dark:border-white/10 dark:bg-[#1a1816]/85 shadow-[0_20px_50px_-20px_rgba(193,42,41,0.3)] backdrop-blur-2xl backdrop-saturate-[1.8] md:hidden"
            >
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base transition-colors hover:text-red-ink",
                    pathname === link.href ? "font-bold text-red-ink" : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <GetAppButton className="mt-1 w-full" onClick={() => setOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function GetAppButton({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/launch"
      onClick={onClick}
      className={cn(
        "group relative inline-flex h-[clamp(46px,3.13vw,60px)] items-center whitespace-nowrap justify-center overflow-hidden rounded-[14px] bg-red-500 px-6 text-fluid-20 font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] md:w-[clamp(132px,8.18vw,157px)]",
        className,
      )}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">Get the App</span>
    </Link>
  );
}
