import Image from "next/image";
import { cn } from "@/lib/utils";

// CSS rebuild of the Figma iPhone frame (titanium frame + screen + dynamic island), 437.7×902.15 base
export function PhoneMockup({ screen, alt, className }: { screen: string; alt: string; className?: string }) {
  return (
    <div className={cn("relative aspect-[437.7/902.15]", className)}>
      <div className="absolute inset-0 rounded-[15.16%/7.35%] bg-grey-500 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] ring-[0.73%] ring-[#a0a0a0]/60" />
      <div className="absolute inset-[0.47%_0.98%] rounded-[14.46%/7.02%] bg-[#000100]" />
      <div className="absolute top-[1.42%] right-[2.93%] bottom-[1.42%] left-[2.93%] overflow-hidden rounded-[13.5%/6.35%] bg-[#dae2d3]">
        <Image src={screen} alt={alt} fill sizes="(min-width: 1280px) 22vw, 50vw" className="object-cover object-top" />
      </div>
      <div className="absolute top-[2.85%] left-[36.43%] aspect-[118.8/33.2] w-[27.14%]">
        <Image src="/images/dynamic-island.svg" alt="" fill />
      </div>
    </div>
  );
}
