import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { sendGAEvent } from '@next/third-parties/google';

const LOGO_URL = "/logo.png";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-out ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-200/50" 
          : "bg-white border-b border-transparent"
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300 ease-out ${
          isScrolled ? "h-16 md:h-20" : "h-24 md:h-[6.5rem]"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center h-full py-2 group">
          <Image
            alt="Medileo Healthcare Corporate Logo"
            title="Medileo Healthcare"
            width={240}
            height={80}
            priority={true}
            className={`w-auto object-contain transition-all duration-500 ease-premium drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)] group-hover:opacity-90 group-hover:scale-[1.01] ${
              isScrolled ? "h-14 md:h-[4rem]" : "h-20 md:h-[5.5rem]"
            }`}
            style={{ imageRendering: "high-quality" }}
            src={LOGO_URL}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-12 h-full items-center relative">
          {NAV_LINKS.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => sendGAEvent({ event: 'navigation_click', link_name: link.label })}
                className="relative h-full flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-inset rounded-md px-2"
              >
                <span 
                  className={`text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ease-premium ${
                    isActive 
                      ? "text-[#0f766e]" 
                      : "text-slate-600 group-hover:text-[#0f766e]"
                  }`}
                >
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-[-1px] left-0 right-0 h-[3px] rounded-t-md bg-[#0f766e]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          <div className="flex items-center pl-4 border-l border-slate-200 h-8">
            <Link
              href="/contact"
              onClick={() => sendGAEvent({ event: 'navigation_click', button_name: 'nav_partner_with_us' })}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_14px_0_rgba(20,184,166,0.3)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.4)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              Partner With Us
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 p-2 hover:bg-slate-50 rounded-lg transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <motion.svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileOpen ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            )}
          </motion.svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 top-full"
          >
            <div className="px-6 py-6 space-y-4">
              {NAV_LINKS.map((link, i) => {
                const isActive = router.pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        setMobileOpen(false);
                        sendGAEvent({ event: 'navigation_click', link_name: link.label });
                      }}
                      className={`block py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                        isActive
                          ? "text-[#0f766e] border-l-2 border-[#0f766e] pl-4 bg-teal-50/50"
                          : "text-slate-500 hover:text-[#0f766e] pl-4"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: NAV_LINKS.length * 0.05 }}
                className="pt-4 mt-2 border-t border-slate-100"
              >
                <Link
                  href="/contact"
                  onClick={() => {
                    setMobileOpen(false);
                    sendGAEvent({ event: 'navigation_click', button_name: 'nav_partner_with_us' });
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_14px_0_rgba(20,184,166,0.3)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  Partner With Us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
