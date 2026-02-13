"use client";

import { useState, useEffect, useRef } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import TileGrid from "@/components/TileGrid";
import { Task } from "@/types/task";
import { subscribeToTasks } from "@/lib/tasks";
import { getTodayDateString } from "@/lib/utils";
import AddTaskModal from "@/components/AddTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import SkeletonGrid from "@/components/SkeletonGrid";
import DateNav from "@/components/DateNav";
import { Plus, AlertCircle } from "lucide-react";

export default function Home() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  
  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToTasks(
      user.uid, 
      selectedDate, 
      (fetchedTasks) => {
        setTasks(fetchedTasks);
        setLoading(false);
      },
      (err) => {
        console.error("Subscription Error:", err);
        setError("Failed to load tasks. Please check your connection.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, authLoading, selectedDate]);

  // Banner state
  const [offlineNotification, setOfflineNotification] = useState(false);
  const bannerTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setOfflineNotification(false);
      if (bannerTimerRef.current) {
        clearTimeout(bannerTimerRef.current);
        bannerTimerRef.current = null;
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  const handleOfflineSubmit = () => {
    if (bannerTimerRef.current) {
      clearTimeout(bannerTimerRef.current);
    }
    setOfflineNotification(true);
    bannerTimerRef.current = setTimeout(() => {
      setOfflineNotification(false);
      bannerTimerRef.current = null;
    }, 3000);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedTask(null);
  };

  const isToday = selectedDate === getTodayDateString();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background flex flex-col relative pb-20 transition-colors duration-300">
        <header className="p-4 border-b flex flex-col bg-white sticky top-0 z-10 shadow-sm gap-4">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl font-bold tracking-tight">TileBoard</h1>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign Out</Button>
          </div>
          
          <DateNav 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />
        </header>

        {/* Error State */}
        {error && (
          <div className="p-4 m-4 bg-destructive/10 text-destructive rounded-md flex items-center gap-2 text-sm justify-center">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )}

        {/* Offline Notification Banner */}
        {offlineNotification && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            Task queued. Will sync when online.
          </div>
        )}

        {/* Board Content */}
        {loading ? (
          <SkeletonGrid />
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow p-8 text-center min-h-[50vh] animate-in fade-in duration-500">
            <p className="text-lg text-muted-foreground mb-4">
              {isToday ? "No tasks for today." : "No tasks for this day."}
            </p>
            <Button onClick={() => setIsAddOpen(true)}>+ Add Task</Button>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            <TileGrid tasks={tasks} onTaskClick={handleTaskClick} />
          </div>
        )}

        {/* Floating Add Button */}
        {!loading && (
          <Button
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-20 transition-transform active:scale-95"
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
          onOfflineSubmit={handleOfflineSubmit}
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
