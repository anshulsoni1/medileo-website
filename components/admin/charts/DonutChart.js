import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

export default function DonutChart({ data, dataKey = "value" }) {
  if (!data || data.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">Not enough data.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={100}
          paddingAngle={5}
          dataKey={dataKey}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || "#cbd5e1"} />
          ))}
        </Pie>
        <RechartsTooltip 
          contentStyle={{ backgroundColor: '#021120', borderRadius: '10px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.2)', padding: '8px 12px' }}
          itemStyle={{ color: '#f8fafc', fontWeight: 600, fontSize: '13px' }}
        />
        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
