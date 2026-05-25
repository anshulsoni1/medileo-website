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

export default function Home() {
  return (
    <>
      <Head>
        <title>Medileo Healthcare | Pioneering Pharmaceutical Excellence</title>
        <meta name="description" content="Medileo Healthcare is a leader in therapeutic formulations." />
      </Head>
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-24 pb-48 md:pt-32 md:pb-56 relative">
        <div className="curved-line"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.h1
              custom={0}
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white drop-shadow-sm"
            >
              Pioneering Pharmaceutical{" "}
              <span className="text-[#2ec4b6]">Excellence</span>
            </motion.h1>
            <motion.p
              custom={1}
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-50 mb-10 leading-relaxed font-light max-w-2xl mx-auto md:mx-0"
            >
              Delivering world-class therapeutic formulations to global markets with
              uncompromising quality, relentless innovation, and absolute
              integrity.
            </motion.p>
            <motion.div
              custom={2}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href="/products"
                className="bg-[#14b8a6] hover:bg-[#0f766e] text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-lg shadow-teal-500/20"
              >
                Explore Product Portfolio
              </a>
              <a
                href="/contact"
                className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-bold transition-all backdrop-blur-sm"
              >
                Global Partnerships
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="hero-wave"></div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-24 max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-100">
            {[
              { value: "50+", label: "Product Lines" },
              { value: "WHO", label: "GMP Certified" },
              { value: "100%", label: "QA Compliance" },
              { value: "Pan", label: "India Presence" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className="text-3xl md:text-4xl font-black text-[#00152b] mb-2 font-serif">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div custom={0} variants={fadeInUp} className="flex justify-center items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#14b8a6]"></span>
              <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-sm">
                Therapeutic Focus
              </span>
              <span className="h-px w-8 bg-[#14b8a6]"></span>
            </motion.div>
            <motion.h2 custom={1} variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0b192c] mb-6">
              Core Specialties
            </motion.h2>
            <motion.p custom={2} variants={fadeInUp} className="text-slate-600 leading-relaxed text-lg">
              Our advanced R&D pipeline targets high-growth therapeutic segments,
              engineering solutions that significantly improve patient outcomes
              worldwide.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "❤️",
                title: "Cardiovascular",
                desc: "Advanced lipid regulators and anti-hypertensives.",
              },
              {
                emoji: "🧠",
                title: "Neurology",
                desc: "Neuroprotectives and cognitive enhancement formulas.",
              },
              {
                emoji: "🦴",
                title: "Orthopedics",
                desc: "Next-gen NSAIDs and joint reconstructive therapies.",
              },
              {
                emoji: "🦠",
                title: "Anti-Infectives",
                desc: "Broad-spectrum and targeted antimicrobial agents.",
              },
            ].map((area, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="text-4xl mb-4 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-lg group-hover:bg-[#E0F2F1] transition-colors">
                  {area.emoji}
                </div>
                <h3 className="text-xl font-bold text-[#00152b] mb-3 font-serif">
                  {area.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-light">
                  {area.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
