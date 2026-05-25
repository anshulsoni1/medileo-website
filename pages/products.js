import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const products = [
  {
    id: 1,
    name: "Cardiocor-XR",
    category: "Cardiovascular",
    composition: "Amlodipine 5mg + Rosuvastatin 10mg",
    desc: "Advanced dual-action formula for concurrent management of hypertension and dyslipidemia.",
  },
  {
    id: 2,
    name: "Neurosyn-Plus",
    category: "Neurology",
    composition: "Citicoline 500mg + Piracetam 800mg",
    desc: "Cognitive enhancer for cerebrovascular accidents and age-related memory impairment.",
  },
  {
    id: 3,
    name: "Fleximove-SP",
    category: "Orthopedics",
    composition: "Aceclofenac 100mg + Serratiopeptidase 15mg",
    desc: "Potent anti-inflammatory and analgesic for severe osteoarthritis and soft tissue trauma.",
  },
  {
    id: 4,
    name: "Infectox-O",
    category: "Anti-Infectives",
    composition: "Cefixime 200mg + Ofloxacin 200mg",
    desc: "Broad-spectrum bactericidal combination for resistant respiratory and urinary tract infections.",
  },
  {
    id: 5,
    name: "Gastrosoothe-DSR",
    category: "Gastroenterology",
    composition: "Pantoprazole 40mg + Domperidone 30mg (SR)",
    desc: "Prokinetic and PPI combination for GERD and severe hyperacidity.",
  },
  {
    id: 6,
    name: "Diabetrol-M",
    category: "Endocrinology",
    composition: "Teneligliptin 20mg + Metformin 500mg (SR)",
    desc: "Next-gen DPP-4 inhibitor combined with gold-standard biguanide for Type 2 Diabetes.",
  },
  {
    id: 7,
    name: "Respiclear-LS",
    category: "Pulmonology",
    composition: "Levosalbutamol + Ambroxol + Guaiphenesin",
    desc: "Triple-action mucolytic expectorant for acute exacerbation of bronchitis.",
  },
  {
    id: 8,
    name: "Dermaheal-K",
    category: "Dermatology",
    composition: "Ketoconazole 2% w/w",
    desc: "Topical antifungal preparation for resistant cutaneous candidiasis and tinea infections.",
  },
  {
    id: 9,
    name: "Immunoboost-Z",
    category: "Nutraceuticals",
    composition: "Multivitamins + Minerals + Zinc + Antioxidants",
    desc: "Comprehensive micronutrient complex to support cellular immunity and convalescence.",
  },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.composition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Product Portfolio | Medileo Healthcare</title>
        <meta name="description" content="Explore Medileo Healthcare's extensive therapeutic portfolio." />
      </Head>

      <div className="bg-[#0b192c] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-8 font-serif"
          >
            Therapeutic <span className="text-[#14b8a6]">Portfolio</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto glass-search-container p-2 flex items-center"
          >
            <div className="pl-4 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by brand, category, or composition..."
              className="w-full bg-transparent border-none outline-none px-4 py-3 text-slate-800 placeholder-slate-400 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-[#00152b] font-serif">Formulations Index</h2>
              <p className="text-sm text-slate-500 mt-1">Showing {filteredProducts.length} results</p>
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="product-card group overflow-hidden"
              >
                <div className="rx-watermark">Rx</div>
                <div className="product-content">
                  <div className="text-[10px] font-bold text-[#14b8a6] uppercase tracking-widest mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-bold text-[#00152b] mb-4 font-serif">
                    {product.name}
                  </h3>
                  <div className="bg-[#f8fafc] border-l-2 border-[#00152b] p-3 mb-4">
                    <p className="text-xs font-mono text-slate-600 font-semibold">
                      {product.composition}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔬</div>
              <h3 className="text-xl font-bold text-[#0b192c]">No formulations found</h3>
              <p className="text-slate-500 mt-2">Adjust your search parameters and try again.</p>
            </div>
          )}
        </div>
      </section>

      <Footer variant="products" />
    </>
  );
}
