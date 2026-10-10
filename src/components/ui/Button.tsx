import React, { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-app-forest text-white shadow-xs focus-visible:ring-app-sunshine hover:bg-app-olive active:bg-app-title",
  secondary:
    "bg-app-sunshine/10 text-app-forest border border-app-forest/20 shadow-xs focus-visible:ring-app-sunshine hover:bg-app-sunshine/25 hover:border-app-olive/40",
  ghost:
    "bg-transparent text-app-subtext focus-visible:ring-app-sunshine hover:bg-app-bg hover:text-app-title",
  danger:
    "bg-rose-600 text-white shadow-xs focus-visible:ring-app-error hover:bg-rose-700 active:bg-rose-800",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1.5 text-xs font-semibold [&_svg.lucide]:w-3.5 [&_svg.lucide]:h-3.5",
  md: "px-3.5 py-2 text-sm font-semibold",
  lg: "px-4.5 py-2.5 text-base font-semibold [&_svg.lucide]:w-5 [&_svg.lucide]:h-5",
};

function Spinner({ className = "" }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={`animate-spin h-4 w-4 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  className = "",
  onClick,
  ...props
}: ButtonProps): React.ReactElement {
  const isDisabled = disabled || loading;

  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-sans font-medium rounded-lg transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none";

  const classes = [
    baseClasses,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...props}
    >
      {loading && <Spinner className="text-current" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}