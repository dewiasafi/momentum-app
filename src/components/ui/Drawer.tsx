import {
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type DrawerSide = "right" | "left" | "top" | "bottom";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: DrawerSide;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const SIDE_STYLES: Record<DrawerSide, { base: string; enter: string; visible: string }> = {
  right: {
    base: "top-0 right-0 h-full w-full max-w-sm",
    enter: "translate-x-full",
    visible: "translate-x-0",
  },
  left: {
    base: "top-0 left-0 h-full w-full max-w-sm",
    enter: "-translate-x-full",
    visible: "translate-x-0",
  },
  bottom: {
    base: "bottom-0 left-0 w-full max-h-[85vh] rounded-t-xl",
    enter: "translate-y-full",
    visible: "translate-y-0",
  },
  top: {
    base: "top-0 left-0 w-full max-h-[85vh] rounded-b-xl",
    enter: "-translate-y-full",
    visible: "translate-y-0",
  },
};

const EXIT_DURATION = 200;

export function Drawer({
  open,
  onClose,
  children,
  side = "right",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = "",
}: DrawerProps) {
  const [shouldRender, setShouldRender] = useState(open);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      const enterTimer = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(enterTimer);
    }
    setVisible(false);
    const exitTimer = setTimeout(() => setShouldRender(false), EXIT_DURATION);
    return () => clearTimeout(exitTimer);
  }, [open]);

  useEffect(() => {
    if (!shouldRender) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (!visible || !panelRef.current) return;
    const focusable = panelRef.current.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }, [visible]);

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusableEls = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableEls.length === 0) return;

    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!shouldRender) return null;

  const sideStyle = SIDE_STYLES[side];

  return createPortal(
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => closeOnBackdropClick && onClose()}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={`fixed z-50 bg-white shadow-xl flex flex-col transition-transform duration-200 ease-in-out ${
          sideStyle.base
        } ${visible ? sideStyle.visible : sideStyle.enter} ${className}`}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </>,
    document.body
  );
}

function DrawerHeader({
  children,
  onClose,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { onClose?: () => void }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-6 py-4 border-b border-neutral-200 shrink-0 ${className}`}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="shrink-0 rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

function DrawerTitle({ children, className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={`text-base font-semibold text-neutral-900 ${className}`} {...props}>
      {children}
    </h2>
  );
}

function DrawerBody({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 overflow-y-auto flex-1 text-sm text-neutral-600 ${className}`} {...props}>
      {children}
    </div>
  );
}

function DrawerFooter({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center justify-end gap-2 px-6 py-4 border-t border-neutral-200 shrink-0 bg-neutral-50/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;

export default Drawer;