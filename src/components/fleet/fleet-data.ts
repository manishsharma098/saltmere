import { boats } from "@/lib/data";
import { FOCUS } from "@/components/BoatCard";
import type { FleetBoat } from "./FleetResults";
import type { DurationKey } from "./booking-store";

const KEY: Record<string, DurationKey> = { "Sunset trip": "sunset", "Half day": "half", "Full day": "full", "Dawn to dusk": "dawn" };
const num = (s: string) => Number(String(s).replace(/[^\d.]/g, "")) || 0;

/** Boats in the shape the booking/results component expects (order = fleet position). */
export const fleetBoats: FleetBoat[] = boats.map((b) => {
  const prices = { sunset: 0, half: 0, full: 0, dawn: 0 } as Record<DurationKey, number>;
  for (const p of b.prices) if (KEY[p.tour]) prices[KEY[p.tour]] = num(p.price);
  return {
    slug: b.slug,
    name: b.name,
    type: b.type,
    berth: b.berth,
    image: b.gallery[0],
    focus: FOCUS[b.slug] ?? b.focus,
    guests: b.guests,
    cabins: b.cabins,
    knots: num(b.speed),
    prices,
  };
});
