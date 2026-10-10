import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import FormField from "./FormField";
import type { FieldSize } from "./field.styles";

const TRACK_SIZE_CLASSES: Record<FieldSize, string> = {
  sm: "w-8 h-4.5 after:w-3.5 after:h-3.5 peer-checked:after:translate-x-3.5",
  md: "w-10 h-5 after:w-4 after:h-4 peer-checked:after:translate-x-5",
  lg: "w-12 h-6 after:w-5 after:h-5 peer-checked:after:translate-x-6",
};

const LABEL_SIZE_CLASSES: Record<FieldSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  description?: string;
  size?: FieldSize;
  helperText?: string;
  errorText?: string;
  containerClassName?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      size = "md",
      helperText,
      errorText,
      disabled = false,
      className = "",
      containerClassName = "",
      id,
      ...props
    },
    ref
  ) => {
    return (
      <FormField helperText={helperText} errorText={errorText} className={containerClassName}>
        {(fieldId, describedBy) => {
          const switchId = id ?? fieldId;

          return (
            <div className="flex items-start gap-2">
              <div className="relative flex items-center shrink-0">
                <input
                  type="checkbox"
                  role="switch"
                  id={switchId}
                  ref={ref}
                  disabled={disabled}
                  aria-describedby={describedBy}
                  className={`peer sr-only ${className}`}
                  {...props}
                />
                <label
                  htmlFor={switchId}
                  className={`relative inline-flex items-center rounded-full border cursor-pointer transition-colors bg-neutral-300 border-neutral-300 after:content-[''] after:absolute after:top-1/2 after:left-0.5 after:-translate-y-1/2 after:rounded-full after:bg-white after:shadow-2xs after:transition-transform peer-hover:not-disabled:bg-neutral-400 peer-checked:bg-app-forest peer-checked:border-app-olive peer-checked:hover:bg-app-olive peer-focus-visible:ring-2 peer-focus-visible:ring-app-forest/20 peer-focus-visible:ring-offset-1 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed ${TRACK_SIZE_CLASSES[size]}`}
                />
              </div>

              {(label || description) && (
                <label
                  htmlFor={switchId}
                  className={disabled ? "cursor-not-allowed text-neutral-400" : "cursor-pointer text-neutral-700"}
                >
                  {label && (
                    <p className={`font-medium leading-5 text-inherit ${LABEL_SIZE_CLASSES[size]}`}>{label}</p>
                  )}
                  {description && <p className="text-xs mt-0.5 text-inherit opacity-85">{description}</p>}
                </label>
              )}
            </div>
          );
        }}
      </FormField>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;