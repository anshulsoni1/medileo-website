import React, { useState } from "react";
import Head from "next/head";
import SEO from "@/components/SEO";
import { getContactSchema } from "@/utils/schema";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { supabase } from "@/utils/supabaseClient";
import { sendGAEvent } from '@next/third-parties/google';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const formData = new FormData(e.target);
    const data = {
      full_name: formData.get("fullName"),
      email: formData.get("emailAddress"),
      phone: formData.get("phoneNumber"),
      company: formData.get("companyName"),
      subject: formData.get("department"),
      message: formData.get("message"),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;

    if (!emailRegex.test(data.email)) {
      setSubmitError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!phoneRegex.test(data.phone)) {
      setSubmitError("Please enter a valid phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([data]);

      if (error) throw error;

      setIsSuccess(true);
      sendGAEvent({ event: 'generate_lead', form_name: 'corporate_inquiry' });
      e.target.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Medileo Healthcare | Pharmaceutical Manufacturing Partnerships"
        description="Partner with Medileo Healthcare for WHO-GMP certified pharmaceutical contract manufacturing, product inquiries, and global corporate collaborations."
        canonicalUrl="https://www.medileo.com/contact"
        structuredData={getContactSchema()}
      />

      {/* Premium Corporate Hero */}
      <section className="bg-[#021120] pt-32 pb-32 md:pt-40 md:pb-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#0f766e]/40 via-[#021120]/50 to-[#021120] pointer-events-none"></div>
        {/* Rotating Molecular Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] border-[0.5px] border-white/5 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/50"></div>
          <div className="absolute bottom-1/4 right-0 w-3 h-3 rounded-full bg-teal-500/10 border border-teal-500/30"></div>
          <div className="absolute top-1/4 left-0 w-2 h-2 rounded-full bg-teal-500/30"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.05] text-white bg-technical-dots pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#14b8a6]/60"></span>
              <span className="text-[#14b8a6] font-bold tracking-[0.25em] uppercase text-xs md:text-sm">
                Corporate Communications
              </span>
              <span className="h-px w-12 bg-[#14b8a6]/60"></span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-extrabold text-white mb-6 font-serif tracking-tight leading-[1.15] drop-shadow-lg">
              Global Pharmaceutical Partnerships
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              For business inquiries, healthcare partnerships, product information, and distribution collaborations, connect with the Medileo Healthcare team.
            </p>
          </motion.div>
        </div>
        {/* Soft SVG Wave Divider to anchor the overlapping form */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 relative">
        <div className="absolute inset-0 opacity-[0.02] text-[#0f766e] bg-science-grid pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-12 lg:gap-20 relative z-10">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#00152b] font-serif tracking-tight mb-4">Direct Access</h2>
              <p className="text-slate-600 font-light text-lg">Reach out to our corporate headquarters or connect via our dedicated global email channels.</p>
            </div>
            <div className="space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.12)] hover:border-teal-500/30 transition-all duration-500 ease-premium relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <div className="mb-5 w-14 h-14 rounded-xl bg-teal-50 border border-teal-100/50 text-[#0f766e] flex items-center justify-center text-3xl group-hover:scale-105 group-hover:bg-teal-100/50 transition-all duration-500">
                🏢
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-serif text-[#00152b] tracking-tight mb-3">
                Business Contact
              </h3>
              <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base">
               Medileo Healthcare Pvt. Ltd.<br />
Build TR(A), 2nd Floor, Mhada Colony,<br />
Mumbai, Maharashtra,<br />
India — 400075
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-[#021120] p-6 md:p-8 rounded-2xl border border-white/5 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.15)] hover:border-teal-500/30 transition-all duration-500 ease-premium relative group overflow-hidden text-white"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <div className="mb-5 w-14 h-14 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center text-3xl group-hover:scale-105 group-hover:bg-white/10 transition-all duration-500">
                ✉️
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-serif tracking-tight mb-3">
                Email Address
              </h3>
              <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base mb-2">Primary Contact:</p>
              <a
                href="mailto:medileohealthcare@gmail.com"
                className="text-[#14b8a6] font-bold hover:underline"
              >
                medileohealthcare@gmail.com
              </a>
            </motion.div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3 lg:-mt-24 relative z-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-10 md:p-14 lg:p-16 rounded-3xl border border-slate-200/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#14b8a6] via-[#0f766e] to-[#14b8a6]"></div>
              
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-[#00152b] mb-3 font-serif tracking-tight">
                  Send an Inquiry
                </h2>
                <p className="text-slate-500 font-light text-lg">Please fill out the form below. Our corporate team typically responds within 24 hours.</p>
              </div>

              <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-teal-50/50 border border-teal-200/50 rounded-3xl p-10 text-center space-y-5"
                >
                  <div className="w-20 h-20 bg-teal-500 rounded-full text-white flex items-center justify-center mx-auto mb-6 shadow-[0_10px_20px_-5px_rgba(20,184,166,0.4)]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-3xl font-extrabold font-serif text-[#00152b] tracking-tight">Inquiry Submitted</h3>
                  <p className="text-slate-600 font-light text-lg leading-relaxed max-w-md mx-auto">
                    Thank you for reaching out to Medileo Healthcare. Your inquiry has been securely submitted, and our corporate team will contact you shortly.
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-teal-600 font-bold hover:text-teal-700 text-sm tracking-widest uppercase transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8" 
                  onSubmit={handleSubmit}
                >
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl text-sm flex items-start gap-3">
                      <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="font-medium">{submitError}</span>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label htmlFor="fullName" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      aria-required="true"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all font-light text-slate-700"
                      placeholder="e.g. Dr. Jane Doe"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="emailAddress" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      required
                      aria-required="true"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all font-light text-slate-700"
                      placeholder="jane.doe@hospital.org"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label htmlFor="phoneNumber" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      aria-required="true"
                      onBlur={(e) => { e.target.value = e.target.value.trim(); }}
                      onInvalid={(e) => e.target.setCustomValidity('A valid phone number is required.')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all font-light text-slate-700"
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="companyName" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                      Company <span className="text-slate-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all font-light text-slate-700"
                      placeholder="e.g. Healthcare Inc."
                    />
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="department" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                    Subject / Department <span className="text-red-400">*</span>
                  </label>
                  <select id="department" name="department" required aria-required="true" className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all font-light text-slate-700 appearance-none">
                    <option>General Inquiry</option>
                    <option>Pharmacovigilance (Adverse Events)</option>
                    <option>Global Business Development</option>
                    <option>Medical Affairs</option>
                  </select>
                  <div className="absolute right-5 top-[3.25rem] pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    aria-required="true"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all font-light text-slate-700 resize-none"
                    placeholder="Provide detailed context for your inquiry..."
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-3 ${isSubmitting ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600 shadow-[0_10px_20px_-5px_rgba(20,184,166,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(20,184,166,0.4)] hover:-translate-y-1'} text-white font-bold py-4 rounded-full tracking-widest uppercase text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Send Corporate Inquiry
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-6 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span className="text-xs tracking-wide">Your information is securely encrypted and kept strictly confidential.</span>
                  </div>
                </div>
                </motion.form>
              )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Trust Strip */}
      <section className="bg-slate-50 py-12 md:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#14b8a6] rounded-full"></div>
              </div>
              <span className="text-slate-600 font-semibold">WHO-GMP Partnerships</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-300"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#14b8a6] rounded-full"></div>
              </div>
              <span className="text-slate-600 font-semibold">Ethical Healthcare Commitment</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-300"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#14b8a6] rounded-full"></div>
              </div>
              <span className="text-slate-600 font-semibold">Trusted Pharmaceutical Solutions</span>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="contact" />
    </>
  );
}
