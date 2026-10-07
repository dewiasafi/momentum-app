import { forwardRef, ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { type FieldVariants, getFieldClassName } from "./field.styles";
import FormField, { AlignLabel } from "./FormField";

export interface SelectOption {
     label: string;
     value: string;
     disabled?: boolean;
}

export interface SelectProps
     extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
     FieldVariants {
     label?: string;
     alignLabel?: AlignLabel;
     helperText?: string;
     errorText?: string;
     fullWidth?: boolean;
     placeholder?: string;
     options: SelectOption[];
     leftIcon?: ReactNode;
     containerClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
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
               leftIcon = null,
               className = "",
               containerClassName = "",
               required,
               alignLabel = "vertical",
               ...props
          },
          ref
     ) => {
          const hasError = Boolean(errorText);

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
                         <div className="relative flex items-center w-full">
                              {leftIcon && (
                                   <span className="absolute left-3 inset-y-0 flex items-center text-app-subtext pointer-events-none z-10">
                                        {leftIcon}
                                   </span>
                              )}

                              <select
                                   id={id}
                                   ref={ref}
                                   disabled={disabled}
                                   required={required}
                                   aria-invalid={hasError || undefined}
                                   aria-describedby={describedBy}
                                   className={getFieldClassName({
                                        size,
                                        error: hasError,
                                        className: [
                                             "appearance-none pr-10 cursor-pointer",
                                             leftIcon ? "pl-9" : "",
                                             className,
                                        ].filter(Boolean).join(" "),
                                   })}
                                   {...props}
                              >
                                   {placeholder && (
                                        <option value="" disabled hidden>
                                             {placeholder}
                                        </option>
                                   )}

                                   {options.map((opt) => (
                                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                                             {opt.label}
                                        </option>
                                   ))}
                              </select>

                              <span className="absolute right-3 inset-y-0 flex items-center text-app-subtext pointer-events-none">
                                   <ChevronDown />
                              </span>
                         </div>
                    )}
               </FormField>
          );
     }
);

Select.displayName = "Select";

export default Select;