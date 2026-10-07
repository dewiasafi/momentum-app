import React, { ReactNode, useId } from "react";

export type AlignLabel = 'vertical' | 'horizontal';

export interface FormFieldProps {
     label?: string;
     required?: boolean;
     helperText?: string;
     errorText?: string;
     fullWidth?: boolean;
     className?: string;
     footerExtra?: ReactNode;
     align?: AlignLabel;
     children: (id: string, describedBy: string | undefined) => ReactNode;
}

export default function FormField({
     label,
     required,
     helperText,
     errorText,
     fullWidth = false,
     className = "",
     footerExtra,
     align = "vertical",
     children,
}: FormFieldProps): React.ReactElement {
     const id = useId();
     const hasFooter = Boolean(errorText || helperText || footerExtra);
     const describedBy = errorText ? `${id}-error` : helperText ? `${id}-helper` : undefined;

     const containerClasses = [
          fullWidth ? "w-full" : "",
          align === "horizontal" ? "flex flex-col sm:flex-row sm:items-center gap-x-4" : "flex flex-col gap-y-1.5",
          className
     ].filter(Boolean).join(" ");

     return (
          <div className={containerClasses}>
               {label && (
                    <label 
                         htmlFor={id} 
                         className={`font-semibold text-text-title text-sm select-none ${
                         align === "horizontal" ? "sm:w-28 shrink-0 mb-1 sm:mb-0" : ""
                         }`}
                    >
                         {label}
                         {required && <span className="text-app-error font-bold"> *</span> }
                    </label>
               )}

          <div className="flex-1 w-full">
               {children(id, describedBy)}

               {hasFooter && (
                    <div className="mt-1 flex items-start justify-between gap-2 transition-all">
                         <div>
                              {errorText ? (
                                   <p id={`${id}-error`} className="text-xs font-medium text-rose-600">
                                        ⚠️ {errorText}
                                   </p>
                              ) : helperText ? (
                                   <p id={`${id}-helper`} className="text-xs text-text-subtext">
                                        {helperText}
                                   </p>
                              ) : null}
                         </div>
                         {footerExtra}
                    </div>
               )}
               </div>
          </div>
     )
}