import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

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

const pillars = [
  {
    emoji: "✨",
    title: "Quality & Excellence",
    desc: "We maintain uncompromising quality standards by collaborating with WHO-GMP certified manufacturing partners committed to international pharmaceutical guidelines.",
  },
  {
    emoji: "❤️",
    title: "Patient-Centric Care",
    desc: "Behind every formulation is a commitment to improving patient outcomes through trusted and accessible healthcare solutions.",
  },
  {
    emoji: "🤝",
    title: "Integrity & Transparency",
    desc: "We build long-term relationships with healthcare professionals and partners through ethical practices, honesty, and transparency.",
  },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Medileo Healthcare</title>
        <meta name="description" content="Learn about Medileo Healthcare's mission and patient-centric innovation." />
      </Head>
      
      {/* Premium Corporate Hero */}
      <section className="bg-[#00152b] pt-24 pb-32 md:pt-32 md:pb-48 relative overflow-hidden">
        {/* Subtle Corporate Gradients & Patterns */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#0f766e]/40 via-[#00152b]/50 to-[#00152b] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div custom={0} variants={fadeInUp} className="flex justify-center items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#14b8a6]/60"></span>
              <span className="text-[#14b8a6] font-bold tracking-[0.25em] uppercase text-xs md:text-sm">
                Corporate Overview
              </span>
              <span className="h-px w-12 bg-[#14b8a6]/60"></span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeInUp} className="text-4xl md:text-6xl lg:text-[4rem] font-extrabold text-white font-serif tracking-tight leading-[1.15] max-w-5xl mx-auto drop-shadow-lg">
              Empowering Healthcare Through Trusted Pharmaceutical Solutions
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Elevated Intro Card */}
      <section className="pt-0 pb-20 md:pb-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] p-10 md:p-20 border border-slate-100 -mt-20 md:-mt-32 relative z-20 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#14b8a6] via-[#0f766e] to-[#14b8a6]"></div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="space-y-8 text-slate-600 leading-relaxed font-light text-lg md:text-xl">
                <p>
                  At <strong className="font-bold text-[#00152b]">Medileo Healthcare Pvt. Ltd.</strong>, we are committed to delivering high-quality, affordable, and innovative pharmaceutical solutions across diverse therapeutic segments.
                </p>
                <div className="w-16 h-px bg-slate-200 mx-auto"></div>
                <p>
                  Specializing in strategic pharmaceutical brand management and healthcare marketing, we collaborate with India’s leading WHO-GMP certified manufacturing facilities to provide advanced therapeutic formulations that meet the highest standards of quality, safety, and efficacy.
                </p>
                <p>
                  Our growing portfolio spans Cardiology, Diabetology, Neuro-Psychiatry, Gastroenterology, and Cellular Nutrition, helping healthcare professionals deliver better patient outcomes through trusted therapeutic solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 md:py-32 bg-white relative">
        {/* Smooth blend from previous slate-50 background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-0"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50/80 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-[#14b8a6]"></span>
              <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-xs md:text-sm">Our Principles</span>
              <span className="h-px w-8 bg-[#14b8a6]"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#00152b] font-serif tracking-tight">
              Our Core Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.12)] hover:border-teal-500/30 transition-all duration-500 ease-premium relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <div className="mb-6 w-16 h-16 rounded-xl bg-teal-50 border border-teal-100/50 text-[#0f766e] flex items-center justify-center text-3xl group-hover:scale-105 group-hover:bg-teal-100/50 transition-all duration-500">
                  {pillar.emoji}
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-[#00152b] tracking-tight mb-4">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        {/* Organic curved divider transitioning from white */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff" opacity=".8"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#ffffff" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff"></path>
          </svg>
        </div>
        {/* Enterprise Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-[0.015] select-none">
          <span className="text-[15rem] lg:text-[25rem] font-black font-serif leading-none whitespace-nowrap text-[#00152b]">PURPOSE</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-[#14b8a6]"></span>
              <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-xs md:text-sm">
                Future Trajectory
              </span>
              <span className="h-px w-8 bg-[#14b8a6]"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#00152b] font-serif tracking-tight">
              Vision & Mission
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <div className="bg-white p-10 md:p-14 rounded-3xl border border-slate-200/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-15px_rgba(20,184,166,0.15)] hover:border-teal-500/30 transition-all duration-500 ease-premium relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
              {/* Clinical Corner Marks */}
              <div className="absolute top-6 left-6 text-slate-300 text-[10px] font-mono leading-none tracking-tighter opacity-50">+</div>
              <div className="absolute top-6 right-6 text-slate-300 text-[10px] font-mono leading-none tracking-tighter opacity-50">+</div>
              <div className="absolute bottom-6 left-6 text-slate-300 text-[10px] font-mono leading-none tracking-tighter opacity-50">+</div>
              <div className="absolute bottom-6 right-6 text-slate-300 text-[10px] font-mono leading-none tracking-tighter opacity-50">+</div>
              
              <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none text-9xl">👁️</div>
              
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-[#00152b] tracking-tight mb-6">Our Vision</h3>
              <p className="text-slate-600 font-light leading-relaxed text-lg md:text-xl">
                To emerge as a premier and trusted leader in the pharmaceutical landscape, recognized for scientific innovation, uncompromising quality standards, and an unwavering commitment to bridging the gap between vital care and total cure.
              </p>
            </div>
            {/* Mission Card */}
            <div className="bg-white p-10 md:p-14 rounded-3xl border border-slate-200/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-15px_rgba(20,184,166,0.15)] hover:border-teal-500/30 transition-all duration-500 ease-premium relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
              {/* Clinical Corner Marks */}
              <div className="absolute top-6 left-6 text-slate-300 text-[10px] font-mono leading-none tracking-tighter opacity-50">+</div>
              <div className="absolute top-6 right-6 text-slate-300 text-[10px] font-mono leading-none tracking-tighter opacity-50">+</div>
              <div className="absolute bottom-6 left-6 text-slate-300 text-[10px] font-mono leading-none tracking-tighter opacity-50">+</div>
              <div className="absolute bottom-6 right-6 text-slate-300 text-[10px] font-mono leading-none tracking-tighter opacity-50">+</div>
              
              <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none text-9xl">🎯</div>

              <h3 className="text-3xl md:text-4xl font-bold font-serif text-[#00152b] tracking-tight mb-6">Our Mission</h3>
              <p className="text-slate-600 font-light leading-relaxed text-lg md:text-xl">
                To improve patient outcomes by delivering premium-quality therapeutic formulations that meet the highest international standards. Through collaborations with leading WHO-GMP certified manufacturing partners, we ensure rigorous quality and accessibility across cardio-diabetic, neuro-psychiatry, and cellular nutrition therapies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Therapeutic Expertise & Technologies */}
      <section className="bg-[#00152b] text-white pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        {/* Sharp Clinical Angle from slate-50 */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
          <svg className="relative block w-full h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48V0h1200v120z" fill="#f8fafc"></path>
            <path d="M1200 120L0 16.48v5L1200 125v-5z" fill="#14b8a6" opacity="0.8"></path>
          </svg>
        </div>
        <div className="absolute inset-0 opacity-[0.02] text-white bg-science-grid pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-[#14b8a6] blur-[150px] opacity-[0.1] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left: Therapeutic Categories Stack */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-8 bg-[#14b8a6]"></span>
                <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-xs md:text-sm">
                  Therapeutic Expertise
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white font-serif tracking-tight mb-6">
                Specialized Care Areas
              </h2>
              <p className="text-slate-300 leading-relaxed font-light mb-12 text-lg lg:max-w-xl">
                Our advanced therapeutic portfolio is carefully designed to support healthcare professionals across multiple specialties through trusted, research-driven pharmaceutical solutions.
              </p>
              
              <div className="space-y-5 md:space-y-6">
                {[
                  { id: "01", title: "Cardiology & Hypertension", desc: "Advanced therapeutic combinations supporting cardiovascular wellness and hypertension management." },
                  { id: "02", title: "Diabetology", desc: "High-efficacy pharmaceutical formulations designed to support glycemic control in Type-2 Diabetes Mellitus." },
                  { id: "03", title: "Neuro-Psychiatry & Migraine", desc: "Precision therapeutic support for migraine prophylaxis and neuropathic wellness management." },
                  { id: "04", title: "Gastroenterology", desc: "Advanced gastrointestinal formulations supporting GERD, reflux, and hyperacidity management." },
                  { id: "05", title: "Cellular Nutrition & Vitamin Care", desc: "Advanced nutritional therapies utilizing micronutrients, organic calcium complexes, and nano-droplet technologies." },
                ].map((item, i) => (
                  <div key={i} className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-teal-500/30 transition-all duration-500 ease-premium relative overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#14b8a6] to-[#0f766e] transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out z-20"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500 rounded-full blur-[100px] opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0"></div>
                    
                    <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-black/20 border border-white/5 flex items-center justify-center shadow-inner group-hover:border-teal-500/30 transition-colors duration-500 relative z-10">
                      <span className="text-[#14b8a6] font-bold font-serif text-2xl md:text-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 tracking-tighter">{item.id}</span>
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <h4 className="text-xl md:text-2xl font-extrabold text-white mb-2 md:mb-3 font-serif tracking-tight group-hover:text-teal-50 transition-colors duration-300">{item.title}</h4>
                      <p className="text-slate-400 font-light leading-relaxed text-[0.95rem] md:text-base lg:text-[1.05rem] group-hover:text-slate-300 transition-colors duration-300">{item.desc}</p>
                    </div>

                    <div className="hidden lg:flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover:bg-[#14b8a6] group-hover:border-[#14b8a6] transition-all duration-500 group-hover:translate-x-2 relative z-10">
                       <svg className="w-5 h-5 text-slate-500 group-hover:text-[#00152b] transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                       </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Advanced Formulation Card (Sticky) */}
            <div className="lg:w-[480px]">
              <div className="sticky top-32">
                <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] relative group overflow-hidden">
                  
                  {/* Subtle technical dots */}
                  <div className="absolute inset-0 opacity-[0.08] text-white bg-technical-dots pointer-events-none"></div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center mb-8">
                    <svg className="w-8 h-8 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>

                  <h3 className="text-3xl font-bold font-serif mb-6 text-white tracking-tight relative z-10 leading-snug">
                    Advanced Formulation Technologies
                  </h3>
                  <p className="text-slate-300 leading-relaxed font-light relative z-10 text-lg">
                    Medileo Healthcare collaborates with leading WHO-GMP certified pharmaceutical manufacturing partners utilizing advanced technologies such as Micronized Technology and Nano Droplet delivery systems to support enhanced formulation performance and therapeutic effectiveness.
                  </p>
                  
                  {/* Restrained glowing accents */}
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-500 rounded-full blur-[100px] opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-30"></div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trusted Quality Partnerships */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-white relative">
        {/* Soft return curve from dark blue */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 rotate-180 pointer-events-none">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#00152b"></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-[#14b8a6]"></span>
              <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-xs md:text-sm">Quality Assurance</span>
              <span className="h-px w-8 bg-[#14b8a6]"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#00152b] font-serif mb-6 tracking-tight">
              Trusted Quality Partnerships
            </h2>
            <p className="text-slate-600 leading-relaxed font-light text-lg md:text-xl max-w-4xl mx-auto">
              Medileo Healthcare partners with India’s leading WHO-GMP certified manufacturing facilities to ensure every formulation meets rigorous pharmaceutical quality standards, safety benchmarks, and therapeutic reliability expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "WHO-GMP Collaborations",
                desc: "Strategic alliances with state-of-the-art facilities certified for international good manufacturing practices.",
              },
              {
                title: "Quality-Assured Formulations",
                desc: "Multi-stage compliance and testing protocols ensure that every product batch achieves maximum purity and efficacy.",
              },
              {
                title: "Ethical Healthcare Commitment",
                desc: "Unwavering dedication to transparency, compliance, and regulatory standards in all our pharmaceutical operations.",
              }
            ].map((card, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.12)] hover:border-teal-500/30 transition-all duration-500 ease-premium relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <div className="mb-5 w-14 h-14 rounded-xl bg-teal-50 border border-teal-100/50 flex items-center justify-center group-hover:bg-teal-100/50 group-hover:scale-105 transition-all duration-500">
                  <div className="w-4 h-4 bg-[#14b8a6] rounded-full shadow-[0_0_12px_rgba(20,184,166,0.6)]"></div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-[#00152b] tracking-tight mb-3">{card.title}</h3>
                <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Push CTA */}
      <section className="bg-slate-50 py-20 md:py-28 relative border-t border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-50/50 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#00152b] font-serif mb-6 tracking-tight leading-tight">
            Committed to Global Healthcare Excellence
          </h2>
          <p className="text-slate-600 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
            Join us in our mission to improve patient outcomes through premium-quality therapeutic formulations and strategic global partnerships.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#14b8a6] hover:bg-[#0f766e] text-white px-10 py-5 rounded-xl font-bold transition-all duration-300 ease-premium shadow-[0_10px_20px_-5px_rgba(20,184,166,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(20,184,166,0.4)] hover:-translate-y-1 tracking-wide"
            >
              Connect With Our Corporate Team
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
