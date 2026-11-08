"use client";

import Image from "next/image";
import Link from "next/link";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const FAQS = [
  {
    q: "What is Chopbaze?",
    a: "Chopbaze is a bulk food marketplace that connects individuals, families, businesses, and event organizers with trusted food vendors for convenient, reliable, and affordable bulk meal orders.",
  },
  {
    q: "What kind of food can I order?",
    a: "You can order a variety of meals, including rice dishes, soups, stews, swallows, proteins, snacks, breakfast meals, corporate lunches, and event catering.",
  },
  {
    q: "How do I place an order?",
    a: "Browse available vendors, select your preferred meals, choose your quantity, provide your delivery details, and complete your payment. We'll coordinate the rest.",
  },
  {
    q: "Are the vendors on Chopbaze verified?",
    a: "Yes. Every vendor goes through a verification process before joining our platform to help ensure quality, reliability, and food safety.",
  },
  {
    q: "Can I schedule my order in advance?",
    a: "Absolutely. You can place orders ahead of time and choose the delivery date and time that best suits your schedule.",
  },
  {
    q: "What if there's a problem with my order?",
    a: "If you experience any issues with your order, contact our support team immediately. We'll work with you and the vendor to resolve the issue as quickly as possible.",
  },
  {
    q: "How can I become a Chopbaze vendor?",
    a: 'Simply click "Become a Vendor", complete the registration form, and submit the required information. Our team will review your application and contact you with the next steps.',
  },
  {
    q: "Why should I order through Chopbaze instead of contacting vendors directly?",
    a: "Chopbaze makes ordering easier by giving you access to multiple verified vendors in one place, secure payments, dependable delivery coordination, and dedicated customer support, all without the hassle of contacting different vendors individually.",
  },
];

export const VENDOR_FAQS = [
  {
    q: "Does Chopbaze accept every food business?",
    a: "No. Every kitchen must meet our vetting and food-quality requirements before it can join Chopbaze.",
  },
  {
    q: "What kind of food can I offer?",
    a: "Home-style food, prepared in bulk. Chopbaze focuses on food for everyday meals and larger gatherings, so we work with kitchens that can cook in quantity.",
  },
  {
    q: "Can my kitchen fulfil larger orders?",
    a: "Larger orders are central to Chopbaze. During onboarding, we'll discuss the quantities your kitchen can reliably prepare and fulfil.",
  },
  {
    q: "How do customers find my food?",
    a: "Once approved, your food listings appear in the Chopbaze mobile app, where customers can browse and order them, subject to our listing and ordering process.",
  },
  {
    q: "How do I apply?",
    a: "Download the Chopbaze Vendor app and complete the application. Make sure every detail you provide is accurate and can be verified. False or misleading information may lead to your account being restricted or removed from Chopbaze.",
  },
  {
    q: "Are there fees for joining?",
    a: "No. At this stage, there are no onboarding fees, commissions or other commercial charges for vendors.",
  },
];

export function Faq({
  items = FAQS,
  label = "FAQs",
  id = "faq",
}: {
  items?: { q: string; a: string }[];
  label?: string;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-28 bg-mist py-[clamp(32px,3.54vw,68px)]">
      <div className="container-site">
        <Reveal y={48} className="flex flex-col gap-12 rounded-[28px] bg-surface px-[clamp(20px,3.49vw,67px)] py-[clamp(32px,5.52vw,106px)] lg:flex-row lg:justify-between lg:gap-10">
          <div className="flex flex-col justify-between gap-10 max-lg:contents lg:w-[32.4%]">
            <div className="flex flex-col gap-4">
              <span className="w-fit rounded-[10px] border border-red-ink bg-red-50 px-[21px] py-[9px] text-fluid-32 font-bold text-red-ink">
                {label}
              </span>
              <h2 className="text-fluid-56 leading-[1.47] font-bold">
                <span className="lg:whitespace-nowrap">Frequently Asked</span> <br className="max-lg:hidden" />
                Questions
              </h2>
            </div>
            <div className="flex flex-col gap-3 max-lg:order-last">
              <p className="text-fluid-28 font-bold">Still have a Question?</p>
              <p className="max-w-[460px] text-fluid-20">
                Don&apos;t worry! We&apos;re always happy to help. You&apos;re a valued Chopbazer, and we&apos;re here
                to make sure you have all the answers you need.
              </p>
              <Link
                href="/contact"
                className="group relative inline-flex h-[clamp(52px,3.34vw,64px)] w-fit items-center justify-center overflow-hidden rounded-[14px] bg-red-500 px-6 text-fluid-24 font-bold text-white transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(193,42,41,0.6)] active:scale-[0.97] sm:w-[clamp(160px,9.74vw,187px)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Contact Us</span>
              </Link>
            </div>
          </div>

          <Stagger gap={0.06} className="lg:w-[59.7%]">
            <Accordion type="single" collapsible className="gap-3">
              {items.map((item, i) => (
                <StaggerItem key={item.q}>
                  <AccordionItem
                    value={`faq-${i}`}
                    className="group/item rounded-[16px] border border-grey-50 bg-mist transition-[border-color,box-shadow] duration-300 not-last:border-b hover:border-red-ink/40 data-open:border-red-ink data-open:shadow-[0_18px_40px_-28px_rgba(193,42,41,0.5)]"
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between gap-6 rounded-[16px] p-[clamp(20px,1.67vw,32px)] text-left outline-none transition-[padding] duration-300 group-data-open/item:pb-3 focus-visible:ring-3 focus-visible:ring-red-500/40">
                        <span className="text-fluid-18 font-medium text-ink transition-colors duration-300 group-data-open/item:font-bold group-data-open/item:text-red-ink">
                          {item.q}
                        </span>
                        <span className="relative size-4 shrink-0">
                          <span className="absolute inset-[-6.25%] transition-all duration-300 ease-out-expo group-data-open/item:rotate-90 group-data-open/item:opacity-0">
                            <Image src="/images/faq-plus.svg" alt="" fill className="dark:invert" />
                          </span>
                          <span className="absolute inset-x-[-6.25%] top-1/2 h-[2px] -translate-y-1/2 -rotate-90 opacity-0 transition-all duration-300 ease-out-expo group-data-open/item:rotate-0 group-data-open/item:opacity-100">
                            <Image src="/images/faq-minus.svg" alt="" fill className="dark:invert" />
                          </span>
                        </span>
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionContent className="h-auto px-[clamp(20px,1.67vw,32px)] pt-0 pb-[clamp(20px,1.67vw,32px)] text-fluid-18 text-ink [&_p]:max-w-[900px]">
                      <p>{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </Accordion>
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
