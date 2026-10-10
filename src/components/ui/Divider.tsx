import React, { HTMLAttributes, ReactNode } from "react";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
}

export default function Divider({
  orientation = "horizontal",
  label,
  className = "",
  ...props
}: DividerProps) {
  if (label) {
    return (
      <div
        role="separator"
        className={`flex items-center gap-3 w-full before:content-[''] before:flex-1 before:border-t before:border-neutral-200 after:content-[''] after:flex-1 after:border-t after:border-neutral-200 ${className}`}
        {...props}
      >
        <span className="text-xs text-neutral-400 whitespace-nowrap">{label}</span>
      </div>
    );
  }

  const baseClasses =
    orientation === "vertical"
      ? "h-full border-l border-neutral-200 inline-block"
      : "w-full border-t border-neutral-200";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}