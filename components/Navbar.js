import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "/logo.png";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
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
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-white border-b border-transparent"
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300 ease-out ${
          isScrolled ? "h-16" : "h-24"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center h-full py-2">
          <img
            alt="Medileo Healthcare Logo"
            className={`w-auto object-contain transition-all duration-300 ease-out ${
              isScrolled ? "h-10" : "h-14"
            }`}
            src={LOGO_URL}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 h-full items-center relative">
          {NAV_LINKS.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative h-full flex items-center group"
              >
                <span 
                  className={`text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
                    isActive 
                      ? "text-[#0f766e]" 
                      : "text-slate-600 group-hover:text-[#00B4A9]"
                  }`}
                >
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#0f766e]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800 focus:outline-none p-2 hover:bg-slate-50 rounded-lg transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
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
                      onClick={() => setMobileOpen(false)}
                      className={`block py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
                        isActive
                          ? "text-[#0f766e] border-l-2 border-[#0f766e] pl-4 bg-teal-50/50"
                          : "text-slate-600 hover:text-[#0f766e] pl-4"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
