import React from "react";

export default function DataTable({ 
  columns, 
  data, 
  onRowClick, 
  isLoading, 
  emptyMessage = "No records found." 
}) {
  return (
    <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200/60">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className="px-6 py-3.5 text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              // Refined Loading Skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`loading-${i}`} className="animate-pulse bg-white">
                  {columns.map((_, j) => (
                    <td key={j} className="px-6 py-5 border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-3">
                        {j === 0 && <div className="w-8 h-8 bg-slate-100 rounded-full shrink-0"></div>}
                        <div className={`h-3.5 bg-slate-100 rounded-md ${j === 0 ? 'w-32' : j === columns.length - 1 ? 'w-16' : 'w-24'}`}></div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Refined Empty State
              <tr>
                <td colSpan={columns.length} className="px-6 py-24 bg-slate-50/30">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-5">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                    </div>
                    <h3 className="text-[15px] font-semibold text-slate-900 mb-1">No Data Available</h3>
                    <p className="text-sm font-medium text-slate-500 max-w-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              // Data Rows
              data.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex} 
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`group transition-colors duration-150 ${onRowClick ? "cursor-pointer hover:bg-slate-50/80" : "hover:bg-slate-50/40"}`}
                >
                  {columns.map((col, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap"
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
