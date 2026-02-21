"use client";

import { Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Task } from "@/types/task";
import { cn, getPriorityLevel } from "@/lib/utils";
import { completeTask, updateTask } from "@/lib/tasks";

interface TileProps {
  task: Task;
  onClick: (task: Task) => void;
}

export default function Tile({ task, onClick }: TileProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Safety refs
  const prevStatusRef = useRef(task.status);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRenderRef = useRef(true);

  const priorityLevel = getPriorityLevel(task.priority);
  
  // Row span based on priority: 1, 2, or 3
  const rowSpan = `span ${priorityLevel}`;
  
  const textColor = task.status === "completed" ? "text-gray-500" : "text-gray-900";

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
      onClick={() => onClick(task)}
      style={{ 
        gridRow: rowSpan,
      }}
      className={cn(
        "relative p-3 rounded-[6px] cursor-pointer transition-all duration-200 ease-out",
        "min-h-[64px] md:min-h-[72px] flex flex-col justify-between",

        // Priority tint resolution: CF > completed > big > medium > small
        task.isCarriedForward
          ? "bg-amber-50 border border-amber-200"
          : task.status === "completed"
            ? "bg-[#F1F3F5] border border-black/[0.03]"
            : priorityLevel === 3
              ? "bg-[#FDE8E8] border border-black/[0.07]"
              : priorityLevel === 2
                ? "bg-[#FEF3E2] border border-black/[0.05]"
                : "bg-[#F8FAF9] border border-black/[0.04]",
        
        // Hover (Desktop only)
        "md:hover:-translate-y-[1px] md:hover:border-black/[0.10] md:hover:shadow-[0_0.5px_1px_rgba(0,0,0,0.02)]",
        
        // Completed state styling
        task.status === "completed" && "opacity-75 scale-[0.985]",
        isCompleting && "scale-[0.985]",
        textColor
      )}
    >

      {/* Completion Overlay */}
      {task.status === "completed" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Check 
            className={cn(
              "w-7 h-7 transition-all duration-300 ease-out text-gray-400/70",
              isCompleting ? "opacity-0 scale-75" : "opacity-70 scale-100"
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
             "absolute bottom-3 right-3 w-6 h-6 rounded-full border border-black/[0.08] flex items-center justify-center z-10",
             "bg-transparent hover:border-black/[0.15] transition-all duration-200"
          )}
        >
          {/* Minimal circle */}
        </button>
       )}


      <div className="flex flex-col h-full relative z-0">
        {/* Category Badge - muted */}
        {task.category && (
          <div className="absolute top-0 right-0 text-[10px] font-medium uppercase tracking-wider opacity-30">
            {task.category}
          </div>
        )}

        {/* Title */}
        <h3 className={cn(
          "font-[450] text-[15px] leading-snug tracking-tight line-clamp-3 mt-0.5",
          task.status === "completed" && "line-through decoration-black/10"
        )}>
          {task.title}
        </h3>
        
        {/* Note Indicator */}
        {task.note && (
          <div className="mt-auto pt-2 opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
