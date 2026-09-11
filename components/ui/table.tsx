import * as React from "react"

const TableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`glass-card rounded-xl border border-outline-variant/10 ${className || ""}`}
      {...props}
    />
  )
)
TableContainer.displayName = "TableContainer"

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="overflow-x-auto w-full">
      <table
        ref={ref}
        className={`w-full text-left border-collapse ${className || ""}`}
        {...props}
      />
    </div>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={`bg-surface-container-high/50 ${className || ""}`}
      {...props}
    />
  )
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={`divide-y divide-outline-variant/10 ${className || ""}`}
      {...props}
    />
  )
)
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={`hover:bg-white/[0.02] transition-colors group ${className || ""}`}
      {...props}
    />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={`px-6 py-4 font-headline text-xs font-black uppercase tracking-widest text-on-surface-variant ${className || ""}`}
      {...props}
    />
  )
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={`px-6 py-4 ${className || ""}`}
      {...props}
    />
  )
)
TableCell.displayName = "TableCell"

const TableToolbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { title?: string }>(
  ({ className, title, children, ...props }, ref) => (
    <div 
      ref={ref}
      className={`px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-high/30 flex-wrap gap-4 ${className || ""}`}
      {...props}
    >
      {title && <h3 className="text-xl font-bold font-headline">{title}</h3>}
      <div className="flex items-center gap-4 ml-auto">
        {children}
      </div>
    </div>
  )
)
TableToolbar.displayName = "TableToolbar"

export interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page?: number;
  totalPages?: number;
  totalCount?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(
  ({ className, page = 1, totalPages = 1, totalCount = 0, limit = 10, onPageChange, onLimitChange, ...props }, ref) => {
    const startItem = totalCount === 0 ? 0 : (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, totalCount);

    return (
      <div 
        ref={ref}
        className={`px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-high/30 border-t border-outline-variant/10 ${className || ""}`}
        {...props}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-label text-on-surface-variant">Rows per page:</span>
          <select 
            className="bg-transparent border-none text-xs font-bold text-on-surface focus:ring-0 cursor-pointer outline-none"
            value={limit}
            onChange={(e) => onLimitChange && onLimitChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-xs font-label text-on-surface-variant">
            Showing {startItem}-{endItem} of {totalCount}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            className="p-2 text-on-surface-variant hover:text-on-surface disabled:opacity-30 cursor-pointer" 
            disabled={page <= 1}
            onClick={() => onPageChange && onPageChange(page - 1)}
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange && onPageChange(pageNum)}
              className={`h-8 w-8 rounded-lg font-headline font-bold text-xs transition-colors cursor-pointer ${
                pageNum === page
                  ? "bg-primary text-on-primary-container"
                  : "hover:bg-surface-container-highest text-on-surface"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button 
            className="p-2 text-on-surface-variant hover:text-on-surface disabled:opacity-30 cursor-pointer"
            disabled={page >= totalPages}
            onClick={() => onPageChange && onPageChange(page + 1)}
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    );
  }
)
TablePagination.displayName = "TablePagination"

export {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableToolbar,
  TablePagination
}
