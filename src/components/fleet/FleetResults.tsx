"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Icon } from "./icons";
import { durationOf, fmtLong, fmtPrice, fmtShort, isFree, nextFree, setQuery, useQuery, type DurationKey } from "./booking-store";
import { EASE_OUT } from "./anim";

export type FleetBoat = {
  slug: string;
  name: string;
  type: string;
  berth: string;
  image: string;
  focus: string;
  guests: number;
  cabins: string;
  knots: number;
  prices: Record<DurationKey, number>;
};

const layoutTransition = { type: "tween" as const, duration: 0.55, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] };
const dot = { width: 3, height: 3, borderRadius: "50%", background: "var(--slm-muted)", display: "inline-block" } as const;

function FleetCard({ b, label, durKey, freeOn }: { b: FleetBoat; label: string; durKey: DurationKey; freeOn?: string }) {
  return (
    <Link
      href={`/boat/${b.slug}`}
      className="slm-card"
      style={{
        display: "grid",
        height: "100%",
        alignContent: "start",
        borderRadius: 20,
        background: "var(--slm-raise)",
        overflow: "hidden",
        boxShadow: "0 0 0 1px var(--slm-line)",
        color: "var(--slm-fg)",
        textDecoration: "none",
      }}
    >
      <span style={{ position: "relative", display: "block", aspectRatio: "4 / 3", overflow: "hidden", background: "var(--slm-raise2)" }}>
        <Image
          src={b.image}
          alt={`${b.name}, a ${b.type.toLowerCase()} fishing charter boat`}
          fill
          sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          style={{ objectPosition: b.focus }}
        />
        {freeOn && (
          <span
            style={{
              position: "absolute",
              left: 14,
              top: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              minHeight: 34,
              padding: "0 14px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 500,
              color: "var(--slm-fg)",
              background: "var(--slm-glass)",
              WebkitBackdropFilter: "blur(16px) saturate(1.6)",
              backdropFilter: "blur(16px) saturate(1.6)",
              boxShadow: "inset 0 1px 0 var(--slm-glass-edge), 0 0 0 1px var(--slm-glass-ring)",
            }}
          >
            <i style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "var(--slm-ok)" }} /> Free {freeOn}
          </span>
        )}
      </span>
      <span className="slm-cbody" style={{ display: "grid", gap: 14, padding: "22px 24px" }}>
        <span style={{ display: "grid", gap: 2 }}>
          <span
            style={{
              fontFamily: "'Cabinet Grotesk', 'Satoshi', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(28px, 2.4vw, 36px)",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              overflowWrap: "anywhere",
            }}
          >
            {b.name}
          </span>
          <span style={{ color: "var(--slm-muted)", fontSize: 15 }}>
            {b.type}, {b.berth}
          </span>
        </span>
        <span className="slm-cspecs" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px", fontSize: 15 }}>
          {b.guests} anglers
          <i style={dot} /> {/^\d+$/.test(b.cabins) ? `${b.cabins} ${b.cabins === "1" ? "cabin" : "cabins"}` : b.cabins}
          <i style={dot} /> {b.knots} kn
        </span>
        <span
          className="slm-cfoot"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            paddingTop: 16,
            borderTop: "1px solid var(--slm-line)",
          }}
        >
          <span style={{ display: "grid" }}>
            <small style={{ fontSize: 13, color: "var(--slm-muted)" }}>{label}</small>
            <strong style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
              {fmtPrice(b.prices[durKey])}
            </strong>
          </span>
          <span
            className="slm-go"
            aria-hidden
            style={{ width: 46, height: 46, borderRadius: 12, display: "grid", placeItems: "center", background: "var(--slm-soft)" }}
          >
            <Icon name="arrowUpRight" size={20} />
          </span>
        </span>
      </span>
    </Link>
  );
}

export default function FleetResults({ boats }: { boats: FleetBoat[] }) {
  const q = useQuery();
  const dur = durationOf(q?.duration ?? "full");
  const rows = boats.map((b, i) => {
    if (!q) return { b, ok: true, reason: "" };
    if (q.guests > b.guests) return { b, ok: false, reason: `Max ${b.guests} anglers` };
    if (!isFree(b.slug, i, boats.length, q.date, q.duration)) {
      const n = nextFree(b.slug, i, boats.length, q.date, q.duration);
      return { b, ok: false, reason: n ? `Booked, next free ${fmtShort(n)}` : "Booked" };
    }
    return { b, ok: true, reason: "" };
  });
  const hits = rows.filter((r) => r.ok);
  const misses = rows.filter((r) => !r.ok);

  return (
    <div className="slm-wrap slm-results">
      <div className="slm-root" id="fleet-results-inner">
        <div className="slm-status" role="status" aria-live="polite">
          {q ? (
            <>
              <p>
                <strong style={{ color: "var(--slm-accent)", fontWeight: 700 }}>
                  {hits.length} of {boats.length} boats
                </strong>{" "}
                are free on {fmtLong(q.date)} for {q.guests} {q.guests === 1 ? "angler" : "anglers"}, {dur.label.toLowerCase()}.
              </p>
              <button
                type="button"
                className="slm-reset"
                onClick={() => setQuery(null)}
                style={{
                  minHeight: 44,
                  padding: "0 20px",
                  borderRadius: 12,
                  background: "var(--slm-soft)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "inherit",
                  border: 0,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Show whole fleet
              </button>
            </>
          ) : (
            <p>
              Prices are for a <strong style={{ color: "var(--slm-accent)", fontWeight: 700 }}>full day</strong>. Pick a date and anglers above to
              see who is free.
            </p>
          )}
        </div>

        <LayoutGroup>
          <motion.ul layout className="slm-grid" transition={layoutTransition}>
            <AnimatePresence mode="popLayout" initial={false}>
              {hits.map(({ b }, i) => (
                <motion.li
                  key={b.slug}
                  layout
                  style={{ minWidth: 0 }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT, delay: i * 0.07 } }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE_OUT } }}
                  transition={layoutTransition}
                >
                  <FleetCard b={b} label={dur.label} durKey={dur.key} freeOn={q ? fmtShort(q.date) : undefined} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        {q && hits.length === 0 && (
          <div
            style={{
              padding: 36,
              borderRadius: 20,
              display: "grid",
              gap: 10,
              background: "var(--slm-counter)",
              color: "var(--slm-on-counter)",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontFamily: "'Cabinet Grotesk', 'Satoshi', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(26px, 2.6vw, 38px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              Nothing free on that day.
            </h3>
            <p style={{ margin: 0 }}>Try another date, fewer anglers or a shorter trip. The boats below are close.</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {q && misses.length > 0 && (
            <motion.section
              key="misses"
              aria-label="Not available for this search"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              style={{ overflow: "hidden" }}
            >
              <h3 style={{ margin: "28px 0 12px", fontSize: 14, fontWeight: 500, color: "var(--slm-muted)" }}>Not available for this search</h3>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 10,
                }}
              >
                {misses.map(({ b, reason }) => (
                  <li key={b.slug} style={{ display: "grid", gap: 2, padding: "14px 18px", borderRadius: 12, background: "var(--slm-soft)" }}>
                    <span style={{ fontWeight: 700, overflowWrap: "anywhere" }}>{b.name}</span>
                    <em style={{ fontStyle: "normal", fontSize: 14, color: "var(--slm-muted)" }}>{reason}</em>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}
        </AnimatePresence>

        <p style={{ margin: "22px 0 0", textAlign: "center", fontSize: 14, color: "var(--slm-muted)" }}>
          Prices per charter in dirham, excluding VAT. We confirm every date by email.
        </p>
      </div>
    </div>
  );
}
