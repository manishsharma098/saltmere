/* Boat card from the Saltmere "Fleet results" code component (Home + Fleet pages). */
import Image from "next/image";
import Link from "next/link";
import type { Boat } from "@/lib/data";

export type TourKey = "sunset" | "half" | "full" | "dawn";

export const TOUR_LABEL: Record<TourKey, string> = {
  sunset: "Sunset trip",
  half: "Half day",
  full: "Full day",
  dawn: "Dawn to dusk",
};

/** object-position used by the reference for each boat's card photo. */
export const FOCUS: Record<string, string> = {
  "sailfin-42": "55% 60%",
  "marlin-36": "52% 58%",
  "kingfish-33": "55% 50%",
  "queenfish-25": "50% 60%",
  "trevally-28": "55% 70%",
  "dorado-21": "50% 63%",
};

export function boatPrice(boat: Boat, tour: TourKey) {
  return boat.prices.find((p) => p.tour === TOUR_LABEL[tour])?.price ?? "";
}

function cabinsLabel(cabins: string) {
  const n = Number(cabins);
  if (Number.isNaN(n)) return cabins;
  return `${n} ${n === 1 ? "cabin" : "cabins"}`;
}

const Dot = () => <i className="inline-block size-[3px] rounded-full bg-muted" />;

export default function BoatCard({
  boat,
  tour = "full",
  freeOn,
  href,
}: {
  boat: Boat;
  tour?: TourKey;
  /** e.g. "Sat 5 Dec" — shows the green "Free …" badge on the photo */
  freeOn?: string;
  href?: string;
}) {
  const knots = boat.speed.replace(/\s*kn$/, "");
  return (
    <Link
      href={href ?? `/boat/${boat.slug}`}
      className="group/card grid h-full leading-[normal] content-start overflow-hidden rounded-[20px] bg-surface text-fg no-underline shadow-[0_0_0_1px_var(--line)] transition-[box-shadow,transform] duration-[500ms,600ms] ease-[cubic-bezier(.25,.8,.25,1)] hover:shadow-[0_0_0_1px_var(--line-strong)] active:scale-[.99] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
    >
      <span className="relative block aspect-[4/3] overflow-hidden bg-surface-2">
        <Image
          src={boat.images[0]}
          alt={`${boat.name}, a ${boat.type.toLowerCase()} fishing charter boat`}
          fill
          sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.25,.8,.25,1)] group-hover/card:scale-[1.03] motion-reduce:transition-none"
          style={{ objectPosition: FOCUS[boat.slug] ?? "50% 50%" }}
        />
        {freeOn && (
          <span className="absolute left-[14px] top-[14px] inline-flex min-h-[34px] items-center gap-2 rounded-full bg-glass px-[14px] text-[13px] font-medium text-fg shadow-[inset_0_1px_0_var(--line-mid),0_0_0_1px_var(--line-soft)] backdrop-blur-[16px] backdrop-saturate-[1.6]">
            <i className="inline-block size-2 rounded-full bg-success" /> Free {freeOn}
          </span>
        )}
      </span>
      <span className="grid gap-[14px] px-6 py-[22px] max-[900px]:text-center">
        <span className="grid gap-[2px]">
          <span className="font-display text-[clamp(28px,2.4vw,36px)] font-medium leading-[1.05] tracking-[-0.035em] [overflow-wrap:anywhere]">
            {boat.name}
          </span>
          <span className="text-[15px] text-muted">
            {boat.type}, {boat.berth}
          </span>
        </span>
        <span className="flex flex-wrap items-center gap-x-[10px] gap-y-1 text-[15px] max-[900px]:justify-center">
          {boat.guests} anglers
          <Dot /> {cabinsLabel(boat.cabins)}
          <Dot /> {knots} kn
        </span>
        <span className="flex items-center justify-between gap-3 border-t border-line pt-4 max-[900px]:justify-center max-[900px]:gap-4">
          <span className="grid">
            <small className="text-[13px] text-muted">{TOUR_LABEL[tour]}</small>
            <strong className="text-[24px] font-bold tracking-[-0.02em] tabular-nums">{boatPrice(boat, tour)}</strong>
          </span>
          <span
            aria-hidden
            className="grid size-[46px] place-items-center rounded-[12px] bg-fill transition-[transform,background-color,color] duration-[600ms,300ms,300ms] ease-[cubic-bezier(.25,.8,.25,1)] group-hover/card:bg-accent group-hover/card:text-on-accent group-active/card:bg-accent group-active/card:text-on-accent"
          >
            <svg
              viewBox="0 0 24 24"
              width={20}
              height={20}
              aria-hidden
              className="block flex-none transition-transform duration-[600ms] ease-[cubic-bezier(.25,.8,.25,1)] group-hover/card:rotate-45 group-active/card:rotate-45"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 6.65s6.938-.542 7.915.435S17.35 15 17.35 15m-.85-7.5l-10 10"
              />
            </svg>
          </span>
        </span>
      </span>
    </Link>
  );
}
