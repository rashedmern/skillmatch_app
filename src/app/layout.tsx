import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillMatch | Early-Career CSE Career Platform",
  description:
    "Land your dream CSE internship based on real code, not broken resumes. Automated GitHub AST verification and vector matching for early-career software engineers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${arimo.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col bg-surface text-on-surface font-sans selection:bg-secondary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
