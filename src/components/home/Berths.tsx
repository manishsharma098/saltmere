"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion";
import { body, content, h2, header, lead, section } from "./lowerStyles";

const berths = [
  {
    name: "Dubai Marina",
    text: "Towers on both sides and a short run to open water. Our home berth.",
    img: "/images/fishing/berth-dubai-marina.jpg",
    pos: "40% 55%",
    alt: "Boats moored in Dubai Marina below the towers",
  },
  {
    name: "Dubai Harbour",
    text: "Deep water at the mouth and the fastest way to the offshore grounds.",
    img: "/images/fishing/berth-dubai-harbour.jpg",
    pos: "45% 50%",
    alt: "Aerial view of Dubai Harbour and the coast",
  },
  {
    name: "Jumeirah Fishing Harbour",
    text: "The working harbour in Umm Suqeim. Easy parking, early starts, reefs close by.",
    img: "/images/fishing/berth-jumeirah-fishing-harbour.jpg",
    pos: "62% 50%",
    alt: "A boat heading out of harbour at golden hour, palm tree and towers behind",
  },
];

export default function Berths() {
  return (
    <section className={section} aria-label="Berths">
      <div className={content}>
        <div className={header}>
          <Reveal className="w-full">
            <h2 className={h2}>
              Three docks, <span className="text-accent">one coast.</span>
            </h2>
          </Reveal>
          <Reveal className="w-full max-w-[440px]">
            <p className={lead}>Each boat page shows where it departs from.</p>
          </Reveal>
        </div>

        <ul
          className="relative m-0 grid w-full list-none grid-cols-3 gap-5 p-0 max-[1200px]:gap-[14px] max-[810px]:flex max-[810px]:flex-row max-[810px]:items-start max-[810px]:overflow-x-auto max-[810px]:px-[37px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {berths.map((b) => (
            <Reveal
              as="li"
              key={b.name}
              className="flex w-full min-w-0 flex-col items-start gap-2 self-start max-[810px]:w-[284px] max-[810px]:flex-none max-[810px]:items-center"
            >
              <div className="group relative aspect-[0.8] w-full overflow-hidden rounded-[20px]">
                <Image
                  src={b.img}
                  alt={b.alt}
                  fill
                  sizes="(max-width: 810px) 284px, 33vw"
                  className="rounded-[inherit] object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                  style={{ objectPosition: b.pos }}
                />
              </div>
              <h3 className="m-0 w-full font-display font-medium leading-none tracking-[-0.035em] text-fg text-[38px] max-[1400px]:text-[31.2px] max-[1200px]:text-[27.5px] max-[810px]:text-[26px] max-[810px]:text-center">
                {b.name}
              </h3>
              <p className={`${body} w-full max-w-[340px] text-muted max-[810px]:text-center`}>{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
