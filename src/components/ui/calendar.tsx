"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("group/calendar p-3 [--cell-size:2.25rem]", className)}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("en-GB", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-3", defaultClassNames.month),
        nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between", defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-40",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-40",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        caption_label: cn("select-none font-display text-[15px] font-medium tracking-[-0.02em] text-fg", defaultClassNames.caption_label),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 select-none text-center text-[11px] font-medium tracking-[0.04em] text-muted uppercase",
          defaultClassNames.weekday,
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        day: cn(
          "relative aspect-square w-full p-0 text-center select-none",
          defaultClassNames.day,
        ),
        today: cn("rounded-lg", defaultClassNames.today),
        outside: cn("text-muted opacity-50", defaultClassNames.outside),
        disabled: cn("text-muted opacity-30", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        selected: cn(defaultClassNames.selected),
        ...classNames,
      }}
      components={{
        Root: ({ className: rootClass, rootRef, ...rootProps }) => (
          <div data-slot="calendar" ref={rootRef} className={cn(rootClass)} {...rootProps} />
        ),
        Chevron: ({ className: iconClass, orientation, ...iconProps }) => {
          if (orientation === "left") return <ChevronLeftIcon className={cn("size-4", iconClass)} {...iconProps} />;
          if (orientation === "right") return <ChevronRightIcon className={cn("size-4", iconClass)} {...iconProps} />;
          return <ChevronDownIcon className={cn("size-4", iconClass)} {...iconProps} />;
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString("en-GB")}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      className={cn(
        "aspect-square size-auto w-full min-w-(--cell-size) rounded-lg font-sans text-[14px] font-medium text-fg",
        "hover:bg-fill hover:text-fg",
        "data-[selected-single=true]:bg-accent data-[selected-single=true]:text-on-accent data-[selected-single=true]:hover:bg-accent data-[selected-single=true]:hover:text-on-accent",
        modifiers.today && !modifiers.selected && "text-accent ring-1 ring-accent",
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
