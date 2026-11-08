import type { Metadata } from "next";
import { LaunchCountdown } from "@/components/launch/launch-countdown";

export const metadata: Metadata = {
  title: "Chopbaze App — Launching Soon",
  description: "The Chopbaze app is almost out of the kitchen. Count down with us and get notified the moment it launches.",
  alternates: { canonical: "/launch" },
};

export default function LaunchPage() {
  return <LaunchCountdown />;
}
