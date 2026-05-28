import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function Contact() {
  return (
    <>
      <Head>
        <title>Corporate Communications | Medileo Healthcare</title>
        <meta name="description" content="Contact Medileo Healthcare for medical inquiries and partnerships." />
      </Head>

      <div className="bg-[#00152b] py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 font-serif">
              Contact <span className="text-[#14b8a6]">Medileo</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              For business inquiries, healthcare partnerships, product information, and distribution collaborations, connect with the Medileo Healthcare team.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-12">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-xl">
                🏢
              </div>
              <h3 className="text-xl font-bold text-[#00152b] mb-4 font-serif">
                Business Contact
              </h3>
              <p className="text-slate-600 font-light leading-relaxed mb-6">
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
              className="bg-[#0b192c] p-8 rounded-2xl text-white"
            >
              <div className="w-12 h-12 bg-[#1a2b3c] rounded-full flex items-center justify-center mb-6 text-xl">
                ✉️
              </div>
              <h3 className="text-xl font-bold mb-4 font-serif">
                Email Address
              </h3>
              <p className="text-slate-300 font-light mb-2">Primary Contact:</p>
              <a
                href="mailto:medileohealthcare@gmail.com"
                className="text-[#14b8a6] font-bold hover:underline"
              >
                medileohealthcare@gmail.com
              </a>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50"
            >
              <h2 className="text-2xl font-bold text-[#0b192c] mb-8 font-serif border-b border-slate-100 pb-4">
                Send an Inquiry
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all"
                      placeholder="Dr. Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all"
                      placeholder="jane.doe@hospital.org"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Subject / Department
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#14b8a6] text-slate-700">
                    <option>General Inquiry</option>
                    <option>Pharmacovigilance (Adverse Events)</option>
                    <option>Global Business Development</option>
                    <option>Medical Affairs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all"
                    placeholder="Provide detailed context for your inquiry..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full bg-[#0b192c] hover:bg-[#1a2b3c] text-white font-bold py-4 rounded-lg tracking-widest uppercase text-sm transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Trust Strip */}
      <section className="bg-slate-50 py-12 border-t border-slate-200">
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
