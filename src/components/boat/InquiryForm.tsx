"use client";

import { useRef, useState, type FormEvent } from "react";
import { Icon, type IconName } from "@/components/fleet/icons";
import { TRIP_OPTIONS } from "@/components/fleet/booking-store";
import { fishingCopy } from "@/lib/fishing";
import DateField from "@/components/DateField";

type Status = "default" | "incomplete" | "pending" | "success" | "error";

const F = fishingCopy.form;

const BTN: Record<Status, { label: string; icon: IconName; opacity: number }> = {
  default: { label: F.submit, icon: "arrowRight", opacity: 1 },
  incomplete: { label: F.submit, icon: "arrowRight", opacity: 0.6 },
  pending: { label: "Sending…", icon: "clock", opacity: 0.85 },
  success: { label: "Request noted", icon: "checkCircle", opacity: 1 },
  error: { label: "Please try again", icon: "cancel", opacity: 1 },
};

/** The "Inquiry Form" card from the boat page (Framer form component, two steps). */
export default function InquiryForm({ boats, defaultBoat }: { boats: readonly string[]; defaultBoat?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [valid, setValid] = useState(false);
  const [sent, setSent] = useState<Status | null>(null);
  const [date, setDate] = useState("");

  const status: Status = sent ?? (valid ? "default" : "incomplete");
  const btn = BTN[status];

  const onInput = () => {
    const f = formRef.current;
    if (!f) return;
    setValid(f.checkValidity());
    if (sent && sent !== "pending") setSent(null);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      f.reportValidity();
      return;
    }
    setSent("pending");
    window.setTimeout(() => {
      setSent("success");
      f.reset();
      setDate("");
      setValid(false);
    }, 900);
  };

  return (
    <div className="bt-form-card">
      <form ref={formRef} className="bt-form" onSubmit={onSubmit} onInput={onInput} onChange={onInput} noValidate>
        <div className="bt-step">
          <div className="bt-badge">
            <span>1</span>
          </div>
          <p className="bt-step-title">{F.step1}</p>
        </div>
        <div className="bt-fields">
          <label className="bt-field">
            <span className="bt-label">{F.name}</span>
            <span className="bt-input">
              <input type="text" required name="Name" placeholder="Your name" />
            </span>
          </label>
          <label className="bt-field">
            <span className="bt-label">{F.email}</span>
            <span className="bt-input">
              <input type="email" required name="Email" placeholder="you@example.com" />
            </span>
          </label>
        </div>

        <div className="bt-step">
          <div className="bt-badge">
            <span>2</span>
          </div>
          <p className="bt-step-title">{F.step2}</p>
        </div>
        <div className="bt-fields">
          <label className="bt-field">
            <span className="bt-label">{F.date}</span>
            <span className="bt-input">
              <DateField name="Date" value={date} onChange={setDate} />
            </span>
          </label>
          <label className="bt-field">
            <span className="bt-label">{F.guests}</span>
            <span className="bt-input">
              <input type="number" name="Anglers" placeholder="4" min={1} />
            </span>
          </label>
          <label className="bt-field">
            <span className="bt-label">{F.tour}</span>
            <span className="bt-input bt-select">
              <select name="Trip" defaultValue={TRIP_OPTIONS[0].value}>
                {TRIP_OPTIONS.map((t) => (
                  <option key={t.key} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} className="bt-chevron" />
            </span>
          </label>
          <label className="bt-field">
            <span className="bt-label">{F.boat}</span>
            <span className="bt-input bt-select">
              <select name="Boat" defaultValue={defaultBoat ?? F.boatPlaceholder}>
                {[F.boatPlaceholder, ...boats].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} className="bt-chevron" />
            </span>
          </label>
          <label className="bt-field bt-field-full">
            <span className="bt-label">{F.message}</span>
            <span className="bt-input bt-textarea">
              <textarea name="Message" placeholder="Target species, experience, anything we should know" />
            </span>
          </label>
        </div>

        <div className="bt-form-footer">
          <p className="bt-form-note">{F.note}</p>
          <button type="submit" className="bt-submit" style={{ opacity: btn.opacity }} aria-disabled={status === "pending"}>
            <span className="bt-submit-label">{btn.label}</span>
            <span className="bt-submit-ic">
              <Icon name={btn.icon} size={18} />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
