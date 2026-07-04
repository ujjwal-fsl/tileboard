"use client";

import { Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Task } from "@/types/task";
import { cn, getPriorityLevel } from "@/lib/utils";
import { completeTask } from "@/lib/tasks";
import { setSpatialOrigin } from "@/lib/spatialContinuity";
import { resolveTaskIdentity, resolveTaskVisualStyle } from "@/lib/colors";

interface TileProps {
  task: Task;
  onClick: (task: Task) => void;
  index: number;
}

const TAILWIND_CLASS_MAP = {
  bg: {
    // Honey
    "palette-01-low": "bg-[#FAF7F0]",
    "palette-01-medium": "bg-[#F5EEDB]",
    "palette-01-high": "bg-[#F0DEC1]",
    "palette-01-completed": "bg-[#F3EFE7]",
    // Sunflower
    "palette-02-low": "bg-[#FAF6ED]",
    "palette-02-medium": "bg-[#F4E8CD]",
    "palette-02-high": "bg-[#ECD6A5]",
    "palette-02-completed": "bg-[#EFE8DB]",
    // Peach
    "palette-03-low": "bg-[#FAF4EF]",
    "palette-03-medium": "bg-[#F6E9DF]",
    "palette-03-high": "bg-[#F1D8C9]",
    "palette-03-completed": "bg-[#EEE5DE]",
    // Terracotta
    "palette-04-low": "bg-[#FAF3EE]",
    "palette-04-medium": "bg-[#F5DFD5]",
    "palette-04-high": "bg-[#ECC5B4]",
    "palette-04-completed": "bg-[#EDE1DB]",
    // Rose
    "palette-05-low": "bg-[#FAF2EF]",
    "palette-05-medium": "bg-[#F5E4DF]",
    "palette-05-high": "bg-[#EFD1C8]",
    "palette-05-completed": "bg-[#EDE2DE]",
    // Sage
    "palette-06-low": "bg-[#F4FAF2]",
    "palette-06-medium": "bg-[#E8F4E4]",
    "palette-06-high": "bg-[#D5EAD0]",
    "palette-06-completed": "bg-[#E2ECE0]",
    // Mint
    "palette-07-low": "bg-[#F2FAF6]",
    "palette-07-medium": "bg-[#DFF3E9]",
    "palette-07-high": "bg-[#C3EADB]",
    "palette-07-completed": "bg-[#DFEBE7]",
    // Teal
    "palette-08-low": "bg-[#F1FAF9]",
    "palette-08-medium": "bg-[#DEF3F0]",
    "palette-08-high": "bg-[#C3EBE6]",
    "palette-08-completed": "bg-[#DFECEB]",
    // Powder Blue
    "palette-09-low": "bg-[#F1F5FA]",
    "palette-09-medium": "bg-[#E4ECF5]",
    "palette-09-high": "bg-[#CADDF0]",
    "palette-09-completed": "bg-[#DFE5EC]",
    // Lavender
    "palette-10-low": "bg-[#F5F2FA]",
    "palette-10-medium": "bg-[#ECE6F5]",
    "palette-10-high": "bg-[#DBD1ED]",
    "palette-10-completed": "bg-[#E6E1EC]",
    // Lilac
    "palette-11-low": "bg-[#F8F2FA]",
    "palette-11-medium": "bg-[#F0E3F5]",
    "palette-11-high": "bg-[#E6CEF0]",
    "palette-11-completed": "bg-[#EAE1EC]",
    // Oat
    "palette-12-low": "bg-[#FAF6F2]",
    "palette-12-medium": "bg-[#F4ECE4]",
    "palette-12-high": "bg-[#ECDDCF]",
    "palette-12-completed": "bg-[#ECE6E1]",
    // Carry forward
    "cf-bg": "bg-[#FFFBEB]",
  },
  border: {
    "default-border": "border border-black/[0.04]",
    "completed-border": "border border-black/[0.03]",
    "cf-border": "border border-amber-600/[0.12]",
  },
  text: {
    "default-text": "text-gray-900",
    "completed-text": "text-gray-500",
  },
  category: {
    "default-category": "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    "completed-category": "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-500/40",
  },
  checkmark: {
    "default-checkmark": "text-gray-500",
    "completed-checkmark": "text-gray-500",
  }
} as const;

