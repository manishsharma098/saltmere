"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, PlusIcon } from "@/components/legal/icons";

import { fishingCopy } from "@/lib/fishing";

// Same four questions as before (licence, price, departure, booking), fishing answers.
const ITEMS = fishingCopy.home.faq.items.slice(0, 4).map(({ q, a }) => [q, a] as const);

const EASE = [0.22, 1, 0.36, 1] as const;

function Item({ n, q, a }: { n: number; q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${n}`;
  return (
    <div className="w-full shadow-[inset_0_1px_0_0_var(--line)]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[72px] w-full cursor-pointer items-center gap-[18px] py-6 text-left transition-opacity duration-200 hover:opacity-[0.78]"
      >
        <span className="flex-none text-[14px] leading-[1.55] font-medium text-muted">{String(n).padStart(2, "0")}</span>
        <h3 className="w-px flex-1 font-display text-[20px] leading-[1.15] font-medium tracking-[-0.03em] text-fg desk:text-[26px]">
          {q}
        </h3>
        <span
          className={`grid h-11 w-11 flex-none place-items-center rounded-xl transition-colors duration-500 ${
            open ? "bg-accent text-on-accent" : "bg-fill text-fg"
          }`}
        >
          {open ? <CloseIcon size={20} /> : <PlusIcon size={20} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-[26px] text-[16px] leading-[1.55] text-muted tab:pr-[62px] tab:pl-[42px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <div className="w-full shadow-[inset_0_-1px_0_0_var(--line)] desk:w-px desk:flex-[1.2_0_0]">
      {ITEMS.map(([q, a], i) => (
        <Item key={q} n={i + 1} q={q} a={a} />
      ))}
    </div>
  );
}
