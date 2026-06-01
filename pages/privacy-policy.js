import React from "react";
import Head from "next/head";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Medileo Healthcare</title>
        <meta name="description" content="Privacy Policy for Medileo Healthcare Pvt. Ltd. Effective Date: January 1, 2026." />
      </Head>
      <SEO 
        title="Privacy Policy | Medileo Healthcare" 
        description="Privacy Policy for Medileo Healthcare Pvt. Ltd. Effective Date: January 1, 2026."
      />

      <div className="pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200/60">
          
          <header className="mb-12 border-b border-slate-100 pb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 tracking-tight">Privacy Policy</h1>
            <p className="text-teal-600 font-semibold tracking-wide uppercase text-sm">Effective Date: January 1, 2026</p>
          </header>

          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
            <p className="text-[1.05rem]">
              At Medileo Healthcare Pvt. Ltd., we are committed to protecting the privacy and confidentiality of the personal information shared with us. This Privacy Policy outlines how we collect, use and safeguard your data when you visit our website.
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">1. Information We Collect</h2>
              <p className="mb-4">We only collect personal information that you voluntarily provide to us through our business enquiry or contact forms. This may include:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
                <li>Full Name</li>
                <li>Profession (Doctor, Stockist, Distributor, etc.)</li>
                <li>Contact Number / WhatsApp Number</li>
                <li>Email Address</li>
                <li>Any message or query you submit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">2. How We Use Your Information</h2>
              <p className="mb-4">The information collected is used strictly for legitimate business purposes, including:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
                <li>Responding to your product enquiries or partnership requests.</li>
                <li>Providing updates about our product portfolio, such as the LEOSART Group, GEMILEO Group or MEDCIUM Group.</li>
                <li>Improving our website content and customer service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">3. Data Protection and Confidentiality</h2>
              <p className="mb-4">
                We implement industry-standard security measures to ensure that your personal data is protected against unauthorized access, alteration, or disclosure.
              </p>
              <p>
                We do not sell, trade, or rent your personal identification information to third parties. It is only shared with authorized internal teams to fulfill your requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">4. Cookies</h2>
              <p>
                Our website may use standard cookies to enhance user experience and analyze website traffic. You can choose to set your web browser to refuse cookies, though some parts of the website may not function properly as a result.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-serif">5. Changes to This Privacy Policy</h2>
              <p>
                Medileo Healthcare Pvt. Ltd. reserves the right to update this privacy policy at any time. We encourage users to frequently check this page for any changes.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
