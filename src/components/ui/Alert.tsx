import { HTMLAttributes, ReactNode } from "react";

export type AlertVariant = "success" | "warning" | "error" | "info";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  showIcon?: boolean;
  onClose?: () => void;
  closeLabel?: string;
}

const VARIANT_STYLES: Record<
  AlertVariant,
  { container: string; icon: string; title: string; description: string }
> = {
  success: {
    container: "bg-emerald-50 border-emerald-200 text-emerald-800",
    icon: "text-emerald-600",
    title: "text-emerald-900",
    description: "text-emerald-800",
  },
  warning: {
    container: "bg-amber-50 border-amber-200 text-amber-800",
    icon: "text-amber-600",
    title: "text-amber-900",
    description: "text-amber-800",
  },
  error: {
    container: "bg-rose-50 border-rose-200 text-rose-800",
    icon: "text-rose-600",
    title: "text-rose-900",
    description: "text-rose-800",
  },
  info: {
    container: "bg-sky-50 border-sky-200 text-sky-800",
    icon: "text-sky-600",
    title: "text-sky-900",
    description: "text-sky-800",
  },
};

function VariantIcon({ variant }: { variant: AlertVariant }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (variant) {
    case "success":
      return (
        <svg {...common}>
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "warning":
      return (
        <svg {...common}>
          <path
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "error":
      return (
        <svg {...common}>
          <path
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <path
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function Alert({
  variant = "info",
  title,
  children,
  showIcon = true,
  onClose,
  closeLabel = "Tutup",
  className = "",
  ...props
}: AlertProps) {
  const style = VARIANT_STYLES[variant];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-md border px-4 py-3 ${style.container} ${className}`}
      {...props}
    >
      {showIcon && (
        <span className={`shrink-0 ${style.icon}`}>
          <VariantIcon variant={variant} />
        </span>
      )}

      <div className="flex-1 min-w-0">
        {title && <p className={`text-sm font-medium ${style.title}`}>{title}</p>}
        {children && <div className={`text-sm mt-1 opacity-90 ${style.description}`}>{children}</div>}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="shrink-0 rounded-md p-0.5 -mr-1 -mt-0.5 transition-colors hover:bg-black/10 cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}