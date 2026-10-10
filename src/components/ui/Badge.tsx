import { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "sage"
  | "mint"
  | "eucalyptus"
  | "seafoam"
  | "moss"
  | "olive"
  | "sunshine"
  | "leaf";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: "bg-slate-50 text-slate-500 border-slate-200/60",
  primary: "bg-app-bg text-app-forest border-app-eucalyptus/30",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-app-sunshine/15 text-app-brown border-app-sunshine/40",
  error: "bg-rose-50 text-rose-700 border-rose-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
  sage: "bg-app-sage text-app-forest border-app-sage",
  mint: "bg-app-mint text-app-forest border-app-mint",
  eucalyptus: "bg-app-eucalyptus text-white border-app-eucalyptus",
  seafoam: "bg-app-seafoam text-white border-app-seafoam",
  sunshine: "bg-app-sunshine text-app-brown border-app-sunshine/40",
  moss: "bg-app-moss text-white border-app-moss",
  olive: "bg-app-olive text-white border-app-olive",
  leaf: "bg-app-leaf text-white border-app-leaf",
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-[11px]",
  lg: "px-3 py-1.5 text-xs",
};

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  dot = false,
  onRemove,
  removeLabel = "Hapus",
  className = "",
  ...props
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-1.5 font-semibold rounded-md border transition-colors select-none whitespace-nowrap";

  const classes = [
    baseClasses,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {dot && (
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full bg-current shrink-0"
        />
      )}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="inline-flex items-center justify-center p-0.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer shrink-0 ml-0.5 -mr-1"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}