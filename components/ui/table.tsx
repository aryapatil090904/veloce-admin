import * as React from "react"

const TableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`glass-card rounded-xl overflow-hidden border border-outline-variant/10 ${className || ""}`}
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

const TablePagination = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref}
      className={`px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-high/30 border-t border-outline-variant/10 ${className || ""}`}
      {...props}
    >
      <div className="flex items-center gap-4">
        <span className="text-xs font-label text-on-surface-variant">Rows per page:</span>
        <select className="bg-transparent border-none text-xs font-bold text-on-surface focus:ring-0 cursor-pointer outline-none">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span className="text-xs font-label text-on-surface-variant">Showing 1-10 of 42</span>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-2 text-on-surface-variant hover:text-on-surface disabled:opacity-30" disabled>
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>
        <button className="h-8 w-8 rounded-lg bg-primary text-on-primary-container font-headline font-bold text-xs">1</button>
        <button className="h-8 w-8 rounded-lg hover:bg-surface-container-highest text-on-surface font-headline font-bold text-xs transition-colors">2</button>
        <button className="h-8 w-8 rounded-lg hover:bg-surface-container-highest text-on-surface font-headline font-bold text-xs transition-colors">3</button>
        <span className="text-on-surface-variant px-2">...</span>
        <button className="h-8 w-8 rounded-lg hover:bg-surface-container-highest text-on-surface font-headline font-bold text-xs transition-colors">5</button>
        <button className="p-2 text-on-surface-variant hover:text-on-surface">
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  )
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
