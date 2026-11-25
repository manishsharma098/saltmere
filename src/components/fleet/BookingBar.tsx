"use client";

import { useEffect, useId, useState, type CSSProperties, type FormEvent } from "react";
import { Icon } from "./icons";
import {
  DURATIONS,
  defaultDate,
  getQuery,
  lastBookable,
  scrollToId,
  setQuery,
  today,
  type DurationKey,
} from "./booking-store";
import DateField from "@/components/DateField";

type Props = {
  /** "card" = inline on the page (Fleet), "photo" = glass on a hero image. */
  surface?: "card" | "photo";
  scrollTarget?: string;
  scrollOffset?: number;
  /** read ?tour=sunset|half|full|dawn from the URL */
  readTourParam?: boolean;
  maxGuests?: number;
  submitLabel?: string;
};

const labelStyle = (color: string): CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  fontSize: 13,
  fontWeight: 500,
  color,
});

export default function BookingBar({
  surface = "card",
  scrollTarget = "fleet",
  scrollOffset = 96,
  readTourParam = false,
  maxGuests = 12,
  submitLabel = "Show boats",
}: Props) {
  const id = useId().replace(/:/g, "");
  const initial = getQuery();
  const [date, setDate] = useState<string>(initial?.date ?? "");
  const [guests, setGuests] = useState<number>(initial?.guests ?? 6);
  const [duration, setDuration] = useState<DurationKey>(initial?.duration ?? "full");
  const [error, setError] = useState("");

  // The default date depends on "today", so it is only filled in on the client.
  useEffect(() => {
    if (!date) setDate(getQuery()?.date ?? defaultDate());
    if (!readTourParam || getQuery()) return;
    const t = new URLSearchParams(window.location.search).get("tour");
    if (t && DURATIONS.some((d) => d.key === t)) setDuration(t as DurationKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!date || date < today() || date > lastBookable()) {
      setError("Pick a date within the next eight months.");
      return;
    }
    setError("");
    setQuery({ date, guests, duration });
    scrollToId(scrollTarget, scrollOffset);
  };
  const step = (d: number) => setGuests((g) => Math.min(maxGuests, Math.max(1, g + d)));

  const hero = surface === "photo";
  const fg = hero ? "var(--slm-white)" : "var(--slm-fg)";
  const muted = hero ? "rgba(255,255,255,0.78)" : "var(--slm-muted)";
  const line = hero ? "rgba(255,255,255,0.18)" : "var(--slm-line)";
  const cell: CSSProperties = {
    position: "relative",
    display: "grid",
    alignContent: "center",
    gap: 2,
    padding: "10px 22px",
    minWidth: 0,
    cursor: "pointer",
    borderRadius: 12,
    color: fg,
  };
  const vLine: CSSProperties = { position: "absolute", left: 0, top: "22%", bottom: "22%", width: 1, background: line };
  const hLine: CSSProperties = { position: "absolute", left: 22, right: 22, top: 0, height: 1, background: line };
  const stepBtn: CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    background: hero ? "rgba(255,255,255,0.14)" : "var(--slm-soft)",
    color: "inherit",
    border: 0,
    padding: 0,
    cursor: "pointer",
  };

  return (
    <div className="slm-wrap slm-bar">
      <form
        className="slm-root slm-form"
        onSubmit={onSubmit}
        noValidate
        aria-label="Find a boat"
        style={
          hero
            ? {
                background: "rgba(4, 11, 20, 0.46)",
                WebkitBackdropFilter: "blur(22px) saturate(1.8) brightness(1.04)",
                backdropFilter: "blur(22px) saturate(1.8) brightness(1.04)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.24), 0 0 0 1px rgba(255,255,255,0.16)",
                maxWidth: 1040,
                colorScheme: "dark",
              }
            : { background: "var(--slm-raise)", boxShadow: "0 0 0 1px var(--slm-line)" }
        }
      >
        <DateField
          variant="search"
          id={`slm-${id}-date`}
          value={date}
          onChange={setDate}
          style={cell}
          icon={<Icon name="calendar" size={16} />}
          label="Date"
          labelColor={muted}
          color={fg}
        />

        <div className="slm-cell slm-guests" role="group" aria-labelledby={`slm-${id}-gl`} style={{ ...cell, cursor: "default" }}>
          <span aria-hidden className="slm-div-v" style={vLine} />
          <span style={labelStyle(muted)} id={`slm-${id}-gl`}>
            <Icon name="users" size={16} /> Anglers
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button type="button" className="slm-step" onClick={() => step(-1)} aria-label="Fewer anglers" disabled={guests <= 1} style={stepBtn}>
              <Icon name="minus" />
            </button>
            <output aria-live="polite" style={{ minWidth: 28, textAlign: "center", fontSize: 22, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
              {guests}
            </output>
            <button type="button" className="slm-step" onClick={() => step(1)} aria-label="More anglers" disabled={guests >= maxGuests} style={stepBtn}>
              <Icon name="plus" />
            </button>
          </div>
        </div>

        <label className="slm-cell slm-tour" htmlFor={`slm-${id}-dur`} style={cell}>
          <span aria-hidden className="slm-div-v" style={vLine} />
          <span aria-hidden className="slm-div-h" style={hLine} />
          <span style={labelStyle(muted)}>
            <Icon name="clock" size={16} /> Trip
          </span>
          <select id={`slm-${id}-dur`} value={duration} onChange={(e) => setDuration(e.target.value as DurationKey)}>
            {DURATIONS.map((d) => (
              <option key={d.key} value={d.key}>
                {d.label}, {d.hint}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="slm-btn slm-submit"
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            alignSelf: "center",
            minHeight: 64,
            padding: "0 8px 0 26px",
            borderRadius: 12,
            backgroundColor: "var(--slm-accent)",
            color: "var(--slm-on-accent)",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: "-0.005em",
            border: 0,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {submitLabel}
          <span
            className="slm-btn-ic"
            aria-hidden
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              flex: "none",
              background: "color-mix(in srgb, currentColor 14%, transparent)",
            }}
          >
            <Icon name="arrowRight" />
          </span>
        </button>

        {error && (
          <p role="alert" style={{ gridColumn: "1 / -1", margin: 0, padding: "8px 22px 6px", fontSize: 14, color: "var(--slm-warn)" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
