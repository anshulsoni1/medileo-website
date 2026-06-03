import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sendGAEvent } from '@next/third-parties/google';

export default function Footer({ variant = "default" }) {
  return (
    <footer className="bg-[#021120] relative overflow-hidden border-t border-white/5">
      {/* Background Enhancements */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/science-grid.svg')] mix-blend-overlay z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[800px] h-40 bg-teal-500/10 blur-[120px] pointer-events-none z-0"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto pt-24 pb-16 px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 xl:gap-16">

          {/* Brand Column */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
            <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl w-fit">
              <div className="bg-white px-8 py-6 rounded-xl inline-flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(20,184,166,0.15)] border border-white/20 transition-all duration-300 group">
                <Image
                  src="/logo.png"
                  alt="Medileo Healthcare Official Logo"
                  title="Medileo Healthcare"
                  width={180}
                  height={60}
                  loading="lazy"
                  className="h-10 md:h-12 lg:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </Link>
            <p className="text-white/60 text-[0.95rem] leading-relaxed font-light max-w-sm">
              Delivering trusted pharmaceutical solutions through strategic healthcare partnerships and WHO-GMP certified manufacturing collaborations.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8 pt-2">

            {/* Corporate Links */}
            <div className="flex flex-col gap-6">
              <h4 className="text-teal-400 uppercase tracking-widest text-xs font-semibold">Corporate</h4>
              <nav className="flex flex-col gap-4">
                <Link 
                  href="/about" 
                  onClick={() => sendGAEvent({ event: 'footer_click', link_name: 'About Us' })}
                  className="text-white/60 hover:text-white transition-all duration-300 text-sm font-light flex items-center group focus-visible:outline-none focus-visible:text-teal-400 w-fit"
                >
                  <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 flex items-center text-teal-500 mr-0 group-hover:mr-1.5 opacity-0 group-hover:opacity-100">▸</span>
                  About Us
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => sendGAEvent({ event: 'footer_click', link_name: 'Contact' })}
                  className="text-white/60 hover:text-white transition-all duration-300 text-sm font-light flex items-center group focus-visible:outline-none focus-visible:text-teal-400 w-fit"
                >
                  <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 flex items-center text-teal-500 mr-0 group-hover:mr-1.5 opacity-0 group-hover:opacity-100">▸</span>
                  Contact
                </Link>
              </nav>
            </div>

            {/* Research Focus */}
            <div className="flex flex-col gap-6">
              <h4 className="text-teal-400 uppercase tracking-widest text-xs font-semibold">Therapeutics</h4>
              <ul className="flex flex-col gap-4">
                <li onClick={() => sendGAEvent({ event: 'view_item_list', item_list_name: 'Cardiovascular' })} className="text-white/60 text-sm font-light cursor-pointer hover:text-white/80 transition-colors w-fit">Cardiovascular</li>
                <li onClick={() => sendGAEvent({ event: 'view_item_list', item_list_name: 'Neurology' })} className="text-white/60 text-sm font-light cursor-pointer hover:text-white/80 transition-colors w-fit">Neurology</li>
                <li onClick={() => sendGAEvent({ event: 'view_item_list', item_list_name: 'Diabetology' })} className="text-white/60 text-sm font-light cursor-pointer hover:text-white/80 transition-colors w-fit">Diabetology</li>
              </ul>
            </div>

            {/* Compliance */}
            <div className="flex flex-col gap-6">
              <h4 className="text-teal-400 uppercase tracking-widest text-xs font-semibold">Compliance</h4>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3.5 group">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500/20 border border-teal-500/50 flex items-center justify-center group-hover:bg-teal-500/40 transition-colors shadow-[0_0_8px_rgba(20,184,166,0.2)]">
                    <div className="w-1 h-1 rounded-full bg-teal-400"></div>
                  </div>
                  <span className="text-white/80 text-sm font-medium tracking-wide group-hover:text-white transition-colors">WHO-GMP Certified products</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="bg-[#010b14] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-white/60 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium">
            © {new Date().getFullYear()} MEDILEO HEALTHCARE PVT. LTD. ALL RIGHTS RESERVED.
          </p>

          {(variant === "contact") ? (
            <p className="text-teal-500/60 text-[10px] sm:text-xs tracking-widest uppercase font-medium">
              DESIGNED WITH BRIGHT SCIENTIFIC COMPLIANCE STANDARDS.
            </p>
          ) : (
            <div className="flex gap-8">
              <Link href="/privacy-policy" onClick={() => sendGAEvent({ event: 'footer_click', link_name: 'Privacy Policy' })} className="text-white/60 hover:text-teal-400 transition-colors duration-300 text-[10px] uppercase tracking-widest font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#021120] rounded-sm px-1 -ml-1">Privacy Policy</Link>
              <Link href="/terms-of-service" onClick={() => sendGAEvent({ event: 'footer_click', link_name: 'Terms of Service' })} className="text-white/60 hover:text-teal-400 transition-colors duration-300 text-[10px] uppercase tracking-widest font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#021120] rounded-sm px-1 -ml-1">Terms of Service</Link>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
