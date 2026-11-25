"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState, type CSSProperties, type ReactNode } from "react";
import { Reveal } from "@/components/motion";
import {
  DURATIONS,
  defaultDate,
  durationOf,
  fmtShort,
  lastBookable,
  scrollToId,
  today,
  type DurationKey,
} from "@/components/fleet/booking-store";
import DateField from "@/components/DateField";
import { useSearch } from "./SearchContext";

/* ---------- on-image colours (theme independent in the reference) ---------- */
const ON_IMG = "#ffffff";
const ON_IMG_70 = "#ffffffc7";
const LINE_ON_IMG = "#ffffff29";
const SOFT_ON_IMG = "#ffffff29";

const EASE_SOFT = [0.25, 0.8, 0.25, 1] as const;

/* ---------- icons (from the reference code component) ---------- */
const Ico = ({ size = 18, children }: { size?: number; children: ReactNode }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden style={{ display: "block", flex: "none" }}>
    {children}
  </svg>
);
const stroke = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 } as const;

const IcCalendar = () => (
  <Ico size={16}>
    <g {...stroke}>
      <path d="M16 2v4M8 2v4m5-2h-2C7.229 4 5.343 4 4.172 5.172S3 8.229 3 12v2c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-2c0-3.771 0-5.657-1.172-6.828S16.771 4 13 4M3 10h18" />
      <path d="M12.126 14H12m.125 4H12m-4.376-4H7.5m.125 4H7.5m9.125-4H16.5m-4.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m0 4a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m-4.5-4a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m0 4a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m9-4a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0" />
    </g>
  </Ico>
);
const IcGuests = () => (
  <Ico size={16}>
    <path
      {...stroke}
      d="M18.5 20.5c-.234-2.931-2.658-5.252-5.692-5.448L11.999 15q-.431.012-.811.03C8.18 15.172 5.73 17.597 5.5 20.5m9.75-11.25a3.25 3.25 0 1 1-6.5 0a3.25 3.25 0 0 1 6.5 0M5.502 8.5A3.25 3.25 0 0 1 9.5 3.752M18.496 8.5A3.25 3.25 0 0 0 14.5 3.752M22 18c-.18-2.263-2-4.5-4-5M2 18c.18-2.263 2-4.5 4-5"
    />
  </Ico>
);
const IcClock = () => (
  <Ico size={16}>
    <g fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
    </g>
  </Ico>
);
const IcMinus = () => (
  <Ico>
    <path {...stroke} d="M20 12H4" />
  </Ico>
);
const IcPlus = () => (
  <Ico>
    <path {...stroke} d="M12.001 5v14.002m7.001-7H5" />
  </Ico>
);
const IcArrow = () => (
  <Ico>
    <path {...stroke} d="M18.5 12H5m8 6s6-4.419 6-6s-6-6-6-6" />
  </Ico>
);
const IcSearch = () => (
  <Ico size={22}>
    <path {...stroke} d="m17 17l4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0" />
  </Ico>
);
const IcClose = () => (
  <Ico size={22}>
    <path {...stroke} d="M19 5L5 19M5 5l14 14" />
  </Ico>
);

/* Accent button shadow from the reference (.slm-btn) */
const ACCENT_SHADOW =
  "inset 0 1px 0 color-mix(in srgb, #ffffff 24%, transparent), inset 0 -1px 0 color-mix(in srgb, var(--accent) 80%, #040b14), 0 0 0 1px color-mix(in srgb, var(--accent) 84%, #040b14), 0 1px 1px color-mix(in srgb, #040b14 30%, transparent), 0 4px 10px -3px color-mix(in srgb, var(--accent) 18%, transparent)";

