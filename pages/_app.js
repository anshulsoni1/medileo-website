import "@/styles/globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";

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
  return (
    <div className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col bg-[#f1f5f9] text-[#1e293b]`}>
      <TopBar />
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
