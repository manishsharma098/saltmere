"use client";

/**
 * Shared search state for the Home page (hero search bar / phone sheet -> fleet results).
 *
 * Backed by the booking store (`@/components/fleet/booking-store`), which mirrors the
 * reference's `window.__saltmereBooking` query, so a search also carries over to the
 * Fleet page on client-side navigation. Like the reference, the fleet only updates when
 * the search is submitted ("Show boats"), not on every stepper click.
 */
import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { setQuery as storeSetQuery, useQuery, type Query } from "@/components/fleet/booking-store";

type SearchCtx = {
  /** The submitted search, or null when the full fleet is shown. */
  query: Query | null;
  /** Submit a search (or pass null to "Show whole fleet"). */
  setQuery: (q: Query | null) => void;
};

const Ctx = createContext<SearchCtx | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const query = useQuery();
  const setQuery = useCallback((q: Query | null) => storeSetQuery(q), []);
  const value = useMemo(() => ({ query, setQuery }), [query, setQuery]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Works inside or outside <SearchProvider> (falls back to the global store). */
export function useSearch(): SearchCtx {
  const ctx = useContext(Ctx);
  const query = useQuery();
  return ctx ?? { query, setQuery: storeSetQuery };
}

export type { Query };