/* Native control styling + hover states (ported 1:1 from the reference's <style>). */
const FORM_CSS = `
.slm-cell{transition:background .3s}
.slm-cell:has(input:focus-visible,select:focus-visible),.slm-cell:focus-visible{box-shadow:inset 0 0 0 1.5px var(--accent)}
@media (hover:hover){.slm-cell input:hover,.slm-cell select:hover{color:var(--accent)}}
.slm-cell input,.slm-cell select{font:inherit;font-size:18px;font-weight:500;color:inherit;background:transparent;border:0;padding:4px 0;width:100%;min-height:44px;cursor:pointer;outline:0;appearance:none;-webkit-appearance:none;text-overflow:ellipsis}
.slm-cell select option{color:var(--ink);background:var(--sand)}
.slm-step{transition:background .3s,color .3s,opacity .3s}
@media (hover:hover){.slm-step:hover:not(:disabled){background:var(--accent)!important;color:var(--on-accent)!important}}
.slm-step:active:not(:disabled){background:var(--accent)!important;color:var(--on-accent)!important}
.slm-step:disabled{opacity:.3;cursor:not-allowed}
.slm-btn{background-image:none;transform:translate3d(0,0,0);transition:transform .45s cubic-bezier(.25,.8,.25,1),box-shadow .45s cubic-bezier(.25,.8,.25,1),background-color .3s}
@media (hover:hover){.slm-btn:hover{transform:translate3d(0,-1px,0) scale(1.015)}}
.slm-btn:active{transform:scale(.985);transition-duration:.12s}
.slm-btn:hover .slm-btn-ic{transform:translateX(3px)}
.slm-btn-ic{transition:transform .6s cubic-bezier(.25,.8,.25,1)}
.slm-root :focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media (prefers-reduced-motion: reduce){.slm-btn{transition:none!important}}
`;

