import { HTMLAttributes } from "react";

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerColor = "neutral" | "primary" | "white";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
}

const SIZE_STYLES: Record<SpinnerSize, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-[3px]",
};

const COLOR_STYLES: Record<SpinnerColor, string> = {
  neutral: "text-neutral-400",
  primary: "text-app-forest",
  white: "text-white",
};

export default function Spinner({
  size = "md",
  color = "primary",
  label = "Memuat...",
  className = "",
  ...props
}: SpinnerProps) {
  const baseClasses = "inline-block animate-spin rounded-full border-current border-t-transparent";

  const classes = [
    baseClasses,
    SIZE_STYLES[size],
    COLOR_STYLES[color],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span role="status" className={classes} {...props}>
      <span className="sr-only">{label}</span>
    </span>
  );
}