"use client";

import { useMemo } from "react";
import { addDays, durationOf, fmtShort, isFree, nextFree, today, useMounted, useQuery } from "@/components/fleet/booking-store";

/** "Next free dates" card — the reference's Booking component in `availability` mode. */
export default function Availability({
  slug,
  boatIndex,
  fleetSize = 6,
  boatGuests,
}: {
  slug: string;
  boatIndex: number; // 1-based fleet position
  fleetSize?: number;
  boatGuests: number;
}) {
  const mounted = useMounted();
  const q = useQuery();
  const idx = Math.max(0, boatIndex - 1);
  const dur = q?.duration ?? "full";
  const from = mounted ? (q?.date ?? today()) : "";

  const dates = useMemo(() => {
    if (!from) return [];
    const out: string[] = [];
    let d = from;
    for (let i = 0; i < 6; i++) {
      const n = nextFree(slug, idx, fleetSize, d, dur);
      if (!n) break;
      out.push(n);
      d = addDays(n, 1);
    }
    return out;
  }, [slug, idx, fleetSize, from, dur]);

  const free = q ? isFree(slug, idx, fleetSize, q.date, q.duration) && q.guests <= boatGuests : null;

  return (
    <div
      className="slm-wrap slm-root"
      style={{
        padding: "22px 24px",
        borderRadius: 12,
        background: "var(--slm-raise)",
        boxShadow: "0 0 0 1px var(--slm-line)",
        display: "grid",
        gap: 6,
      }}
    >
      <h2 style={{ margin: 0, display: "flex", alignItems: "center", gap: 10, fontSize: 17, fontWeight: 700 }}>
        {q ? (
          <>
            <i
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: free ? "var(--slm-ok)" : "var(--slm-warn)",
              }}
            />{" "}
            {free ? "Free on your date" : "Not free on your date"}
          </>
        ) : (
          "Next free dates"
        )}
      </h2>
      <p style={{ margin: 0, fontSize: 14, color: "var(--slm-muted)" }}>
        {durationOf(dur).label}, from {from ? fmtShort(from) : " "}
      </p>
      <ul style={{ listStyle: "none", margin: "10px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: 8, minHeight: 30 }}>
        {dates.map((d) => (
          <li key={d}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 30,
                padding: "0 12px",
                borderRadius: 999,
                background: "var(--slm-soft)",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {fmtShort(d)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
