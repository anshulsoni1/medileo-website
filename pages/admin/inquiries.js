import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import FilterBar from "@/components/admin/FilterBar";
import DataTable from "@/components/admin/DataTable";
import DetailDrawer from "@/components/admin/DetailDrawer";
import { createClient } from "@/utils/supabaseBrowser";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [assignmentFilter, setAssignmentFilter] = useState("All Leads");

  // Admin users state for display
  const [adminUsersMap, setAdminUsersMap] = useState({});

  // Drawer state
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch inquiries on mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      
      // Fetch users for mapping
      const { data: usersData, error: usersError } = await supabase.from("admin_users").select("*");
      if (!usersError && usersData) {
        const mapping = {};
        usersData.forEach(u => mapping[u.id] = u.full_name || u.email);
        setAdminUsersMap(mapping);
      }

      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      setError("Failed to load inquiries. Please check your connection or contact support.");
    } finally {
      setIsLoading(false);
    }
  }

  // Status Update Mutation
  const handleStatusUpdate = async (id, newStatus) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("inquiries")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) throw error;

    // Log the status update
    try {
      const oldStatus = inquiries.find(i => i.id === id)?.status || "Unknown";
      await fetch('/api/admin/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'UPDATE_STATUS',
          entityType: 'INQUIRY',
          entityId: id,
          oldValue: { status: oldStatus },
          newValue: { status: newStatus }
        })
      });
    } catch (err) {
      console.error("Audit log failed", err);
    }

    // Optimistic local UI update
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    
    // Update selected inquiry so drawer reflects changes immediately
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  // Filtered Data Computation
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      // 1. Status Filter
      if (statusFilter !== "All" && inq.status !== statusFilter) {
        return false;
      }
      
      // 2. Assignment Filter
      if (assignmentFilter === "Unassigned Leads" && !inq.assigned_to) {
        // Unassigned only
      } else if (assignmentFilter === "Unassigned Leads" && inq.assigned_to) {
        return false;
      }
      if (assignmentFilter === "My Leads") {
        // Since we don't have a real auth context here, we assume the dummy admin ID is '00000000-0000-0000-0000-000000000000'
        const myId = '00000000-0000-0000-0000-000000000000';
        if (inq.assigned_to !== myId) return false;
      }
      
      // 3. Search Term Filter (Name, Email, Company, Subject)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesName = inq.full_name?.toLowerCase().includes(term);
        const matchesEmail = inq.email?.toLowerCase().includes(term);
        const matchesCompany = inq.company?.toLowerCase().includes(term);
        const matchesSubject = inq.subject?.toLowerCase().includes(term);
        
        if (!matchesName && !matchesEmail && !matchesCompany && !matchesSubject) {
          return false;
        }
      }
      
      return true;
    });
  }, [inquiries, searchTerm, statusFilter, assignmentFilter]);

  // Open Drawer Handler
  const handleRowClick = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDrawerOpen(true);
  };

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

  // Table Column Definition
  const columns = [
    { key: "full_name", label: "Name", render: (row) => <span className="font-medium text-slate-900">{row.full_name}</span> },
    { key: "email", label: "Email" },
    { 
      key: "company", 
      label: "Company", 
      render: (row) => <span className="text-slate-500">{row.company || "—"}</span> 
    },
    { 
      key: "subject", 
      label: "Subject",
      render: (row) => (
        <span className="truncate max-w-[200px] block" title={row.subject}>
          {row.subject}
        </span>
      )
    },
    { 
      key: "status", 
      label: "Status",
      render: (row) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md ${statusColors[row.status] || "bg-slate-50 ring-1 ring-inset ring-slate-500/10 text-slate-600"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDots[row.status] || "bg-slate-400"}`}></span>
          {row.status}
        </span>
      )
    },
    {
      key: "assigned_to",
      label: "Assignee",
      render: (row) => (
        <span className="text-xs text-slate-600 font-medium bg-slate-100 px-2 py-1 rounded-md whitespace-nowrap">
          {row.assigned_to ? (adminUsersMap[row.assigned_to] || "Unknown Rep") : "Unassigned"}
        </span>
      )
    },
    { 
      key: "created_at", 
      label: "Date",
      render: (row) => (
        <span className="text-slate-500 text-xs">
          {new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      )
    },
  ];

  return (
    <AdminLayout>
      <Head>
        <title>Inquiries | Medileo Admin</title>
      </Head>

      <div className="flex flex-col h-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Inquiry Management</h1>
            <p className="text-slate-500 text-sm mt-1">Review, filter, and manage corporate inquiries.</p>
          </div>
          
          <button 
            onClick={fetchInquiries}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/80 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
          >
            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin text-teal-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Refresh
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-sm font-semibold flex items-center gap-3 animate-fade-in-down shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            {error}
          </div>
        )}

        <FilterBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          statusFilter={statusFilter} 
          onStatusChange={setStatusFilter}
          assignmentFilter={assignmentFilter}
          onAssignmentChange={setAssignmentFilter}
        />

        <DataTable 
          columns={columns}
          data={filteredInquiries}
          isLoading={isLoading}
          onRowClick={handleRowClick}
          emptyMessage={
            searchTerm || statusFilter !== "All" 
              ? "No inquiries match your filters." 
              : "No inquiries have been received yet."
          }
        />
      </div>

      {selectedInquiry && (
        <DetailDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          inquiry={selectedInquiry}
          onStatusUpdate={handleStatusUpdate}
          onAssignUpdate={(id, assignee) => {
            setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, assigned_to: assignee } : inq));
            if (selectedInquiry.id === id) {
              setSelectedInquiry({ ...selectedInquiry, assigned_to: assignee });
            }
          }}
        />
      )}
    </AdminLayout>
  );
}
