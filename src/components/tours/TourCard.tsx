import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/lib/tours";
import { tourFocus } from "@/lib/tours";
import { ArrowUpRight } from "./icons";

/**
 * Photo card used on the trips index.
 * wide: featured card (aspect 2.33 desktop); default: grid card (aspect 1.25 desktop).
 * Both go to 1.33 on tablet and 0.8 on phone; text is centred below 1200px.
 */
export default function TourCard({ tour, wide = false }: { tour: Tour; wide?: boolean }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className={`group relative flex w-full flex-col justify-end overflow-clip rounded-[20px] aspect-[0.8] tab:aspect-[1.33] ${
        wide ? "desk:aspect-[2.33]" : "desk:aspect-[1.25]"
      }`}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] will-change-transform group-hover:scale-[1.03]">
        <Image
          src={tour.image}
          alt={`${tour.title} on the water off Dubai`}
          fill
          sizes={wide ? "(max-width: 810px) 100vw, 90vw" : "(max-width: 810px) 100vw, 50vw"}
          className="object-cover"
          style={{ objectPosition: tourFocus(tour.slug) }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,#040b14c7_0%,#040b1485_36%,#040b142e_64%)]" />

      <div className="pointer-events-none relative flex w-full flex-col items-center gap-3 p-[22px] text-center tab:p-10 desk:items-start desk:text-left">
        <div className="flex items-center gap-[10px] font-sans text-[14px] font-medium leading-[1.55] text-[#ffffffc7]">
          <span>{tour.number}</span>
          <span className="h-1 w-1 rounded-full bg-[#ffffffc7]" />
          <span>{tour.duration}</span>
        </div>
        <h2
          className={`w-full max-w-[640px] font-display font-medium leading-none tracking-[-0.035em] text-white ${
            wide
              ? "text-[32.4px] min-[390px]:text-[35.1px] tab:text-[40.5px] desk:text-[60px] min-[1400px]:text-[76px]"
              : "text-[32.4px] min-[390px]:text-[35.1px] tab:text-[32px] desk:text-[43.2px] min-[1400px]:text-[56px]"
          }`}
        >
          {tour.title}
        </h2>
        <p className="w-full max-w-[460px] text-[16px] leading-[1.55] text-[#ffffffc7]">{tour.description}</p>
        <div className="flex w-full items-center justify-between pt-4 shadow-[inset_0_1px_0_0_#ffffff3d]">
          <p className="text-[20px] font-bold leading-[1.3] tracking-[-0.01em] text-white min-[390px]:text-[22px]">
            {tour.fromLabel}
          </p>
          <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#ffffff29] text-white backdrop-blur-[12px]">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </div>
    </Link>
  );
}
