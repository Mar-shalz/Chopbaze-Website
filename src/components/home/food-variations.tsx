"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EASE, Reveal } from "@/components/motion/reveal";

// Each card crops a 1536×1024 sprite: a window `w` sprite-px wide (card aspect 368:303) centred on (cx, cy).
type Dish = { name: string; src: string; cx: number; cy: number; w: number };

const SPRITE_W = 1536;
const SPRITE_H = 1024;
const CARD_RATIO = 368 / 303;

function cropStyle({ cx, cy, w }: Dish) {
  const h = w / CARD_RATIO;
  return {
    width: `${(SPRITE_W / w) * 100}%`,
    height: `${(SPRITE_H / h) * 100}%`,
    left: `${(-(cx - w / 2) / w) * 100}%`,
    top: `${(-(cy - h / 2) / h) * 100}%`,
  };
}

const soup = (name: string, cx: number, cy: number): Dish => ({ name, src: "/images/soup-collection.png", cx, cy, w: 361 });
const rice = (name: string, cx: number, cy: number): Dish => ({ name, src: "/images/rice-collection.png", cx, cy, w: 430 });
const swallow = (name: string, cx: number, cy: number): Dish => ({ name, src: "/images/swallow-collection.png", cx, cy, w: 460 });
const chops = (name: string, cx: number, cy: number): Dish => ({ name, src: "/images/small-chops-collection.png", cx, cy, w: 370 });

const CATEGORIES = [
  {
    value: "soups",
    label: "Nigerian Soups",
    dishes: [soup("Egusi and Beef", 202, 258.5), soup("Oha Soup", 583.6, 258.5), soup("Tomato Stew", 202, 572.3), soup("Pepper Soup", 584.6, 572.3)],
  },
  {
    value: "rice",
    label: "Rice Cuisines",
    dishes: [rice("Plain White Rice", 192, 330), rice("Jollof Rice", 573, 330), rice("Fried Rice", 955, 330), rice("Ofada Rice", 573, 742)],
  },
  {
    value: "swallow",
    label: "Swallow",
    dishes: [swallow("Semovita", 200, 312), swallow("Eba", 960, 312), swallow("Pounded Yam", 200, 722), swallow("Amala", 581, 312)],
  },
  {
    value: "small-chops",
    label: "Small Chops",
    dishes: [chops("Samosa", 192, 262), chops("Spring Rolls", 573, 262), chops("Chicken Wings", 192, 850), chops("Peppered Snails", 955, 850)],
  },
];

const SIZES = ["1L", "2L", "3L", "4L"];
const AUTOPLAY_MS = 5000;

export function FoodVariations() {
  const [tab, setTab] = useState("soups");
  const [paused, setPaused] = useState(false);

  // Cycle categories on a timer; hovering the section pauses it, and any tab change restarts the countdown.
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      const next = (CATEGORIES.findIndex((c) => c.value === tab) + 1) % CATEGORIES.length;
      setTab(CATEGORIES[next].value);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [tab, paused]);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="bg-yellow-50 py-[clamp(48px,3.75vw,72px)]"
    >
      <Tabs value={tab} onValueChange={setTab} className="container-site gap-[clamp(28px,2.4vw,46px)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Reveal x={-40} y={0}>
            <h2 className="text-fluid-32 font-bold uppercase">
              Chopbaze <span className="text-red-ink">Food Variations</span>
            </h2>
          </Reveal>
          <Reveal x={40} y={0} className="w-full lg:w-auto">
            <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-[12px] [scrollbar-width:none] lg:w-auto lg:overflow-visible border-2 border-yellow-500 bg-surface p-[clamp(8px,0.83vw,16px)_clamp(10px,1.2vw,23px)] group-data-horizontal/tabs:h-auto">
              {CATEGORIES.map((c) => (
                <TabsTrigger
                  key={c.value}
                  value={c.value}
                  className="relative h-[clamp(40px,2.5vw,48px)] flex-none rounded-[8px] border-0 px-4 text-fluid-16 sm:flex-1 lg:min-w-[clamp(112px,6.98vw,134px)] lg:flex-none font-normal text-foreground transition-colors after:hidden hover:text-red-ink data-active:bg-transparent data-active:font-bold data-active:text-foreground data-active:shadow-none group-data-[variant=default]/tabs-list:data-active:shadow-none dark:text-foreground dark:data-active:border-transparent dark:data-active:bg-transparent focus-visible:ring-0 focus-visible:outline-0"
                >
                  {tab === c.value && (
                    <motion.span
                      layoutId="food-tab"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-[8px] bg-yellow-100"
                    />
                  )}
                  {/* invisible bold copy reserves width so the active weight change never shifts the tabs */}
                  <span className="relative grid whitespace-nowrap">
                    <span aria-hidden className="invisible col-start-1 row-start-1 font-bold">
                      {c.label}
                    </span>
                    <span className="col-start-1 row-start-1">{c.label}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Reveal>
        </div>

        {CATEGORIES.map((c) => (
          <TabsContent key={c.value} value={c.value} forceMount hidden={tab !== c.value}>
            <AnimatePresence mode="wait">
              {tab === c.value && (
                <motion.ul key={c.value} className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {c.dishes.map((dish, i) => (
                    <DishCard key={dish.name} dish={dish} index={i} />
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </TabsContent>
        ))}

        <Reveal className="flex justify-center">
          <Link
            href="/launch"
            className="group inline-flex items-center gap-2.5 rounded-[8px] border border-red-ink px-3.5 py-2.5 text-fluid-24 font-bold text-red-ink transition-all duration-300 ease-out-expo hover:bg-red-500 hover:text-white active:scale-[0.97]"
          >
            Explore More on Chopbaze
            <Image
              src="/images/chevron-forward.svg"
              alt=""
              width={10}
              height={16}
              className="h-4 w-[9.87px] transition-all duration-300 group-hover:translate-x-1 group-hover:brightness-0 group-hover:invert"
            />
          </Link>
        </Reveal>
      </Tabs>
    </section>
  );
}

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className="flex flex-col gap-[clamp(14px,1.04vw,20px)] rounded-[24px] bg-surface p-[clamp(10px,0.78vw,15px)] pb-[clamp(18px,1.25vw,24px)]"
    >
      <div className="relative aspect-[368/303] w-full overflow-hidden rounded-[24px] bg-white">
        <div className="absolute" style={cropStyle(dish)}>
          <Image
            src={dish.src}
            alt={`${dish.name} in a Chopbaze container`}
            fill
            sizes="(min-width: 1280px) 85vw, 200vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 px-[clamp(4px,0.21vw,4px)]">
        <h3 className="text-fluid-24 font-bold">{dish.name}</h3>
        {/* portion sizes are informational here; selection happens in the app */}
        <ul aria-label={`${dish.name} portion sizes`} className="flex gap-2 sm:w-[clamp(200px,12.45vw,239px)]">
          {SIZES.map((s) => (
            <li key={s} className="grid h-[33px] flex-1 place-items-center rounded-[5px] bg-mist text-fluid-16 text-ink select-none">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
