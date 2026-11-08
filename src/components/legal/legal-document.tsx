"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { LEGAL_DOCS, SUPPORT_EMAIL, type LegalDoc } from "@/content/legal";
import { PageBanner } from "@/components/site/page-banner";
import { cn } from "@/lib/utils";

const TABS = Object.values(LEGAL_DOCS);
const pad = (n: number) => String(n).padStart(2, "0");
const sectionId = (i: number) => `section-${i + 1}`;

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  // Highlight the section nearest the top of the viewport in the "On this page" list
  useEffect(() => {
    const els = doc.sections.map((_, i) => document.getElementById(sectionId(i))).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(els.indexOf(visible[0].target as HTMLElement));
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [doc]);

  const jump = (i: number) => {
    const el = document.getElementById(sectionId(i));
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -120 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageBanner title={doc.name} still>
      <nav aria-label="Legal documents" className="mb-[clamp(24px,2.5vw,48px)] w-fit max-w-full overflow-x-auto rounded-[12px] bg-mist p-1.5">
        <ul className="flex gap-1">
          {TABS.map((t) => {
            const current = t.slug === doc.slug;
            return (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  scroll={false}
                  data-no-transition
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "relative block rounded-[9px] px-4 py-2.5 text-fluid-16 font-bold whitespace-nowrap transition-colors duration-300",
                    current ? "text-white" : "text-foreground hover:text-red-ink",
                  )}
                >
                  {current && <span className="absolute inset-0 rounded-[9px] bg-red-500" />}
                  <span className="relative">{t.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.27fr)_minmax(0,0.73fr)]">
        <aside className="max-lg:hidden">
          <div className="sticky top-32 flex flex-col gap-4">
            <p className="text-fluid-20 font-bold">On this page</p>
            <ol className="relative flex flex-col gap-1 border-l border-grey-50">
              {doc.sections.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    className={cn(
                      "relative flex w-full gap-3 py-1.5 pl-4 text-left text-fluid-16 transition-colors duration-300",
                      active === i ? "font-semibold text-red-ink" : "text-grey-400 hover:text-foreground",
                    )}
                  >
                    {active === i && (
                      <motion.span layoutId="legal-toc" className="absolute top-0 bottom-0 -left-px w-[2px] bg-red-500" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <span className="text-red-ink tabular-nums">{pad(i + 1)}</span>
                    {s.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <article className="flex min-w-0 flex-col gap-[clamp(20px,1.7vw,32px)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-[6px] bg-red-50 px-3 py-1 text-[12px] font-bold tracking-wide text-red-ink uppercase">
              Draft for review
            </span>
            <span className="text-fluid-16 text-grey-300">Effective date: [To be confirmed]</span>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-fluid-32 font-bold">{doc.heading}</h2>
            <p className="text-fluid-18 text-grey-400">{doc.intro}</p>
          </div>
          <div className="rounded-[14px] bg-yellow-50 px-5 py-4">
            <p className="text-fluid-16 font-bold">Before this policy is published</p>
            <p className="mt-1 text-fluid-16 text-grey-400">
              This is draft policy wording, not a final legal notice. Confirm the operating entity [Legal entity name],
              actual practices and all bracketed details, then obtain legal review before publication.
            </p>
          </div>

          {doc.sections.map((s, i) => (
            <section key={s.title} id={sectionId(i)} className="flex scroll-mt-32 flex-col gap-3">
              <h3 className="text-fluid-24 font-bold">
                {pad(i + 1)}. {s.title}
              </h3>
              {s.blocks.map((b, j) =>
                Array.isArray(b) ? (
                  <ul key={j} className="flex flex-col gap-2.5">
                    {b.map((li) => (
                      <li key={li} className="flex gap-3 text-fluid-18 text-grey-400">
                        <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-red-500" />
                        {li}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={j} className="text-fluid-18 text-grey-400">
                    {b}
                  </p>
                ),
              )}
            </section>
          ))}

          <div className="mt-2 rounded-[16px] bg-mist px-6 py-5">
            <p className="text-fluid-20 font-bold">Let&apos;s get your questions answered.</p>
            <p className="mt-1.5 text-fluid-16 text-grey-400">
              For questions about this policy, use the Contact Us form or email {SUPPORT_EMAIL}. Include the policy name
              and, for an order query, your order reference. Never send your password or full payment-card details.
            </p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-2 inline-block text-fluid-16 text-red-ink underline underline-offset-2">
              {SUPPORT_EMAIL}
            </a>
          </div>
        </article>
      </div>
    </PageBanner>
  );
}
