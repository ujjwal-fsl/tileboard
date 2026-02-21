"use client";

import { useState, useEffect, useRef } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import TileGrid from "@/components/TileGrid";
import { Task } from "@/types/task";
import { subscribeToTasks, subscribeToCarryForwardTasks } from "@/lib/tasks";
import { getTodayDateString, getYesterdayDateString } from "@/lib/utils";
import { updateDailySnapshot, getSnapshot } from "@/lib/snapshots";
import AddTaskModal from "@/components/AddTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import SkeletonGrid from "@/components/SkeletonGrid";
import DateNav from "@/components/DateNav";
import { Plus, AlertCircle } from "lucide-react";
import { getGreeting } from "@/lib/greeting";
import { cn } from "@/lib/utils";

export default function Home() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [carryForwardTasks, setCarryForwardTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [yesterdaySnapshot, setYesterdaySnapshot] = useState<{
    totalCount: number;
    completedCount: number;
  } | null>(null);
  
  // Greeting state
  const [greeting, setGreeting] = useState<{line1: string, line2: string} | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setGreeting({ line1: "Good day.", line2: "One step at a time." });
    } else {
      setGreeting(getGreeting(user.displayName || undefined));
    }
  }, [user, authLoading]);

  // Carry Forward Subscription
  useEffect(() => {
    if (authLoading || !user) return;

    if (selectedDate === getTodayDateString()) {
      const unsubscribe = subscribeToCarryForwardTasks(user.uid, selectedDate, (carriedTasks) => {
        setCarryForwardTasks(carriedTasks);
      });
      return () => unsubscribe();
    } else {
      setCarryForwardTasks([]);
    }
  }, [user, authLoading, selectedDate]);

  // Gentle Reflection Subscription
  useEffect(() => {
    if (authLoading || !user) {
      setYesterdaySnapshot(null);
      return;
    }

    const isToday = selectedDate === getTodayDateString();
    
    if (isToday) {
      const yesterday = getYesterdayDateString(selectedDate);
      getSnapshot(user.uid, yesterday).then((snapshot) => {
        setYesterdaySnapshot(snapshot);
      });
    } else {
      setYesterdaySnapshot(null);
    }
  }, [user, authLoading, selectedDate]);

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
        
        // Silent snapshot update
        if (user && user.uid && !authLoading) {
          updateDailySnapshot(user.uid, selectedDate, fetchedTasks);
        }
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

  // Scroll state for header interaction
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isToday = selectedDate === getTodayDateString();

  // Merge carry-forward tasks with today's tasks
  // Filter out any carry-forward tasks that technically have today's date (safety check, though query handles date < today)
  const mergedTasks = isToday 
    ? [...carryForwardTasks.filter(t => t.date !== selectedDate), ...tasks]
    : tasks;

  return (
    <ProtectedRoute>
      <main className="flex flex-col min-h-screen bg-transparent">
        <header 
          className={cn(
            "p-4 flex flex-col sticky top-0 z-10 gap-4 transition-all duration-300 ease-in-out",
            isScrolled 
              ? "bg-[rgba(250,250,248,0.75)] backdrop-blur-[6px] border-b border-black/[0.04] py-3" 
              : "bg-transparent border-transparent pt-6 pb-2"
          )}
        >
          <div className="flex justify-between items-center w-full">
            {greeting ? (
              <div className="flex flex-col">
                <span className="text-[18px] font-[450] tracking-tight text-foreground leading-tight">{greeting.line1}</span>
                <span className="text-[13px] text-muted-foreground font-normal">{greeting.line2}</span>
              </div>
            ) : (
              <div className="h-10" />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm font-medium transition-all duration-150 hover:bg-muted/80"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-[12px]">
                      {user?.displayName?.charAt(0) || "U"}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  {user?.email}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {yesterdaySnapshot && yesterdaySnapshot.totalCount > 0 && isToday && (
            <div className="text-sm text-muted-foreground px-1 animate-in fade-in duration-500">
              {yesterdaySnapshot.completedCount === yesterdaySnapshot.totalCount
                ? "Yesterday, you completed everything you set out to do."
                : `Yesterday, you completed ${yesterdaySnapshot.completedCount} of ${yesterdaySnapshot.totalCount} things.`}
            </div>
          )}

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
        ) : mergedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow p-8 text-center min-h-[50vh] animate-in fade-in duration-500">
            <p className="text-lg text-muted-foreground mb-4">
              {isToday ? "No tasks for today." : "No tasks for this day."}
            </p>
            <Button onClick={() => setIsAddOpen(true)}>+ Add Task</Button>
          </div>
        ) : (
          <div className="flex-1 min-h-0 bg-transparent animate-in fade-in duration-300">
            <TileGrid tasks={mergedTasks} onTaskClick={handleTaskClick} />
          </div>
        )}

        {/* Floating Add Button */}
        {!loading && (
          <button
            className="fixed bottom-6 right-6 w-14 h-14 rounded-[8px] bg-[#111827] text-white flex items-center justify-center z-20 transition-all duration-200 hover:scale-[1.04] active:scale-[0.96]"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </button>
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
