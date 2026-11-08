import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const TESTIMONIALS = [
  {
    quote:
      "We needed good food for a large gathering within our budget. The portions, taste, and pricing made it a great choice.",
    name: "Feyisaraa",
    role: "HR Specialist",
  },
  {
    quote:
      "We needed good food for a large gathering within our budget. The portions, taste, and pricing made it a great choice.",
    name: "Feyisaraa",
    role: "HR Specialist",
  },
  {
    quote:
      "We needed good food for a large gathering within our budget. The portions, taste, and pricing made it a great choice.",
    name: "Feyisaraa",
    role: "HR Specialist",
  },
];

export function Testimonials({ title = "What Our Customers Say About Us" }: { title?: string }) {
  return (
    <section className="bg-cream pt-[clamp(40px,2.6vw,50px)] pb-[clamp(48px,3.13vw,60px)]">
      <div className="container-site flex flex-col gap-[clamp(32px,2.5vw,48px)]">
        <SectionHeading
          title={title}
          subtitle="Join thousands of people who experience excellence using our mobile app, whether as a user or a vendor."
        />
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <StaggerItem key={i}>
              <figure className="group relative flex min-h-[clamp(260px,17.8vw,342px)] flex-col justify-center gap-8 overflow-hidden rounded-[8px] bg-yellow-50 px-[clamp(24px,2.66vw,51px)] dark:ring-1 dark:ring-white/10 py-10 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-28px_rgba(193,42,41,0.45)]">
                <div className="flex flex-col gap-4">
                  <Image
                    src="/images/avatar.png"
                    alt={`${t.name}, ${t.role}`}
                    width={56}
                    height={56}
                    className="size-[clamp(44px,2.92vw,56px)] rounded-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <blockquote className="text-fluid-24">{t.quote}</blockquote>
                </div>
                <figcaption className="text-fluid-24 font-bold">
                  {t.name} - {t.role}
                </figcaption>
                <Image
                  src="/images/testimonial-mark.svg"
                  data-theme-art
                  alt=""
                  aria-hidden
                  width={128}
                  height={124}
                  className="pointer-events-none absolute right-[-6.94%] bottom-[-4.09%] h-auto w-[24.02%] transition-transform duration-700 ease-out-expo group-hover:-rotate-12 group-hover:scale-110"
                />
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
