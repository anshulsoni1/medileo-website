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
      
      {/* Mini Hero */}
      <section className="bg-[#00152b] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#008b83]/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div custom={0} variants={fadeInUp} className="flex justify-center items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#14b8a6]"></span>
              <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-sm">
                About Medileo
              </span>
              <span className="h-px w-8 bg-[#14b8a6]"></span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeInUp} className="text-3xl md:text-5xl font-black text-white font-serif tracking-tight leading-tight max-w-4xl mx-auto">
              Empowering Healthcare Through Trusted Pharmaceutical Solutions
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-0 pb-16 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-16 border border-slate-100 -mt-20 md:-mt-32 relative z-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-6 text-slate-600 leading-relaxed font-light text-lg">
                <p>
                  At <strong className="font-bold text-[#00152b]">Medileo Healthcare Pvt. Ltd.</strong>, we are committed to delivering high-quality, affordable, and innovative pharmaceutical solutions across diverse therapeutic segments.
                </p>
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
      <section className="py-16 md:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold text-[#0b192c] font-serif">
              Our Core Values
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

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#14b8a6]"></span>
              <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-sm">
                Our Purpose
              </span>
              <span className="h-px w-8 bg-[#14b8a6]"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b192c] font-serif">
              Vision & Mission
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 p-10 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] relative group hover:border-teal-500/20 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[2rem]"></div>
              <h3 className="text-2xl font-bold text-[#0b192c] mb-6 font-serif">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed font-light text-lg">
                To emerge as a premier and trusted leader in the pharmaceutical landscape, recognized for scientific innovation, uncompromising quality standards, and an unwavering commitment to bridging the gap between vital care and total cure.
              </p>
            </div>
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 p-10 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] relative group hover:border-teal-500/20 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[2rem]"></div>
              <h3 className="text-2xl font-bold text-[#0b192c] mb-6 font-serif">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed font-light text-lg">
                To improve patient outcomes by delivering premium-quality therapeutic formulations that meet the highest international standards. Through collaborations with leading WHO-GMP certified manufacturing partners, we ensure rigorous quality and accessibility across cardio-diabetic, neuro-psychiatry, and cellular nutrition therapies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Therapeutic Expertise & Technologies */}
      <section className="bg-[#0b192c] text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-[#14b8a6] blur-[150px] opacity-[0.07] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left: Therapeutic Categories Stack */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-[#14b8a6]"></span>
                <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-sm">
                  Our Therapeutic Expertise
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed font-light mb-12 text-lg lg:max-w-xl">
                Our advanced therapeutic portfolio is carefully designed to support healthcare professionals across multiple specialties through trusted, research-driven pharmaceutical solutions.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Cardiology & Hypertension", desc: "Advanced therapeutic combinations supporting cardiovascular wellness and hypertension management." },
                  { title: "Diabetology", desc: "High-efficacy pharmaceutical formulations designed to support glycemic control in Type-2 Diabetes Mellitus." },
                  { title: "Neuro-Psychiatry & Migraine", desc: "Precision therapeutic support for migraine prophylaxis and neuropathic wellness management." },
                  { title: "Gastroenterology", desc: "Advanced gastrointestinal formulations supporting GERD, reflux, and hyperacidity management." },
                  { title: "Cellular Nutrition & Vitamin Care", desc: "Advanced nutritional therapies utilizing micronutrients, organic calcium complexes, and nano-droplet technologies." },
                ].map((item, i) => (
                  <div key={i} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-teal-500/30 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-teal-500/5 to-transparent pointer-events-none"></div>
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(46,196,182,0.8)] flex-shrink-0"></div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-slate-400 font-light leading-relaxed text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Advanced Formulation Card (Sticky) */}
            <div className="lg:w-[450px]">
              <div className="sticky top-32">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-10 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative group overflow-hidden">
                  
                  {/* Subtle biotech grid & pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                  
                  <h3 className="text-2xl font-bold font-serif mb-8 text-white tracking-tight relative z-10">
                    Advanced Formulation Technologies
                  </h3>
                  <p className="text-slate-300 leading-relaxed font-light relative z-10 text-lg">
                    Medileo Healthcare collaborates with leading WHO-GMP certified pharmaceutical manufacturing partners utilizing advanced technologies such as Micronized Technology and Nano Droplet delivery systems to support enhanced formulation performance and therapeutic effectiveness.
                  </p>
                  
                  {/* Restrained glowing accents */}
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                  <div className="absolute top-0 right-10 w-32 h-32 bg-[#14b8a6] rounded-full blur-[80px] opacity-10 pointer-events-none"></div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trusted Quality Partnerships */}
      <section className="py-20 md:py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b192c] font-serif mb-6">
              Trusted Quality Partnerships
            </h2>
            <p className="text-slate-600 leading-relaxed font-light text-lg max-w-3xl mx-auto">
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
              <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.15)] transition-shadow duration-500">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 border border-teal-100/50">
                  <div className="w-4 h-4 bg-[#14b8a6] rounded-full shadow-[0_0_12px_rgba(20,184,166,0.6)]"></div>
                </div>
                <h3 className="text-xl font-bold text-[#0b192c] mb-4 font-serif">{card.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
