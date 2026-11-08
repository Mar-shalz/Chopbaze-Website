"use client";

import { useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

// The <html> class is the source of truth (set before paint by the script in layout.tsx).
const subscribe = (onChange: () => void) => {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
};
const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  const ref = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const next = !isDark();
    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
    };

    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) {
      apply();
      return;
    }
    // Reveal the new theme as a circle growing out of the switch
    const r = ref.current.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
      className={cn(
        "group relative h-9 w-[68px] shrink-0 rounded-full border p-1 transition-colors duration-500",
        "border-grey-500/15 bg-gradient-to-r from-[#fef5e9] to-white shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]",
        "dark:border-white/15 dark:from-[#2a2724] dark:to-[#1a1816] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]",
        "focus-visible:ring-3 focus-visible:ring-red-500/40 focus-visible:outline-none",
        className,
      )}
    >
      {/* knob carries a contrast disc: its filled half turns over when the theme flips */}
      <span
        className={cn(
          "relative grid size-7 place-items-center rounded-full transition-[translate,background-color,color,box-shadow] duration-500 ease-out-expo",
          "bg-grey-500 text-white shadow-[0_4px_10px_-2px_rgba(0,0,0,0.35)]",
          "dark:translate-x-8 dark:bg-yellow-500 dark:text-grey-500 dark:shadow-[0_0_16px_1px_rgba(248,156,34,0.45)]",
        )}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-4 transition-transform duration-700 ease-out-expo group-hover:scale-110 dark:rotate-180"
        >
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}
