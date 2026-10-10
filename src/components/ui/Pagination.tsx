import { ReactNode } from "react";

const ELLIPSIS = "ellipsis" as const;
type PageItem = number | typeof ELLIPSIS;

function getPageRange(currentPage: number, totalPages: number, siblingCount: number): PageItem[] {
  const totalNumbersShown = siblingCount * 2 + 5;
  if (totalPages <= totalNumbersShown) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1);
    return [...leftRange, ELLIPSIS, totalPages];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRangeLength = 3 + siblingCount * 2;
    const rightRange = Array.from({ length: rightRangeLength }, (_, i) => totalPages - rightRangeLength + i + 1);
    return [1, ELLIPSIS, ...rightRange];
  }
  const middleRange = Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i);
  return [1, ELLIPSIS, ...middleRange, ELLIPSIS, totalPages];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const btnBase =
    "inline-flex items-center justify-center min-w-9 h-9 px-3 text-sm font-medium rounded-lg transition-all duration-150 select-none border border-slate-200 bg-white text-neutral-600 hover:bg-slate-50 hover:text-app-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-forest/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-3.5 border-t border-slate-200 bg-slate-50/50">
      <div className="text-sm text-slate-600">
        Halaman <strong className="text-neutral-900">{currentPage}</strong> dari{" "}
        <strong className="text-neutral-900">{totalPages}</strong>
      </div>

      <nav aria-label="Pagination" className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Halaman sebelumnya"
          className={btnBase}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {getPageRange(currentPage, totalPages, siblingCount).map((page, index) =>
          page === ELLIPSIS ? (
            <span key={`ellipsis-${index}`} className="inline-flex items-center justify-center px-2 text-slate-400 select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onPageChange(page as number)}
              className={`${btnBase} ${
                page === currentPage
                  ? "border-app-forest font-semibold shadow-2xs text-app-forest"
                  : ""
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Halaman berikutnya"
          className={btnBase}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
    </div>
  );
}