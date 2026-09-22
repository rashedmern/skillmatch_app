import React from "react";
import { HeroContent } from "./HeroContent";
import { LiveMatchCard } from "./LiveMatchCard";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-surface pt-4 pb-12 sm:pt-6 sm:pb-20 lg:pt-12 lg:pb-28">
      {/* 1. Ambient Background Mesh & Subtle Radial Teal Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[640px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[180px] left-1/2 -translate-x-1/2 w-[800px] max-w-[120vw] h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(10,136,125,0.12),transparent_75%)]" />
        <div className="absolute top-[100px] right-[5%] w-[450px] max-w-[80vw] h-[450px] bg-[radial-gradient(circle_at_center,rgba(9,89,100,0.08),transparent_70%)]" />
      </div>

      {/* 2. Main 12-Column Responsive Layout Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column (7 Columns): Value Proposition & CTAs */}
          <div className="w-full lg:col-span-7">
            <HeroContent />
          </div>

          {/* Right Column (5 Columns): Live AST Match Simulation Card */}
          <div className="w-full lg:col-span-5 mt-8 sm:mt-10 lg:mt-0">
            <LiveMatchCard />
          </div>
        </div>
      </div>
    </section>
  );
};
