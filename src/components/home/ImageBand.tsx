"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion";

export default function ImageBand() {
  return (
    <section
      aria-label="Image band"
      className="relative flex w-full flex-row items-start px-[10px] pt-[144px] min-[1600px]:pt-[180px] max-[1200px]:pt-[97px] max-[810px]:pt-[96px]"
    >
      <div className="relative flex h-[86vh] max-h-[920px] min-h-[520px] w-px flex-1 flex-col items-center justify-end overflow-clip rounded-[20px] px-[26px] pb-[88px] max-[1200px]:px-6 max-[1200px]:pb-16 max-[810px]:h-[78vh] max-[810px]:px-4 max-[810px]:pb-10 max-[390px]:px-[14px] max-[390px]:pb-9">
        <div className="saltmere-drift absolute inset-0 rounded-[inherit]">
          <Image
            src="/images/fishing/band-rods-wake.jpg"
            alt="Trolling rods bent over the stern of a fishing boat, white wake behind"
            fill
            sizes="100vw"
            className="rounded-[inherit] object-cover object-[50%_60%]"
          />
        </div>
        {/* Shade Bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #040b14c7 0%, #040b1485 40%, #040b142e 86%)",
          }}
        />
        {/* Shade Side */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, #040b1485 0%, #040b142e 55%)" }}
        />
        <div className="relative flex w-full max-w-[1320px] flex-col items-start max-[810px]:items-center">
          <Reveal className="w-full max-w-[820px]">
            <h2 className="m-0 font-display font-medium leading-[0.98] tracking-[-0.04em] text-white text-[102.4px] max-[1400px]:text-[76.8px] max-[1200px]:text-[51.8px] max-[810px]:text-[42.9px] max-[810px]:text-center max-[390px]:text-[39.6px]">
              Blue water, <span className="text-accent-soft">forty minutes</span> from the dock.
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
