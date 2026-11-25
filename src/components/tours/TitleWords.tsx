"use client";

import { motion } from "framer-motion";
import { EASE } from "@/components/motion";

type Word = { text: string; className?: string };

/**
 * Headline whose words rise in one by one (reference: each word inline-block,
 * opacity 0 → 1, translateY(28px) → 0). Supports per-word classes (accent "out.").
 */
export default function TitleWords({
  words,
  as = "h1",
  className,
  delay = 0.1,
  stagger = 0.08,
  duration = 0.8,
}: {
  words: (string | Word)[];
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const Tag = as;
  const list = words.map((w) => (typeof w === "string" ? { text: w } : w));
  return (
    <Tag className={className} aria-label={list.map((w) => w.text).join(" ")}>
      {list.map((w, i) => (
        <span key={i} aria-hidden>
          <motion.span
            className={w.className}
            style={{ display: "inline-block" }}
            initial={{ opacity: 0.001, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: delay + i * stagger, ease: EASE }}
          >
            {w.text}
          </motion.span>
          {i < list.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
