"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion";
import BoatCard from "@/components/BoatCard";
import { boats } from "@/lib/data";
import { durationOf, fmtLong, fmtShort, isFree, nextFree } from "@/components/fleet/booking-store";
import { useSearch } from "./SearchContext";

const EASE_CARD = [0.22, 0.61, 0.36, 1] as const;
const LAYOUT = { type: "tween", duration: 0.55, ease: [0.25, 0.8, 0.25, 1] } as const;

function FleetResults() {
  const { query, setQuery } = useSearch();
  const tour = durationOf(query?.duration ?? "full");

  const rows = boats.map((b, i) => {
    if (!query) return { b, ok: true, reason: "" };
    if (query.guests > b.guests) return { b, ok: false, reason: `Max ${b.guests} anglers` };
    if (!isFree(b.slug, i, boats.length, query.date, query.duration)) {
      const next = nextFree(b.slug, i, boats.length, query.date, query.duration);
      return { b, ok: false, reason: next ? `Booked, next free ${fmtShort(next)}` : "Booked" };
    }
    return { b, ok: true, reason: "" };
  });
  const free = rows.filter((r) => r.ok);
  const misses = rows.filter((r) => !r.ok);

  return (
    <div className="slm-root @container relative w-full font-sans leading-[normal] text-fg" id="fleet-results">
      <div
        role="status"
        aria-live="polite"
        className="mb-5 flex flex-wrap items-center justify-center gap-4 rounded-[20px] bg-surface px-[18px] py-4 text-center text-[16px] shadow-[0_0_0_1px_var(--line)] @min-[659px]:justify-between @min-[659px]:py-[14px] @min-[659px]:pl-[22px] @min-[659px]:pr-[14px] @min-[659px]:text-left"
      >
        {query ? (
          <>
            <p className="m-0">
              <strong className="font-bold text-accent">
                {free.length} of {boats.length} boats
              </strong>{" "}
              are free on {fmtLong(query.date)} for {query.guests} {query.guests === 1 ? "angler" : "anglers"},{" "}
              {tour.label.toLowerCase()}.
            </p>
            <button
              type="button"
              onClick={() => setQuery(null)}
              className="min-h-11 rounded-[12px] border-0 bg-fill px-5 font-sans text-[14px] font-medium text-inherit transition-[background] duration-300 hover:bg-line"
            >
              Show whole fleet
            </button>
          </>
        ) : (
          <p className="m-0">
            Prices are for a <strong className="font-bold text-accent">full day</strong>. Pick a date and anglers above to see
            who is free.
          </p>
        )}
      </div>

      <motion.ul layout className="m-0 grid list-none grid-cols-1 gap-5 p-0 @min-[659px]:grid-cols-2 @min-[1035px]:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {free.map(({ b }, i) => (
            <motion.li
              key={b.slug}
              layout
              className="min-w-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_CARD, delay: i * 0.07 } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE_CARD } }}
              transition={LAYOUT}
            >
              <BoatCard boat={b} tour={tour.key} freeOn={query ? fmtShort(query.date) : undefined} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {query && free.length === 0 && (
        <div className="grid gap-[10px] rounded-[20px] bg-sand p-9 text-ink">
          <h3 className="m-0 font-display text-[clamp(26px,2.6vw,38px)] font-medium leading-[1.05] tracking-[-0.03em]">
            Nothing free on that day.
          </h3>
          <p className="m-0">Try another date, fewer anglers or a shorter trip. The boats below are close.</p>
        </div>
      )}

      <AnimatePresence initial={false}>
        {query && misses.length > 0 && (
          <motion.section
            key="misses"
            aria-label="Not available for this search"
            className="overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: EASE_CARD }}
          >
            <h3 className="mb-3 mt-7 text-[14px] font-medium text-muted">Not available for this search</h3>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[10px] p-0">
              {misses.map(({ b, reason }) => (
                <li key={b.slug} className="grid gap-[2px] rounded-[12px] bg-fill px-[18px] py-[14px]">
                  <span className="font-bold [overflow-wrap:anywhere]">{b.name}</span>
                  <em className="text-[14px] not-italic text-muted">{reason}</em>
                </li>
              ))}
            </ul>
          </motion.section>
        )}
      </AnimatePresence>

      <p className="mb-0 mt-[22px] text-center text-[14px] text-muted">
        Prices per charter in dirham, excluding VAT. We confirm every date by email.
      </p>
    </div>
  );
}

export default function Fleet() {
  return (
    <section
      id="fleet"
      className="relative flex w-full scroll-mt-24 flex-col items-center pt-24 tab:pt-[97px] desk:pt-[144px] wide:pt-[180px]"
      aria-label="Fleet"
    >
      <div className="mx-auto flex w-full max-w-[1392px] flex-col items-start px-4 tab:px-6 desk:px-9 wide:px-10">
        <div className="relative flex w-full max-w-[900px] flex-col items-center gap-5 self-center pb-8 tab:pb-9 desk:items-start desk:self-start desk:pb-[54px] wide:pb-16">
          <Reveal className="w-full">
            <h2 className="m-0 text-center font-display text-[36px] font-medium leading-none tracking-[-0.035em] text-fg [text-wrap:balance] min-[390px]:text-[38px] tab:text-[40.5px] desk:text-left desk:text-[60px] min-[1400px]:text-[72px]">
              Pick a boat, <span className="text-accent">not</span> a brochure.
            </h2>
          </Reveal>
          <Reveal className="w-full max-w-[440px]">
            <p className="m-0 text-center font-sans text-[17px] leading-[1.5] text-muted [text-wrap:pretty] desk:text-left min-[1400px]:text-[20px]">
              Every boat is rigged and ready. Set your date above and the fleet answers on the spot.
            </p>
          </Reveal>
        </div>

        <FleetResults />

        <div className="relative flex w-full justify-center pt-10">
          <Reveal>
            <Link
              href="/fleet"
              className="btn-lift flex h-14 items-center justify-center gap-[14px] rounded-[12px] bg-surface-2 pl-[26px] pr-2 text-[16px] font-bold leading-[1.2] tracking-[-0.005em] whitespace-nowrap text-fg [box-shadow:var(--shadow-ghost)]"
            >
              Open the fleet page
              <span className="grid size-10 place-items-center rounded-[8px] bg-fill">
                <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden className="block flex-none">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.5 12H5m8 6s6-4.419 6-6s-6-6-6-6"
                  />
                </svg>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
