"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion";
import { content, h2, header, lead, section } from "./lowerStyles";

type Review = { quote: string; name: string; role: string; img: string; sand?: boolean };

const reviews: Review[] = [
  {
    quote:
      "We booked on Thursday and were trolling on Saturday. Two kingfish, one tuna and nobody wanted to go home.",
    name: "Anna K.",
    role: "Marlin 36, charter guest",
    img: "/images/cpTVC4LgYDHOzbWTBa6hVju0oo.webp",
    sand: true,
  },
  {
    quote: "Our whole team for a full day. Rods were rigged before we stepped on board.",
    name: "Marco T.",
    role: "Sailfin 42, charter guest",
    img: "/images/D7Uv2eNZZXrlUEUE47vxwwthg2E.webp",
  },
  {
    quote: "The captain found us a reef without another boat on it. We fished until the light went.",
    name: "Jule R.",
    role: "Dorado 21, charter guest",
    img: "/images/6JcA5xPVZgRz2k8X6r3V22HPFM.webp",
  },
  {
    quote: "Sunset trip with my father. The mate handled every knot and never made a fuss of it.",
    name: "Omar H.",
    role: "Queenfish 25, charter guest",
    img: "/images/nNflZGOGJyauo0myCF9mr7Kjc.webp",
  },
  {
    quote: "Fair price, clear quote, and the fish came back cleaned and bagged.",
    name: "Lena S.",
    role: "Kingfish 33, charter guest",
    img: "/images/Xa9OlhmpsLZBMZ5d56YWBTwMJ0.webp",
    sand: true,
  },
  {
    quote: "My son caught his first hammour. The crew made it feel like a trophy.",
    name: "Daniel W.",
    role: "Trevally 28, charter guest",
    img: "/images/ENuy1Qo8swv4gJLxRp6srkoyNQY.webp",
  },
  {
    quote: "First sailfish of my life. Photo, release, and a crew as happy as I was.",
    name: "Mira P.",
    role: "Sailfin 42, charter guest",
    img: "/images/lmXAPrJThJSNWxrbZn3G6qfv2M.webp",
  },
  {
    quote: "Booked from my phone in two minutes and had the date confirmed the same hour.",
    name: "Yusuf A.",
    role: "Kingfish 33, charter guest",
    img: "/images/wp6NVyb3zomg2nprkJndmeIWLg.webp",
  },
];

function Card({ r }: { r: Review }) {
  return (
    <li className="relative h-[244px] w-[400px] flex-none max-[810px]:h-[272px] max-[810px]:w-[320px] max-[390px]:h-[300px] max-[390px]:w-[296px]">
      <figure
        className={`relative m-0 flex h-full w-full flex-col items-start gap-[26px] rounded-[20px] p-8 ${
          r.sand ? "bg-sand shadow-[inset_0_0_0_1px_var(--sand)]" : "bg-surface shadow-[inset_0_0_0_1px_var(--line)]"
        }`}
      >
        <blockquote
          className={`m-0 w-full font-sans text-[18px] font-normal leading-[1.45] ${
            r.sand ? "text-ink" : "text-fg"
          }`}
        >
          {r.quote}
        </blockquote>
        <figcaption className="flex w-full flex-row items-center gap-[14px]">
          <Image
            src={r.img}
            alt={`${r.name}, ${r.role}`}
            width={92}
            height={92}
            className="h-[46px] w-[46px] flex-none rounded-full object-cover"
          />
          <div className="flex w-px flex-1 flex-col items-start">
            <p
              className={`m-0 font-sans text-[16px] font-bold leading-[1.3] ${
                r.sand ? "text-ink" : "text-fg"
              }`}
            >
              {r.name}
            </p>
            <p
              className={`m-0 font-sans text-[14px] font-medium leading-[1.55] ${
                r.sand ? "text-ink-muted" : "text-muted"
              }`}
            >
              {r.role}
            </p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

// Framer Ticker: ~40px/s leftwards, gap 20px. One loop = 8 cards + 8 gaps.
const tickerCss = `
@keyframes saltmere-review-ticker { from { transform: translate3d(0,0,0) } to { transform: translate3d(-50%,0,0) } }
.saltmere-review-track { animation: saltmere-review-ticker 84s linear infinite; }
@media (max-width: 809.98px) { .saltmere-review-track { animation-duration: 68s; } }
@media (max-width: 389.98px) { .saltmere-review-track { animation-duration: 63.2s; } }
@media (prefers-reduced-motion: reduce) { .saltmere-review-track { animation: none; } }
`;

export default function Reviews() {
  return (
    <section className={section} aria-label="Reviews">
      <style>{tickerCss}</style>
      <div className={content}>
        <div className={`${header} !pb-0`}>
          <Reveal className="w-full">
            <h2 className={h2}>
              What anglers <span className="text-accent">write after.</span>
            </h2>
          </Reveal>
          <Reveal className="w-full max-w-[440px]">
            <p className={lead}>Reviews from anglers after their trip.</p>
          </Reveal>
        </div>
      </div>

      <Reveal
        className="relative flex w-full overflow-x-clip pb-2 pt-12"
        style={{
          WebkitMaskImage: "linear-gradient(90deg,#0000 0%,#000 11% 89%,#0000 100%)",
          maskImage: "linear-gradient(90deg,#0000 0%,#000 11% 89%,#0000 100%)",
        }}
      >
        <div className="saltmere-review-track flex w-max flex-row will-change-transform">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="m-0 flex flex-none list-none flex-row items-start gap-5 p-0 pr-5"
            >
              {reviews.map((r) => (
                <Card key={r.name} r={r} />
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
