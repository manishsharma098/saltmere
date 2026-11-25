"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

/**
 * Headline that rises in word by word on load, like the reference
 * (each word inline-block, opacity 0 -> 1, translateY 28px -> 0,
 * ~1s ease-out, ~0.1s between words).
 */
export type WordSegment = { text: string; className?: string };

export const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1] as const;

export default function RiseWords({
  segments,
  delay = 0.1,
  stagger = 0.1,
}: {
  segments: WordSegment[];
  delay?: number;
  stagger?: number;
}) {
  let i = 0;
  // Markup mirrors Framer's text effect exactly (flat inline-block words separated by
  // spaces; each styled run ends with a space + empty inline-block) so lines break and
  // centre at the same pixel positions as the reference.
  return (
    <>
      {segments.map((seg, si) => {
        const words = seg.text.split(" ").filter(Boolean);
        const run = words.map((w, wi) => {
          const idx = i++;
          return (
            <Fragment key={wi}>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0.001, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE_OUT_CUBIC, delay: delay + idx * stagger }}
              >
                {w}
              </motion.span>
              {wi < words.length - 1 ? " " : null}
            </Fragment>
          );
        });
        return (
          <Fragment key={si}>
            {seg.className ? <span className={seg.className}>{run}</span> : run}
            {si < segments.length - 1 ? (
              <>
                {" "}
                <span className="inline-block" />
              </>
            ) : null}
          </Fragment>
        );
      })}
    </>
  );
}
