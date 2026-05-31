import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import KpiCard from "@/components/admin/KpiCard";
import DataTable from "@/components/admin/DataTable";
import AreaChart from "@/components/admin/charts/AreaChart";
import DonutChart from "@/components/admin/charts/DonutChart";
import { createClient } from "@/utils/supabaseBrowser";

export default function AdminDashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Architecture preparation: map data to ensure fallback source exists
      const processedData = (data || []).map(inq => ({
        ...inq,
        source: inq.source || "Website"
      }));

      setInquiries(processedData);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard metrics. Please verify your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Compute KPIs
  const kpis = useMemo(() => {
    let total = inquiries.length;
    let newCount = 0;
    let contactedCount = 0;
    let closedCount = 0;

    inquiries.forEach(inq => {
      if (inq.status === "New") newCount++;
      if (inq.status === "Contacted") contactedCount++;
      if (inq.status === "Closed") closedCount++;
    });
    
    let responseRate = 0;
    if (total > 0) {
      responseRate = Math.round(((contactedCount + closedCount) / total) * 100);
    }

    return { total, newCount, contactedCount, closedCount, responseRate };
  }, [inquiries]);

  // Compute Status Distribution for Pie Chart
  const statusData = useMemo(() => {
    return [
      { name: "New", value: kpis.newCount, color: "#3b82f6" }, // blue-500
      { name: "Contacted", value: kpis.contactedCount, color: "#f59e0b" }, // amber-500
      { name: "Closed", value: kpis.closedCount, color: "#10b981" }, // emerald-500
    ].filter(item => item.value > 0);
  }, [kpis]);

  // Compute Monthly Trend for Area Chart
  const trendData = useMemo(() => {
    if (inquiries.length === 0) return [];
    
    // Group by Month-Year
    const groups = {};
    for (let i = inquiries.length - 1; i >= 0; i--) {
      const date = new Date(inquiries[i].created_at);
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      groups[monthYear] = (groups[monthYear] || 0) + 1;
    }

    return Object.keys(groups).map(key => ({
      name: key,
      Inquiries: groups[key]
    }));
  }, [inquiries]);

  // Export to CSV Functionality
  const exportToCsv = () => {
    if (inquiries.length === 0) return;
    const headers = ["ID", "Name", "Email", "Phone", "Company", "Subject", "Status", "Source", "Created At"];
    const csvRows = [headers.join(",")];

    inquiries.forEach(inq => {
      const values = [
        inq.id,
        `"${(inq.full_name || "").replace(/"/g, '""')}"`,
        `"${(inq.email || "").replace(/"/g, '""')}"`,
        `"${(inq.phone || "").replace(/"/g, '""')}"`,
        `"${(inq.company || "").replace(/"/g, '""')}"`,
        `"${(inq.subject || "").replace(/"/g, '""')}"`,
        inq.status,
        `"${(inq.source || "").replace(/"/g, '""')}"`,
        inq.created_at
      ];
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `medileo_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Recent Inquiries Table Columns
  const statusColors = {
    New: "bg-blue-100 text-blue-700 border-blue-200",
    Contacted: "bg-amber-100 text-amber-700 border-amber-200",
    Closed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  const columns = [
    { key: "full_name", label: "Name" },
    { key: "company", label: "Company", render: (r) => r.company || "—" },
    { 
      key: "status", 
      label: "Status",
      render: (r) => (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusColors[r.status] || "bg-slate-100"}`}>
          {r.status}
        </span>
      )
    },
    { key: "source", label: "Source", render: (r) => <span className="text-slate-500 text-xs">{r.source}</span> },
    { 
      key: "created_at", 
      label: "Date",
      render: (r) => <span className="text-slate-500 text-xs">{new Date(r.created_at).toLocaleDateString()}</span>
    },
  ];

  const recentInquiries = inquiries.slice(0, 5);

  return (
    <AdminLayout>
      <Head>
        <title>Executive Dashboard | Medileo Admin</title>
      </Head>

      <div className="flex flex-col space-y-8 pb-10">
        
        {/* Header & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Executive Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">High-level overview of corporate lead generation and status.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchInquiries}
              disabled={isLoading}
              className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
              title="Refresh Dashboard"
            >
              <svg className={`w-5 h-5 ${isLoading ? 'animate-spin text-teal-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
            <button 
              onClick={exportToCsv}
              disabled={isLoading || inquiries.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Export CSV
            </button>
            <Link 
              href="/admin/inquiries"
              className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 border border-transparent text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm shadow-teal-500/20"
            >
              View Inquiries
            </Link>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          <KpiCard 
            title="Total Inquiries" 
            count={isLoading ? "-" : kpis.total} 
            trendLabel="Lifetime Volume"
            colorClass="text-teal-600"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          />
          <KpiCard 
            title="New (Action Req.)" 
            count={isLoading ? "-" : kpis.newCount} 
            trendLabel="Awaiting Review"
            trendUp={false}
            colorClass="text-blue-600"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          />
          <KpiCard 
            title="Contacted" 
            count={isLoading ? "-" : kpis.contactedCount} 
            trendLabel="In Progress"
            colorClass="text-amber-600"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
          />
          <KpiCard 
            title="Successfully Closed" 
            count={isLoading ? "-" : kpis.closedCount} 
            trendLabel="Completed Deals"
            colorClass="text-emerald-600"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <KpiCard 
            title="Response Rate" 
            count={isLoading ? "-" : `${kpis.responseRate}%`} 
            trendLabel="Efficiency Metric"
            colorClass="text-indigo-600"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
        </div>

        {/* Charts & Widgets */}
        {!isLoading && inquiries.length === 0 ? (
          // Empty State
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No Inquiries Found</h3>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              Dashboard analytics will populate automatically once prospects begin submitting the corporate partnership forms on the main website.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Area Chart: Monthly Trend */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-6">Monthly Inquiry Volume</h3>
              <div className="flex-1 w-full h-[300px]">
                {isLoading ? (
                  <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl"></div>
                ) : (
                  <AreaChart data={trendData} xKey="name" yKey="Inquiries" />
                )}
              </div>
            </div>

            {/* Donut Chart: Status Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-6">Status Distribution</h3>
              <div className="flex-1 w-full h-[300px] flex items-center justify-center">
                {isLoading ? (
                  <div className="w-48 h-48 rounded-full bg-slate-50 animate-pulse border-8 border-white shadow-sm"></div>
                ) : (
                  <DonutChart data={statusData} />
                )}
              </div>
            </div>

            {/* Recent Inquiries Widget */}
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Recent Inquiries</h3>
                <Link href="/admin/inquiries" className="text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline">
                  View All &rarr;
                </Link>
              </div>
              <div className="p-0 border-none shadow-none rounded-none">
                <DataTable 
                  columns={columns}
                  data={recentInquiries}
                  isLoading={isLoading}
                  onRowClick={(row) => router.push(`/admin/inquiries`)}
                  emptyMessage="No recent inquiries."
                />
              </div>
            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  );
}