export default function Tile({ task, onClick, index }: TileProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Safety refs
  const prevStatusRef = useRef(task.status);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRenderRef = useRef(true);
  const tileRef = useRef<HTMLDivElement>(null);

  const priorityLevel = getPriorityLevel(task.priority);
  
  // Row span based on priority: 1, 2, or 3
  const rowSpan = `span ${priorityLevel}`;

  // Resolve visual identity and styles from styling library
  const identity = resolveTaskIdentity(task);
  const tokens = resolveTaskVisualStyle(identity);

  const bgClass = TAILWIND_CLASS_MAP.bg[tokens.bgToken as keyof typeof TAILWIND_CLASS_MAP.bg] || "bg-[#FAF6F2]";
  const borderClass = TAILWIND_CLASS_MAP.border[tokens.borderToken];
  const textClass = TAILWIND_CLASS_MAP.text[tokens.textToken];
  const categoryClass = TAILWIND_CLASS_MAP.category[tokens.categoryToken];
  const checkmarkClass = TAILWIND_CLASS_MAP.checkmark[tokens.checkmarkToken];

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevStatusRef.current = task.status;
      return;
    }

    const prevStatus = prevStatusRef.current;
    const newStatus = task.status;

    // Trigger animation ONLY for active -> completed
    if (prevStatus === "active" && newStatus === "completed") {
      setIsCompleting(true);
      
      // Clear existing timer safely
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsCompleting(false);
      }, 300);
    }

    prevStatusRef.current = newStatus;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [task.status]);

  return (
    <div
      ref={tileRef}
      onClick={(e) => {
        if (tileRef.current) {
          setSpatialOrigin(tileRef.current.getBoundingClientRect(), tileRef.current);
        }
        onClick(task);
      }}
      style={{ 
        gridRow: rowSpan,
        transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
        animation: `tile-enter 250ms cubic-bezier(0.2, 0, 0, 1) ${Math.min(index * 30, 300)}ms both`
      }}
      className={cn(
        "relative rounded-[8px] cursor-pointer transition-[transform,box-shadow,border-color,opacity] duration-150",
        priorityLevel >= 3 ? "p-3.5" : "p-3",
        "min-h-[64px] md:min-h-[72px] flex flex-col justify-between",
        bgClass,
        borderClass,
        textClass,
        
        // Hover & Press (Desktop only, guarded against completed tasks)
        task.status !== "completed" && "md:hover:-translate-y-[1px] md:hover:border-black/[0.08] md:hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0.5px_1px_rgba(0,0,0,0.03)]",
        task.status !== "completed" && "md:active:scale-[0.98] md:active:translate-y-0 md:active:shadow-none md:active:border-black/[0.06]",
        
        // Completed state styling
        task.status === "completed" && "opacity-70 scale-[0.98]",
        isCompleting && "scale-[0.985]"
      )}
    >

      {/* Completion Overlay */}
      {task.status === "completed" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Check 
            style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)' }}
            className={cn(
              "w-7 h-7 transition-[opacity,transform] duration-250",
              checkmarkClass,
              isCompleting ? "opacity-0 scale-75" : "opacity-100 scale-100"
            )} 
            strokeWidth={2.5}
          />
        </div>
      )}

      {/* Complete Button */}
       {task.status !== "completed" && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            completeTask(task.id);
          }}
          className={cn(
             "absolute bottom-3 right-3 w-5 h-5 rounded-full border border-black/[0.08] flex items-center justify-center z-10",
             "bg-transparent transition-[border-color,background-color,transform] duration-150",
             "md:hover:border-black/[0.14] md:hover:bg-black/[0.02]",
             "md:active:scale-[0.9]"
          )}
        >
          {/* Minimal circle */}
        </button>
       )}


      <div className="flex flex-col h-full relative z-0">
        {/* Category Badge - muted */}
        {task.category && (
          <div className={categoryClass}>
            {task.category}
          </div>
        )}

        {/* Title */}
        <h3 className={cn(
          "font-[460] text-[14.5px] leading-[1.35] tracking-[-0.01em] line-clamp-3 mt-0.5",
          task.status === "completed" && "line-through decoration-gray-300/40 font-[420]"
        )}>
          {task.title}
        </h3>
        
        {/* Note Indicator */}
        {task.note && (
          <div className="mt-auto pt-2 opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
