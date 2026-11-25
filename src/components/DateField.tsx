"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { fmtShort, iso, lastBookable, today } from "@/components/fleet/booking-store";
import { cn } from "@/lib/utils";

function parseIso(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

type Common = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  placeholder?: string;
};

type SearchProps = Common & {
  variant: "search";
  className?: string;
  style?: CSSProperties;
  icon: ReactNode;
  label: string;
  labelClassName?: string;
  labelColor: string;
  color: string;
};

type FieldProps = Common & {
  variant?: "field";
};

export default function DateField(props: SearchProps | FieldProps) {
  const [open, setOpen] = useState(false);
  const selected = parseIso(props.value);
  const bounds = useMemo(() => {
    if (!open) return null;
    return { min: parseIso(today()), max: parseIso(lastBookable()) };
  }, [open]);

  const hidden = props.name ? <input type="hidden" name={props.name} value={props.value} /> : null;

  const calendar = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {props.variant === "search" ? (
          <button
            type="button"
            id={props.id}
            className={cn("group slm-cell cursor-pointer text-left", props.className)}
            style={{ ...props.style, color: props.color }}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={props.label}
          >
            <span className={cn("inline-flex items-center gap-[7px] text-[13px] font-medium", props.labelClassName)} style={{ color: props.labelColor }}>
              {props.icon}
              {props.label}
            </span>
            <span
              className={cn(
                "flex min-h-11 w-full items-center truncate text-left text-[18px] font-medium transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent",
                !props.value && "opacity-70",
              )}
            >
              {props.value ? fmtShort(props.value) : (props.placeholder ?? "Select a date")}
            </span>
          </button>
        ) : (
          <button
            type="button"
            id={props.id}
            className="flex h-full w-full items-center justify-between gap-3 bg-transparent px-[18px] text-left text-[16px] leading-[1.2] outline-none"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label="Date"
          >
            <span className={cn("truncate", props.value ? "text-fg" : "text-muted")}>
              {props.value ? fmtShort(props.value) : (props.placeholder ?? "Select a date")}
            </span>
            <CalendarIcon className="size-4 shrink-0 text-muted" aria-hidden />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        {bounds?.min && bounds.max && (
          <Calendar
            mode="single"
            selected={selected}
            defaultMonth={selected ?? bounds.min}
            onSelect={(day) => {
              if (!day) return;
              props.onChange(iso(day));
              setOpen(false);
            }}
            disabled={[{ before: bounds.min }, { after: bounds.max }]}
            startMonth={bounds.min}
            endMonth={bounds.max}
          />
        )}
      </PopoverContent>
    </Popover>
  );

  return (
    <>
      {hidden}
      {calendar}
    </>
  );
}
