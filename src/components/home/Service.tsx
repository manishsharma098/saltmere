"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { body, content, h2, section } from "./lowerStyles";

const icon = (children: ReactNode) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    aria-hidden="true"
    className="block h-6 w-6 flex-none text-accent"
  >
    {children}
  </svg>
);

const items = [
  {
    title: "Captain and mate",
    text: "A licensed captain and a mate who rigs, baits and gaffs. You only have to reel.",
    icon: icon(
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16 21c-.233-2.931-2.658-5.252-5.691-5.448L9.5 15.5q-.432.012-.812.03C5.681 15.672 3.231 18.097 3 21m9.75-11.25a3.25 3.25 0 1 1-6.5 0a3.25 3.25 0 0 1 6.5 0M21 17.501c-.23-2.87-2.546-5.226-5.5-5.505M15.988 9A3.25 3.25 0 0 0 17.5 6.25C17.5 4.455 16.05 3 14.26 3c-.879 0-1.676.351-2.26.921"
      />,
    ),
  },
  {
    title: "Rigged and baited",
    text: "Rods, reels, lures and fresh bait are on board and ready before you arrive.",
    icon: icon(
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
        <path
          strokeLinejoin="round"
          d="M15 10L4 21.001m14-18l-3 3c-.545.545-.818.818-.964 1.112a2 2 0 0 0 0 1.776c.146.294.419.567.964 1.112s.818.818 1.112.964a2 2 0 0 0 1.776 0c.294-.146.567-.419 1.112-.964l3-3m-2-2.002l-3 3"
        />
        <path d="M8.845 9.846c-1.365 1.365-3.237 1.706-4.944 0c-1.706-1.707-2.6-4.814-1.235-6.18c1.365-1.364 4.472-.47 6.179 1.236c1.706 1.707 1.365 3.579 0 4.944Zm0 0L20 21" />
      </g>,
    ),
  },
  {
    title: "Licensed and insured",
    text: "Fishing licences for every angler, passenger insurance and a safety briefing before every trip.",
    icon: icon(
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
        <path d="M20.992 11.183V8.28c0-1.64 0-2.46-.404-2.995s-1.318-.794-3.145-1.314a25 25 0 0 1-3.229-1.173C13.016 2.266 12.417 2 11.993 2s-1.023.266-2.222.798c-.88.39-1.98.818-3.228 1.173c-1.828.52-2.742.78-3.146 1.314c-.404.535-.404 1.355-.404 2.995v2.903c0 5.625 5.063 9 7.594 10.336c.607.32.91.481 1.406.481s.8-.16 1.406-.48c2.531-1.337 7.594-4.712 7.594-10.337Z" />
        <path strokeLinejoin="round" d="M8.492 11.833s.875 0 1.75 1.667c0 0 2.78-4.167 5.25-5" />
      </g>,
    ),
  },
  {
    title: "Weather-proof dates",
    text: "If the wind picks up, we move your trip for free or refund it.",
    icon: icon(
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M16 2v4M8 2v4m13 10v-4c0-3.771 0-5.657-1.172-6.828S16.771 4 13 4h-2C7.229 4 5.343 4 4.172 5.172S3 8.229 3 12v2c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h1M3 10h18" />
        <path d="M21 19.5h-6.5m2 2.5c-.506-.491-2.5-1.8-2.5-2.5s1.994-2.009 2.5-2.5" />
      </g>,
    ),
  },
];

export default function Service() {
  return (
    <section className={section} aria-label="Service">
      <div className={content}>
        <div className="relative flex w-full flex-row items-center gap-24 max-[1200px]:flex-col max-[1200px]:gap-12">
          <Reveal className="group relative aspect-[0.8] w-px flex-[0.9_0_0] overflow-hidden rounded-[20px] max-[1200px]:aspect-[1.6] max-[1200px]:w-full max-[1200px]:flex-none">
            <Image
              src="/images/fishing/extra-reel-spray.jpg"
              alt="An angler working a heavy trolling reel, spray off the stern"
              fill
              sizes="(max-width: 1200px) 100vw, 45vw"
              className="rounded-[inherit] object-cover object-[45%_50%] transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          </Reveal>

          <div className="relative flex w-px flex-[1.1_0_0] flex-col items-start gap-12 max-[1200px]:w-full max-[1200px]:flex-none max-[1200px]:items-center">
            <Reveal className="w-full">
              <h2 className={h2}>
                Everything is <span className="text-accent">taken care of.</span>
              </h2>
            </Reveal>
            <ul className="relative m-0 flex w-full list-none flex-col shadow-[inset_0_-1px_0_var(--line)] p-0">
              {items.map((it) => (
                <Reveal
                  as="li"
                  key={it.title}
                  className="relative flex w-full flex-row items-start gap-5 shadow-[inset_0_1px_0_var(--line)] py-6 max-[1200px]:flex-col max-[1200px]:items-center max-[1200px]:gap-[14px] max-[1200px]:py-7"
                >
                  <div className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-[12px] bg-fill">
                    {it.icon}
                  </div>
                  <div className="flex w-px flex-1 flex-col items-start gap-[6px] max-[1200px]:w-full max-[1200px]:flex-none max-[1200px]:items-center">
                    <h3 className="m-0 w-full font-display text-[26px] font-medium leading-[1.1] tracking-[-0.03em] text-fg max-[1200px]:text-center max-[1200px]:text-[24px]">
                      {it.title}
                    </h3>
                    <p className={`${body} w-full max-w-[420px] text-muted max-[1200px]:text-center`}>{it.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
