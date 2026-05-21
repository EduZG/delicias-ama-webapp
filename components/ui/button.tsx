import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink-900 text-white shadow-sm hover:bg-brand-700 focus-visible:ring-ink-900",
  secondary:
    "border border-border bg-white text-ink-900 hover:border-brand-300 hover:bg-brand-50 focus-visible:ring-brand-600",
  ghost:
    "text-ink-700 hover:bg-white hover:text-ink-900 focus-visible:ring-brand-600",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

export function Button({
  asChild = false,
  className,
  size = "md",
  variant = "primary",
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-button font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      type={asChild ? undefined : (type ?? "button")}
      {...props}
    />
  );
}
