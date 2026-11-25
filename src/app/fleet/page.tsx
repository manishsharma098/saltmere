import type { Metadata } from "next";
import "@/components/fleet/fleet.css";
import { Appear, WordsAppear } from "@/components/fleet/anim";
import BookingBar from "@/components/fleet/BookingBar";
import FleetResults from "@/components/fleet/FleetResults";
import { fleetBoats } from "@/components/fleet/fleet-data";
import { fishingCopy } from "@/lib/fishing";
import { accentWords } from "@/lib/tours";

const copy = fishingCopy.fleet;

export const metadata: Metadata = {
  title: { absolute: "Fishing boats and charter fleet | Saltmere, Dubai" },
  description: `Six fishing boats, one calendar. ${copy.sub}`,
  alternates: { canonical: "/fleet" },
  openGraph: {
    title: "Fishing boats and charter fleet | Saltmere, Dubai",
    description: `Six fishing boats, one calendar. ${copy.sub}`,
    url: "/fleet",
  },
};

export default function FleetPage() {
  return (
    <div className="fl-page">
      <div className="fl-content">
        <div className="fl-head">
          <h1 className="slm-h1">
            <WordsAppear
              parts={accentWords(copy.headline).map((w) => ({ text: w.text, className: w.accent ? "text-[var(--slm-accent)]" : undefined }))}
            />
          </h1>
          <Appear className="fl-lead" delay={0.3}>
            <p className="slm-lead">{copy.sub}</p>
          </Appear>
        </div>
        <Appear className="w-full" delay={0.35}>
          <BookingBar surface="card" scrollTarget="fleet-results" scrollOffset={120} readTourParam />
        </Appear>
        <div className="fl-results" id="fleet-results">
          <FleetResults boats={fleetBoats} />
        </div>
      </div>
    </div>
  );
}
