import React from "react";
import Head from "next/head";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service | Medileo Healthcare</title>
        <meta name="description" content="Terms of Service for Medileo Healthcare Pvt. Ltd. Effective Date: January 1, 2026." />
      </Head>
      <SEO 
        title="Terms of Service | Medileo Healthcare" 
        description="Terms of Service for Medileo Healthcare Pvt. Ltd. Effective Date: January 1, 2026."
      />

      <div className="pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200/60">
          
          <header className="mb-12 border-b border-slate-100 pb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 tracking-tight">Terms of Service</h1>
            <p className="text-teal-600 font-semibold tracking-wide uppercase text-sm">Effective Date: January 1, 2026</p>
          </header>

          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
            <p className="text-[1.05rem]">
              Welcome to the website of Medileo Healthcare Pvt. Ltd. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions of use.
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">1. Educational and Informational Purpose Only</h2>
              <p className="font-semibold text-slate-800 mb-2">No Medical Advice:</p>
              <p className="mb-4">
                The content on this website, including details about our therapeutic segments (Cardiology, Diabetology, Neuro-Psychiatry, etc.), is for informational and educational purposes only. It is primarily intended for registered healthcare professionals.
              </p>
              <p>
                Nothing contained on this site should be construed as medical advice, diagnosis, or treatment. Patients must always consult a qualified physician for any health concerns or prescription requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">2. Intellectual Property</h2>
              <p className="mb-4">
                All content, logos, brand names (including LEOSART, GEMILEO, MEDCIUM, and others), graphics, and text on this website are the intellectual property of Medileo Healthcare Pvt. Ltd.
              </p>
              <p>
                Unauthorized use, reproduction, or distribution of this material without prior written consent from the company is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">3. Professional Product Information</h2>
              <p className="mb-4">
                While we strive to keep the product group information accurate and up to date, the information is subject to change without prior notice.
              </p>
              <p>
                Medileo Healthcare operates on a strategic formulation model, partnering with certified third-party WHO-GMP compliant facilities to deliver our products. The availability of specific formulations may vary across regions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">4. Limitation of Liability</h2>
              <p>
                Medileo Healthcare Pvt. Ltd. shall not be held liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use this website, or any reliance placed on the information provided herein.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">5. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India. Any legal disputes arising out of the use of this website shall be subject to the exclusive jurisdiction of the courts in Maharashtra, India.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
