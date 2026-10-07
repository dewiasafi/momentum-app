export type FieldSize = "sm" | "md" | "lg";

export interface FieldVariants {
     size?: FieldSize;
     error?: boolean;
}

interface FieldVariantsInput extends FieldVariants {
     className?: string;
}

const BASE_CLASSES =
     "w-full font-sans text-app-body bg-white rounded-lg border transition-all duration-150 " +
     "placeholder:text-app-subtext/50 focus:outline-none focus:ring-2 focus:ring-offset-0 " +
     "disabled:bg-app-bg/50 disabled:text-app-disabled disabled:border-app-subtext/10 disabled:cursor-not-allowed";

const SIZE_CLASSES: Record<FieldSize, string> = {
     sm: "px-3 py-1.5 text-xs",
     md: "px-3.5 py-2 text-sm",
     lg: "px-4 py-2.5 text-base",
};

const ERROR_CLASSES = "border-rose-300 focus:border-app-error focus:ring-app-error/20";

const DEFAULT_CLASSES =
     "border-app-subtext/20 " +
     "[&:hover:not(:disabled):not(:focus)]:border-app-subtext/40 " +
     "focus:border-app-eucalyptus focus:ring-app-eucalyptus/20";

export function getFieldClassName({
     size = "md",
     error = false,
     className = ""
}: FieldVariantsInput = {}): string {
     return [
          BASE_CLASSES,
          SIZE_CLASSES[size],
          error ? ERROR_CLASSES : DEFAULT_CLASSES,
          className
     ].filter(Boolean).join(" ")
}