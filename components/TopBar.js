import React from "react";

export default function TopBar() {
  return (
    <div className="bg-[#0b192c] text-white text-xs py-2 px-6 flex justify-between items-center w-full z-50 relative">
      <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <a
          className="hover:text-[#2ec4b6] transition-colors"
          href="mailto:medileohealthcare@gmail.com"
        >
          medileohealthcare@gmail.com
        </a>
      </div>
      <div className="hidden md:block tracking-widest font-bold text-gray-200">
        MEDILEO HEALTHCARE PVT. LTD.
      </div>
      <div className="bg-[#0f766e] text-white px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase">
        WHO-GMP Certified
      </div>
    </div>
  );
}
