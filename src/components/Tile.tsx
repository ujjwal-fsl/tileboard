"use client";

import { Check } from "lucide-react";
import { useState, useEffect, useRef, useContext } from "react";
import { Task } from "@/types/task";
import { cn, getPriorityLevel } from "@/lib/utils";
import { completeTask, updateTask } from "@/lib/tasks";
import { setSpatialOrigin } from "@/lib/spatialContinuity";
import { resolveTaskIdentity } from "@/lib/paletteResolver";
import { resolveTaskAppearance } from "@/lib/appearanceResolver";
import ThemeContext from "@/contexts/ThemeContext";

interface TileProps {
  task: Task;
  onClick: (task: Task) => void;
  index: number;
}

export default function Tile({ task, onClick, index }: TileProps) {
  const [optimisticStatus, setOptimisticStatus] = useState<"active" | "completed" | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const themeContext = useContext(ThemeContext);
  
  // Effective task status (optimistic or persisted)
  const currentStatus = optimisticStatus ?? task.status;
  const isCompleted = currentStatus === "completed";

  // Reset optimistic state when props update
  useEffect(() => {
    setOptimisticStatus(null);
  }, [task.status]);

  // Safety refs
  const prevStatusRef = useRef(currentStatus);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRenderRef = useRef(true);
  const tileRef = useRef<HTMLDivElement>(null);

  const priorityLevel = getPriorityLevel(task.priority);
  
  // Row span based on priority: 1, 2, or 3
  const rowSpan = `span ${priorityLevel}`;
  
  // Resolve permanent color identity and appearance
  const identity = resolveTaskIdentity(task);
  const appearance = resolveTaskAppearance(identity, {
    theme: themeContext?.activeVisualStyle?.id,
    appearance: themeContext?.resolvedMode,
  });

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevStatusRef.current = currentStatus;
      return;
    }

    const prevStatus = prevStatusRef.current;
    const newStatus = currentStatus;

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
  }, [currentStatus]);

  const handleToggleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const nextStatus = isCompleted ? "active" : "completed";
    setOptimisticStatus(nextStatus);

    try {
      if (nextStatus === "completed") {
        await completeTask(task.id);
      } else {
        await updateTask(task.id, { status: "active" });
      }
    } catch (error) {
      console.error("Failed to update task completion:", error);
      // Revert optimistic update on failure
      setOptimisticStatus(task.status);
    }
  };

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
        backgroundColor: appearance.backgroundColor,
        borderColor: appearance.borderColor,
        color: appearance.textColor,
        transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
        animation: `tile-enter 250ms cubic-bezier(0.2, 0, 0, 1) ${Math.min(index * 30, 300)}ms both`
      }}
      className={cn(
        "relative rounded-[8px] cursor-pointer transition-[transform,box-shadow,border-color,opacity,background-color] duration-150 border",
        priorityLevel >= 3 ? "p-3.5" : "p-3",
        "min-h-[64px] md:min-h-[72px] flex flex-col justify-between",
        
        // Hover & Press (Desktop only, guarded against completed tasks)
        !isCompleted && "md:hover:-translate-y-[1px] md:hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0.5px_1px_rgba(0,0,0,0.03)]",
        !isCompleted && "md:active:scale-[0.98] md:active:translate-y-0 md:active:shadow-none",
        
        // Completed state styling
        isCompleted && "opacity-75 scale-[0.985]",
        isCompleting && "scale-[0.985]"
      )}
    >
      <div className="flex flex-col h-full relative z-0">
        {/* Category Badge - separate row above title on mobile; absolute top-right on desktop */}
        {task.category && (
          <div className="text-[10px] font-medium uppercase tracking-[0.06em] opacity-35 sm:opacity-25 sm:absolute sm:top-0 sm:right-0 mb-1 sm:mb-0 leading-tight select-none truncate">
            {task.category}
          </div>
        )}

        {/* Title */}
        <h3 className={cn(
          "font-[460] text-[14.5px] leading-[1.35] tracking-[-0.01em] line-clamp-3",
          task.category ? "sm:mt-0.5 sm:pr-14" : "mt-0.5",
          isCompleted && "line-through decoration-gray-300/40 font-[420]"
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

      {/* Complete Button / Task Completion Control with 44x44 touch target */}
      <button
        type="button"
        aria-label={isCompleted ? "Mark task as incomplete" : "Mark task as completed"}
        onClick={handleToggleComplete}
        className={cn(
          "absolute bottom-0.5 right-0.5 w-11 h-11 flex items-center justify-center z-10",
          "rounded-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-400/60"
        )}
      >
        <span
          className={cn(
            "w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all duration-150 shrink-0",
            isCompleted
              ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 border border-stone-800 dark:border-stone-200 shadow-2xs"
              : "border-[1.5px] border-black/30 dark:border-white/35 bg-white/40 dark:bg-black/20 md:hover:border-black/55 md:hover:bg-white/75 active:scale-90"
          )}
        >
          {isCompleted && (
            <Check 
              size={14} 
              strokeWidth={2.5} 
              className="w-3.5 h-3.5 text-white dark:text-stone-900 shrink-0 pointer-events-none" 
            />
          )}
        </span>
      </button>
    </div>
  );
}
