import { Navbar } from "@/components/sections/navbar/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-surface">
      {/* 1. Sticky Navigation Header */}
      <Navbar />

      {/* 2. Page Content Canvas Wrapper (Next Section: Hero Component) */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-dashed border-stroke-card p-12 text-center bg-surface-container-lowest/40">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary-mint mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-mint animate-pulse" />
            Navbar Organism Live
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight font-sans">
            SkillMatch System — Oceanic Intelligence Design
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant max-w-lg mx-auto font-sans">
            The sticky navigation bar is active with AST network telemetry, command search (<kbd className="px-1.5 py-0.5 text-xs bg-surface-container-low border border-stroke-card rounded">⌘K</kbd>), and responsive mobile drawer.
          </p>
        </div>
      </div>
    </main>
  );
}
