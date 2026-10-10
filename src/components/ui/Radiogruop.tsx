import { useId } from "react";
import type { FieldSize } from "./field.styles";
import FormField from "./FormField";

const CIRCLE_SIZE_CLASSES: Record<FieldSize, string> = {
  sm: "w-4 h-4 after:w-1.5 after:h-1.5",
  md: "w-4.5 h-4.5 after:w-2 after:h-2",
  lg: "w-5 h-5 after:w-2.5 after:h-2.5",
};

const LABEL_SIZE_CLASSES: Record<FieldSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  fullWidth?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  direction?: "vertical" | "horizontal";
  size?: FieldSize;
  disabled?: boolean;
  containerClassName?: string;
}

export default function RadioGroup({
  label,
  helperText,
  errorText,
  required,
  fullWidth = false,
  name,
  value,
  onChange,
  options,
  direction = "vertical",
  size = "md",
  disabled = false,
  containerClassName = "",
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name ?? generatedName;

  return (
    <FormField
      label={label}
      required={required}
      helperText={helperText}
      errorText={errorText}
      fullWidth={fullWidth}
      className={containerClassName}
    >
      {(id, describedBy) => (
        <div
          role="radiogroup"
          aria-describedby={describedBy}
          className={`flex ${
            direction === "horizontal"
              ? "flex-row flex-wrap gap-x-4 gap-y-2"
              : "flex-col gap-2"
          }`}
        >
          {options.map((opt) => {
            const optionId = `${id}-${opt.value}`;
            const isDisabled = disabled || opt.disabled;

            return (
              <div key={opt.value} className="flex items-start gap-2">
                <div className="relative flex items-center h-5 shrink-0">
                  <input
                    type="radio"
                    id={optionId}
                    name={groupName}
                    value={opt.value}
                    checked={value === opt.value}
                    disabled={isDisabled}
                    onChange={() => onChange?.(opt.value)}
                    className="peer sr-only"
                  />
                  <div
                    aria-hidden="true"
                    className={`relative flex items-center justify-center rounded-full border bg-white border-neutral-300 transition-colors after:content-[''] after:block after:rounded-full after:bg-app-forest after:opacity-0 after:transition-opacity peer-hover:not-disabled:border-neutral-400 peer-checked:border-app-forest peer-checked:after:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-app-forest/20 peer-focus-visible:ring-offset-1 peer-disabled:bg-neutral-100 peer-disabled:border-neutral-200 ${CIRCLE_SIZE_CLASSES[size]}`}
                  />
                </div>

                <label
                  htmlFor={optionId}
                  className={
                    isDisabled
                      ? "cursor-not-allowed text-neutral-400"
                      : "cursor-pointer text-neutral-700"
                  }
                >
                  <p className={`font-medium leading-5 text-inherit ${LABEL_SIZE_CLASSES[size]}`}>
                    {opt.label}
                  </p>
                  {opt.description && (
                    <p className="text-xs mt-0.5 text-inherit opacity-85">
                      {opt.description}
                    </p>
                  )}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </FormField>
  );
}