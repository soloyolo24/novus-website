import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";
import ChatWidget from "./components/ChatWidget";
import StructuredData from "./components/StructuredData";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novussolutions.co"),
  title: {
    default: "Novus Solutions | Technology & Business Growth for Auto Shops",
    template: "%s | Novus Solutions",
  },
  description:
    "Novus builds websites, AI phone assistants, and follow-up systems for Chicago auto shops. Stop losing customers to missed calls. Book a free audit.",
  keywords: [
    "auto shop AI Chicago",
    "AI phone assistant auto repair",
    "missed call text back",
    "auto repair shop website",
    "automotive lead follow-up",
  ],
  openGraph: {
    title: "Novus Solutions | Technology & Business Growth for Auto Shops",
    description:
      "Your shop has an old way. We build the new one. Websites, AI assistants, and follow-up systems for Chicago auto shops.",
    url: "https://novussolutions.co",
    siteName: "Novus Solutions",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-ink-900 font-sans">
        <StructuredData />
        <Navbar />
        <PageWrapper>{children}</PageWrapper>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
