import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DetailDrawer({ isOpen, onClose, inquiry, onStatusUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    if (inquiry) {
      setCurrentStatus(inquiry.status);
    }
  }, [inquiry]);

  if (!isOpen || !inquiry) return null;

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await onStatusUpdate(inquiry.id, newStatus);
      setCurrentStatus(newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const statusColors = {
    New: "bg-blue-100 text-blue-700 border-blue-200",
    Contacted: "bg-amber-100 text-amber-700 border-amber-200",
    Closed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
        ></motion.div>

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Inquiry Details</h3>
              <p className="text-sm text-slate-500 mt-0.5">ID: {inquiry.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Status Section */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Current Status
              </label>
              <div className="flex flex-wrap gap-2">
                {["New", "Contacted", "Closed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={isUpdating || currentStatus === status}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                      currentStatus === status
                        ? statusColors[status] + " shadow-sm ring-1 ring-black/5"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    } ${isUpdating && currentStatus !== status ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isUpdating && currentStatus === status ? "Updating..." : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                Contact Information
              </label>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Full Name</p>
                  <p className="font-medium text-slate-900">{inquiry.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email</p>
                  <a href={`mailto:${inquiry.email}`} className="font-medium text-teal-600 hover:underline">{inquiry.email}</a>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Phone</p>
                  <a href={`tel:${inquiry.phone}`} className="font-medium text-teal-600 hover:underline">{inquiry.phone}</a>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Company</p>
                  <p className="font-medium text-slate-900">{inquiry.company || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-500 mb-1">Date Submitted</p>
                  <p className="font-medium text-slate-900">
                    {new Date(inquiry.created_at).toLocaleString('en-US', { 
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                Message Content
              </label>
              
              <div>
                <p className="text-sm text-slate-500 mb-1">Subject</p>
                <p className="font-medium text-slate-900">{inquiry.subject}</p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {inquiry.message}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
