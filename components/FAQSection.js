import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What therapeutic areas does Medileo serve?",
    answer: "Medileo Healthcare focuses on advanced pharmaceutical formulations across Cardiology, Hypertension, Diabetology, Neuro-Psychiatry, Gastroenterology, and Cellular Nutrition.",
  },
  {
    question: "Is Medileo WHO-GMP certified?",
    answer: "Yes, we partner exclusively with WHO-GMP certified manufacturing facilities to ensure all therapeutic formulations meet rigorous international quality, purity, and safety standards.",
  },
  {
    question: "How can I contact Medileo?",
    answer: "You can reach our corporate team via the Contact page for business partnerships, contract manufacturing inquiries, and product information.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-8 bg-[#14b8a6]"></span>
            <span className="text-[#14b8a6] font-bold tracking-widest uppercase text-xs md:text-sm">Information</span>
            <span className="h-px w-8 bg-[#14b8a6]"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#00152b] font-serif mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 leading-relaxed font-light text-lg md:text-xl max-w-2xl mx-auto">
            Find quick answers to common questions about our therapeutic areas, certifications, and corporate partnerships.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`border rounded-2xl transition-all duration-300 ease-in-out ${isOpen ? 'border-teal-500/50 bg-teal-50/30 shadow-[0_10px_30px_-10px_rgba(20,184,166,0.15)]' : 'border-slate-200/60 bg-white hover:border-teal-500/30 hover:shadow-md'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-left text-lg md:text-xl font-bold font-serif text-[#00152b] pr-8">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-teal-500 border-teal-500 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-slate-600 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
