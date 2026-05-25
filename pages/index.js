import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/Footer";
import TypewriterText from "@/components/TypewriterText";

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
      className="text-center px-2 md:px-6 py-4 flex flex-col justify-center items-center group cursor-default"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {type === "number" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 15 }}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-black text-[#00152b] mb-3 font-serif tracking-tight drop-shadow-sm group-hover:text-[#0f766e] transition-colors duration-300"
        >
          {displayValue}{suffix}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 15 }}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-black text-[#00152b] mb-3 font-serif tracking-tight drop-shadow-sm group-hover:text-[#0f766e] transition-colors duration-300"
        >
          {value}{suffix}
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.7, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-[0.2em] group-hover:text-slate-700 transition-colors duration-300"
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
      title: "Diabetology",
      desc: "Precision-engineered oral formulations for long-term glycaemic control and metabolic stability.",
    },
    {
      emoji: "🦠",
      title: "Anti-Infectives",
      desc: "Broad-spectrum and targeted antimicrobial agents.",
    },
  ];

  return (
    <section ref={ref} className="pt-32 pb-40 bg-gradient-to-b from-[#f1f5f9] via-white to-slate-50 relative">
      {/* Subtle top edge transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f1f5f9] to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center gap-4 mb-6"
          >
            <span className="h-px w-10 bg-[#14b8a6]/40"></span>
            <span className="text-[#14b8a6] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
              Therapeutic Focus
            </span>
            <span className="h-px w-10 bg-[#14b8a6]/40"></span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-black text-[#00152b] mb-8 tracking-tight font-serif"
          >
            Core Specialties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-600 leading-relaxed text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Delivering highly effective molecular formulas to critical hospital departments. Each molecule undergoes rigorous multi-stage laboratory checks before reaching pharmacy shelves, focusing heavily on consistent drug release metrics and superior systemic bioavailability.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={{
                initial: { opacity: 0, y: 30, scale: 0.98 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }
                }),
                hover: {
                  y: -8,
                  boxShadow: "0 25px 35px -5px rgba(20,184,166,0.15), 0 10px 15px -5px rgba(20,184,166,0.1)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }
              }}
              initial="initial"
              animate={isInView ? "visible" : "initial"}
              whileHover="hover"
              className="bg-white p-10 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/20 relative group cursor-pointer overflow-hidden flex flex-col h-full"
            >
              {/* Subtle top accent border line that glows on hover */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
              />
              
              <motion.div
                variants={{ hover: { scale: 1.15, rotate: 5 } }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-4xl mb-6 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-xl group-hover:bg-teal-50/50 transition-colors origin-center shadow-sm"
              >
                {area.emoji}
              </motion.div>
              <h3 className="text-2xl font-bold text-[#00152b] mb-4 font-serif">
                {area.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
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
      <section className="hero-gradient text-white pt-32 pb-56 md:pt-40 md:pb-64 relative overflow-hidden">
        <div className="curved-line opacity-50"></div>

        {/* Atmospheric Right-Side Glow (Visual Balance) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none mix-blend-overlay"></div>

        {/* Animated Background Orbs */}
        <motion.div
          className="absolute pointer-events-none opacity-[0.15] md:opacity-[0.25] mix-blend-screen"
          style={{
            top: "5%",
            left: "-5%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(13,148,136,0.8) 0%, transparent 60%)",
          }}
          animate={{ x: [0, 30, -15, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute pointer-events-none opacity-[0.12] md:opacity-[0.2] mix-blend-screen"
          style={{
            top: "10%",
            right: "-10%",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20,184,166,0.6) 0%, transparent 65%)",
          }}
          animate={{ x: [0, -25, 15, 0], y: [0, 25, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute pointer-events-none opacity-[0.15] md:opacity-[0.25] mix-blend-screen"
          style={{
            bottom: "-10%",
            right: "20%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(19,78,74,0.8) 0%, transparent 60%)",
          }}
          animate={{ x: [0, 20, -25, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1 }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Word-by-word animated headline */}
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter text-white drop-shadow-md">
              {["Pioneering", "Pharmaceutical"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1], // Premium apple-like ease
                  }}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                  {word}
                </motion.span>
              ))}
              <br className="hidden md:block" />
              <TypewriterText 
                text="Excellence" 
                className="text-[#2ec4b6]"
                delay={0.7}
              />
            </h1>

            {/* Body paragraph — fades up after headline */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-lg md:text-xl text-teal-50/90 mb-12 leading-relaxed font-light max-w-2xl mx-auto md:mx-0 drop-shadow-sm"
            >
             Medileo Healthcare Pvt. Ltd. is an innovative, research-driven pharmaceutical corporation dedicated to formulating premium therapeutic drug classes. Our state-of-the-art manufacturing facilities operate strictly under stringent WHO-GMP guidelines, ensuring every batch meets rigorous international quality benchmarks to satisfy clinicians and transform patient outcomes globally.
            </motion.p>

            {/* CTA buttons — fade up last */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
            >
              <div className="relative w-full sm:w-auto">
                <motion.span
                  className="absolute inset-0 rounded-xl hidden md:block pointer-events-none border-2 border-teal-400"
                  style={{ zIndex: -1 }}
                  animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.a
                  href="/products"
                  className="bg-[#14b8a6] hover:bg-[#0f766e] text-white px-10 py-4 rounded-xl font-bold transition-colors shadow-xl shadow-teal-900/40 border border-teal-400/30 block text-center w-full tracking-wide"
                  whileHover={{ scale: 1.02, boxShadow: "0 15px 30px -5px rgba(15,118,110,0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Explore Product Portfolio
                </motion.a>
              </div>
              <motion.a
                href="/contact"
                className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-xl font-bold transition-all backdrop-blur-sm block text-center w-full sm:w-auto tracking-wide hover:border-white/40 hover:bg-white/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Corporate Profile
              </motion.a>
            </motion.div>
          </div>
        </div>
        <div className="hero-wave"></div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-24 md:-mt-32 max-w-7xl mx-auto px-4 sm:px-6 mb-32">
        <div className="bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-300/60 p-10 md:p-14 border border-white relative overflow-hidden group/stats">
          {/* Subtle gradient accent line at the top to blend with hero */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent opacity-60"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 gap-x-4 md:divide-x divide-slate-200/70 relative z-10">
            {[
              { value: "50", suffix: "+", label: "Product Lines", delay: 0 },
              { value: "WHO", label: "GMP Certified", delay: 0.1, type: "text" },
              { value: "100", suffix: "%", label: "QA Compliance", delay: 0.2 },
              { value: "Pan", label: "India Presence", delay: 0.3, type: "text" },
            ].map((stat, idx) => (
              <StatItem key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <FocusAreas />

      <Footer />
    </>
  );
}
