import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-sans text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        ghost: "bg-transparent text-fg hover:bg-fill",
        default: "bg-accent text-on-accent hover:bg-accent-soft",
      },
      size: {
        default: "h-9 px-3",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
