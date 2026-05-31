import React from "react";
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

export default function AreaChart({ data, xKey, yKey, color = "#0f766e" }) {
  if (!data || data.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No data available.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={`color-${yKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} allowDecimals={false} dx={-10} />
        <RechartsTooltip 
          contentStyle={{ backgroundColor: '#021120', borderRadius: '10px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.2)', padding: '12px 16px' }}
          itemStyle={{ color: '#f8fafc', fontWeight: 600, fontSize: '14px' }}
          labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}
          cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
        />
        <Area type="monotone" dataKey={yKey} stroke={color} strokeWidth={2.5} fillOpacity={1} fill={`url(#color-${yKey})`} activeDot={{ r: 6, strokeWidth: 0, fill: color }} />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
