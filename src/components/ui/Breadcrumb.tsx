import { ReactNode } from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

function DefaultSeparator() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Breadcrumb({ items, separator }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-neutral-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} onClick={item.onClick} className="text-neutral-500 hover:text-neutral-700 transition-colors">
                  {item.label}
                </a>
              ) : (
                <button type="button" onClick={item.onClick} className="text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer">
                  {item.label}
                </button>
              )}

              {!isLast && (
                <span className="text-neutral-300 flex items-center" aria-hidden="true">
                  {separator ?? <DefaultSeparator />}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}