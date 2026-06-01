import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import HeroVisual from "@/components/HeroVisual";
import { sendGAEvent } from '@next/third-parties/google';

const slides = [
  {
    id: 0,
    highlight: "Life",
    bgType: "capsule",
  },
  {
    id: 1,
    highlight: "Care",
    bgType: "image",
    bgImage: "/images/slide2.png",
  },
  {
    id: 2,
    highlight: "Outcomes",
    bgType: "image",
    bgImage: "/images/slide3.png",
  },
  {
    id: 3,
    highlight: "Wellness",
    bgType: "image",
    bgImage: "/images/slide4.png",
  }
];

const AUTO_SLIDE_INTERVAL_MS = 4500;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (isHovered || userInteracted) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isHovered, userInteracted]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setUserInteracted(true);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setUserInteracted(true);
  };

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative min-h-[900px] lg:min-h-screen flex items-center bg-[#021120] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setUserInteracted(true)}
      onTouchStart={() => setUserInteracted(true)}
    >
      {/* Refined Background Treatment - Clean, Professional, Deep */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-[#021120] to-[#021120]"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/science-grid.svg')] mix-blend-overlay"></div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ willChange: "opacity, transform" }}
          >
            {slide.bgType === "capsule" ? (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-[60%] h-full flex items-center justify-center opacity-70 mix-blend-screen pointer-events-none">
                <div className="scale-75 md:scale-90 lg:scale-100 translate-x-10 lg:translate-x-0">
                  <HeroVisual />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-[0.12] mix-blend-luminosity grayscale-[40%]">
                  <Image
                    src={slide.bgImage}
                    alt={`Medileo Healthcare Pharmaceutical Manufacturing - ${slide.highlight}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#021120] via-[#021120]/95 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021120] via-transparent to-[#021120]/50" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 w-full pt-32 pb-32 md:pb-40">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                {/* 1. Trust Badges (Refined) */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 mb-8">
                  {[
                    "WHO-GMP Certified",
                    "High-Quality Solutions",
                    "Next-Gen Technologies"
                  ].map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                      <span className="text-white/90 text-xs md:text-sm font-medium tracking-wide uppercase">{badge}</span>
                    </div>
                  ))}
                </div>

                {/* 2. Primary Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-[1.1] tracking-tight text-white font-serif drop-shadow-sm">
                  <span className="block mb-2 font-medium">Empowering Health,</span>
                  <span className="block text-white/90">Enhancing <TypewriterText text={slide.highlight} className="text-teal-400 font-medium" delay={0.3} /></span>
                </h1>

                {/* 3. Executive Summary */}
                <div className="mb-10 max-w-2xl lg:max-w-3xl">
                  <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                    Medileo Healthcare is committed to improving healthcare outcomes by providing high-quality therapeutic formulations and innovative healthcare solutions through trusted WHO-GMP certified manufacturing partnerships.
                  </p>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* 4. Manufacturing Showcase & Slider Controls (Static) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-12 w-full max-w-2xl lg:max-w-3xl relative z-30 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent rounded-2xl blur-xl group-hover:from-teal-500/15 transition-all duration-500"></div>
              
              <div className="relative flex flex-col rounded-2xl bg-[#0a1e35]/60 border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors overflow-hidden">
                
                {/* Showcase Content */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-5 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                    <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-2">Manufacturing & Excellence</h3>
                    <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
                      While we specialize in strategic pharmaceutical brand management and marketing, our uncompromising focus remains on product excellence. By collaborating with India’s leading WHO-GMP certified manufacturing partners, we deliver advanced therapeutic formulations developed with next-generation technologies including micronized and nano-droplet delivery systems.
                    </p>
                  </div>
                </div>

                {/* Slider Controls Footer */}
                <div className="px-6 md:px-8 py-4 bg-white/[0.02] border-t border-white/5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                  
                  {/* Slide Count */}
                  <div className="flex items-center gap-3">
                    <span className="text-teal-400 font-medium text-sm tabular-nums">0{currentSlide + 1}</span>
                    <div className="w-8 h-px bg-white/20"></div>
                    <span className="text-white/60 font-medium text-sm tabular-nums">0{slides.length}</span>
                  </div>

                  {/* Indicators */}
                  <div className="flex items-center gap-2">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); setUserInteracted(true); }}
                        className={`transition-all duration-300 h-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                          currentSlide === idx ? "w-8 bg-teal-400" : "w-2.5 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Prev/Next Navigation */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-teal-500 hover:border-teal-500 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                      aria-label="Previous slide"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-teal-500 hover:border-teal-500 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                      aria-label="Next slide"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* 5. CTA Buttons (Enterprise-grade) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-flex flex-col sm:flex-row gap-2 p-2 bg-white/[0.03] border border-white/10 rounded-[2.5rem] backdrop-blur-md shadow-2xl w-full sm:w-auto mt-2"
            >
              <Link
                href="/contact"
                onClick={() => sendGAEvent({ event: 'cta_click', button_name: 'hero_partner_with_us' })}
                className="group flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#021120]"
              >
                Partner With Us
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#021120]"
              >
                Explore Our Expertise
              </Link>
            </motion.div>
          </div>
          
        </div>
      </div>


    </section>
  );
}
