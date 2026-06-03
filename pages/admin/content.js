import React, { useState, useEffect } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import { TextInput, TextArea, ToggleSwitch } from "@/components/admin/FormElements";
import { createClient } from "@/utils/supabaseBrowser";

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState("faq");
  
  // Data States
  const [faqs, setFaqs] = useState([]);
  const [settings, setSettings] = useState({
    hero_content: { heading: "", subheading: "", ctaText: "", ctaLink: "" },
    contact_info: { email: "", phone: "", address: "", businessHours: "" },
    footer_content: { description: "", complianceItems: "" }
  });

  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  
  // FAQ Form State
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", sort_order: 0, is_active: true });

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      // Fetch FAQs
      const { data: faqData } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
      setFaqs(faqData || []);

      // Fetch Settings
      const { data: settingsData } = await supabase.from("site_settings").select("*");
      if (settingsData) {
        const newSettings = { ...settings };
        settingsData.forEach(row => {
          if (newSettings[row.key] !== undefined) {
            newSettings[row.key] = row.data;
          }
        });
        setSettings(newSettings);
      }
    } catch (err) {
      console.error(err);
      showNotification("Failed to load content data.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  function showNotification(msg, type = "success") {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  }

  // --- SETTINGS MUTATIONS ---
  const handleSettingsChange = (key, field, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  const saveSettings = async (key) => {
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({ data: settings[key], updated_at: new Date().toISOString() })
        .eq("key", key);

      if (error) throw error;
      
      // Log audit
      try {
        await fetch('/api/admin/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'EDIT_CONTENT',
            entityType: 'SITE_SETTINGS',
            entityId: key,
            newValue: settings[key]
          })
        });
      } catch(err) { console.error("Audit log failed", err); }

      showNotification(`${key.replace('_', ' ')} updated successfully!`);
    } catch (err) {
      console.error(err);
      showNotification("Failed to save settings.", "error");
    }
  };

  // --- FAQ MUTATIONS ---
  const openFaqModal = (faq = null) => {
    if (faq) {
      setEditingFaq(faq);
      setFaqForm({ question: faq.question, answer: faq.answer, sort_order: faq.sort_order, is_active: faq.is_active });
    } else {
      setEditingFaq(null);
      setFaqForm({ question: "", answer: "", sort_order: faqs.length * 10, is_active: true });
    }
    setIsFaqModalOpen(true);
  };

  const saveFaq = async (e) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        const { error } = await supabase.from("faqs").update(faqForm).eq("id", editingFaq.id);
        if (error) throw error;
        
        try {
          await fetch('/api/admin/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'UPDATE_FAQ',
              entityType: 'FAQ',
              entityId: editingFaq.id,
              oldValue: editingFaq,
              newValue: faqForm
            })
          });
        } catch(err) { console.error("Audit log failed", err); }
        
        showNotification("FAQ updated successfully!");
      } else {
        const { data: newFaq, error } = await supabase.from("faqs").insert([faqForm]).select().single();
        if (error) throw error;
        
        try {
          await fetch('/api/admin/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'CREATE_FAQ',
              entityType: 'FAQ',
              entityId: newFaq?.id,
              newValue: faqForm
            })
          });
        } catch(err) { console.error("Audit log failed", err); }
        
        showNotification("FAQ created successfully!");
      }
      setIsFaqModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      showNotification("Failed to save FAQ.", "error");
    }
  };

  const deleteFaq = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (error) throw error;
      
      try {
        await fetch('/api/admin/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'DELETE_FAQ',
            entityType: 'FAQ',
            entityId: id
          })
        });
      } catch(err) { console.error("Audit log failed", err); }

      showNotification("FAQ deleted successfully!");
      fetchData();
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete FAQ.", "error");
    }
  };

  const toggleFaqActive = async (faq, checked) => {
    try {
      const { error } = await supabase.from("faqs").update({ is_active: checked }).eq("id", faq.id);
      if (error) throw error;
      
      try {
        await fetch('/api/admin/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'TOGGLE_FAQ_STATUS',
            entityType: 'FAQ',
            entityId: faq.id,
            oldValue: { is_active: faq.is_active },
            newValue: { is_active: checked }
          })
        });
      } catch(err) { console.error("Audit log failed", err); }

      // Optimistic update
      setFaqs(faqs.map(f => f.id === faq.id ? { ...f, is_active: checked } : f));
      showNotification("FAQ status updated.");
    } catch (err) {
      console.error(err);
      showNotification("Failed to update status.", "error");
    }
  };

  // FAQ Table Columns
  const faqColumns = [
    { key: "sort_order", label: "Order", render: (r) => <span className="text-slate-400 font-mono text-sm">{r.sort_order}</span> },
    { key: "question", label: "Question", render: (r) => <span className="font-medium text-slate-900">{r.question}</span> },
    { 
      key: "is_active", 
      label: "Status", 
      render: (r) => (
        <ToggleSwitch checked={r.is_active} onChange={(c) => toggleFaqActive(r, c)} />
      ) 
    },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <div className="flex items-center gap-3">
          <button onClick={() => openFaqModal(r)} className="text-teal-600 hover:text-teal-800 text-sm font-medium">Edit</button>
          <button onClick={() => deleteFaq(r.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
        </div>
      )
    }
  ];

  const tabs = [
    { id: "faq", label: "FAQ Management" },
    { id: "hero", label: "Homepage Hero" },
    { id: "contact", label: "Contact Info" },
    { id: "footer", label: "Footer Content" },
  ];

  return (
    <AdminLayout>
      <Head>
        <title>Content Management | Medileo Admin</title>
      </Head>

      <div className="flex flex-col space-y-6 pb-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Content Management</h1>
            <p className="text-slate-500 text-sm mt-1">Manage public website content directly from the dashboard.</p>
          </div>
        </div>

        {/* Global Toast Notification */}
        {notification && (
          <div className="fixed top-20 right-6 md:right-10 z-50 animate-fade-in-down">
            <div className={`px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md border ${
              notification.type === 'error' 
                ? 'bg-red-500/90 text-white border-red-600' 
                : 'bg-slate-900/90 text-white border-slate-700'
            }`}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {notification.type === 'error' 
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                }
              </svg>
              <span className="text-sm font-semibold tracking-wide">{notification.msg}</span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id 
                  ? "border-teal-500 text-teal-700 bg-teal-50/50" 
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- TAB CONTENT --- */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="flex flex-col">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Frequently Asked Questions</h3>
                <button 
                  onClick={() => openFaqModal()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  Add FAQ
                </button>
              </div>
              <DataTable 
                columns={faqColumns}
                data={faqs}
                isLoading={isLoading}
                emptyMessage="No FAQs found. Create your first one!"
              />
            </div>
          )}

          {/* Hero Content Tab */}
          {activeTab === "hero" && (
            <div className="p-6 md:p-8 max-w-3xl">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Homepage Hero Section</h3>
              <TextInput 
                label="Main Heading" 
                value={settings.hero_content.heading} 
                onChange={(e) => handleSettingsChange("hero_content", "heading", e.target.value)} 
              />
              <TextArea 
                label="Subheading" 
                value={settings.hero_content.subheading} 
                onChange={(e) => handleSettingsChange("hero_content", "subheading", e.target.value)} 
              />
              <div className="grid grid-cols-2 gap-4">
                <TextInput 
                  label="CTA Button Text" 
                  value={settings.hero_content.ctaText} 
                  onChange={(e) => handleSettingsChange("hero_content", "ctaText", e.target.value)} 
                />
                <TextInput 
                  label="CTA Button Link" 
                  value={settings.hero_content.ctaLink} 
                  onChange={(e) => handleSettingsChange("hero_content", "ctaLink", e.target.value)} 
                />
              </div>
              <button onClick={() => saveSettings("hero_content")} className="mt-4 px-6 py-2.5 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-all shadow-sm">
                Save Changes
              </button>
            </div>
          )}

          {/* Contact Info Tab */}
          {activeTab === "contact" && (
            <div className="p-6 md:p-8 max-w-3xl">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <TextInput 
                  label="Company Email" 
                  type="email"
                  value={settings.contact_info.email} 
                  onChange={(e) => handleSettingsChange("contact_info", "email", e.target.value)} 
                />
                <TextInput 
                  label="Phone Number" 
                  value={settings.contact_info.phone} 
                  onChange={(e) => handleSettingsChange("contact_info", "phone", e.target.value)} 
                />
              </div>
              <TextArea 
                label="Physical Address" 
                rows={2}
                value={settings.contact_info.address} 
                onChange={(e) => handleSettingsChange("contact_info", "address", e.target.value)} 
              />
              <TextInput 
                label="Business Hours" 
                value={settings.contact_info.businessHours} 
                onChange={(e) => handleSettingsChange("contact_info", "businessHours", e.target.value)} 
              />
              <button onClick={() => saveSettings("contact_info")} className="mt-4 px-6 py-2.5 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-all shadow-sm">
                Save Changes
              </button>
            </div>
          )}

          {/* Footer Tab */}
          {activeTab === "footer" && (
            <div className="p-6 md:p-8 max-w-3xl">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Footer Settings</h3>
              <TextArea 
                label="Company Description" 
                value={settings.footer_content.description} 
                onChange={(e) => handleSettingsChange("footer_content", "description", e.target.value)} 
              />
              <TextInput 
                label="Compliance Items (e.g. ISO Certified)" 
                value={settings.footer_content.complianceItems} 
                onChange={(e) => handleSettingsChange("footer_content", "complianceItems", e.target.value)} 
              />
              <button onClick={() => saveSettings("footer_content")} className="mt-4 px-6 py-2.5 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-all shadow-sm">
                Save Changes
              </button>
            </div>
          )}

        </div>
      </div>

      {/* FAQ Modal */}
      <Modal 
        isOpen={isFaqModalOpen} 
        onClose={() => setIsFaqModalOpen(false)} 
        title={editingFaq ? "Edit FAQ" : "Add New FAQ"}
      >
        <form onSubmit={saveFaq} className="flex flex-col h-full">
          <div className="flex-1">
            <TextInput 
              label="Question" 
              required 
              value={faqForm.question} 
              onChange={(e) => setFaqForm({...faqForm, question: e.target.value})} 
            />
            <TextArea 
              label="Answer" 
              required 
              value={faqForm.answer} 
              onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})} 
            />
            <div className="grid grid-cols-2 gap-4">
              <TextInput 
                label="Sort Order" 
                type="number"
                value={faqForm.sort_order} 
                onChange={(e) => setFaqForm({...faqForm, sort_order: parseInt(e.target.value) || 0})} 
              />
            </div>
            <ToggleSwitch 
              label="Active Status (Visible to public)" 
              checked={faqForm.is_active} 
              onChange={(c) => setFaqForm({...faqForm, is_active: c})} 
            />
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={() => setIsFaqModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 rounded-xl transition-all shadow-sm">
              {editingFaq ? "Save Changes" : "Create FAQ"}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
