import { forwardRef, InputHTMLAttributes, ReactNode, useEffect, useRef } from "react";
import type { FieldSize } from "./field.styles";
import FormField from "./FormField";

export type CheckboxShape = "square" | "circle";

const BOX_SIZE_CLASSES: Record<FieldSize, string> = {
  sm: "w-4 h-4",
  md: "w-4.5 h-4.5",
  lg: "w-5 h-5",
};

const SHAPE_CLASSES: Record<CheckboxShape, string> = {
  square: "rounded-xs",
  circle: "rounded-full",
};

const LABEL_SIZE_CLASSES: Record<FieldSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const ICON_SIZE_PX: Record<FieldSize, { check: number; dash: number }> = {
  sm: { check: 9, dash: 7 },
  md: { check: 12, dash: 10 },
  lg: { check: 13, dash: 11 },
};

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  description?: string;
  indeterminate?: boolean;
  helperText?: string;
  errorText?: string;
  containerClassName?: string;
  size?: FieldSize;
  shape?: CheckboxShape;
  borderClassName?: string;
}

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    });
  };
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      indeterminate = false,
      size = "md",
      shape = "square",
      helperText,
      errorText,
      disabled = false,
      className = "",
      containerClassName = "",
      borderClassName = "",
      id,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <FormField
        helperText={helperText}
        errorText={errorText}
        className={containerClassName}
      >
        {(fieldId, describedBy) => {
          const checkboxId = id ?? fieldId;

          return (
            <div className="inline-flex items-start gap-2.5 cursor-pointer">
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id={checkboxId}
                  disabled={disabled}
                  ref={mergeRefs(ref, internalRef)}
                  aria-describedby={describedBy}
                  className={`peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 m-0 disabled:cursor-not-allowed ${className}`}
                  {...props}
                />
                <div
                  aria-hidden="true"
                  className={`flex items-center justify-center border bg-white transition-all duration-150 border-app-forest peer-hover:not-disabled:border-app-olive peer-focus-visible:ring-2 peer-focus-visible:ring-app-forest/20 peer-focus-visible:ring-offset-1 peer-checked:bg-app-forest peer-checked:border-app-forest peer-indeterminate:bg-app-forest peer-indeterminate:border-app-forest peer-disabled:bg-neutral-100 peer-disabled:border-neutral-200 peer-disabled:cursor-not-allowed ${BOX_SIZE_CLASSES[size]} ${SHAPE_CLASSES[shape]} ${borderClassName}`}
                >
                  {indeterminate ? (
                    <svg
                      width={ICON_SIZE_PX[size].dash}
                      height={ICON_SIZE_PX[size].dash}
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-0 scale-75 transition-all duration-150 text-white peer-checked:opacity-100 peer-checked:scale-100 peer-indeterminate:opacity-100 peer-indeterminate:scale-100"
                    >
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg
                      width={ICON_SIZE_PX[size].check}
                      height={ICON_SIZE_PX[size].check}
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-0 scale-75 transition-all duration-150 text-white peer-checked:opacity-100 peer-checked:scale-100 peer-indeterminate:opacity-100 peer-indeterminate:scale-100"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {(label || description) && (
                <label
                  htmlFor={checkboxId}
                  className={disabled ? "cursor-not-allowed text-neutral-400 select-none" : "cursor-pointer select-none text-neutral-700"}
                >
                  {label && <p className={`font-medium leading-5 text-inherit ${LABEL_SIZE_CLASSES[size]}`}>{label}</p>}
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

Checkbox.displayName = "Checkbox";
export default Checkbox;