"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/components/motion";

/** Port of the reference "CountUp" component: counts 0 -> value (cubic ease-out, 1.4 s) when scrolled into view. */
function CountUp({ value, suffix = "", duration = 1.4 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    setN(0);
    let raf = 0;
    let seen = false;
    const io = new IntersectionObserver(([entry]) => {
      seen = true;
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / (duration * 1000));
        setN(Math.round(value * (1 - (1 - p) ** 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    const fallback = window.setTimeout(() => {
      if (!seen) setN(value);
    }, 1500);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
  }, [value, duration]);

  return (
    <span
      ref={ref}
      className="relative m-0 block w-max whitespace-nowrap font-display text-[44px] font-medium leading-none tracking-[-0.04em] text-fg tabular-nums desk:text-[60px] wide:text-[72px]"
    >
      {n}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 6, suffix: "", label: "boats, 21 to 42 ft" },
  { value: 100, suffix: "%", label: "skippered, licence included" },
  { value: 24, suffix: " h", label: "reply on every request" },
  { value: 0, suffix: "", label: "hidden fees on the quote" },
];

// per-item borders / padding, matching the reference breakpoints
const ITEM = [
  "pr-6 pl-0",
  "border-l border-line px-6",
  "border-l border-line px-6 max-tab:border-l-0 max-tab:border-t",
  "border-l border-line px-6 max-tab:border-t",
];

export default function Stats() {
  return (
    <section className="relative flex w-full flex-col items-center pt-10 desk:pt-[60px] wide:pt-[72px]" aria-label="Key facts">
      <div className="mx-auto w-full max-w-[1392px] px-4 tab:px-6 desk:px-9 wide:px-10">
        <motion.ul
          className="relative m-0 grid w-full list-none grid-cols-2 border-t border-line p-0 tab:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {STATS.map((s, i) => (
            <motion.li
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
              }}
              className={`relative flex w-full flex-col items-center gap-[6px] self-start pb-[6px] pt-[26px] max-desk:px-3 desk:items-start desk:pb-2 desk:pt-7 ${ITEM[i]}`}
            >
              <CountUp value={s.value} suffix={s.suffix} />
              <p className="m-0 w-full text-center font-sans text-[15px] leading-[1.55] text-muted desk:text-left">{s.label}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
