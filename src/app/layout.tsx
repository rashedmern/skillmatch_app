import type { Metadata } from "next";
import { Arimo, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { LanguageProvider } from "@/context/LanguageContext";

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillMatch | Early-Career CSE Career Platform",
  description:
    "Land your dream CSE internship based on real code, not broken resumes. Automated GitHub AST verification and vector matching for early-career software engineers.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/skillmatch-app-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/images/skillmatch-oauth-logo.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${arimo.variable} ${bebasNeue.variable} antialiased`}>
      <body className="min-h-screen w-full flex flex-col bg-surface text-on-surface font-sans selection:bg-secondary/20 selection:text-primary">
        <AuthProvider>
          <LanguageProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
