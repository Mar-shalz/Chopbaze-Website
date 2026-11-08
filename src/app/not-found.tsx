import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export default function NotFound() {
  return (
    <section className="bg-yellow-50 pt-[clamp(160px,14vw,270px)] pb-[clamp(80px,7vw,140px)]">
      <Reveal className="container-site flex flex-col items-center gap-5 text-center">
        <span className="rounded-[12px] border border-yellow-500 bg-yellow-100 px-4 py-2 text-fluid-18 font-bold text-red-ink uppercase">
          Still in the kitchen
        </span>
        <h1 className="text-fluid-64 font-bold">
          This page is <span className="text-red-ink">simmering</span>
        </h1>
        <p className="max-w-[640px] text-fluid-24">
          We&apos;re still cooking this one up. While it simmers, head back home and see what&apos;s on the menu.
        </p>
        <Link
          href="/"
          className="inline-flex h-[clamp(52px,3.34vw,64px)] items-center rounded-[14px] bg-red-500 px-8 text-fluid-24 font-bold text-white transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(193,42,41,0.6)] active:scale-[0.97]"
        >
          Back to Home
        </Link>
      </Reveal>
    </section>
  );
}
