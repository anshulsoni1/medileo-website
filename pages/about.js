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

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const pillars = [
  {
    emoji: "🔬",
    title: "Scientific Rigor",
    desc: "Every brand we bring to market is deeply backed by international clinical research papers, validating both safety parameters and outstanding efficacy profiles. We partner with leading medical institutions to monitor real-world performance.",
  },
  {
    emoji: "🛡️",
    title: "Absolute Integrity",
    desc: "Operating with transparent ethical standards to build everlasting bonds with healthcare practitioners. Our manufacturing compliance protocols exceed standard regulatory requirements, guaranteeing maximum purity from sourcing to dispensing.",
  },
  {
    emoji: "🔮",
    title: "Visionary Pipeline",
    desc: "Predicting global epidemiological shifts, our active R&D centers are perpetually designing complex drug delivery systems and novel formulations to address tomorrow's unmet medical challenges today.",
  },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Medileo Healthcare</title>
        <meta name="description" content="Learn about Medileo Healthcare's mission and patient-centric innovation." />
      </Head>
      
      {/* Mini Hero */}
      <section className="bg-[#00152b] py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#008b83]/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div custom={0} variants={fadeInUp} className="flex justify-center items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#14b8a6]"></span>
              <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-sm">
                Corporate Genesis
              </span>
              <span className="h-px w-8 bg-[#14b8a6]"></span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeInUp} className="text-4xl md:text-5xl font-black text-white font-serif tracking-tight">
              About Medileo
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-16 border border-slate-100 -mt-32 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[#0b192c] mb-6 font-serif">
                Patient-Centric Innovation
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed font-light text-lg">
                <p>
                  At <strong className="font-bold text-[#00152b]">Medileo Healthcare Pvt. Ltd.</strong>, we recognize that
                  behind every prescription is a human life depending on our uncompromising commitment to excellence. We do not just
                  manufacture medicines; we engineer high-precision therapeutic tools that empower physicians to heal.
                </p>
                <p>
                  Our advanced pharmacological portfolio spans critical care, chronic disease management, and specialty therapeutics.
                  By bridging the gap between rigorous clinical science and scalable commercial production, we ensure that premium healthcare
                  is globally accessible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0b192c] font-serif">
              Our Foundational Pillars
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-6">{pillar.emoji}</div>
                <h3 className="text-xl font-bold text-[#00152b] mb-4 font-serif">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-light text-sm">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Landscape */}
      <section className="bg-[#0b192c] text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#14b8a6]"></span>
              <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-sm">
                Future Landscape
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
              Engineering the Next Generation of Healing.
            </h2>
            <p className="text-slate-300 leading-relaxed font-light mb-8">
              We are aggressively expanding our footprint across emerging markets while simultaneously investing heavily in green-chemistry manufacturing processes.
            </p>
            <ul className="space-y-4">
              {[
                "Strategic API Sourcing Integration",
                "Advanced Pharmacovigilance Systems",
                "Global Regulatory Harmonization",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="bg-[#14b8a6]/20 p-1 rounded">
                    <svg className="w-4 h-4 text-[#2ec4b6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#1a2b3c] to-[#0b192c] p-8 md:p-12 rounded-2xl border border-slate-700 shadow-2xl relative">
            <div className="absolute -top-4 -right-4 bg-[#14b8a6] text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
              CONFIDENTIAL R&D
            </div>
            <h3 className="text-xl font-bold font-serif mb-6 text-white border-b border-slate-700 pb-4">
              Medileo R&D Pipeline [Active]
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/5 p-4 rounded border border-white/5">
                <span className="font-mono text-sm text-slate-300">MLO-204 (Cardio)</span>
                <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">Phase III</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded border border-white/5">
                <span className="font-mono text-sm text-slate-300">MLO-881 (Neuro)</span>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Phase II</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded border border-white/5">
                <span className="font-mono text-sm text-slate-300">MLO-902 (Ortho)</span>
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Pre-Clinical</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
