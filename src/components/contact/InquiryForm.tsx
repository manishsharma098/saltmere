"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "@/components/icons";
import { CheckIcon } from "@/components/legal/icons";

import { TRIP_OPTIONS } from "@/components/fleet/booking-store";
import { boats } from "@/lib/data";
import { fishingCopy } from "@/lib/fishing";
import DateField from "@/components/DateField";

const FORM = fishingCopy.form;
const TOURS = TRIP_OPTIONS.map((o) => o.label);
const BOATS = [FORM.boatPlaceholder, ...boats.map((b) => b.name)];

/* 58px field: surface-2 fill, 1px hairline, 1.5px accent ring on focus (Framer draws the border as an overlay). */
const FIELD =
  "relative w-full rounded-xl bg-surface-2 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-line after:content-[''] focus-within:after:border-[1.5px] focus-within:after:border-accent";
const INPUT =
  "block w-full bg-transparent px-[18px] py-[14px] text-[16px] leading-[1.2] text-fg outline-none placeholder:text-muted";

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-accent text-[13px] leading-[1.55] text-on-accent">
        {n}
      </div>
      <p className="text-[16px] leading-[1.3] font-bold text-fg">{title}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-[13px] leading-[1.4] font-medium tracking-[0.01em] text-muted">{label}</span>
      {children}
    </label>
  );
}

function Select({ name, options }: { name: string; options: string[] }) {
  return (
    <div className={`${FIELD} h-[58px]`}>
      <select
        name={name}
        defaultValue={options[0]}
        className={`${INPUT} h-full cursor-pointer appearance-none pr-[52px] [&>option]:text-black`}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        width={16}
        height={16}
        className="pointer-events-none absolute top-1/2 right-[18px] -translate-y-1/2 text-muted"
      >
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [sent, setSent] = useState(false);
  const complete = name.trim() !== "" && /\S+@\S+\.\S+/.test(email);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    // No backend yet: show the success state in place.
    setSent(true);
  }

  return (
    <div className="relative w-full rounded-[20px] bg-surface p-[22px] shadow-[0_40px_80px_-50px_rgba(0,0,0,0.6)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[20px] after:border after:border-line after:content-[''] tab:p-9">
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-[22px]">
        <Step n={1} title="About you" />
        <div className="grid w-full grid-cols-1 gap-[14px] tab:grid-cols-2">
          <Field label="Name">
            <div className={`${FIELD} h-[58px]`}>
              <input
                type="text"
                name="Name"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${INPUT} h-full`}
              />
            </div>
          </Field>
          <Field label="Email">
            <div className={`${FIELD} h-[58px]`}>
              <input
                type="email"
                name="Email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${INPUT} h-full`}
              />
            </div>
          </Field>
        </div>

        <Step n={2} title="Your day on the water" />
        <div className="grid w-full grid-cols-1 gap-[14px] tab:grid-cols-2">
          <Field label="Date">
            <div className={`${FIELD} h-[58px]`}>
              <DateField name="Date" value={date} onChange={setDate} />
            </div>
          </Field>
          <Field label={FORM.guests}>
            <div className={`${FIELD} h-[58px]`}>
              <input type="number" name="Anglers" min={1} placeholder="4" className={`${INPUT} h-full`} />
            </div>
          </Field>
          <Field label={FORM.tour}>
            <Select name="Trip" options={TOURS} />
          </Field>
          <Field label="Boat">
            <Select name="Boat" options={BOATS} />
          </Field>
          <div className="tab:col-span-2">
            <Field label="Message">
              <div className={`${FIELD} h-[120px]`}>
                <textarea
                  name="Message"
                  placeholder="Target fish, experience, anything we should know"
                  className={`${INPUT} h-full resize-none`}
                />
              </div>
            </Field>
          </div>
        </div>

        <div className="relative flex w-full flex-col flex-wrap items-center justify-center gap-3 rounded-[20px] bg-surface-2 p-4 after:pointer-events-none after:absolute after:inset-0 after:rounded-[20px] after:border after:border-line after:content-[''] tab:flex-row tab:justify-between tab:gap-0 tab:py-3 tab:pr-3 tab:pl-[22px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={sent ? "sent" : "idle"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              aria-live="polite"
              className="w-full text-center text-[15px] leading-[1.55] text-muted tab:w-auto tab:text-left"
            >
              {sent ? "Thank you. Your request is on its way." : "We reply within one working day."}
            </motion.p>
          </AnimatePresence>
          <button
            type="submit"
            name="Submit"
            disabled={sent}
            className={`btn-lift inline-flex h-14 items-center gap-[14px] rounded-xl bg-accent pr-2 pl-[26px] text-[16px] leading-[1.2] font-bold tracking-[-0.005em] whitespace-nowrap text-on-accent shadow-[var(--shadow-primary)] ${
              complete || sent ? "opacity-100" : "opacity-60"
            } disabled:cursor-default disabled:hover:transform-none`}
          >
            {sent ? "Request sent" : "Request this date"}
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-chip">
              {sent ? <CheckIcon size={18} /> : <ArrowRight size={18} />}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
