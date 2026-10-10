import React, { useState, useRef, useEffect, forwardRef, ReactNode, ButtonHTMLAttributes } from "react";
import { ChevronDown, Check } from "lucide-react";
import { type FieldVariants, getFieldClassName } from "./field.styles";
import FormField, { AlignLabel } from "./FormField";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value">,
    FieldVariants {
  label?: string;
  alignLabel?: AlignLabel;
  helperText?: string;
  errorText?: string;
  fullWidth?: boolean;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  required?: boolean,
  name?: string;
  leftIcon?: ReactNode;
  containerClassName?: string;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      helperText,
      errorText,
      size = "md",
      fullWidth = false,
      disabled = false,
      placeholder,
      options,
      value,
      onChange,
      name,
      leftIcon = null,
      containerClassName = "",
      className = "",
      required = false,
      alignLabel = "vertical",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasError = Boolean(errorText);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelect = (optionValue: string, optionDisabled?: boolean) => {
      if (optionDisabled || disabled) return;

      if (onChange) {
        onChange({ target: { value: optionValue, name } });
      }
      setIsOpen(false);
    };

    return (
      <FormField
        label={label}
        required={required}
        helperText={helperText}
        errorText={errorText}
        fullWidth={fullWidth}
        className={containerClassName}
        align={alignLabel}
      >
        {(id, describedBy) => (
          <div ref={containerRef} className="relative items-center w-full">
            <button
              id={id}
              ref={ref}
              aria-describedby={describedBy}
              type="button"
              disabled={disabled}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              className={getFieldClassName({
                size,
                error: hasError,
                className: [
                  "flex items-center justify-between text-left cursor-pointer w-full pr-9",
                  leftIcon ? "pl-9" : "",
                  disabled ? "opacity-60 cursor-not-allowed" : "",
                  className,
                ]
                  .filter(Boolean)
                  .join(" "),
              })}
              {...props}
            >
              {leftIcon && (
                <span className="absolute left-3 inset-y-0 flex items-center text-app-subtext pointer-events-none">
                  {leftIcon}
                </span>
              )}

              <span
                className={`truncate font-medium ${
                  selectedOption ? "text-app-title" : "text-app-subtext/70"
                }`}
              >
                {selectedOption ? selectedOption.label : placeholder}
              </span>

              <span className="absolute right-3 inset-y-0 flex items-center text-app-subtext pointer-events-none z-10">
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-app-forest" : ""
                  }`}
                />
              </span>
            </button>

            {isOpen && !disabled && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-app-subtext/20 rounded-xl shadow-lg max-h-60 overflow-y-auto py-1 animate-in fade-in-50 zoom-in-95">
                {options.length > 0 ? (
                  options.map((opt) => {
                    const isSelected = opt.value === value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        disabled={opt.disabled}
                        onClick={() => handleSelect(opt.value, opt.disabled)}
                        className={`flex items-center justify-between w-full px-3.5 py-2.5 text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-app-bg text-app-forest font-semibold"
                            : "text-app-title hover:bg-app-bg/60"
                        } ${opt.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        <span className="truncate">{opt.label}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-app-forest shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3.5 py-2 text-xs text-app-subtext text-center">
                    Tidak ada opsi tersedia
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </FormField>
    );
  }
);

Select.displayName = "Select";

export default Select;