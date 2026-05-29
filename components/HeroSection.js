import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import HeroVisual from "@/components/HeroVisual";

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

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7500); // 7.5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="hero-gradient text-white pt-28 pb-40 md:pt-36 md:pb-48 relative overflow-hidden min-h-[800px] lg:min-h-[750px]">
      <div className="curved-line opacity-50 z-20"></div>

      {/* Persistent Atmospheric Glow */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 lg:w-1/2 h-full bg-gradient-to-l from-[#0f766e]/30 via-teal-900/10 to-transparent pointer-events-none mix-blend-overlay z-10"></div>

      {/* Base Background Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#00152b]/40 z-0"></div>

      {/* Animated Background Orbs (Persistent) */}
      <motion.div
        className="absolute pointer-events-none opacity-[0.15] md:opacity-[0.25] mix-blend-screen z-0"
        style={{
          top: "5%", left: "-5%", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(13,148,136,0.8) 0%, transparent 60%)",
        }}
        animate={{ x: [0, 30, -15, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none opacity-[0.12] md:opacity-[0.2] mix-blend-screen z-0"
        style={{
          top: "10%", right: "-10%", width: 800, height: 800, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.6) 0%, transparent 65%)",
        }}
        animate={{ x: [0, -25, 15, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 }}
      />
      
      {/* Background Visuals Transition */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {slide.bgType === "capsule" ? (
              <div className="absolute right-0 top-0 h-full w-full lg:w-[60%] flex items-center justify-end opacity-70">
                <div className="w-[850px] h-[850px] lg:w-[900px] lg:h-[900px] translate-x-1/4 -translate-y-10 lg:translate-x-[5%] lg:-translate-y-[5%]">
                  <HeroVisual />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
                  style={{ backgroundImage: `url(${slide.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00152b] via-[#00152b]/80 to-teal-900/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00152b] via-transparent to-[#00152b]/50" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-30 flex flex-col items-start justify-center h-full pt-10">
        
        {/* Left Text Content */}
        <div className="max-w-2xl lg:max-w-[50rem] relative text-center lg:text-left w-full mx-auto lg:mx-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.15] tracking-tighter text-white drop-shadow-md font-serif">
                <span className="inline-block mr-[0.25em]">Empowering</span>
                <span className="inline-block mr-[0.25em]">Health,</span>
                <br className="hidden md:block" />
                <span className="inline-block mr-[0.25em]">Enhancing</span>
                <TypewriterText 
                  text={slide.highlight} 
                  className="text-[#2ec4b6]"
                  delay={0.7}
                />
              </h1>

              <div className="text-lg md:text-xl text-teal-50/90 mb-10 leading-[1.8] font-light max-w-2xl mx-auto lg:mx-0 drop-shadow-sm min-h-[140px] md:min-h-[120px] space-y-4">
                <p>
                  Welcome to Medileo Healthcare. We are a dynamic and fast-growing pharmaceutical company dedicated to delivering high-quality, affordable, and innovative healthcare solutions across diverse medical specialties.
                </p>
                <p>
                  While we specialize in strategic pharmaceutical brand management and marketing, our uncompromising focus remains on product excellence. By collaborating with India’s leading WHO-GMP certified manufacturing partners, we deliver advanced therapeutic formulations developed with next-generation technologies including micronized and nano-droplet delivery systems.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA buttons — persistent to avoid layout shift */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mt-2"
          >
            <div className="relative w-full sm:w-auto">
              <a
                href="/about"
                className="bg-[#14b8a6] hover:bg-[#0f766e] text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 border border-teal-400/20 block text-center w-full tracking-wide shadow-[0_10px_20px_-5px_rgba(20,184,166,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(20,184,166,0.35)] hover:-translate-y-0.5"
              >
                Our Expertise
              </a>
            </div>
            <a
              href="/about"
              className="bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/10 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 backdrop-blur-md block text-center w-full sm:w-auto tracking-wide hover:-translate-y-0.5"
            >
              About Medileo
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-0 w-full z-40 flex justify-center lg:justify-start lg:pl-[max(1.5rem,calc((100%-80rem)/2+1.5rem))]">
        <div className="flex gap-3 px-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === idx ? "w-10 bg-[#2ec4b6]" : "w-4 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="hero-wave z-20"></div>
    </section>
  );
}
