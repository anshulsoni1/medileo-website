import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer({ variant = "default" }) {
  return (
    <footer className="bg-[#00152b] pt-20 pb-8 px-6 mt-auto w-full relative overflow-hidden border-t-4 border-[#0f766e]">
      {/* Subtle Background Glow for premium depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-[#14b8a6] blur-[140px] opacity-[0.15] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-12 text-left relative z-10">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-6 max-w-sm">
          {/* Logo with CSS filter to make it white */}
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="Medileo Healthcare" 
              className="h-12 w-auto object-contain brightness-0 invert opacity-95 transition-opacity hover:opacity-100" 
            />
          </Link>
          <p className="text-white/60 text-sm leading-relaxed font-light">
            Formulating premium therapeutic drug classes under stringent WHO-GMP guidelines. Transforming patient outcomes globally through continuous scientific excellence and rigorous quality controls.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20">
          
          {/* Corporate Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-1">Corporate</h4>
            <Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm font-light">About Us</Link>
            <Link href="/products" className="text-white/60 hover:text-white transition-colors text-sm font-light">Product Portfolio</Link>
            <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm font-light">Contact</Link>
          </div>

          {/* Research Focus */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-1">Therapeutics</h4>
            <span className="text-white/60 text-sm font-light cursor-default">Cardiovascular</span>
            <span className="text-white/60 text-sm font-light cursor-default">Neurology</span>
            <span className="text-white/60 text-sm font-light cursor-default">Anti-Infectives</span>
          </div>

          {/* Compliance */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-1">Compliance</h4>
            <div className="flex flex-col gap-3">
              <p className="text-white/70 text-sm font-medium flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
                WHO-GMP Certified
              </p>
              <p className="text-white/70 text-sm font-medium flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
                ISO 9001:2015
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left relative z-10">
        <p className="text-white/40 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light">
          © {new Date().getFullYear()} MEDILEO HEALTHCARE PVT. LTD. ALL RIGHTS RESERVED.
        </p>
        
        {(variant === "products" || variant === "contact") ? (
          <p className="text-[#14b8a6] text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">
            DESIGNED WITH BRIGHT SCIENTIFIC COMPLIANCE STANDARDS.
          </p>
        ) : (
          <div className="flex gap-8">
            <a href="#" className="text-white/40 hover:text-[#14b8a6] transition-colors text-[10px] uppercase tracking-widest font-medium">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-[#14b8a6] transition-colors text-[10px] uppercase tracking-widest font-medium">Terms of Service</a>
          </div>
        )}
      </div>
    </footer>
  );
}
