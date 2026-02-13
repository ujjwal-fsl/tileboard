"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import TileGrid from "@/components/TileGrid";
import { Task } from "@/types/task";
import { subscribeToTasks } from "@/lib/tasks";
import { getTodayDateString, formatDate } from "@/lib/utils";
import AddTaskModal from "@/components/AddTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Plus } from "lucide-react";

export default function Home() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  
  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;

    setLoading(true);
    const unsubscribe = subscribeToTasks(user.uid, selectedDate, (fetchedTasks) => {
      setTasks(fetchedTasks);
      setLoading(false);
      console.log("Fetched tasks:", fetchedTasks);
    });

    return () => unsubscribe();
  }, [user, authLoading, selectedDate]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedTask(null);
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background flex flex-col relative pb-20">
        <header className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-xl font-bold">TileBoard</h1>
            <p className="text-xs text-muted-foreground">{formatDate(selectedDate)}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign Out</Button>
        </header>

        {/* Board Content */}
        {loading ? (
          <LoadingSpinner />
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow p-8 text-center min-h-[50vh]">
            <p className="text-lg text-muted-foreground mb-4">No tasks for today.</p>
            <Button onClick={() => setIsAddOpen(true)}>+ Add Task</Button>
          </div>
        ) : (
          <TileGrid tasks={tasks} onTaskClick={handleTaskClick} />
        )}

        {/* Floating Add Button (if tasks exist) */}
        {tasks.length > 0 && (
          <Button
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-20"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        )}

        {/* Modals */}
        <AddTaskModal 
          isOpen={isAddOpen} 
          onClose={() => setIsAddOpen(false)} 
          selectedDate={selectedDate} 
        />
        
        <EditTaskModal 
          isOpen={isEditOpen} 
          onClose={handleCloseEdit} 
          task={selectedTask} 
        />
        
      </main>
    </ProtectedRoute>
  );
}
