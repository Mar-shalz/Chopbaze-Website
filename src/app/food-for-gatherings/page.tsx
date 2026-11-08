import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { FoodVariations } from "@/components/home/food-variations";
import { BiggerOrderCta, Occasions, PlanSteps } from "@/components/guides/guide-sections";
import { Faq } from "@/components/site/faq";

export const metadata: Metadata = {
  title: "Food for Gatherings and Events | Chopbaze",
  description:
    "Explore home-style food options for celebrations, family gatherings and group meals with Chopbaze. Find available food through the mobile app.",
  alternates: { canonical: "/food-for-gatherings" },
};

export default function FoodForGatheringsPage() {
  return (
    <>
      <PageHero
        eyebrow="Food for Gatherings"
        title={
          <>
            Food for Gatherings <span className="text-red-ink">and Events</span>
          </>
        }
        intro="Explore home-style food for celebrations, family gatherings and group meals, and find what's available in the Chopbaze app."
        primary={{ label: "Get the Chopbaze App", href: "/launch" }}
        secondary={{ label: "Talk to Us", href: "/contact" }}
      />
      <Occasions />
      <PlanSteps />
      <FoodVariations />
      <BiggerOrderCta />
      <Faq />
    </>
  );
}
