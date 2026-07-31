import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novussolutions.co"),
  title: {
    default: "Novus Solutions | AI Automation & Growth Systems for Local Business",
    template: "%s | Novus Solutions",
  },
  description:
    "Novus builds websites, AI chatbots, phone assistants, and follow-up systems for local Chicago businesses. Never miss another customer. Book a call.",
  keywords: [
    "AI automation Chicago",
    "local business AI",
    "AI chatbot",
    "AI phone assistant",
    "website development Chicago",
  ],
  openGraph: {
    title: "Novus Solutions | AI Automation for Local Business",
    description:
      "Websites, AI assistants, and follow-up systems for Chicago local business. Book a call.",
    url: "https://novussolutions.co",
    siteName: "Novus Solutions",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-navy-900 font-sans">
        <Navbar />
        <PageWrapper>{children}</PageWrapper>
        <Footer />
      </body>
    </html>
  );
}
