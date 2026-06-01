import "@/styles/globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { useReportWebVitals } from "next/web-vitals";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export default function App({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    // Optionally route these metrics to a true analytics endpoint in the future
    // rather than dumping them into the public console.
  });

  return (
    <div className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col bg-[#f1f5f9] text-[#1e293b]`}>
      <CustomCursor />
      <TopBar />
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </div>
  );
}
