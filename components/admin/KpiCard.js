import React from "react";

export default function KpiCard({ title, count, icon, trendLabel, trendUp = true, colorClass = "text-teal-600" }) {
  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between h-full transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[0.8rem] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">{title}</p>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-teal-900 transition-colors">{count}</h3>
        </div>
        <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 ${colorClass} transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
      </div>
      
      {trendLabel && (
        <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-slate-50">
          <span className={`flex items-center text-xs font-semibold ${trendUp ? 'text-emerald-600' : 'text-slate-500'}`}>
            {trendUp ? (
              <svg className="w-3.5 h-3.5 mr-1 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            ) : (
              <svg className="w-3.5 h-3.5 mr-1 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
            )}
            {trendLabel}
          </span>
        </div>
      )}
    </div>
  );
}
