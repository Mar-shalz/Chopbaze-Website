import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";
import { Faq } from "@/components/site/faq";
import { LEGAL_DOCS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — Chopbaze",
  description: "How Chopbaze collects, uses and protects your personal information when you use our website and app.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <LegalDocument doc={LEGAL_DOCS.privacy} />
      <Faq />
    </>
  );
}
