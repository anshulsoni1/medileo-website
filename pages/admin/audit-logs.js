import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import { createClient } from "@/utils/supabaseBrowser";

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [actionFilter, setActionFilter] = useState("All Actions");
  const [entityFilter, setEntityFilter] = useState("All Entities");

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (err) {
      console.error("Error fetching audit logs:", err);
      setError("Failed to load audit logs.");
    } finally {
      setIsLoading(false);
    }
  }

  // Filtered Data Computation
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (actionFilter !== "All Actions" && log.action !== actionFilter) {
        return false;
      }
      if (entityFilter !== "All Entities" && log.entity_type !== entityFilter) {
        return false;
      }
      return true;
    });
  }, [logs, actionFilter, entityFilter]);

  // Derived filter options
  const actionOptions = ["All Actions", ...Array.from(new Set(logs.map(l => l.action)))];
  const entityOptions = ["All Entities", ...Array.from(new Set(logs.map(l => l.entity_type)))];

  const columns = [
    { 
      key: "created_at", 
      label: "Timestamp",
      render: (row) => (
        <span className="text-slate-500 text-xs font-mono">
          {new Date(row.created_at).toLocaleString()}
        </span>
      )
    },
    { 
      key: "user_email", 
      label: "User",
      render: (row) => (
        <span className="font-medium text-slate-800">{row.user_email || "System"}</span>
      )
    },
    { 
      key: "action", 
      label: "Action",
      render: (row) => (
        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
          {row.action}
        </span>
      )
    },
    { 
      key: "entity", 
      label: "Entity",
      render: (row) => (
        <div>
          <span className="text-xs font-medium text-slate-600 block">{row.entity_type}</span>
          {row.entity_id && <span className="text-[10px] text-slate-400 font-mono truncate max-w-[120px] block">{row.entity_id}</span>}
        </div>
      )
    },
    { 
      key: "details", 
      label: "Details",
      render: (row) => (
        <div className="text-xs text-slate-500 max-w-[300px] max-h-16 overflow-y-auto custom-scrollbar">
          {row.new_value && (
            <div>
              <span className="font-semibold text-slate-600">New: </span>
              <pre className="inline text-[10px]">{JSON.stringify(row.new_value)}</pre>
            </div>
          )}
          {row.old_value && (
            <div className="mt-1">
              <span className="font-semibold text-slate-600">Old: </span>
              <pre className="inline text-[10px]">{JSON.stringify(row.old_value)}</pre>
            </div>
          )}
        </div>
      )
    },
  ];

  return (
    <AdminLayout>
      <Head>
        <title>Audit Logs | Medileo Admin</title>
      </Head>

      <div className="flex flex-col h-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Audit Logs</h1>
            <p className="text-slate-500 text-sm mt-1">Immutable record of all administrative actions.</p>
          </div>
          
          <button 
            onClick={fetchLogs}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/80 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
          >
            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin text-teal-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Refresh
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-sm font-semibold flex items-center gap-3 animate-fade-in-down shadow-sm">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm mb-6">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap hidden md:block">Action</label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full md:w-48 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
            >
              {actionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap hidden md:block">Entity</label>
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="w-full md:w-48 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
            >
              {entityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        <DataTable 
          columns={columns}
          data={filteredLogs}
          isLoading={isLoading}
          emptyMessage="No audit logs recorded yet."
        />
      </div>
    </AdminLayout>
  );
}
