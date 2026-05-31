import React from "react";
import Head from "next/head";
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <Head>
        <title>Error {statusCode || "Unknown"} | Medileo</title>
      </Head>
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-100">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">
          {statusCode ? `Error ${statusCode}` : "An error occurred"}
        </h1>
        <p className="text-slate-500 mb-8">
          {statusCode === 404
            ? "The page you are looking for could not be found. It may have been moved or deleted."
            : "An unexpected error occurred while processing your request. Our team has been notified."}
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center w-full px-6 py-3.5 text-base font-medium text-white transition-all bg-teal-600 border border-transparent rounded-xl hover:bg-teal-700 shadow-sm"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
