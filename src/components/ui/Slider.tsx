import { InputHTMLAttributes, forwardRef } from "react";
import FormField from "./FormField";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  helperText?: string;
  errorText?: string;
  showValue?: boolean;
  fullWidth?: boolean;
  containerClassName?: string;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      helperText,
      errorText,
      showValue = false,
      fullWidth = false,
      min = 0,
      max = 100,
      value,
      defaultValue,
      disabled = false,
      className = "",
      containerClassName = "",
      ...props
    },
    ref
  ) => {
    const numericMin = Number(min);
    const numericMax = Number(max);
    const numericValue = Number(value ?? defaultValue ?? numericMin);
    const percent = Math.min(100, Math.max(0, ((numericValue - numericMin) / (numericMax - numericMin)) * 100));

    const fillStyle = {
      background: `linear-gradient(to right, #2d5a27 ${percent}%, #e5e5e5 ${percent}%)`,
    };

    return (
      <FormField
        label={label}
        helperText={helperText}
        errorText={errorText}
        fullWidth={fullWidth}
        className={containerClassName}
      >
        {(id) => (
          <div className="flex items-center gap-3 w-full">
            <input
              type="range"
              id={id}
              ref={ref}
              min={min}
              max={max}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              className={`w-full h-1.5 rounded-full appearance-none cursor-pointer bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-app-forest [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-2xs [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110 focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-app-forest/20 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-app-forest [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-2xs hover:[&::-moz-range-thumb]:scale-110 ${className}`}
              style={fillStyle}
              {...props}
            />
            {showValue && <span className="text-sm font-medium text-neutral-700 min-w-10 text-right">{numericValue}</span>}
          </div>
        )}
      </FormField>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;