"use client";

import { Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Task } from "@/types/task";
import { cn, getPriorityLevel } from "@/lib/utils";
import { completeTask } from "@/lib/tasks";
import { setSpatialOrigin } from "@/lib/spatialContinuity";
import { resolveTaskIdentity, resolveTaskAppearance } from "@/lib/appearanceResolver";
import { useTheme } from "@/contexts/ThemeContext";

interface TileProps {
  task: Task;
  onClick: (task: Task) => void;
  index: number;
}

export default function Tile({ task, onClick, index }: TileProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Safety refs
  const prevStatusRef = useRef(task.status);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRenderRef = useRef(true);
  const tileRef = useRef<HTMLDivElement>(null);
  const priorityLevel = getPriorityLevel(task.priority);
  const { activeVisualStyle, resolvedMode } = useTheme();
  const rowSpan = `span ${priorityLevel}`;
  // Resolve visual identity and styles from styling library
  const identity = resolveTaskIdentity(task);
  const appearance = resolveTaskAppearance(identity, activeVisualStyle, resolvedMode);

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
        "min-h-[64px] md:min-h-[72px] flex flex-col justify-between",
        appearance.background,
        appearance.border,
        appearance.text,
        appearance.padding,
        appearance.shadowClass,
        appearance.hoverClass,
        appearance.interactiveClass,
        appearance.completedClass,
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
              appearance.checkmark,
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
          <div className={appearance.category}>
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
