"use client";

import { Check } from "lucide-react";
import { Task } from "@/types/task";
import { cn, getPriorityLevel } from "@/lib/utils";
import { completeTask, updateTask } from "@/lib/tasks";

interface TileProps {
  task: Task;
  onClick: (task: Task) => void;
}

export default function Tile({ task, onClick }: TileProps) {
  const priorityLevel = getPriorityLevel(task.priority);
  
  // Row span based on priority: 1, 2, or 3
  const rowSpan = `span ${priorityLevel}`;
  
  // Deterministic text color: Big = white, Small/Medium = black
  const textColor = task.priority === "big" ? "text-white" : "text-black";

  return (
    <div
      onClick={() => onClick(task)}
      style={{ 
        backgroundColor: task.color,
        gridRow: rowSpan,
      }}
      className={cn(
        "relative p-4 cursor-pointer transition-colors duration-200 hover:brightness-90",
        // Completed state styling
        task.status === "completed" && "grayscale opacity-60",
        textColor
      )}
    >
      {/* Completion Overlay */}
      {task.status === "completed" ? (
        // Completed State: Centered Overlay
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-70">
          <Check 
            className={cn(
              "w-7 h-7", // ~28px
              // If tile background is dark (Big), use white/80. Else black/60.
              task.priority === "big" ? "text-white/80" : "text-black/60"
            )} 
            strokeWidth={3}
          />
        </div>
      ) : (
        // Active State: Bottom Button
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            completeTask(task.id);
          }}
          className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/70 hover:bg-white/90 flex items-center justify-center transition hover:scale-105 active:scale-95 shadow-sm backdrop-blur-sm z-10"
        >
          <Check size={16} className="opacity-70" />
        </button>
      )}

      <div className="flex flex-col h-full">
        {/* Category Badge */}
        {task.category && (
          <div className="absolute top-2 right-2 text-xs font-medium uppercase tracking-wider opacity-70">
            {task.category}
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-lg leading-tight line-clamp-3 mt-1">
          {task.title}
        </h3>
        
        {/* Note Indicator (optional) */}
        {task.note && (
          <div className="mt-auto pt-2 opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
