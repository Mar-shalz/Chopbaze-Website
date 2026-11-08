import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { Faq } from "@/components/site/faq";
import { LEGAL_DOCS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service — Chopbaze",
  description: "The terms that apply when you use the Chopbaze website and mobile app.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <LegalDocument doc={LEGAL_DOCS.terms} />
      <Faq />
    </>
  );
}
