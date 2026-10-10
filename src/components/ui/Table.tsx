import { ReactNode, HTMLAttributes, CSSProperties } from "react";
import Pagination, { PaginationProps } from "./Pagination";

export type SortDirection = "asc" | "desc" | null;

export interface ColumnType<T> {
  title: ReactNode;
  dataIndex?: keyof T | string;
  key: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => ReactNode;
  className?: string;
}

export interface TableProps<T> extends Omit<HTMLAttributes<HTMLTableElement>, "children"> {
  dataSource: T[];
  columns: ColumnType<T>[];
  rowKey: keyof T | ((record: T) => string | number);
  loading?: boolean;
  emptyText?: ReactNode;
  sortColumn?: string | null;
  sortDirection?: SortDirection;
  onSortChange?: (columnKey: string, direction: SortDirection) => void;
  hoverable?: boolean;
  striped?: boolean;
  pagination?: PaginationProps | false;
  headerClassName?: string;
  headerStyle?: CSSProperties;
}

const ALIGN_MAP = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
};

export function Table<T>({
  dataSource,
  columns,
  rowKey,
  loading = false,
  emptyText = "Tidak ada data",
  sortColumn,
  sortDirection,
  onSortChange,
  hoverable = true,
  striped = false,
  pagination,
  headerClassName = "",
  headerStyle,
  className = "",
  ...props
}: TableProps<T>) {
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === "function") return rowKey(record);
    const val = record[rowKey] as unknown as string | number;
    return val ?? index;
  };

  const handleSort = (column: ColumnType<T>) => {
    if (!column.sortable || !onSortChange) return;
    let nextDirection: SortDirection = "asc";
    if (sortColumn === column.key) {
      if (sortDirection === "asc") nextDirection = "desc";
      else if (sortDirection === "desc") nextDirection = null;
    }
    onSortChange(column.key, nextDirection);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
      <div className="overflow-x-auto">
        <table className={`w-full border-collapse text-left text-sm text-neutral-600 ${className}`} {...props}>
          <thead
            className={`text-xs font-semibold uppercase tracking-wider border-b border-slate-200 bg-slate-50 text-slate-600 ${headerClassName}`}
            style={headerStyle}
          >
            <tr>
              {columns.map((col) => {
                const isCurrentSort = sortColumn === col.key;
                const alignStyle = ALIGN_MAP[col.align ?? "left"];

                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{ width: col.width }}
                    className={`px-6 py-3.5 transition-colors ${
                      col.sortable ? "cursor-pointer select-none hover:bg-black/5" : ""
                    } ${col.className || ""}`}
                    onClick={() => handleSort(col)}
                  >
                    <div className={`inline-flex items-center gap-1.5 w-full text-inherit ${alignStyle}`}>
                      <span>{col.title}</span>
                      {col.sortable && (
                        <span className={`text-xs ${isCurrentSort && sortDirection ? "opacity-100 font-bold" : "opacity-60"}`}>
                          {isCurrentSort && sortDirection === "asc" ? "▲" : isCurrentSort && sortDirection === "desc" ? "▼" : "⇅"}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-neutral-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-app-forest border-t-transparent" />
                    <span>Memuat data...</span>
                  </div>
                </td>
              </tr>
            ) : dataSource.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-neutral-500">
                  {emptyText}
                </td>
              </tr>
            ) : (
              dataSource.map((record, index) => {
                const key = getRowKey(record, index);
                const rowStyle = `${hoverable ? "hover:bg-slate-50/80" : ""} ${
                  striped && index % 2 === 1 ? "bg-slate-50/40" : ""
                }`;

                return (
                  <tr key={key} className={`transition-colors ${rowStyle}`}>
                    {columns.map((col) => {
                      const val = col.dataIndex ? (record as any)[col.dataIndex] : undefined;
                      const cellContent = col.render ? col.render(val, record, index) : val;
                      const alignStyle = ALIGN_MAP[col.align ?? "left"];

                      return (
                        <td key={col.key} className={`px-6 py-4 text-neutral-600 whitespace-nowrap ${alignStyle} ${col.className || ""}`}>
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && <Pagination {...pagination} />}
    </div>
  );
}

export default Table;