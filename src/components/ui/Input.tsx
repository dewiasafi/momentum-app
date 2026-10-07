import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { getFieldClassName, type FieldVariants } from "./field.styles";
import FormField, { AlignLabel } from "./FormField";

export interface InputProps
     extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
     FieldVariants {
     label?: string;
     alignLabel?: AlignLabel;
     helperText?: string;
     errorText?: string;
     fullWidth?: boolean;
     leftIcon?: ReactNode;
     rightIcon?: ReactNode;
     containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
     (
          {
               label,
               alignLabel = "vertical",
               helperText,
               errorText,
               size = "md",
               fullWidth = false,
               disabled = false,
               leftIcon = null,
               rightIcon = null,
               className = "",
               containerClassName = "",
               required,
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
                              <input
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
                                             leftIcon ? "pl-9" : "", 
                                             rightIcon ? "pr-9" : "", 
                                             className
                                        ]
                                             .filter(Boolean).join(" ")
                                   })}
                                   {...props}
                              />
                              {rightIcon && (
                                   <span className="absolute right-3 inset-y-0 flex items-center text-app-subtext pointer-events-none z-10">
                                        {rightIcon}
                                   </span>
                              )}
                         </div>

                    )}
               </FormField>
          );
     }
);

Input.displayName = "Input"

export default Input