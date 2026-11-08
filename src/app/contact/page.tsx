import type { Metadata } from "next";
import { PageBanner } from "@/components/site/page-banner";
import { ContactForm } from "@/components/contact/contact-form";
import { Faq, VENDOR_FAQS } from "@/components/site/faq";

export const metadata: Metadata = {
  title: "Contact Chopbaze | Customer and Vendor Support",
  description:
    "Contact Chopbaze for help with an order, questions about the platform or enquiries about becoming a food vendor.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us">
        <ContactForm />
      </PageBanner>
      <Faq label="Customer FAQs" />
      <Faq id="vendor-faq" items={VENDOR_FAQS} label="Vendor FAQs" />
    </>
  );
}
