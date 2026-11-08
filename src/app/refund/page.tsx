import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { Faq } from "@/components/site/faq";
import { LEGAL_DOCS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Refund Policy — Chopbaze",
  description: "How cancellations, refunds and order complaints are handled on Chopbaze.",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return (
    <>
      <LegalDocument doc={LEGAL_DOCS.refund} />
      <Faq />
    </>
  );
}
