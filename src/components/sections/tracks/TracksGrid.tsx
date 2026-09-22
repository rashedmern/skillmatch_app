import React from "react";
import { CSE_TRACKS } from "@/data/tracksData";
import { TrackCard } from "./TrackCard";

export const TracksGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
      {CSE_TRACKS.map((track) => {
        // Map colSpanDesktop to explicit Tailwind classes for 3+2 layout on desktop
        // and full width on the 5th item for tablet screens
        const desktopSpanClass =
          track.colSpanDesktop === 2
            ? "lg:col-span-2"
            : "lg:col-span-3 last:md:col-span-2";

        return (
          <div key={track.id} className={`${desktopSpanClass} flex flex-col`}>
            <TrackCard track={track} className="h-full" />
          </div>
        );
      })}
    </div>
  );
};
