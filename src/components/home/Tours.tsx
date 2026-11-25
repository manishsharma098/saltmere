"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/motion";

const TOURS = [
  {
    slug: "sunset-fishing",
    name: "Sunset fishing trip",
    blurb: "Out past the breakwater as the light turns. Queenfish and trevally on the feed, cold drinks in the cooler, the skyline glowing.",
    price: "3 hours, from AED 850",
    img: "/images/fishing/trip-sunset-1.jpg",
    pos: "45% 50%",
    alt: "Trolling rods in their holders on a boat's stern, the sun setting over the sea",
  },
  {
    slug: "inshore-half-day",
    name: "Inshore half day",
    blurb: "Light tackle along the reefs and channels close to the coast. Queenfish, trevally and barracuda, with the towers never far away.",
    price: "4 hours, from AED 1,100",
    img: "/images/fishing/trip-inshore-1.jpg",
    pos: "68% 50%",
    alt: "An angler on a boat lifting a fish out of calm water on a bent rod",
  },
  {
    slug: "bottom-fishing",
    name: "Bottom fishing",
    blurb: "A slow, steady morning over the reefs and wrecks. Hammour, sheri and snapper from the deep, a captain who knows where to drop.",
    price: "4 hours, from AED 1,100",
    img: "/images/fishing/trip-bottom-1.jpg",
    pos: "50% 50%",
    alt: "A spotted grouper swimming over a reef",
  },
  {
    slug: "deep-sea-trolling",
    name: "Deep sea trolling",
    blurb: "A full day in blue water with the spread out. Kingfish, longtail tuna and, in season, sailfish. You take the strikes.",
    price: "8 hours, from AED 2,000",
    img: "/images/fishing/trip-trolling-1.jpg",
    pos: "66% 50%",
    alt: "A sportfishing boat trolling on deep blue water under white clouds",
  },
  {
    slug: "dawn-to-dusk",
    name: "Dawn to dusk",
    blurb: "The long one. Leave in the dark, fish the far grounds all day, be home for dinner. Troll, jig and drop, as the sea allows.",
    price: "12 hours, from AED 3,100",
    img: "/images/fishing/trip-dawn-to-dusk-1.jpg",
    pos: "50% 55%",
    alt: "A fishing boat on the horizon at first light, the sun rising behind it",
  },
];

const SHADE = "linear-gradient(0deg, #040b14c7 0%, #040b142e 62%)";

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden className="block flex-none text-accent-soft">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9 6.65s6.938-.542 7.915.435S17.35 15 17.35 15m-.85-7.5l-10 10"
    />
  </svg>
);

/** Desktop (>=1200): five photo strips; the hovered one opens (flex 3.2 vs 1) and shows blurb + price. */
function TourStrips() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex h-[680px] w-full flex-row items-start gap-3 bg-[#040b14]">
      {TOURS.map((t, i) => {
        const open = i === active;
        return (
          <Link
            key={t.slug}
            href={`/tours/${t.slug}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className="relative h-full w-px cursor-pointer overflow-clip rounded-[20px] no-underline transition-[flex-grow] duration-700 ease-[cubic-bezier(.25,.8,.25,1)] motion-reduce:transition-none"
            style={{ flex: `${open ? 3.2 : 1} 0 0` }}
          >
            {/* fixed-width photo, centred and cropped by the strip */}
            <div className="absolute inset-0 flex items-center justify-center overflow-clip">
              <div className="relative h-full w-[600px] flex-none">
                <Image src={t.img} alt={t.alt} fill sizes="600px" className="object-cover" style={{ objectPosition: t.pos }} />
              </div>
            </div>
            <div className="absolute inset-0" style={{ background: SHADE }} />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-[10px] p-[26px]">
              <p className="m-0 w-full font-sans text-[14px] font-medium leading-[1.55] text-[#ffffffc7]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className={`m-0 w-full font-display font-medium leading-[1.02] tracking-[-0.035em] text-white ${
                  open ? "text-[38.4px] min-[1400px]:text-[48px]" : "text-[21.6px] min-[1400px]:text-[26px]"
                }`}
              >
                {t.name}
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="details"
                    className="flex w-full min-w-[300px] flex-col items-start gap-[14px]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15, ease: [0.25, 0.8, 0.25, 1] } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  >
                    <p className="m-0 w-full max-w-[440px] font-sans text-[16px] leading-[1.55] text-[#ffffffc7]">{t.blurb}</p>
                    <div className="flex w-min items-center gap-2">
                      <p className="m-0 whitespace-pre font-sans text-[16px] font-bold leading-[1.3] text-accent-soft">{t.price}</p>
                      <ArrowUpRight />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** Tablet / phone (<1200): horizontal swipe row of 304 x 405 cards; first card starts centred in the viewport. */
function TourSwipeRow() {
  return (
    <div className="relative -mx-4 flex w-screen flex-row items-start gap-3 overflow-x-auto px-[calc(50vw-152px)] [scrollbar-width:none] tab:-mx-6 desk:hidden [&::-webkit-scrollbar]:hidden">
      {TOURS.map((t, i) => (
        <Link
          key={t.slug}
          href={`/tours/${t.slug}`}
          className="relative flex h-[405px] w-[304px] flex-none flex-col items-center justify-end gap-[10px] overflow-clip rounded-[20px] p-[22px] text-center no-underline"
        >
          <Image src={t.img} alt={t.alt} fill sizes="304px" className="object-cover" style={{ objectPosition: t.pos }} />
          <div className="absolute inset-0" style={{ background: SHADE }} />
          <p className="relative m-0 w-full font-sans text-[14px] font-medium leading-[1.55] text-[#ffffffc7]">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="relative m-0 w-full font-display text-[28.8px] font-medium leading-[1.02] tracking-[-0.035em] text-white min-[390px]:text-[31.2px] tab:text-[36px]">
            {t.name}
          </h3>
          <p className="relative m-0 w-full font-sans text-[15px] leading-[1.55] text-[#ffffffc7]">{t.blurb}</p>
          <p className="relative m-0 w-full font-sans text-[16px] font-bold leading-[1.3] text-accent-soft">{t.price} ↗</p>
        </Link>
      ))}
    </div>
  );
}

export default function Tours() {
  return (
    <section className="relative flex w-full flex-col items-center pt-24 tab:pt-[97px] desk:pt-[144px] wide:pt-[180px]" aria-label="Trips">
      <div className="mx-auto flex w-full max-w-[1392px] flex-col items-start px-4 tab:px-6 desk:px-9 wide:px-10">
        <div className="relative flex w-full max-w-[900px] flex-col items-center gap-5 self-center pb-8 tab:pb-9 desk:items-start desk:self-start desk:pb-[54px] wide:pb-16">
          <Reveal className="w-full">
            <h2 className="m-0 text-center font-display text-[36px] font-medium leading-none tracking-[-0.035em] text-fg [text-wrap:balance] min-[390px]:text-[38px] tab:text-[40.5px] desk:text-left desk:text-[60px] min-[1400px]:text-[72px]">
              Five ways to <span className="text-accent">wet a line.</span>
            </h2>
          </Reveal>
          <Reveal className="w-full max-w-[440px]">
            <p className="m-0 text-center font-sans text-[17px] leading-[1.5] text-muted [text-wrap:pretty] desk:text-left min-[1400px]:text-[20px]">
              Every trip runs on every boat. Your choice sets length and price.
            </p>
          </Reveal>
        </div>

        <Reveal className="hidden w-full desk:block">
          <TourStrips />
        </Reveal>
        <TourSwipeRow />
      </div>
    </section>
  );
}
