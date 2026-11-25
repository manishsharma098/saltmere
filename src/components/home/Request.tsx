"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion";
import { ArrowRight } from "@/components/icons";
import { content, h2, section } from "./lowerStyles";
import { TRIP_OPTIONS } from "@/components/fleet/booking-store";
import DateField from "@/components/DateField";
import { boats as fleet } from "@/lib/data";

const tours = TRIP_OPTIONS.map((t) => t.label);
const boats = ["Not sure yet", ...fleet.map((b) => b.name)];

type Status = "idle" | "pending" | "success";

/** Framer form field shell: surface-2, radius 12, 1px line border (1.5px accent on focus). */
const fieldShell =
  "relative w-full overflow-hidden rounded-[12px] bg-surface-2 shadow-[inset_0_0_0_1px_var(--line)] transition-shadow duration-200 focus-within:shadow-[inset_0_0_0_1.5px_var(--accent)]";
const inputCls =
  "block h-full w-full min-w-0 appearance-none border-0 bg-transparent px-[18px] py-[14px] font-sans text-[16px] font-normal leading-[1.2] text-fg outline-none placeholder:text-muted";

function Field({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`flex w-full flex-col items-start gap-2 self-start ${wide ? "col-span-full" : ""}`}>
      <span className="font-sans text-[13px] font-medium leading-[1.4] tracking-[0.01em] text-muted">{label}</span>
      {children}
    </label>
  );
}

function StepTitle({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex w-full flex-row items-center gap-3">
      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-[8px] bg-accent font-sans text-[13px] leading-[1.55] text-on-accent">
        {n}
      </span>
      <p className="m-0 w-px flex-1 font-sans text-[16px] font-bold leading-[1.3] text-fg">{children}</p>
    </div>
  );
}

function Select({ name, options }: { name: string; options: string[] }) {
  return (
    <div className={`${fieldShell} h-[58px]`}>
      <select name={name} defaultValue={options[0]} className={`${inputCls} cursor-pointer pr-[52px] [&>option]:text-black`}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 text-muted"
      >
        <path
          d="M 3.5 6 L 8 10.5 L 12.5 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Request() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const incomplete = !name.trim() || !email.trim();
  const label = status === "pending" ? "Sending…" : status === "success" ? "Request noted" : "Request this date";
  const opacity = status === "pending" ? 0.85 : status === "success" ? 1 : incomplete ? 0.6 : 1;

  // No backend: simulate the Framer form's Pending → Success states.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("pending");
    window.setTimeout(() => setStatus("success"), 900);
  };

  return (
    <section id="request" className={`${section} scroll-mt-24`} aria-label="Request">
      <div className={content}>
        <div className="relative flex w-full flex-row items-start gap-5 max-[1200px]:flex-col">
          {/* Photo card */}
          <Reveal className="relative flex min-h-[560px] w-px flex-1 flex-col items-start justify-end overflow-clip rounded-[20px] max-[1200px]:min-h-[420px] max-[1200px]:w-full max-[1200px]:flex-none">
            <div className="absolute inset-0 rounded-[inherit]">
              <Image
                src="/images/fishing/extra-reel-sunset.jpg"
                alt="A trolling rod and reel against the sunset over open sea"
                fill
                sizes="(max-width: 1200px) 100vw, 50vw"
                className="rounded-[inherit] object-cover object-[35%_50%]"
              />
            </div>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, #040b14c7 0%, #040b1485 45%, #040b142e 80%)" }}
            />
            <div className="relative flex w-full flex-col items-start gap-4 p-10 max-[1200px]:items-center max-[1200px]:p-6">
              <h2 className={`${h2} !text-white`}>
                Tell us the day. <span className="text-accent-soft">We find the fish.</span>
              </h2>
              <p className="m-0 w-full max-w-[440px] font-sans text-[20px] leading-[1.5] text-[#ffffffc7] max-[1400px]:text-[17px] max-[1200px]:text-center">
                Tell us the date and group size. We answer within one working day.
              </p>
            </div>
          </Reveal>

          {/* Inquiry form */}
          <Reveal className="relative w-px flex-1 max-[1200px]:w-full max-[1200px]:flex-none">
            <div className="relative flex w-full flex-col items-start gap-[22px] rounded-[20px] bg-surface p-9 shadow-[inset_0_0_0_1px_var(--line),0px_40px_80px_-50px_rgba(0,0,0,0.6)] max-[810px]:p-[22px]">
              <form onSubmit={onSubmit} className="flex w-full flex-col items-start gap-[22px]">
                <StepTitle n={1}>About you</StepTitle>
                <div className="grid w-full grid-cols-2 gap-[14px] max-[810px]:grid-cols-1">
                  <Field label="Name">
                    <div className={`${fieldShell} h-[58px]`}>
                      <input
                        type="text"
                        name="Name"
                        required
                        placeholder="Your name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </Field>
                  <Field label="Email">
                    <div className={`${fieldShell} h-[58px]`}>
                      <input
                        type="email"
                        name="Email"
                        required
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </Field>
                </div>

                <StepTitle n={2}>Your day on the water</StepTitle>
                <div className="grid w-full grid-cols-2 gap-[14px] max-[810px]:grid-cols-1">
                  <Field label="Date">
                    <div className={`${fieldShell} h-[58px]`}>
                      <DateField name="Date" value={date} onChange={setDate} />
                    </div>
                  </Field>
                  <Field label="Anglers">
                    <div className={`${fieldShell} h-[58px]`}>
                      <input type="number" name="Anglers" min={1} placeholder="6" className={inputCls} />
                    </div>
                  </Field>
                  <Field label="Trip">
                    <Select name="Trip" options={tours} />
                  </Field>
                  <Field label="Boat">
                    <Select name="Boat" options={boats} />
                  </Field>
                  <Field label="Message" wide>
                    <div className={`${fieldShell} h-[120px]`}>
                      <textarea
                        name="Message"
                        placeholder="Target fish, experience, anything we should know"
                        className={`${inputCls} resize-none whitespace-normal`}
                      />
                    </div>
                  </Field>
                </div>

                <div className="relative flex w-full flex-row flex-wrap items-center justify-between rounded-[20px] bg-surface-2 py-3 pl-[22px] pr-3 shadow-[inset_0_0_0_1px_var(--line)] max-[810px]:flex-col max-[810px]:justify-center max-[810px]:gap-3 max-[810px]:p-4">
                  <p className="m-0 whitespace-pre font-sans text-[15px] leading-[1.55] text-muted max-[810px]:w-full max-[810px]:whitespace-normal">
                    We reply within one working day.
                  </p>
                  <motion.button
                    type="submit"
                    animate={{ opacity }}
                    transition={{ duration: 0.25 }}
                    aria-live="polite"
                    className="btn-primary btn-lift border-0"
                  >
                    {label}
                    <span className="btn-chip">
                      <ArrowRight size={18} />
                    </span>
                  </motion.button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
