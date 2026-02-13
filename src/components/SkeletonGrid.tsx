"use client";

import { cn } from "@/lib/utils";

export default function SkeletonGrid() {
  // Static pattern of row spans to mimic a populated board
  const skeletons = [3, 2, 1, 2, 1, 3, 1, 2, 1, 1, 2]; 

  return (
    <div className="tile-grid w-full min-h-screen bg-black gap-[3px] p-[3px]">
      {skeletons.map((span, i) => (
        <div
          key={i}
          className="bg-muted/20 animate-pulse w-full h-full"
          style={{ gridRow: `span ${span}` }}
        />
      ))}
    </div>
  );
}
