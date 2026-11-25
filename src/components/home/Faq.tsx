"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, Reveal } from "@/components/motion";
import { content, h2, lead, section } from "./lowerStyles";

const faqs = [
  {
    q: "Do I need a fishing licence?",
    a: "No need to arrange one. We provide a recreational fishing licence for every angler on board as part of the trip.",
  },
  {
    q: "What does the price include?",
    a: "The boat, captain and mate, rods and reels, bait, licences, ice and fuel for the planned trip. Food and drinks are quoted separately.",
  },
  {
    q: "Where do the boats depart from?",
    a: "Dubai Marina, Dubai Harbour or Jumeirah Fishing Harbour. Each boat page shows its berth, and we send a map pin with your confirmation.",
  },
  {
    q: "How do I book?",
    a: "Pick a date, a trip and a boat, then send a request. We confirm within one working day and a deposit holds the boat.",
  },
  {
    q: "What if the weather is bad?",
    a: "The captain makes the call on the morning. If it is not safe or not fishable, we move your trip for free or refund it.",
  },
  {
    q: "Can we keep what we catch?",
    a: "Yes, within UAE size and bag limits. Sailfish are always released. Everything else is cleaned and bagged at the dock.",
  },
  {
    q: "Can beginners and children come?",
    a: "Of course. The crew teaches as they go, and we carry life jackets in every size. Sunset and inshore trips suit first-timers best.",
  },
];

const buttonShadow = "var(--shadow-ghost)";

function FaqItem({ n, q, a }: { n: string; q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${n}`;
  return (
    <div className="relative flex w-full flex-col overflow-clip shadow-[inset_0_1px_0_var(--line)] bg-bg">
      <motion.button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        whileHover={{ opacity: 0.78 }}
        transition={{ duration: 0.2 }}
        className="relative flex min-h-[72px] w-full cursor-pointer flex-row items-center gap-[18px] border-0 bg-transparent px-0 py-6 text-left"
      >
        <span className="flex-none whitespace-pre font-sans text-[14px] font-medium leading-[1.55] text-muted">
          {n}
        </span>
        <h3 className="m-0 w-px flex-1 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.03em] text-fg max-[1400px]:text-[24px] max-[1200px]:text-[20px]">
          {q}
        </h3>
        <span
          className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] transition-colors duration-300"
          style={{ backgroundColor: open ? "var(--accent)" : "var(--fill)" }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={20}
            height={20}
            aria-hidden="true"
            className={`block h-5 w-5 transition-colors duration-300 ${open ? "text-ink" : "text-fg"}`}
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12.001 5v14.002m7.001-7H5"
            />
          </motion.svg>
        </span>
      </motion.button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="w-full overflow-hidden"
          >
            <div className="flex w-full flex-row items-start pb-[26px] pl-[42px] pr-[62px] max-[810px]:px-0">
              <p className="m-0 w-px max-w-[640px] flex-1 font-sans text-[16px] leading-[1.55] text-muted">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section className={section} aria-label="FAQ">
      <div className={content}>
        <div className="relative flex w-full flex-row items-start gap-24 max-[1200px]:flex-col max-[1200px]:gap-12">
          <div className="relative flex w-px flex-[0.8_0_0] flex-col items-start gap-5 max-[1200px]:w-full max-[1200px]:flex-none max-[1200px]:items-center">
            <Reveal className="w-full">
              <h2 className={h2}>
                Before you <span className="text-accent">ask.</span>
              </h2>
            </Reveal>
            <Reveal className="w-full max-w-[440px]">
              <p className={lead}>The short answers. For the rest, write to us.</p>
            </Reveal>
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.015, y: -1 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="rounded-[12px]"
              >
                <Link
                  href="/contact"
                  className="flex h-14 w-min flex-row items-center justify-center gap-[14px] whitespace-pre rounded-[12px] bg-surface-2 py-0 pl-[26px] pr-2 no-underline"
                  style={{ boxShadow: buttonShadow }}
                >
                  <span className="font-sans text-[16px] font-bold leading-[1.2] tracking-[-0.005em] text-fg">
                    Contact us
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-fill">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={18}
                      height={18}
                      aria-hidden="true"
                      className="block h-[18px] w-[18px] text-fg"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M18.5 12H5m8 6s6-4.419 6-6s-6-6-6-6"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </Reveal>
          </div>

          <Reveal className="relative flex w-px flex-[1.2_0_0] flex-col items-start shadow-[inset_0_-1px_0_var(--line)] max-[1200px]:w-full max-[1200px]:flex-none">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} n={String(i + 1).padStart(2, "0")} q={f.q} a={f.a} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
