"use client";

/**
 * Shared reveal helpers matching the Saltmere reference.
 *
 * Initial states found in the reference SSR markup:
 *  - Blocks / cards:      opacity 0, translateY(24px)   -> <Reveal>
 *  - Small text items:    opacity 0, translateY(18px)   -> <Reveal y={18}>
 *  - Headline words:      opacity 0, translateY(28px), per word -> <WordReveal>
 *  - Lists of cards:      staggered children             -> <Stagger> + <StaggerItem>
 *
 * All reveal once when scrolled into view (or on mount with `onMount`).
 */
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const; // smooth "expo-out"-like curve
export const DURATION = 0.8;

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView"> & {
  children?: ReactNode;
  y?: number;
  delay?: number;
  duration?: number;
  /** animate on mount instead of when scrolled into view (hero / above-the-fold) */
  onMount?: boolean;
  as?: "div" | "section" | "li" | "span" | "p" | "h1" | "h2" | "h3";
};

export function Reveal({
  children,
  y = 24,
  delay = 0,
  duration = DURATION,
  onMount = false,
  as = "div",
  ...rest
}: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  const target = { opacity: 1, y: 0 };
  return (
    <Comp
      initial={{ opacity: 0, y }}
      {...(onMount ? { animate: target } : { whileInView: target, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

const staggerParent = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerChild = (y = 24, duration = DURATION): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
});

type StaggerProps = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView" | "variants"> & {
  children?: ReactNode;
  stagger?: number;
  delay?: number;
  onMount?: boolean;
  as?: "div" | "ul" | "ol" | "section";
};

export function Stagger({ children, stagger = 0.08, delay = 0, onMount = false, as = "div", ...rest }: StaggerProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      {...(onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      {...rest}
    >
      {children}
    </Comp>
  );
}

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  children?: ReactNode;
  y?: number;
  duration?: number;
  as?: "div" | "li" | "span" | "article" | "a";
};

export function StaggerItem({ children, y = 24, duration = DURATION, as = "div", ...rest }: StaggerItemProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp variants={staggerChild(y, duration)} {...rest}>
      {children}
    </Comp>
  );
}

/** Headline that rises in word by word (reference: each word inline-block, translateY(28px), opacity 0). */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  y = 28,
  duration = 0.7,
  onMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  duration?: number;
  onMount?: boolean;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      {...(onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true } })}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={staggerChild(y, duration)}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
