// Site content. Boats and trips come from the fishing-charter copy in fishing.ts.
import { fishingBoats, fishingTrips } from "./fishing";

// Cover-photo focus per boat (the Dorado cover is a portrait shot, boat low in frame).
const FOCUS: Record<string, string> = { "dorado-21": "50% 66%", "trevally-28": "50% 60%" };

export const boats = fishingBoats.map((b) => ({
  ...b,
  // Fleet/boat pages: cover-photo focus and the slideshow photos.
  focus: FOCUS[b.slug] ?? "50% 55%",
  gallery: [...b.images],
}));

export type Boat = (typeof boats)[number];

// `raw` holds each trip page's copy in reading order; lib/tours.ts parses it into fields.
export const toursRaw = fishingTrips;