/* ---------- the search form: "hero" (glass bar on the photo) or "sheet" (phone bottom sheet) ---------- */
function SearchForm({ variant, onDone }: { variant: "hero" | "sheet"; onDone?: () => void }) {
  const { query, setQuery } = useSearch();
  const uid = useId().replace(/:/g, "");
  const prefix = variant === "sheet" ? "sheet" : "slm";
  const [date, setDate] = useState<string>(() => query?.date ?? "");
  const [guests, setGuests] = useState<number>(() => query?.guests ?? 6);
  const [duration, setDuration] = useState<DurationKey>(() => query?.duration ?? "full");
  const [error, setError] = useState("");
  const hero = variant === "hero";
  const sheet = variant === "sheet";

  // default date depends on "today", so it is set after hydration (reference SSR also differs)
  useEffect(() => {
    if (!date) setDate(defaultDate());
  }, [date]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || date < today() || date > lastBookable()) {
      setError("Pick a date within the next eight months.");
      return;
    }
    setError("");
    setQuery({ date, guests, duration });
    onDone?.();
    scrollToId("fleet", 96);
  };
  const step = (d: number) => setGuests((g) => Math.min(12, Math.max(1, g + d)));

  const fg = hero ? ON_IMG : "var(--fg)";
  const labelColor = hero ? ON_IMG_70 : "var(--muted)";
  const lineColor = hero ? LINE_ON_IMG : "var(--line)";
  const stepBg = hero ? SOFT_ON_IMG : "var(--fill)";

  // container queries: wide (>=900px) = one row of 4; narrow = 2x2 with full-width tour + button
  const cell = (extra = "") =>
    `slm-cell relative grid min-w-0 content-center gap-[2px] rounded-[12px] px-[22px] py-[10px] ${
      sheet ? "min-h-[72px] bg-fill" : ""
    } ${extra}`;
  const vLine = (
    <span aria-hidden className="absolute bottom-[22%] left-0 top-[22%] w-px" style={{ background: lineColor }} />
  );
  const labelCls = "inline-flex items-center gap-[7px] text-[13px] font-medium";
  const stepStyle: CSSProperties = { background: stepBg };

  const form = (
    <form
      className={`slm-root grid items-stretch rounded-[20px] ${
        sheet
          ? "grid-cols-1 gap-1 bg-transparent p-0"
          : "grid-cols-[1fr_1fr] p-2 @min-[900px]:grid-cols-[1.2fr_0.8fr_1.3fr_auto]"
      }`}
      noValidate
      aria-label="Find a boat"
      onSubmit={submit}
      style={
        hero
          ? {
              colorScheme: "dark",
              background: "#040b1475",
              WebkitBackdropFilter: "blur(22px) saturate(1.8) brightness(1.04)",
              backdropFilter: "blur(22px) saturate(1.8) brightness(1.04)",
              boxShadow: `inset 0 1px 0 #ffffff3d, 0 0 0 1px #ffffff29`,
              maxWidth: 1040,
            }
          : undefined
      }
    >
      <DateField
        variant="search"
        id={`${prefix}-${uid}-date`}
        value={date}
        onChange={setDate}
        className={cell("cursor-pointer")}
        icon={<IcCalendar />}
        label="Date"
        labelClassName={labelCls}
        labelColor={labelColor}
        color={fg}
      />

      <div className={cell("cursor-default")} role="group" aria-labelledby={`${prefix}-${uid}-gl`} style={{ color: fg }}>
        {!sheet && vLine}
        <span className={labelCls} style={{ color: labelColor }} id={`${prefix}-${uid}-gl`}>
          <IcGuests /> Anglers
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="slm-step grid size-11 place-items-center rounded-[12px] border-0 p-0 text-inherit"
            onClick={() => step(-1)}
            aria-label="Fewer anglers"
            disabled={guests <= 1}
            style={stepStyle}
          >
            <IcMinus />
          </button>
          <output aria-live="polite" className="min-w-7 text-center text-[22px] font-bold tabular-nums">
            {guests}
          </output>
          <button
            type="button"
            className="slm-step grid size-11 place-items-center rounded-[12px] border-0 p-0 text-inherit"
            onClick={() => step(1)}
            aria-label="More anglers"
            disabled={guests >= 12}
            style={stepStyle}
          >
            <IcPlus />
          </button>
        </div>
      </div>

      <label
        className={cell(`cursor-pointer ${sheet ? "" : "col-span-full @min-[900px]:col-span-1"}`)}
        htmlFor={`${prefix}-${uid}-dur`}
        style={{ color: fg }}
      >
        {!sheet && (
          <>
            {/* narrow: horizontal rule on top; wide: vertical divider on the left */}
            <span aria-hidden className="absolute inset-x-[22px] top-0 h-px @min-[900px]:hidden" style={{ background: lineColor }} />
            <span
              aria-hidden
              className="absolute bottom-[22%] left-0 top-[22%] hidden w-px @min-[900px]:block"
              style={{ background: lineColor }}
            />
          </>
        )}
        <span className={labelCls} style={{ color: labelColor }}>
          <IcClock /> Trip
        </span>
        <select id={`${prefix}-${uid}-dur`} value={duration} onChange={(e) => setDuration(e.target.value as DurationKey)}>
          {DURATIONS.map((d) => (
            <option key={d.key} value={d.key}>
              {d.label}, {d.hint}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className={`slm-btn relative inline-flex min-h-16 items-center justify-center gap-[14px] self-center rounded-[12px] border-0 bg-accent py-0 pl-[26px] pr-2 text-[16px] font-semibold tracking-[-0.005em] text-on-accent ${
          sheet ? "mt-3 w-full" : "col-span-full mt-[6px] w-full @min-[900px]:col-span-1 @min-[900px]:ml-2 @min-[900px]:mt-0 @min-[900px]:w-auto"
        }`}
        style={{ boxShadow: ACCENT_SHADOW }}
      >
        Show boats
        <span
          className="slm-btn-ic grid size-10 flex-none place-items-center rounded-[8px]"
          aria-hidden
          style={{ background: "color-mix(in srgb, currentColor 14%, transparent)" }}
        >
          <IcArrow />
        </span>
      </button>

      {error && (
        <p role="alert" className="col-span-full m-0 px-[22px] pb-[6px] pt-2 text-[14px] text-danger">
          {error}
        </p>
      )}
    </form>
  );

  return sheet ? form : <div className="@container w-full leading-[normal]">{form}</div>;
}

/* ---------- phone: "Find a boat" pill that opens a bottom sheet ---------- */
function SearchPill() {
  const { query } = useSearch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      el.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const summary = query
    ? `${fmtShort(query.date)}, ${query.guests} anglers, ${durationOf(query.duration).label}`
    : "Date, anglers, trip";

  return (
    <>
      <button
        type="button"
        className="slm-root flex min-h-[68px] leading-[normal] w-full items-center justify-between gap-4 rounded-[20px] border-0 py-[10px] pl-6 pr-[10px] text-left"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        style={{
          color: ON_IMG,
          background: "#040b1475",
          WebkitBackdropFilter: "blur(22px) saturate(1.8)",
          backdropFilter: "blur(22px) saturate(1.8)",
          boxShadow: "inset 0 1px 0 #ffffff3d, 0 0 0 1px #ffffff29",
        }}
      >
        <span className="grid min-w-0">
          <small className="text-[13px]" style={{ color: ON_IMG_70 }}>
            Find a boat
          </small>
          <strong className="truncate text-[17px] font-medium">{summary}</strong>
        </span>
        <span
          aria-hidden
          className="grid size-12 flex-none place-items-center rounded-[12px] bg-accent text-on-accent"
          style={{ boxShadow: ACCENT_SHADOW }}
        >
          <IcSearch />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[90] bg-overlay"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Find a boat"
              className="fixed inset-x-0 bottom-0 z-[95] grid leading-[normal] max-h-[92svh] gap-4 overflow-y-auto rounded-t-[20px] bg-surface px-5 pt-[14px] text-fg shadow-[0_0_0_1px_var(--line)]"
              style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom))" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.55, ease: EASE_SOFT }}
            >
              <span aria-hidden className="h-1 w-10 justify-self-center rounded-[2px] bg-line-strong" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-[14px] grid size-11 place-items-center rounded-[12px] border-0 bg-fill text-inherit"
              >
                <IcClose />
              </button>
              <h2 className="m-0 pr-14 font-display text-[26px] font-medium leading-[1.05] tracking-[-0.03em]">Find your boat</h2>
              <SearchForm variant="sheet" onDone={() => setOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Hero ---------- */
export default function Hero() {
  return (
    <section className="relative flex w-full flex-col items-center p-[10px]" aria-label="Hero">
      <style dangerouslySetInnerHTML={{ __html: FORM_CSS }} />
      <div className="relative flex min-h-[97.5vh] w-full flex-col items-center justify-end gap-[72px] overflow-clip rounded-[20px] px-4 pb-[60px] pt-[110px] tab:px-6 tab:pb-8 desk:gap-[110px] desk:px-[26px] desk:pb-10">
        {/* photo with a slow breathing zoom (reference: scale 1 -> 1.04, mirrored loop) */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        >
          <Image
            src="/images/fishing/hero-sunset-run.jpg"
            alt="A sportfishing boat running out across the Gulf at sunset"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[38%_50%] tab:object-[50%_55%]"
          />
        </motion.div>
        {/* shades */}
        <div
          className="absolute inset-0 hidden tab:block"
          style={{ background: "linear-gradient(90deg, #040b14bd 0%, #040b1485 38%, #040b142e 70%)" }}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,#040b1475_0%,#040b142e_16%,#040b1485_38%,#040b14c7_74%,#040b14_100%)] tab:bg-[linear-gradient(0deg,#040b14c7_0%,#040b142e_52%)]"
        />
        <div className="absolute inset-0 hidden tab:block" style={{ background: "linear-gradient(180deg, #040b1475 0%, #040b142e 25%)" }} />

        {/* content */}
        <div className="relative flex w-full max-w-[1320px] flex-col items-center gap-[72px] desk:items-start desk:gap-[110px]">
          <div className="relative flex w-full max-w-[860px] flex-col items-center gap-[22px] desk:items-start">
            <Reveal onMount className="flex w-min items-center gap-[10px]">
              <span className="size-[7px] flex-none rounded-full bg-accent-soft" />
              <p className="m-0 whitespace-pre font-sans text-[13px] font-medium leading-[1.55] tracking-[0.02em] text-white">
                Fishing charter in Dubai
              </p>
            </Reveal>
            <Reveal onMount className="w-full">
              <h1 className="m-0 text-center font-display text-[46px] font-medium leading-[0.96] tracking-[-0.04em] text-white min-[390px]:text-[50px] tab:text-[60px] desk:text-left desk:text-[88.8px] min-[1400px]:text-[108px]">
                The bite, <span className="text-accent-soft">on your</span> schedule.
              </h1>
            </Reveal>
            <Reveal onMount className="w-full max-w-[440px]">
              <p className="m-0 text-center font-sans text-[17px] leading-[1.5] text-[#ffffffc7] [text-wrap:pretty] desk:text-left min-[1400px]:text-[20px]">
                Six skippered fishing boats from Dubai Marina, Dubai Harbour and Jumeirah Fishing Harbour. Pick a day and see who is free.
              </p>
            </Reveal>
          </div>

          {/* >=810: glass search bar */}
          <Reveal onMount className="relative hidden w-full max-w-[1040px] tab:block">
            <SearchForm variant="hero" />
          </Reveal>
          {/* <810: pill + bottom sheet */}
          <div className="relative w-full tab:hidden">
            <SearchPill />
          </div>
        </div>
      </div>
    </section>
  );
}
