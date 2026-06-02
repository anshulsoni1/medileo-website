import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import SEO from "@/components/SEO";
import { getIndexSchema } from "@/utils/schema";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import { sendGAEvent } from '@next/third-parties/google';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

function StatCard({ value, suffix = "", label, delay = 0, type = "number" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(type === "number" ? "0" : value);

  useEffect(() => {
    if (!isInView || type !== "number") return;
    
    let startTime;
    const targetValue = parseInt(value, 10);
    const duration = 2000; // 2 seconds

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easedProgress * targetValue);
      
      setDisplayValue(current.toString());
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(targetValue.toString());
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value, type]);

  return (
    <motion.div 
      ref={ref} 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } }
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -6, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.12)] hover:border-teal-500/30 border border-slate-200/60 flex flex-col justify-between items-start relative overflow-hidden group cursor-default min-h-[160px] md:min-h-[180px] transition-all duration-500 ease-premium"
    >
      {/* Decorative enterprise accent (Top border) */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#14b8a6] to-[#0f766e] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
      
      {/* Background Icon Watermark */}
      <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
        <svg className="w-32 h-32 text-[#0f766e] transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
           {/* Molecular bond structure */}
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v4m0 0l-4-2m4 2l4-2M8 6v4m8-4v4m0 0l4 2m-4-2l-4 2m-4-2l-4 2m4-2v4m8-4v4m-8 4l4-2m0 0l4 2m-4-2v-4" />
           <circle cx="12" cy="4" r="1.5" fill="currentColor"/>
           <circle cx="8" cy="6" r="1.5" fill="currentColor"/>
           <circle cx="16" cy="6" r="1.5" fill="currentColor"/>
           <circle cx="4" cy="8" r="1.5" fill="currentColor"/>
           <circle cx="20" cy="8" r="1.5" fill="currentColor"/>
           <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
           <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
           <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
           <circle cx="12" cy="20" r="1.5" fill="currentColor"/>
        </svg>
      </div>

      <div className="relative z-10 w-full flex flex-col h-full justify-center">
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)", x: -10 }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)", x: 0 } : { opacity: 0, filter: "blur(4px)", x: -10 }}
          transition={{ duration: 1.0, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`font-serif font-extrabold tracking-tighter mb-2 md:mb-3 drop-shadow-sm group-hover:text-[#0f766e] transition-colors duration-500 ${
            type === "text" && value.length >= 7 ? "text-[1.75rem] md:text-4xl leading-tight" : "text-5xl md:text-[3.5rem] leading-none"
          } text-[#00152b]`}
        >
          {type === "number" ? displayValue : value}{suffix}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, filter: "blur(3px)" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(3px)" }}
          transition={{ duration: 1.0, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-[0.15em] group-hover:text-[#14b8a6] transition-colors duration-500"
        >
          {label}
        </motion.div>
      </div>
    </motion.div>
  );
}

function FocusAreas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const areas = [
    {
      icon: (
        <svg className="w-7 h-7 text-[#0f766e] group-hover:scale-110 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      title: "Cardiovascular",
      desc: "Advanced therapeutic solutions supporting cardiovascular and hypertension management.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#0f766e] group-hover:scale-110 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5h7.5M8.25 13.5h7.5M12 3a9 9 0 100 18 9 9 0 000-18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
        </svg>
      ),
      title: "Neurology",
      desc: "Precision formulations designed for neurological wellness and cognitive care.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#0f766e] group-hover:scale-110 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-4.142 0-7.5-3.358-7.5-7.5 0-2.22 1.343-4.992 4.01-8.541C9.697 4.148 10.82 2.656 12 2.25c1.18.406 2.303 1.898 3.49 3.459 2.667 3.549 4.01 6.32 4.01 8.541 0 4.142-3.358 7.5-7.5 7.5z" />
        </svg>
      ),
      title: "Diabetology",
      desc: "Therapeutic solutions focused on glycemic control and metabolic health support.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#0f766e] group-hover:scale-110 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      title: "Anti-Infectives",
      desc: "Broad-spectrum pharmaceutical solutions supporting infection management.",
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-slate-50 relative">
      {/* Smooth top edge transition from white */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center gap-5 mb-6 md:mb-8"
          >
            <span className="h-px w-12 bg-[#14b8a6]/40"></span>
            <span className="text-[#14b8a6] font-semibold tracking-[0.3em] uppercase text-[0.65rem] md:text-xs">
              Therapeutic Focus
            </span>
            <span className="h-px w-12 bg-[#14b8a6]/40"></span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-[3.25rem] font-extrabold text-[#00152b] mb-5 md:mb-6 tracking-tighter font-serif leading-tight"
          >
            Core Specialties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-600 leading-relaxed text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Delivering highly effective formulations. Each molecule undergoes rigorous multi-stage checks before reaching pharmacy shelves, focusing heavily on consistent quality and therapeutic excellence.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {areas.map((area, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={{
                initial: { opacity: 0, y: 30 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
                })
              }}
              initial="initial"
              animate={isInView ? "visible" : "initial"}
              className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.12)] hover:border-teal-500/30 transition-all duration-500 ease-premium relative group cursor-pointer overflow-hidden flex flex-col h-full"
            >
              {/* Subtle top accent border line that expands on hover */}
              <div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" 
              />
              
              <div
                className="mb-5 w-14 h-14 rounded-xl bg-teal-50 border border-teal-100/50 text-[#0f766e] flex items-center justify-center group-hover:bg-teal-100/50 group-hover:scale-105 transition-all duration-500"
              >
                {area.icon}
              </div>
              <h3 className="text-xl md:text-[1.35rem] font-bold text-[#00152b] mb-3 md:mb-4 font-serif tracking-tight leading-snug group-hover:text-[#0f766e] transition-colors duration-300">
                {area.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-[0.95rem] md:text-base font-light">
                {area.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEO 
        title="Medileo Healthcare | Trusted Pharmaceutical Solutions"
        description="Medileo Healthcare Pvt. Ltd. delivers WHO-GMP certified pharmaceutical formulations globally. Discover our Cardiology, Neuro-Psychiatry, and Diabetology portfolio."
        canonicalUrl="https://www.medileohealthcare.com/"
        structuredData={getOrganizationSchema()}
      />
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 md:-mt-28 max-w-7xl mx-auto px-4 sm:px-6 mb-16 md:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {[
            { value: "50", suffix: "+", label: "Product Lines", delay: 0 },
            { value: "WHO-GMP", label: "Certified", delay: 0.1, type: "text" },
            { value: "Strict", label: "Quality Standards", delay: 0.2, type: "text" },
            { value: "Pan-India", label: "Presence", delay: 0.3, type: "text" },
          ].map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </section>

      {/* Focus Areas Section */}
      <FocusAreas />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final Push CTA */}
      <section className="bg-[#021120] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] text-white bg-science-grid"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#0f766e]/30 via-transparent to-[#021120] pointer-events-none"></div>
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-serif mb-6 tracking-tight leading-tight">
            Global Pharmaceutical Excellence
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Connect with our corporate team to explore strategic partnerships, product distribution, and collaborative healthcare solutions.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              onClick={() => sendGAEvent({ event: 'cta_click', button_name: 'footer_initiate_partnership' })}
              className="inline-flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-600 text-white px-10 py-5 rounded-full font-bold transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(20,184,166,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(20,184,166,0.4)] hover:-translate-y-1 tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#021120]"
            >
              Initiate a Partnership
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
