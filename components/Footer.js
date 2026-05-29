import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer({ variant = "default" }) {
  return (
    <footer className="bg-[#00152b] pt-24 pb-10 px-6 mt-auto w-full relative overflow-hidden border-t border-white/10">
      {/* Background Overlays for Scientific/Corporate Depth */}
      <div className="absolute inset-0 opacity-[0.03] text-white bg-science-grid pointer-events-none z-0"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-[#14b8a6] blur-[140px] opacity-[0.1] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-12 text-left relative z-10">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-8 max-w-sm">
          {/* Premium Logo Plaque */}
          <Link href="/" className="inline-block">
            <div className="bg-white px-8 py-5 rounded-2xl inline-flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50"></div>
              <img 
                src="/logo.png" 
                alt="Medileo Healthcare" 
                className="h-10 w-auto object-contain relative z-10 opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500 ease-premium" 
              />
            </div>
          </Link>
          <p className="text-slate-400 text-[0.95rem] leading-relaxed font-light">
            Delivering trusted pharmaceutical solutions through strategic healthcare partnerships and WHO-GMP certified manufacturing collaborations.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20 w-full lg:w-auto lg:flex-1 lg:justify-end">
          
          {/* Corporate Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[#14b8a6] uppercase tracking-[0.2em] text-xs font-bold mb-2">Corporate</h4>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm font-light inline-block w-fit">About Us</Link>
              <Link href="/contact" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm font-light inline-block w-fit">Contact</Link>
            </div>
          </div>

          {/* Research Focus */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[#14b8a6] uppercase tracking-[0.2em] text-xs font-bold mb-2">Therapeutics</h4>
            <div className="flex flex-col gap-3">
              <span className="text-slate-400 text-sm font-light cursor-default">Cardiovascular</span>
              <span className="text-slate-400 text-sm font-light cursor-default">Neurology</span>
              <span className="text-slate-400 text-sm font-light cursor-default">Anti-Infectives</span>
            </div>
          </div>

          {/* Compliance */}
          <div className="flex flex-col gap-5 col-span-2 md:col-span-1">
            <h4 className="text-[#14b8a6] uppercase tracking-[0.2em] text-xs font-bold mb-2">Compliance</h4>
            <div className="flex flex-col gap-4">
              <p className="text-slate-300 text-sm font-medium flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
                WHO-GMP Certified
              </p>
              <p className="text-slate-300 text-sm font-medium flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
                ISO 9001:2015
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left relative z-10">
        <p className="text-slate-500 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light">
          © {new Date().getFullYear()} MEDILEO HEALTHCARE PVT. LTD. ALL RIGHTS RESERVED.
        </p>
        
        {(variant === "contact") ? (
          <p className="text-[#14b8a6]/70 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">
            DESIGNED WITH BRIGHT SCIENTIFIC COMPLIANCE STANDARDS.
          </p>
        ) : (
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-[#14b8a6] transition-colors duration-300 text-[10px] uppercase tracking-widest font-medium">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-[#14b8a6] transition-colors duration-300 text-[10px] uppercase tracking-widest font-medium">Terms of Service</a>
          </div>
        )}
      </div>
    </footer>
  );
}
