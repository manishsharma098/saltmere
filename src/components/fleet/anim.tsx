"use client";

/**
 * Exact Framer effects used on the Fleet and Boat pages:
 *  - Title: "appear" text effect, tokenised per word, opacity .001 -> 1, y 28 -> 0,
 *    delay .1, duration 1.1, ease [.22,.61,.36,1], on mount.
 *  - Blocks: opacity 0 -> 1, y 24 -> 0, duration .95, same ease, once when 10% in view.
 */
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_OUT: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

type AppearProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "transition"> & {
  children?: ReactNode;
  delay?: number;
  as?: "div" | "a" | "section" | "li";
};

export function Appear({ children, delay = 0, as = "div", ...rest }: AppearProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay, duration: 0.95, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Words of a headline; each part may carry its own className (e.g. accent colour). */
export function WordsAppear({
  parts,
  stagger = 0.1,
}: {
  parts: { text: string; className?: string }[];
  stagger?: number;
}) {
  let i = 0;
  const nodes: ReactNode[] = [];
  parts.forEach((p, pi) => {
    const words = p.text.split(" ").filter(Boolean);
    words.forEach((w) => {
      const idx = i++;
      nodes.push(
        <motion.span
          key={`${pi}-${idx}`}
          className={p.className}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0.001, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * stagger, duration: 1.1, ease: EASE_OUT }}
        >
          {w}
        </motion.span>,
        " ",
      );
    });
  });
  nodes.pop();
  return <>{nodes}</>;
}
