import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import TitleWords from "@/components/tours/TitleWords";
import TourCard from "@/components/tours/TourCard";
import { fishingCopy } from "@/lib/fishing";
import { accentWords, tours } from "@/lib/tours";

const copy = fishingCopy.tours;

export const metadata: Metadata = {
  title: { absolute: "Fishing trips and day charters | Saltmere, Dubai" },
  description:
    "Five ways to wet a line, from a three hour sunset trip to a dawn to dusk day offshore. Every trip runs on every boat.",
  alternates: { canonical: "/tours" },
  openGraph: {
    title: "Fishing trips and day charters | Saltmere, Dubai",
    description:
      "Five ways to wet a line, from a three hour sunset trip to a dawn to dusk day offshore. Every trip runs on every boat.",
    url: "/tours",
  },
};

export default function ToursPage() {
  const [featured, ...rest] = tours;
  return (
    <div className="flex w-full flex-col items-center pt-[136px] tab:pt-[152px] desk:pt-[172px] wide:pt-[176px]">
      <div className="flex w-full max-w-[1392px] flex-col gap-[14px] px-4 tab:gap-5 tab:px-6 desk:px-9 wide:px-10">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-6 pb-7 desk:items-start">
          <TitleWords
            words={accentWords(copy.headline).map((w) => (w.accent ? { text: w.text, className: "text-accent" } : w.text))}
            className="w-full text-center font-display text-[46px] font-medium leading-[0.96] tracking-[-0.04em] text-fg min-[390px]:text-[50px] tab:text-[60px] desk:text-left desk:text-[88.8px] min-[1400px]:text-[108px]"
          />
          <Reveal onMount delay={0.25} className="w-full max-w-[520px]">
            <p className="text-center text-[17px] leading-[1.5] text-muted desk:text-left min-[1400px]:text-[20px]">
              {copy.sub}
            </p>
          </Reveal>
        </div>

        {/* Featured trip */}
        <Reveal className="flex w-full flex-col">
          <TourCard tour={featured} wide />
        </Reveal>

        {/* More trips */}
        <Reveal className="grid w-full grid-cols-1 gap-[14px] tab:grid-cols-2 tab:gap-5">
          {rest.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </Reveal>

        <p className="w-full text-center text-[14px] leading-[1.55] text-muted min-[640px]:text-[13px]">
          {copy.footnote}
        </p>
      </div>
    </div>
  );
}
