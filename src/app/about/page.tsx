import type { Metadata } from "next";
import {
  AboutHero,
  CoreValues,
  Differentiators,
  FounderStory,
  MissionVision,
  PeopleBehind,
  ReasonBehind,
} from "@/components/about/about-sections";
import { Faq } from "@/components/site/faq";

export const metadata: Metadata = {
  title: "About Chopbaze | Our Story, Mission and Values",
  description:
    "Learn how Chopbaze is making home-style Nigerian food easier to enjoy, from everyday meals to the gatherings that bring people together.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ReasonBehind />
      <FounderStory />
      <MissionVision />
      <CoreValues />
      <Differentiators />
      <PeopleBehind />
      <Faq />
    </>
  );
}
