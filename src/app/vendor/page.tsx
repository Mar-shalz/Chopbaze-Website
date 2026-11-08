import type { Metadata } from "next";
import { VendorHero, VendorReadyCta, WhoShouldApply, WhyJoin } from "@/components/vendor/vendor-sections";
import { Faq, VENDOR_FAQS } from "@/components/site/faq";

export const metadata: Metadata = {
  title: "Become a Food Vendor on Chopbaze",
  description:
    "Showcase your menu on Chopbaze and explore the opportunity to reach customers looking for home-style meals and food for larger gatherings.",
  alternates: { canonical: "/vendor" },
};

export default function VendorPage() {
  return (
    <>
      <VendorHero />
      <WhyJoin />
      <WhoShouldApply />
      <Faq items={VENDOR_FAQS} label="Vendor FAQs" />
      <VendorReadyCta />
    </>
  );
}
