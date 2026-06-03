import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabaseBrowser";
import { getEmailTemplates } from "@/services/emailTemplates";

export default function DetailDrawer({ isOpen, onClose, inquiry, onStatusUpdate, onAssignUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentAssignee, setCurrentAssignee] = useState("");
  const [adminUsers, setAdminUsers] = useState([]);
  
  // Tabs: 'details', 'conversation', 'notes', 'reply'
  const [activeTab, setActiveTab] = useState("details");
  
  // Templates state
  const [templates, setTemplates] = useState({});

  // Reply State
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);
  const [replyError, setReplyError] = useState("");
  
  // Conversation History
  const [replies, setReplies] = useState([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);

  // Notes State
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteContent, setEditingNoteContent] = useState("");

  const fetchAdminUsers = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('admin_users').select('*');
      if (error) throw error;
      setAdminUsers(data || []);
    } catch (error) {
      console.error("Failed to load admin users:", error);
    }
  };

  const fetchReplies = async (id) => {
    setIsLoadingReplies(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('inquiry_replies')
        .select('*')
        .eq('inquiry_id', id)
        .order('sent_at', { ascending: true });
        
      if (error) throw error;
      setReplies(data || []);
    } catch (err) {
      console.error("Error fetching replies:", err);
    } finally {
      setIsLoadingReplies(false);
    }
  };

  const fetchNotes = async (id) => {
    setIsLoadingNotes(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('inquiry_notes')
        .select('*')
        .eq('inquiry_id', id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setNotes(data || []);
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  useEffect(() => {
    // Fetch templates and admin users on mount
    getEmailTemplates().then(setTemplates).catch(console.error);
    fetchAdminUsers();
  }, []);

  useEffect(() => {
    if (inquiry) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setCurrentStatus(inquiry.status);
      setCurrentAssignee(inquiry.assigned_to || "");
      setReplySubject(`Re: ${inquiry.subject}`);
      setReplyMessage("");
      setActiveTab("details");
      
      fetchReplies(inquiry.id);
      fetchNotes(inquiry.id);
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

  const handleAssignChange = async (e) => {
    const newAssignee = e.target.value;
    setIsUpdating(true);
    try {
      const res = await fetch('/api/admin/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: inquiry.id,
          assignedTo: newAssignee || null,
          adminId: '00000000-0000-0000-0000-000000000000',
          adminEmail: 'admin@medileohealthcare.com'
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to assign');
      
      setCurrentAssignee(newAssignee);
      if (onAssignUpdate) {
        onAssignUpdate(inquiry.id, newAssignee || null);
      }
      // Re-fetch notes to show the auto-generated assignment note
      fetchNotes(inquiry.id);
    } catch (error) {
      console.error("Failed to assign:", error);
      alert("Assignment failed: " + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTemplateChange = (e) => {
    const val = e.target.value;
    setSelectedTemplate(val);
    if (val && templates[val]) {
      setReplyMessage(templates[val]);
    } else {
      setReplyMessage("");
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !replySubject.trim()) return;
    setIsSending(true);
    setReplyError("");
    setReplySuccess(false);

    try {
      const res = await fetch('/api/admin/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: inquiry.id,
          recipientEmail: inquiry.email,
          subject: replySubject,
          message: replyMessage,
          adminId: '00000000-0000-0000-0000-000000000000',
          adminEmail: 'admin@medileohealthcare.com'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Failed to send email.');

      setReplySuccess(true);
      setReplyMessage("");
      
      const newReply = {
        id: Date.now().toString(),
        inquiry_id: inquiry.id,
        recipient_email: inquiry.email,
        subject: replySubject,
        message: replyMessage,
        sent_at: new Date().toISOString(),
        delivery_status: 'sent',
        sent_by_email: 'admin@medileohealthcare.com'
      };
      setReplies([...replies, newReply]);
      
      if (currentStatus === "New") {
        await onStatusUpdate(inquiry.id, "Contacted");
        setCurrentStatus("Contacted");
      }
      
      setTimeout(() => {
        setActiveTab("conversation");
        setReplySuccess(false);
      }, 1500);

    } catch (err) {
      setReplyError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setIsAddingNote(true);
    try {
      const res = await fetch('/api/admin/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: inquiry.id,
          note: newNote,
          adminId: '00000000-0000-0000-0000-000000000000',
          adminEmail: 'admin@medileohealthcare.com'
        })
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || 'Failed to add note');
      
      setNotes([resData.data, ...notes]);
      setNewNote("");
    } catch (err) {
      console.error(err);
      alert("Failed to add note: " + err.message);
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleEditNote = async (noteId) => {
    if (!editingNoteContent.trim()) return;
    try {
      const res = await fetch('/api/admin/notes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteId,
          newNote: editingNoteContent
        })
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || 'Failed to update note');
      
      setNotes(notes.map(n => n.id === noteId ? resData.data : n));
      setEditingNoteId(null);
      setEditingNoteContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to update note: " + err.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await fetch('/api/admin/notes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId })
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || 'Failed to delete note');
      
      setNotes(notes.filter(n => n.id !== noteId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete note: " + err.message);
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
        ></motion.div>

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Inquiry Details</h3>
              <p className="text-sm text-slate-500 mt-0.5">{inquiry.full_name}</p>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex px-6 border-b border-slate-200 bg-white overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button 
              onClick={() => setActiveTab("details")}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details' ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("conversation")}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'conversation' ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              History
              {replies.length > 0 && <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-xs text-slate-600">{replies.length}</span>}
            </button>
            <button 
              onClick={() => setActiveTab("notes")}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'notes' ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              Notes
              {notes.length > 0 && <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-xs text-slate-600">{notes.length}</span>}
            </button>
            <button 
              onClick={() => setActiveTab("reply")}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'reply' ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              Reply
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* --- TAB: DETAILS --- */}
            {activeTab === "details" && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Current Status</label>
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
                  
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Assignee</label>
                    <select
                      value={currentAssignee}
                      onChange={handleAssignChange}
                      disabled={isUpdating}
                      className="w-full md:max-w-xs px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Unassigned</option>
                      {adminUsers.map(user => (
                        <option key={user.id} value={user.id}>{user.full_name || user.email}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">Contact Information</label>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
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
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Date Submitted</p>
                      <p className="font-medium text-slate-900">
                        {new Date(inquiry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">Initial Inquiry</label>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Subject</p>
                    <p className="font-medium text-slate-900">{inquiry.subject}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{inquiry.message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB: CONVERSATION --- */}
            {activeTab === "conversation" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-slate-800">{inquiry.full_name}</span>
                    <span className="text-xs text-slate-500">{new Date(inquiry.created_at).toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-100 text-slate-800 p-4 rounded-2xl rounded-tl-none text-sm max-w-[90%] border border-slate-200">
                    <p className="font-medium mb-1 border-b border-slate-200 pb-1">{inquiry.subject}</p>
                    <p className="whitespace-pre-wrap mt-2">{inquiry.message}</p>
                  </div>
                </div>

                {isLoadingReplies ? (
                  <div className="flex justify-center p-4"><div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>
                ) : (
                  replies.map(reply => (
                    <div key={reply.id} className="flex flex-col items-end gap-1 mt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-slate-500">{new Date(reply.sent_at).toLocaleString()}</span>
                        <span className="font-semibold text-sm text-teal-700" title={reply.sent_by_email}>Medileo Admin</span>
                      </div>
                      <div className="bg-teal-50 text-teal-900 p-4 rounded-2xl rounded-tr-none text-sm max-w-[90%] border border-teal-100 shadow-sm relative">
                        <p className="font-medium mb-1 border-b border-teal-200/50 pb-1">{reply.subject}</p>
                        <p className="whitespace-pre-wrap mt-2">{reply.message}</p>
                        
                        {/* Delivery Status Indicator */}
                        {reply.delivery_status && (
                          <div className="absolute -bottom-5 right-0 flex items-center gap-1 mt-1">
                            {reply.delivery_status === 'sent' && <span className="text-[10px] text-teal-600 flex items-center gap-0.5"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Sent</span>}
                            {reply.delivery_status === 'failed' && <span className="text-[10px] text-red-500 flex items-center gap-0.5" title={reply.error_message}><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Failed</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                
                {replies.length === 0 && !isLoadingReplies && (
                  <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 mt-6">
                    <p className="text-sm text-slate-500">No replies sent yet.</p>
                    <button onClick={() => setActiveTab('reply')} className="mt-3 text-sm text-teal-600 font-medium hover:underline">
                      Send the first reply
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* --- TAB: NOTES --- */}
            {activeTab === "notes" && (
              <div className="space-y-6 animate-fade-in flex flex-col h-full">
                
                {/* Note Input */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
                   <textarea 
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-3 py-2 text-sm text-slate-800 transition-colors resize-y outline-none"
                    placeholder="Type an internal note here (only visible to team)..."
                  ></textarea>
                  <div className="flex justify-between items-center mt-3">
                     <span className="text-xs text-slate-500 flex items-center gap-1"><svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> Internal Use Only</span>
                     <button
                        onClick={handleAddNote}
                        disabled={isAddingNote || !newNote.trim()}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all ${isAddingNote || !newNote.trim() ? 'bg-amber-300 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 shadow-sm'}`}
                     >
                       {isAddingNote ? "Saving..." : "Add Note"}
                     </button>
                  </div>
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto space-y-4">
                  {isLoadingNotes ? (
                     <div className="flex justify-center p-4"><div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>
                  ) : notes.length > 0 ? (
                    notes.map(note => (
                      <div key={note.id} className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 group">
                        <div className="flex justify-between items-start mb-2">
                           <span className="font-semibold text-xs text-amber-800">{note.admin_email}</span>
                           <div className="flex items-center gap-2">
                             <span className="text-xs text-amber-600/70">{new Date(note.created_at).toLocaleString()}</span>
                             <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                               <button 
                                 onClick={() => { setEditingNoteId(note.id); setEditingNoteContent(note.note); }}
                                 className="text-amber-600 hover:text-amber-800 p-1"
                                 title="Edit"
                               >
                                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                               </button>
                               <button 
                                 onClick={() => handleDeleteNote(note.id)}
                                 className="text-red-500 hover:text-red-700 p-1"
                                 title="Delete"
                               >
                                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                               </button>
                             </div>
                           </div>
                        </div>
                        {editingNoteId === note.id ? (
                          <div className="mt-2">
                            <textarea 
                              value={editingNoteContent}
                              onChange={e => setEditingNoteContent(e.target.value)}
                              rows={3}
                              className="w-full bg-white border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-3 py-2 text-sm text-slate-800 transition-colors resize-y outline-none"
                            ></textarea>
                            <div className="flex justify-end gap-2 mt-2">
                              <button onClick={() => setEditingNoteId(null)} className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                              <button onClick={() => handleEditNote(note.id)} className="px-3 py-1.5 text-xs font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg">Save</button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-700 whitespace-pre-wrap">{note.note}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-8 bg-transparent">
                      <p className="text-sm text-slate-400">No internal notes for this inquiry yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- TAB: REPLY --- */}
            {activeTab === "reply" && (
              <div className="space-y-5 animate-fade-in">
                
                {replySuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    Reply sent successfully!
                  </div>
                )}
                {replyError && (
                  <div className="p-3 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-200 flex items-center gap-2">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {replyError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">To</label>
                  <input type="text" disabled value={inquiry.email} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed" />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Subject</label>
                  <input 
                    type="text" 
                    value={replySubject} 
                    onChange={e => setReplySubject(e.target.value)} 
                    className="w-full bg-white border border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg px-3 py-2 text-sm text-slate-800 transition-colors outline-none" 
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-slate-600 uppercase">Message</label>
                    <select 
                      value={selectedTemplate} 
                      onChange={handleTemplateChange}
                      className="text-xs border border-slate-200 text-slate-700 bg-slate-50 rounded px-2 py-1.5 focus:outline-none focus:border-teal-500"
                    >
                      <option value="">-- Quick Templates --</option>
                      {Object.keys(templates).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </div>
                  <textarea 
                    value={replyMessage}
                    onChange={e => setReplyMessage(e.target.value)}
                    rows={12}
                    className="w-full bg-white border border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg px-3 py-3 text-sm text-slate-800 transition-colors resize-y outline-none"
                    placeholder="Type your response here..."
                  ></textarea>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Medileo corporate email signature will be appended automatically.
                  </p>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    onClick={handleSendReply}
                    disabled={isSending || !replyMessage.trim() || !replySubject.trim()}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all shadow-sm ${
                      isSending || !replyMessage.trim() || !replySubject.trim() 
                      ? 'bg-teal-400 cursor-not-allowed' 
                      : 'bg-teal-600 hover:bg-teal-700 hover:shadow'
                    }`}
                  >
                    {isSending ? (
                      <><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> Sending...</>
                    ) : (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg> Send Reply</>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
