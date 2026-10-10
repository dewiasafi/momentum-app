import {
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface DropdownContextValue {
  close: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownClose() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("useDropdownClose harus dipanggil di dalam <Dropdown>");
  return ctx.close;
}

export interface DropdownProps {
  trigger: ReactElement;
  children: ReactNode;
  align?: "left" | "right";
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
}

export function Dropdown({
  trigger,
  children,
  align = "left",
  closeOnOutsideClick = true,
  closeOnEscape = true,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  function close() {
    setOpen(false);
  }

  useEffect(() => {
    if (!open || !closeOnOutsideClick) return;
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, closeOnOutsideClick]);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const panel = wrapperRef.current?.querySelector('[role="menu"]');
        const items = Array.from(
          panel?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? []
        );
        if (items.length === 0) return;
        const currentIndex = items.findIndex((el) => el === document.activeElement);
        let nextIndex = event.key === "ArrowDown" ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex < 0) nextIndex = items.length - 1;
        if (nextIndex >= items.length) nextIndex = 0;
        items[nextIndex].focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape]);

  const triggerElement = cloneElement(trigger, {
    ref: triggerRef,
    "aria-haspopup": "menu",
    "aria-expanded": open,
    onClick: (e: React.MouseEvent) => {
      (trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
      setOpen((prev) => !prev);
    },
  } as Record<string, unknown>);

  return (
    <DropdownContext.Provider value={{ close }}>
      <div ref={wrapperRef} className="relative inline-flex">
        {triggerElement}

        {open && (
          <div
            role="menu"
            className={`absolute z-50 mt-12 min-w-45 bg-white border border-neutral-200 rounded-lg shadow-md py-1 ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
}

export interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: "default" | "danger";
  closeOnClick?: boolean;
}

export function DropdownItem({
  icon,
  variant = "default",
  closeOnClick = true,
  onClick,
  children,
  className = "",
  ...props
}: DropdownItemProps) {
  const close = useDropdownClose();

  const variantStyles =
    variant === "danger"
      ? "text-rose-600 hover:bg-rose-50 hover:text-rose-700"
      : "text-neutral-700 hover:bg-neutral-50";

  return (
    <button
      type="button"
      role="menuitem"
      className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors cursor-pointer disabled:text-neutral-300 disabled:cursor-not-allowed ${variantStyles} ${className}`}
      onClick={(e) => {
        onClick?.(e);
        if (closeOnClick) close();
      }}
      {...props}
    >
      {icon && <span className="shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div role="separator" className="my-1 border-t border-neutral-100" />;
}

export function DropdownLabel({ children }: { children: ReactNode }) {
  return <div className="px-3 py-1.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">{children}</div>;
}

Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;
Dropdown.Label = DropdownLabel;

export default Dropdown;