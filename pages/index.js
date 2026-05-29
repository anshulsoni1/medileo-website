import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

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

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

function StatItem({ value, suffix = "", label, delay = 0, type = "number" }) {
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
      const easedProgress = easeOutQuart(progress);
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
      className="text-center px-2 md:px-6 py-2 md:py-3 flex flex-col justify-center items-center group cursor-default"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {type === "number" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.5rem] md:text-5xl font-extrabold text-[#00152b] mb-2 font-serif tracking-tighter drop-shadow-sm group-hover:text-[#0f766e] transition-colors duration-500"
        >
          {displayValue}{suffix}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.5rem] md:text-5xl font-extrabold text-[#00152b] mb-2 font-serif tracking-tighter drop-shadow-sm group-hover:text-[#0f766e] transition-colors duration-500"
        >
          {value}{suffix}
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, filter: "blur(3px)" }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(3px)" }}
        transition={{ duration: 1.0, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-[0.65rem] md:text-[0.7rem] font-bold text-slate-500/90 uppercase tracking-[0.2em] group-hover:text-[#0f766e] transition-colors duration-500"
      >
        {label}
      </motion.div>
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
    <section ref={ref} className="pt-6 md:pt-10 pb-20 md:pb-24 bg-gradient-to-b from-[#f1f5f9] via-white to-slate-50 relative">
      {/* Subtle top edge transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f1f5f9] to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-[3.25rem] font-extrabold text-[#00152b] mb-5 md:mb-6 tracking-tighter font-serif leading-tight"
          >
            Core Specialties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
                initial: { opacity: 0, y: 20, scale: 0.98 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 1.0, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }
                }),
                hover: {
                  y: -4,
                  boxShadow: "0 30px 60px -15px rgba(15,118,110,0.12), 0 15px 25px -5px rgba(15,118,110,0.08)",
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              initial="initial"
              animate={isInView ? "visible" : "initial"}
              whileHover="hover"
              className="bg-white p-8 lg:p-10 rounded-[1.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 relative group cursor-pointer overflow-hidden flex flex-col h-full"
            >
              {/* Subtle top accent border line that glows on hover */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#14b8a6] to-[#0d9488] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" 
              />
              
              <motion.div
                variants={{ hover: { scale: 1.05, y: -2 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 md:mb-8 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/60 shadow-[0_8px_15px_-3px_rgba(0,0,0,0.04)] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl group-hover:from-teal-50/80 group-hover:to-teal-100/30 group-hover:border-teal-200/60 group-hover:shadow-[0_12px_25px_-5px_rgba(20,184,166,0.15)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Subtle internal glare */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent opacity-50 pointer-events-none"></div>
                {area.icon}
              </motion.div>
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
      <Head>
        <title>Medileo Healthcare | Pioneering Pharmaceutical Excellence</title>
        <meta name="description" content="Medileo Healthcare is a leader in therapeutic formulations." />
      </Head>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="relative z-20 -mt-20 md:-mt-32 max-w-7xl mx-auto px-4 sm:px-6 mb-4 md:mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-b from-white/95 to-slate-50/95 backdrop-blur-3xl rounded-[1.5rem] md:rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(20,184,166,0.1),_0_0_20px_0_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(15,118,110,0.15)] transition-shadow duration-700 ease-out p-8 md:py-10 md:px-12 border border-slate-100/80 relative overflow-hidden group/stats"
        >
          {/* Subtle gradient accent line at the top to blend with hero */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent opacity-80"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 gap-x-4 md:divide-x divide-slate-200/40 relative z-10">
            {[
              { value: "50", suffix: "+", label: "Product Lines", delay: 0 },
              { value: "WHO-GMP", label: "Certified", delay: 0.1, type: "text" },
              { value: "Strict", label: "Quality Standards", delay: 0.2, type: "text" },
              { value: "Pan-India", label: "Presence", delay: 0.3, type: "text" },
            ].map((stat, idx) => (
              <StatItem key={idx} {...stat} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Focus Areas Section */}
      <FocusAreas />

      <Footer />
    </>
  );
}
