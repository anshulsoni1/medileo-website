import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const products = [
  {
    id: 1,
    name: "BENFOSUN",
    category: "Diabetic Neuropathy",
    composition: "Benfotiamine 150 Mg + Methylcobalamin IP 1500 Mcg + Alpha Lipoic Acid...",
    desc: "Advanced neuro-protective formula to repair myelin sheath damage..",
  },
  {
    id: 2,
    name: "LEOTOTAL",
    category: "Advanced Cellular Nutrition",
    composition: "Extracts Of Ginkgo, Ginseng, Green Tea And Grape Seed | Omega-3...",
    desc: "Synergistic premium cell vitalizer targeting systemic inflammation.",
  },
  {
    id: 3,
    name: "WIN-DSR",
    category: "GERD, Dyspepsia, Gastritis",
    composition: "Rabeprazole Sodium IP 20 Mg (EC) + Domperidone IP 30 Mg...",
    desc: "Provides dual-action rapid symptomatic relief via instant and sustained release.",
  },
  {
    id: 4,
    name: "NEX-MNT",
    category: "Neuropathy, Neuralgia",
    composition: "Pregabalin IP 75 Mg (SR) + Nortriptyline Hydrochloride IP 10 Mg...",
    desc: "Multi-mechanism neuro-modulator that suppresses excessive pain transmission.",
  },
  {
    id: 5,
    name: "D3 XING",
    category: "Vitamin Deficiency (Sugar Free)",
    composition: "Cholecalciferol (Vitamin D3) 60000 IU In Nano Droplet",
    desc: "Advanced Nano Droplet design ensures maximum systemic bio-absorption.",
  },
  {
    id: 6,
    name: "Gemileo-M1/M2",
    category: "Type-2 Diabetes Management",
    composition: "Metformin Hydrochloride IP 500 Mg + Glimepiride IP 1 Mg/2 Mg",
    desc: "Gold-standard rational clinical combination for stable plasma glucose.",
  },
  {
    id: 7,
    name: "BETAROOT PLUS",
    category: "Migraine Prophylaxis",
    composition: "Flunarizine Dihydrochloride IP 10 Mg + Propranolol HCl IP 40 Mg (SR)",
    desc: "Synchronized dual pathway blocker to reduce severe migraine attacks.",
  },
  {
    id: 8,
    name: "Leosart Series",
    category: "Hypertension Management",
    composition: "Telmisartan combinations (CC, CL, AM)",
    desc: "Engineered with premium Micronized Technology for smooth pressure drops.",
  },
  {
    id: 9,
    name: "MEDCIUM / XT",
    category: "Low-back Pain & Bone Density",
    composition: "Calcium Citrate 1000mg + D3 200IU + Mg + Zinc",
    desc: "Safely controls harmful hyperhomocysteinemia risk while restoring bone density.",
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
