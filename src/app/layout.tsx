import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { PageTransition } from "@/components/motion/page-transition";
import "lenis/dist/lenis.css";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const lufga = localFont({
  variable: "--font-lufga",
  display: "swap",
  src: [
    { path: "../fonts/LufgaRegular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/LufgaMedium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/LufgaSemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/LufgaBold.ttf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Chopbaze | Better Food, Less Work, More Time",
  description:
    "Discover home-style Nigerian food from vetted kitchens with Chopbaze. Choose available quantities, specify preparation preferences and order through the mobile app.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lufga.variable} h-full overflow-x-clip antialiased`}>
      <head>
        {/* Apply a saved dark choice before first paint (no flash). Light is the default: dark is opt-in via the navbar switch. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <PageTransition />
        </SmoothScroll>
      </body>
    </html>
  );
}
