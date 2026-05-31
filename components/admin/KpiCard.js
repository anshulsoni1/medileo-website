import React from "react";

export default function KpiCard({ title, count, icon, trendLabel, trendUp = true, colorClass = "text-teal-600" }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-full transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">{count}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-slate-50 ${colorClass}`}>
          {icon}
        </div>
      </div>
      
      {trendLabel && (
        <div className="flex items-center gap-1.5 mt-auto">
          <span className={`flex items-center text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-slate-500'}`}>
            {trendUp ? (
              <svg className="w-3.5 h-3.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            ) : (
              <svg className="w-3.5 h-3.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
            )}
            {trendLabel}
          </span>
        </div>
      )}
    </div>
  );
}
