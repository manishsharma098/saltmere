// Structured fishing trips, parsed from the raw page copy in `toursRaw` (data.ts → fishing.ts).
import { boats, toursRaw } from "./data";

export type PlanStep = { time: string; text: string };
export type TourPrice = { boat: string; boatSlug: string; type: string; price: string; image: string };

export type Tour = {
  slug: string;
  /** "01".."05" — order on the home page and tours index */
  number: string;
  /** title split the way the detail hero shows it, e.g. ["Sunset", "fishing", "trip"] */
  titleLines: string[];
  /** single-line title, e.g. "Sunset fishing trip" */
  title: string;
  description: string;
  /** "3 hours", "12 hours" */
  duration: string;
  /** "leaves two hours before dusk" */
  timing: string;
  /** "from AED 850" */
  fromLabel: string;
  /** "AED 850" */
  fromPrice: string;
  /** "The plan, 3 hours" */
  planTitle: string;
  plan: PlanStep[];
  included: string[];
  /** "Couples, beginners, small groups" */
  bestFor: string;
  /** hero / card photo */
  image: string;
  images: string[];
  prices: TourPrice[];
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function parse(raw: (typeof toursRaw)[number], index: number): Tour {
  const r = raw.raw as readonly string[];
  const durIdx = r.findIndex((s) => /^\d+\s+(hours?|nights?|days?)$/i.test(s));
  const descIdx = durIdx - 1;
  const titleLines = r.slice(0, descIdx);
  const fromLabel = r[durIdx + 2];
  const planTitle = r[durIdx + 3];
  const incIdx = r.indexOf("Included");
  const bestIdx = r.findIndex((s) => s.startsWith("Best for:"));

  const plan: PlanStep[] = [];
  for (let i = durIdx + 4; i + 1 < incIdx; i += 2) plan.push({ time: r[i], text: r[i + 1] });

  const images = [...raw.images];
  return {
    slug: raw.slug,
    number: String(index + 1).padStart(2, "0"),
    titleLines,
    title: titleLines.join(" "),
    description: r[descIdx],
    duration: r[durIdx],
    timing: r[durIdx + 1],
    fromLabel,
    fromPrice: fromLabel.replace(/^from\s+/i, ""),
    planTitle,
    plan,
    included: r.slice(incIdx + 1, bestIdx),
    bestFor: r[bestIdx].replace(/^Best for:\s*/, ""),
    image: images[0],
    images,
    prices: raw.prices.map((p) => {
      const boatSlug = slugify(p.boat);
      return {
        boat: p.boat,
        boatSlug,
        type: p.type,
        price: p.price,
        // the boat's own cover photo (same as its fleet card)
        image: boats.find((b) => b.slug === boatSlug)?.images[0] ?? images[0],
      };
    }),
  };
}

export const tours: Tour[] = toursRaw.map(parse);

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);

export const getNextTour = (slug: string) => {
  const i = tours.findIndex((t) => t.slug === slug);
  return tours[(i + 1) % tours.length];
};

/** Photo focus (object-position) for each trip's hero / card photo. */
const FOCUS: Record<string, string> = {
  "sunset-fishing": "50% 45%",
  "inshore-half-day": "68% 45%",
  "bottom-fishing": "55% 50%",
  "deep-sea-trolling": "68% 68%",
  "dawn-to-dusk": "50% 52%",
};
export const tourFocus = (slug: string) => FOCUS[slug] ?? "50% 50%";

/** "Five [ways] out." -> words, bracketed ones flagged as accent. */
export const accentWords = (s: string) => {
  const out: { text: string; accent: boolean }[] = [];
  for (const m of s.matchAll(/\[([^\]]+)\]|([^\s[\]]+)/g)) {
    if (m[1]) for (const w of m[1].split(/\s+/).filter(Boolean)) out.push({ text: w, accent: true });
    else out.push({ text: m[2], accent: false });
  }
  return out;
};
