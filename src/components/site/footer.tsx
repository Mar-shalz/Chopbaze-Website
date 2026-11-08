import Link from "next/link";
import Image from "next/image";
import { DownloadCta } from "@/components/site/download-cta";
import { FooterLink } from "@/components/site/footer-link";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Food for Gatherings", href: "/food-for-gatherings" },
      { label: "Become a Vendor", href: "/vendor" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Vendor FAQ", href: "/vendor#faq" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/chopbaze", icon: "/images/social-facebook.svg", size: "size-[24px]" },
  { label: "X (Twitter)", href: "https://x.com/chopbaze", icon: "/images/social-x.svg", size: "size-[24px]" },
  { label: "Instagram", href: "https://www.instagram.com/chopbaze", icon: "/images/social-instagram.svg", size: "size-[20px]" },
  {
    label: "WhatsApp",
    href: "https://wa.me/2348116164485?text=Hello%20Chopbaze!%20I%27d%20like%20to%20get%20in%20touch.",
    icon: "/images/social-whatsapp.svg",
    size: "size-[24px]",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@chopbaze", icon: "/images/social-tiktok.svg", size: "h-[22.5px] w-[19.5px]" },
];

export function Footer() {
  return (
    <footer>
      <DownloadCta />
      <div className="relative overflow-hidden bg-yellow-100 pt-[clamp(56px,4.79vw,92px)] pb-[clamp(96px,10.5vw,202px)]">
        <Image
          src="/images/footer-wordmark.svg"
          data-theme-art
          alt=""
          aria-hidden
          width={1800}
          height={244}
          className="pointer-events-none absolute bottom-[-4px] left-1/2 h-auto w-[93.75%] -translate-x-1/2 select-none"
        />
        <div className="container-site relative flex flex-col gap-[clamp(40px,3.34vw,64px)]">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3.5">
                <Link href="/" aria-label="Chopbaze home" className="w-fit">
                  <Image
                    src="/images/logo.svg"
                    alt="Chopbaze"
                    width={245}
                    height={40}
                    className="h-auto w-[clamp(150px,12.77vw,245px)]"
                  />
                </Link>
                <p className="max-w-[30em] text-[clamp(15px,0.99vw,19px)] leading-[1.47] text-grey-400">
                  Nigeria&apos;s leading bulk food ordering platform connecting <br className="max-sm:hidden" />
                  offices, event planners and caterers with the finest <br className="max-sm:hidden" />
                  authentic Nigerian cuisine at scale.
                </p>
              </div>
              <ul className="flex items-center gap-3.5">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Chopbaze on ${s.label}`}
                      className="grid size-[42px] place-items-center rounded-[12px] bg-red-500 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:rotate-[-6deg] hover:bg-red-700 hover:shadow-[0_10px_20px_-8px_rgba(193,42,41,0.6)]"
                    >
                      <Image
                        src={s.icon}
                        alt=""
                        width={24}
                        height={24}
                        className={s.size}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav
              aria-label="Footer"
              className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:flex lg:w-[45.3%] lg:justify-between"
            >
              {COLUMNS.map((col) => (
                <div key={col.title} className="flex flex-col gap-2.5">
                  <p className="text-fluid-20 font-semibold uppercase">{col.title}</p>
                  <ul className="flex flex-col gap-3.5">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <FooterLink
                          href={l.href}
                          className="group inline-flex items-center gap-1.5 text-fluid-18 tracking-normal transition-colors hover:text-red-ink"
                        >
                          <span className="h-[1.5px] w-0 bg-red-500 transition-all duration-300 ease-out-expo group-hover:w-3" />
                          {l.label}
                        </FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex justify-center border-t-[0.875px] border-dashed border-red-ink pt-[clamp(28px,2.19vw,42px)]">
            <p className="text-center text-fluid-18">
              © 2026 Chopbaze Ltd. All rights reserved. Made with{" "}
              <span className="inline-block animate-pulse" aria-label="love">
                ❤️
              </span>{" "}
              in Nigeria.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
