import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Asif Mahmud — AI Engineer & Full Stack Developer",
    template: "%s | Asif Mahmud",
  },
  description:
    "AI Engineer from Dhaka, Bangladesh. Specializing in medical imaging, NLP, and full-stack development. BSc CSE graduate from KUET.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "Computer Vision",
    "Python",
    "Next.js",
    "FastAPI",
    "Portfolio",
  ],
  authors: [{ name: "Asif Mahmud", url: "https://github.com/Magnificent-steiner0" }],
  creator: "Asif Mahmud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://magnificent-steiner0.github.io/portfolio",
    siteName: "Asif Mahmud Portfolio",
    title: "Asif Mahmud — AI Engineer & Full Stack Developer",
    description:
      "AI Engineer from Dhaka, Bangladesh. Specializing in medical imaging, NLP, and full-stack development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asif Mahmud — AI Engineer & Full Stack Developer",
    description: "AI Engineer from Dhaka, Bangladesh.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
