import React from "react";
import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center opacity-90 mix-blend-screen pointer-events-none">
      
      {/* Core Atmospheric Gradient Blurs */}
      <div className="absolute w-40 h-40 bg-[#14b8a6] rounded-full blur-[100px] opacity-40"></div>
      <div className="absolute w-20 h-20 bg-[#2ec4b6] rounded-full blur-[60px] opacity-50"></div>
      
      {/* Static Measurement Ring */}
      <div className="absolute w-[460px] h-[460px] rounded-full border border-white/5" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
      <div className="absolute w-[500px] h-[500px] rounded-full border border-teal-500/5" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 50% 100%)' }}></div>

      {/* Outer Orbit (Slow, Dashed) */}
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full border border-teal-400/10"
        style={{ borderStyle: "dashed", borderWidth: "1px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        {/* Nodes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-200 shadow-[0_0_12px_rgba(46,196,182,0.8)]"></div>
        <div className="absolute bottom-1/4 right-0 translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(46,196,182,0.6)]"></div>
      </motion.div>

      {/* Middle Orbit (Solid, Reverse) */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border border-teal-300/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/3 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"></div>
      </motion.div>

      {/* Inner Core Orbit */}
      <motion.div
        className="absolute w-[160px] h-[160px] rounded-full border border-teal-100/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
        <div className="absolute top-1/4 right-0 translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-teal-200 opacity-80"></div>
      </motion.div>

      {/* Molecular Connections (Pulsing SVG overlay) */}
      <motion.svg 
        className="absolute w-full h-full text-teal-300/20" 
        viewBox="0 0 500 500"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Abstract structural lines mapping between the orbits */}
        <line x1="250" y1="40" x2="100" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="100" y1="150" x2="250" y2="330" stroke="currentColor" strokeWidth="0.5" />
        <line x1="250" y1="330" x2="400" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
        <line x1="400" y1="150" x2="250" y2="40" stroke="currentColor" strokeWidth="1" />
        <line x1="250" y1="100" x2="250" y2="400" stroke="currentColor" strokeWidth="0.2" strokeDasharray="4 6" />
      </motion.svg>
      
      {/* Premium Semi-Abstract Capsule Silhouettes */}
      {/* Primary Capsule */}
      <motion.div 
        className="absolute w-[64px] h-[160px] rounded-full border border-teal-200/10 shadow-[0_15px_40px_rgba(20,184,166,0.12)] flex flex-col overflow-hidden backdrop-blur-md"
        animate={{ y: [-12, 12, -12], rotate: [15, 18, 15] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: '15%', top: '25%' }}
      >
        {/* Top Hemisphere */}
        <div className="w-full h-1/2 bg-gradient-to-br from-teal-300/20 via-teal-400/5 to-transparent relative">
           {/* Subtle glass reflection highlight */}
           <div className="absolute top-3 left-2.5 w-1.5 h-14 rounded-full bg-white/20 blur-[2px]"></div>
        </div>
        {/* Bottom Hemisphere */}
        <div className="w-full h-1/2 bg-gradient-to-t from-[#00152b]/50 to-transparent border-t border-teal-100/5 relative">
           <div className="absolute bottom-3 right-2.5 w-1 h-10 rounded-full bg-teal-500/20 blur-[2px]"></div>
        </div>
      </motion.div>

      {/* Secondary Distant Capsule */}
      <motion.div 
        className="absolute w-[36px] h-[90px] rounded-full border border-teal-100/5 flex flex-col overflow-hidden backdrop-blur-sm opacity-60"
        animate={{ y: [8, -8, 8], rotate: [-20, -15, -20] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ right: '22%', bottom: '22%' }}
      >
        <div className="w-full h-1/2 bg-gradient-to-br from-teal-200/15 to-transparent"></div>
        <div className="w-full h-1/2 bg-gradient-to-t from-white/5 to-transparent border-t border-white/5"></div>
      </motion.div>

      {/* Floating Ambient Particles (Subtle parallax) */}
      <motion.div 
        className="absolute w-1 h-1 rounded-full bg-white/60"
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '20%', left: '30%' }}
      />
      <motion.div 
        className="absolute w-1.5 h-1.5 rounded-full bg-teal-200/50"
        animate={{ y: [15, -15, 15], x: [15, -15, 15], opacity: [0.1, 0.6, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ bottom: '25%', right: '25%' }}
      />
    </div>
  );
}
