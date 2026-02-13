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
    <div className="tile-grid w-full min-h-screen bg-black gap-[3px] p-[3px]">
      {tasks.map((task) => (
        <Tile key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </div>
  );
}
