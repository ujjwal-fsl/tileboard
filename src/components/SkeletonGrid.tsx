"use client";

import { cn } from "@/lib/utils";

export default function SkeletonGrid() {
  // Static pattern of row spans to mimic a populated board
  const skeletons = [3, 2, 1, 2, 1, 3, 1, 2, 1, 1, 2]; 

  return (
    <div className="tile-grid w-full min-h-screen bg-transparent gap-[5px] px-3 pb-24 pt-1">
      {skeletons.map((span, i) => (
        <div
          key={i}
          className="bg-black/[0.03] rounded-[8px] w-full h-full skeleton-shimmer"
          style={{ gridRow: `span ${span}`, animationDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
  );
}
