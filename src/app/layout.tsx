import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { AuthProvider } from "@/components/providers/AuthProvider";

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
    <html lang="en" data-scroll-behavior="smooth" className={`${arimo.variable} antialiased`}>
      <body className="min-h-screen w-full flex flex-col bg-surface text-on-surface font-sans selection:bg-secondary/20 selection:text-primary">
        <AuthProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
