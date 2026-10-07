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
     neutral: "badge-neutral",
     primary: "badge-primary",
     success: "badge-success",
     warning: "badge-warning",
     error: "badge-error",
     info: "badge-info",
     sage: "badge-sage",
     mint: "badge-mint",
     eucalyptus: "badge-eucalyptus",
     seafoam: "badge-seafoam",
     sunshine:"badge-sunshine",
     moss: "badge-moss",
     olive: "badge-olive",
     leaf: "badge-leaf",
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
     sm: "badge-sm",
     md: "badge-md",
     lg: "badge-lg",
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
     const classes = [
          "badge", 
          VARIANT_CLASSES[variant], 
          SIZE_CLASSES[size], 
          className
     ].filter(Boolean).join(" ");

     return (
          <span className={classes} {...props}>
               {dot && <span aria-hidden="true" className="badge-dot" />}
               <span>{children}</span>
               {onRemove && (
                    <button
                         type="button"
                         onClick={onRemove}
                         aria-label={removeLabel}
                         className="badge-remove"
                    >
                         <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
     )
}
