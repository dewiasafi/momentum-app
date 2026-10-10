import { ReactElement, ReactNode, cloneElement, useEffect, useId, useRef, useState } from "react";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  position?: TooltipPosition;
  delay?: number;
}

const POSITION_STYLES: Record<TooltipPosition, { bubble: string; arrow: string }> = {
  top: {
    bubble: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    arrow: "-bottom-1 left-1/2 -translate-x-1/2",
  },
  bottom: {
    bubble: "top-full left-1/2 -translate-x-1/2 mt-2",
    arrow: "-top-1 left-1/2 -translate-x-1/2",
  },
  left: {
    bubble: "right-full top-1/2 -translate-y-1/2 mr-2",
    arrow: "-right-1 top-1/2 -translate-y-1/2",
  },
  right: {
    bubble: "left-full top-1/2 -translate-y-1/2 ml-2",
    arrow: "-left-1 top-1/2 -translate-y-1/2",
  },
};

export default function Tooltip({ content, children, position = "top", delay = 300 }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function show() {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }

  function hide() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }

  const childProps = children.props as Record<string, unknown>;
  const trigger = cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent) => {
      (childProps.onMouseEnter as (e: React.MouseEvent) => void)?.(e);
      show();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      (childProps.onMouseLeave as (e: React.MouseEvent) => void)?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent) => {
      (childProps.onFocus as (e: React.FocusEvent) => void)?.(e);
      show();
    },
    onBlur: (e: React.FocusEvent) => {
      (childProps.onBlur as (e: React.FocusEvent) => void)?.(e);
      hide();
    },
    "aria-describedby": id,
  } as Record<string, unknown>);

  const positionStyle = POSITION_STYLES[position];

  return (
    <span className="relative inline-flex">
      {trigger}
      <span
        role="tooltip"
        id={id}
        className={`absolute z-50 px-2.5 py-1.5 rounded-md bg-neutral-800 text-white text-xs font-medium whitespace-nowrap pointer-events-none transition-all duration-100 ${
          positionStyle.bubble
        } ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        {content}
        <span className={`absolute w-2 h-2 bg-neutral-800 rotate-45 ${positionStyle.arrow}`} aria-hidden="true" />
      </span>
    </span>
  );
}