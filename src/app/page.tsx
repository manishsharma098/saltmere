import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Fleet from "@/components/home/Fleet";
import Tours from "@/components/home/Tours";
import Lower from "@/components/home/Lower";
import { SearchProvider } from "@/components/home/SearchContext";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <SearchProvider>
      <Hero />
      <Stats />
      <Fleet />
      <Tours />
      {/* LOWER HALF */}
      <Lower />
    </SearchProvider>
  );
}
