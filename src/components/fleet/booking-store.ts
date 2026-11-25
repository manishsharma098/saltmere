"use client";

/**
 * Port of the Saltmere "Booking" code component logic (search query store,
 * deterministic availability, date formatting). The query is shared across the
 * page (and across client-side navigations) exactly like `window.__saltmereBooking`.
 */
import { useSyncExternalStore } from "react";

export type DurationKey = "sunset" | "half" | "full" | "dawn";
export type Query = { date: string; guests: number; duration: DurationKey };

export const DURATIONS: { key: DurationKey; label: string; hint: string; days: number }[] = [
  { key: "sunset", label: "Sunset trip", hint: "3 hours", days: 1 },
  { key: "half", label: "Half day", hint: "4 hours", days: 1 },
  { key: "full", label: "Full day", hint: "8 hours", days: 1 },
  { key: "dawn", label: "Dawn to dusk", hint: "12 hours", days: 1 },
];
/** Trip lengths as form options, e.g. "Sunset trip, 3 hours". Shared by every booking/request form. */
export const TRIP_OPTIONS: { key: DurationKey; value: string; label: string }[] = DURATIONS.map((d) => ({
  key: d.key,
  value: `${d.label}, ${d.hint}`,
  label: `${d.label}, ${d.hint}`,
}));
export const durationOf = (k?: string | null) => DURATIONS.find((d) => d.key === k) ?? DURATIONS[2];

const DAY = 864e5;
const WINDOW = 240; // days ahead that can be booked

const fnv = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
};
const noon = () => {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  return d;
};
export const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
};
export const addDays = (s: string, n: number) => iso(new Date(parse(s).getTime() + n * DAY));
export const today = () => iso(noon());
export const lastBookable = () => iso(new Date(noon().getTime() + WINDOW * DAY));

/** First Saturday at least a week out — the bar's default date. */
export const defaultDate = () => {
  const d = new Date(noon().getTime() + 7 * DAY);
  while (d.getDay() !== 6) d.setTime(d.getTime() + DAY);
  return iso(d);
};

const cache = new Map<string, Set<string>>();
function bookedDays(slug: string, index: number, fleetSize: number) {
  const key = `${slug}|${index}|${fleetSize}|${today()}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const set = new Set<string>();
  const start = noon();
  const block = 30 + index * 29;
  for (let r = 0; r < WINDOW; r++) {
    const d = new Date(start.getTime() + r * DAY);
    const s = iso(d);
    const wd = d.getDay();
    const base = wd === 5 || wd === 6 || wd === 0 ? 0.46 : 0.2;
    const bias = (index === 0 ? 0.1 : 0) - (index === fleetSize - 1 ? 0.06 : 0);
    if (fnv(`${slug}:${s}`) < base + bias) set.add(s);
    if (r >= block && r < block + 9) set.add(s);
  }
  cache.set(key, set);
  return set;
}

export function isFree(slug: string, index: number, fleetSize: number, date: string, duration: DurationKey) {
  const booked = bookedDays(slug, index, fleetSize);
  for (let i = 0; i < durationOf(duration).days; i++) if (booked.has(addDays(date, i))) return false;
  return true;
}

export function nextFree(slug: string, index: number, fleetSize: number, from: string, duration: DurationKey) {
  const last = lastBookable();
  for (let i = 0; i < WINDOW; i++) {
    const d = addDays(from, i);
    if (d > last) break;
    if (isFree(slug, index, fleetSize, d, duration)) return d;
  }
  return null;
}

export const fmtShort = (s: string) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" }).format(parse(s));
export const fmtLong = (s: string) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(parse(s));
export const fmtPrice = (n: number, currency = "AED") =>
  `${currency} ${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(n)}`;

/* ---------- shared query store ---------- */
type Store = { query: Query | null };
const store = (): Store => {
  if (typeof window === "undefined") return { query: null };
  const w = window as unknown as { __saltmereBooking?: Store };
  return (w.__saltmereBooking ||= { query: null });
};
const EVT = "saltmere:query";
export function setQuery(q: Query | null) {
  if (typeof window === "undefined") return;
  store().query = q;
  window.dispatchEvent(new CustomEvent(EVT));
}
export const getQuery = () => store().query;
const subscribe = (cb: () => void) => {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
};
export function useQuery() {
  return useSyncExternalStore(subscribe, getQuery, () => null);
}

/** True after hydration — date-dependent UI renders only on the client. */
const noop = () => () => {};
export function useMounted() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

export function scrollToId(id: string, offset: number) {
  if (typeof window === "undefined" || !id) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(() => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: reduce ? "auto" : "smooth" });
  }, 140);
}
