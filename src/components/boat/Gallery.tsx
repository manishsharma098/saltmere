"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Framer "Slideshow" as configured on the boat page: one slide per view, drag to
 * change, infinite loop, no arrows, progress dots (10px, white, 0.5 inactive)
 * on a rgba(0,0,0,.2) pill 10px from the bottom.
 */
const SPRING = { type: "spring" as const, stiffness: 200, damping: 40 };
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Gallery({ images, focus, alt }: { images: readonly string[]; focus: string; alt: string }) {
  const n = images.length;
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const [index, setIndex] = useState(0); // may leave [0, n) while animating, normalised after
  const x = useMotionValue(0);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.getBoundingClientRect().width));
    ro.observe(el);
    setW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // keep position in sync when the width changes
  useEffect(() => {
    x.set(-(n + index) * w);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w]);

  const go = (next: number) => {
    setIndex(next);
    animate(x, -(n + next) * w, {
      ...SPRING,
      onComplete: () => {
        const norm = ((next % n) + n) % n;
        if (norm !== next) {
          x.set(-(n + norm) * w);
          setIndex(norm);
        }
      },
    });
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = w / 4;
    if (info.offset.x < -threshold || info.velocity.x < -500) go(index + 1);
    else if (info.offset.x > threshold || info.velocity.x > 500) go(index - 1);
    else go(index);
  };

  const active = ((index % n) + n) % n;
  const slides = [...images, ...images, ...images];

  return (
    <section ref={ref} aria-roledescription="carousel" style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", userSelect: "none" }}>
      <motion.ul
        style={{ x, display: "flex", height: "100%", margin: 0, padding: 0, listStyle: "none", cursor: "grab", touchAction: "pan-y" }}
        drag={w ? "x" : false}
        dragMomentum={false}
        dragElastic={1}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={onDragEnd}
      >
        {slides.map((src, i) => {
          const real = i % n;
          return (
            <li key={i} aria-hidden={real !== active} style={{ position: "relative", flex: "none", width: w || "100%", height: "100%" }}>
              <Image
                src={src}
                alt={real === active ? alt : ""}
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                draggable={false}
                priority={i === n}
                className="pointer-events-none object-cover"
                style={{ objectPosition: real === 0 ? focus : "center" }}
              />
            </li>
          );
        })}
      </motion.ul>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 10,
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          borderRadius: 50,
          background: "rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Scroll to page ${i + 1}`}
            onClick={() => go(index + (i - active))}
            style={{
              display: "flex",
              border: 0,
              background: "transparent",
              cursor: "pointer",
              margin: 0,
              padding: 0,
              paddingTop: 10,
              paddingBottom: 10,
              paddingInlineStart: i === 0 ? 10 : 5,
              paddingInlineEnd: i === n - 1 ? 10 : 5,
            }}
          >
            <span
              style={{
                display: "block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "rgb(255, 255, 255)",
                opacity: i === active ? 1 : 0.5,
                transition: "opacity .3s",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
