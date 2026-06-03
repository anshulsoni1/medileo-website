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
  const [adminUsersMap, setAdminUsersMap] = useState({});
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
      
      const { data: usersData } = await supabase.from("admin_users").select("*");
      if (usersData) {
        const mapping = {};
        usersData.forEach(u => mapping[u.id] = u.full_name || u.email);
        setAdminUsersMap(mapping);
      }
      
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

  // Compute Assignment Metrics
  const assignmentData = useMemo(() => {
    let assigned = 0;
    let unassigned = 0;
    const userCounts = {};

    inquiries.forEach(inq => {
      if (inq.assigned_to) {
        assigned++;
        userCounts[inq.assigned_to] = (userCounts[inq.assigned_to] || 0) + 1;
      } else {
        unassigned++;
      }
    });

    const repDistribution = Object.keys(userCounts).map(id => ({
      name: adminUsersMap[id] || "Unknown Rep",
      value: userCounts[id]
    })).sort((a, b) => b.value - a.value);

    return { assigned, unassigned, repDistribution };
  }, [inquiries, adminUsersMap]);

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
    New: "bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-inset ring-blue-600/20",
    Contacted: "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-inset ring-amber-600/20",
    Closed: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-inset ring-emerald-600/20",
  };

  const statusDots = {
    New: "bg-blue-500",
    Contacted: "bg-amber-500",
    Closed: "bg-emerald-500",
  };

  const columns = [
    { key: "full_name", label: "Name", render: (r) => <span className="font-medium text-slate-900">{r.full_name}</span> },
    { key: "company", label: "Company", render: (r) => <span className="text-slate-600">{r.company || "—"}</span> },
    { 
      key: "status", 
      label: "Status",
      render: (r) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md ${statusColors[r.status] || "bg-slate-50 ring-1 ring-inset ring-slate-500/10 text-slate-600"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDots[r.status] || "bg-slate-400"}`}></span>
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

      <div className="flex flex-col space-y-10 pb-12">
        
        {/* Header & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200/60">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Executive Dashboard</h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">High-level overview of corporate lead generation and status.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchInquiries}
              disabled={isLoading}
              className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all shadow-sm disabled:opacity-50"
              title="Refresh Dashboard"
            >
              <svg className={`w-5 h-5 ${isLoading ? 'animate-spin text-teal-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
            <button 
              onClick={exportToCsv}
              disabled={isLoading || inquiries.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm disabled:opacity-50"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Export CSV
            </button>
            <Link 
              href="/admin/inquiries"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-transparent text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
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

        {/* Assignment Metrics (Leads per user) */}
        {!isLoading && inquiries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-center items-center text-center">
              <h3 className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest mb-4">Assigned vs Unassigned</h3>
              <div className="flex gap-8 w-full justify-center">
                <div>
                  <p className="text-3xl font-bold text-slate-800">{assignmentData.assigned}</p>
                  <p className="text-sm font-medium text-slate-500 mt-1">Assigned</p>
                </div>
                <div className="w-px bg-slate-200"></div>
                <div>
                  <p className="text-3xl font-bold text-amber-600">{assignmentData.unassigned}</p>
                  <p className="text-sm font-medium text-amber-600/70 mt-1">Unassigned</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
              <h3 className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest mb-4">Leads per Sales Rep</h3>
              {assignmentData.repDistribution.length > 0 ? (
                <div className="space-y-4">
                  {assignmentData.repDistribution.map((rep, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium text-slate-700 truncate">{rep.name}</div>
                      <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-teal-500 h-2.5 rounded-full" 
                          style={{ width: `${Math.max(5, (rep.value / assignmentData.assigned) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-right text-sm font-bold text-slate-700">{rep.value}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 py-4 text-center">No leads assigned to any reps yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Charts & Widgets */}
        {!isLoading && inquiries.length === 0 ? (
          // Refined Empty State
          <div className="bg-white py-24 px-6 rounded-[1.25rem] border border-slate-200/60 shadow-sm text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-md border border-slate-100 flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-teal-500/5 rounded-3xl animate-pulse"></div>
              <svg className="w-10 h-10 text-teal-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">Awaiting Data Collection</h3>
            <p className="text-slate-500 font-medium mt-2 max-w-md mx-auto leading-relaxed">
              Dashboard analytics will populate automatically once prospects begin submitting the corporate partnership forms on the main website.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Area Chart: Monthly Trend */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <h3 className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest mb-6">Monthly Inquiry Volume</h3>
              <div className="flex-1 w-full h-[300px]">
                {isLoading ? (
                  <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl"></div>
                ) : (
                  <AreaChart data={trendData} xKey="name" yKey="Inquiries" color="#0f766e" />
                )}
              </div>
            </div>

            {/* Donut Chart: Status Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <h3 className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest mb-6">Pipeline Status</h3>
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
