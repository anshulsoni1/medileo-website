import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import KpiCard from "@/components/admin/KpiCard";
import AreaChart from "@/components/admin/charts/AreaChart";
import DonutChart from "@/components/admin/charts/DonutChart";
import DataTable from "@/components/admin/DataTable";
import { getAnalyticsOverview } from "@/services/analytics";
import { createClient } from "@/utils/supabaseBrowser";

export default function AdminAnalytics() {
  const [webData, setWebData] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [isLoadingWeb, setIsLoadingWeb] = useState(true);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Mock Web Analytics
  useEffect(() => {
    const fetchWebData = async () => {
      try {
        const result = await getAnalyticsOverview();
        setWebData(result);
      } catch (err) {
        console.error("Failed to load web analytics:", err);
      } finally {
        setIsLoadingWeb(false);
      }
    };
    fetchWebData();
  }, []);

  // Fetch Live Inquiry Analytics
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("inquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        
        const processedData = (data || []).map(inq => ({
          ...inq,
          source: inq.source || "Website"
        }));

        setInquiries(processedData);
      } catch (err) {
        console.error("Failed to load inquiry analytics:", err);
        setError("Failed to load live inquiry data.");
      } finally {
        setIsLoadingInquiries(false);
      }
    };
    fetchInquiries();
  }, []);

  // Compute Inquiry Metrics
  const inquiryMetrics = useMemo(() => {
    const total = inquiries.length;
    let newCount = 0;
    let contactedCount = 0;
    let closedCount = 0;
    const sourceMap = {};
    const trendMap = {};

    inquiries.forEach(inq => {
      // Status
      if (inq.status === "New") newCount++;
      if (inq.status === "Contacted") contactedCount++;
      if (inq.status === "Closed") closedCount++;

      // Sources
      const src = inq.source;
      sourceMap[src] = (sourceMap[src] || 0) + 1;

      // Trends (Monthly)
      const date = new Date(inq.created_at);
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      trendMap[monthYear] = (trendMap[monthYear] || 0) + 1;
    });

    // Format Status Data
    const statusData = [
      { name: "New", value: newCount, color: "#3b82f6" },
      { name: "Contacted", value: contactedCount, color: "#f59e0b" },
      { name: "Closed", value: closedCount, color: "#10b981" },
    ].filter(item => item.value > 0);

    // Format Trend Data (Reverse for chronological order)
    const trendData = Object.keys(trendMap).reverse().map(key => ({
      name: key,
      Inquiries: trendMap[key]
    }));

    // Format Source Data
    const colors = ["#0f766e", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];
    const sourceData = Object.keys(sourceMap).map((key, i) => ({
      name: key,
      value: sourceMap[key],
      color: colors[i % colors.length]
    })).sort((a, b) => b.value - a.value);

    // Calculate Conversion Rate (Inquiries / Total Visitors)
    // Note: Since Visitors is currently a mock string like "24,592", we parse it for a dynamic fallback calculation
    let conversionRate = "0.0%";
    if (webData && webData.kpis && webData.kpis.totalVisitors) {
      const visitors = parseInt(webData.kpis.totalVisitors.replace(/,/g, ''), 10);
      if (visitors > 0) {
        conversionRate = ((total / visitors) * 100).toFixed(2) + "%";
      }
    }

    return { total, statusData, trendData, sourceData, conversionRate };
  }, [inquiries, webData]);

  const topPagesColumns = [
    { key: "path", label: "Path", render: (r) => <span className="font-mono text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded">{r.path}</span> },
    { key: "title", label: "Page Title", render: (r) => <span className="font-medium text-slate-800">{r.title}</span> },
    { key: "views", label: "Views" },
    { key: "bounceRate", label: "Bounce Rate", render: (r) => <span className="text-slate-500">{r.bounceRate}</span> },
  ];

  const sourceColumns = [
    { key: "name", label: "Lead Source", render: (r) => <span className="font-medium text-slate-800">{r.name}</span> },
    { key: "value", label: "Volume" },
    { 
      key: "percentage", 
      label: "% of Total", 
      render: (r) => <span className="text-slate-500">{inquiryMetrics.total > 0 ? Math.round((r.value / inquiryMetrics.total) * 100) : 0}%</span> 
    },
  ];

  return (
    <AdminLayout>
      <Head>
        <title>Analytics Hub | Medileo Admin</title>
      </Head>

      <div className="flex flex-col space-y-8 pb-10">
        
        {/* Header & Integration Banner */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Analytics Hub</h1>
            <p className="text-slate-500 text-sm mt-1">Unified view of web traffic, user behavior, and business lead analytics.</p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
              <h4 className="text-amber-800 font-semibold text-sm">Web Analytics Integration Pending</h4>
              <p className="text-amber-700 text-sm mt-1">Website Traffic, SEO, and User Behavior metrics are currently rendering structural previews using mock data. The Inquiry Analytics section below is fully live and connected to your database.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {/* --- SECTION: WEB ANALYTICS --- */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-6">Website Analytics (Preview)</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <KpiCard 
              title="Total Visitors" 
              count={isLoadingWeb ? "-" : webData?.kpis.totalVisitors} 
              trendLabel="+12.5% this month"
              colorClass="text-blue-600"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
            <KpiCard 
              title="Sessions" 
              count={isLoadingWeb ? "-" : webData?.kpis.sessions} 
              trendLabel="+8.2% this month"
              colorClass="text-teal-600"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
            />
            <KpiCard 
              title="Page Views" 
              count={isLoadingWeb ? "-" : webData?.kpis.pageViews} 
              trendLabel="+15.3% this month"
              colorClass="text-indigo-600"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            />
            <KpiCard 
              title="Conversion Rate" 
              count={isLoadingWeb ? "-" : webData?.kpis.conversionRate} 
              trendLabel="-0.4% this month"
              trendUp={false}
              colorClass="text-emerald-600"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            />
            <KpiCard 
              title="Avg Session" 
              count={isLoadingWeb ? "-" : webData?.kpis.avgSessionDuration} 
              trendLabel="+12s this month"
              colorClass="text-amber-600"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-6">Traffic Trend (30 Days)</h3>
              <div className="flex-1 w-full h-[300px]">
                {isLoadingWeb ? (
                  <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl"></div>
                ) : (
                  <AreaChart data={webData?.trafficTrend} xKey="name" yKey="Traffic" color="#3b82f6" />
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-6">Traffic Sources</h3>
              <div className="flex-1 w-full h-[300px] flex items-center justify-center">
                {isLoadingWeb ? (
                  <div className="w-48 h-48 rounded-full bg-slate-50 animate-pulse border-8 border-white shadow-sm"></div>
                ) : (
                  <DonutChart data={webData?.trafficSources} />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Top Pages</h3>
              </div>
              <div className="p-0 border-none shadow-none rounded-none">
                <DataTable 
                  columns={topPagesColumns}
                  data={webData?.topPages || []}
                  isLoading={isLoadingWeb}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-6">Device Breakdown</h3>
              <div className="flex-1 w-full h-[250px] flex items-center justify-center">
                {isLoadingWeb ? (
                  <div className="w-40 h-40 rounded-full bg-slate-50 animate-pulse border-8 border-white shadow-sm"></div>
                ) : (
                  <DonutChart data={webData?.deviceBreakdown} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION: INQUIRY ANALYTICS (LIVE) --- */}
        <div className="pt-6">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
            <h2 className="text-lg font-semibold text-slate-800">Business Lead Analytics</h2>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Live Data
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <KpiCard 
              title="Total Inquiries" 
              count={isLoadingInquiries ? "-" : inquiryMetrics.total} 
              trendLabel="Lifetime Volume"
              colorClass="text-teal-600"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            />
            <KpiCard 
              title="Global Conv. Rate" 
              count={isLoadingInquiries || isLoadingWeb ? "-" : inquiryMetrics.conversionRate} 
              trendLabel="Inquiries / Web Visitors"
              colorClass="text-indigo-600"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-6">Monthly Inquiry Volume</h3>
              <div className="flex-1 w-full h-[300px]">
                {isLoadingInquiries ? (
                  <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl"></div>
                ) : (
                  <AreaChart data={inquiryMetrics.trendData} xKey="name" yKey="Inquiries" color="#0f766e" />
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-6">Status Breakdown</h3>
              <div className="flex-1 w-full h-[300px] flex items-center justify-center">
                {isLoadingInquiries ? (
                  <div className="w-48 h-48 rounded-full bg-slate-50 animate-pulse border-8 border-white shadow-sm"></div>
                ) : (
                  <DonutChart data={inquiryMetrics.statusData} />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Top Inquiry Sources</h3>
              </div>
              <div className="p-0 border-none shadow-none rounded-none">
                <DataTable 
                  columns={sourceColumns}
                  data={inquiryMetrics.sourceData}
                  isLoading={isLoadingInquiries}
                  emptyMessage="No source data available."
                />
              </div>
            </div>
            
            {/* Aligning with the 3 column grid */}
            <div className="hidden lg:block bg-transparent"></div>
          </div>
        </div>

        {/* --- SECTION: FUTURE INTEGRATIONS --- */}
        <div className="pt-6">
          <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-6">Future Platform Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SEO Performance Section */}
            <div className="bg-white p-6 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center h-[300px]">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 text-slate-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">SEO Performance</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-sm">
                Connect Google Search Console to unlock Impressions, Clicks, CTR, and Average Position metrics directly in the admin panel.
              </p>
              <button className="mt-6 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                Configure GSC &rarr;
              </button>
            </div>

            {/* User Behavior Section */}
            <div className="bg-white p-6 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center h-[300px]">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 text-slate-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">User Behavior</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-sm">
                Connect Microsoft Clarity to unlock Session Recordings, Heatmaps, and Scroll Depth visualizations directly in the admin panel.
              </p>
              <button className="mt-6 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                Configure Clarity &rarr;
              </button>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
