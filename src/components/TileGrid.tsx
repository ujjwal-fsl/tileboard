"use client";

import { Task } from "@/types/task";
import Tile from "./Tile";

interface TileGridProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function TileGrid({ tasks, onTaskClick }: TileGridProps) {
  if (tasks.length === 0) {
    return null; // Empty state handled by parent or separate component
  }

  return (
    <div className="tile-grid w-full bg-transparent gap-[5px] px-3 pb-24 pt-1">
      {tasks.map((task, index) => (
        <Tile key={task.id} task={task} onClick={onTaskClick} index={index} />
      ))}
    </div>
  );
}
