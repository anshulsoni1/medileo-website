import React from "react";

export default function Footer({ variant = "default" }) {
  return (
    <footer className="bg-[#00152b] border-t border-slate-800 py-8 px-6 mt-auto w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-white/60 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">
          © 2026 MEDILEO HEALTHCARE PVT. LTD. ALL GLOBAL CORPORATE RIGHTS
          STRICTLY RESERVED.
        </p>
        {(variant === "products" || variant === "contact") && (
          <p className="text-[#00B4A9] font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase">
            DESIGNED WITH BRIGHT SCIENTIFIC COMPLIANCE STANDARDS.
          </p>
        )}
      </div>
    </footer>
  );
}
