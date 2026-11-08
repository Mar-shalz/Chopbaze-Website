import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FoodVariations } from "@/components/home/food-variations";
import { HowItWorks } from "@/components/home/how-it-works";
import { YouControl } from "@/components/home/you-control";
import { VendorPartner } from "@/components/home/vendor-partner";
import { FeedingCrowd } from "@/components/home/feeding-crowd";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/site/faq";

// Canonical lives here, not in the root layout, so other pages don't inherit "/"
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <FoodVariations />
      <HowItWorks />
      <YouControl />
      <VendorPartner />
      <FeedingCrowd />
      <Testimonials />
      <Faq />
    </>
  );
}
