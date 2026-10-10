import { HTMLAttributes } from "react";

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressColor = "primary" | "success" | "warning" | "error";

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  value: number;
  size?: ProgressSize;
  color?: ProgressColor;
  label?: string;
  showValue?: boolean;
}

const SIZE_STYLES: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

const COLOR_STYLES: Record<ProgressColor, string> = {
  primary: "bg-app-forest",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-rose-500",
};

export default function Progress({
  value,
  size = "md",
  color = "primary",
  label,
  showValue = false,
  className = "",
  ...props
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={className}>
      {label && (
        <div className="flex items-center justify-between mb-1.5 text-sm">
          <span className="font-medium text-neutral-700">{label}</span>
          {showValue && <span className="text-neutral-500">{Math.round(clampedValue)}%</span>}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={!label ? "Progress" : undefined}
        className={`w-full bg-neutral-100 rounded-full overflow-hidden ${SIZE_STYLES[size]}`}
        {...props}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-300 ease-out ${COLOR_STYLES[color]}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}