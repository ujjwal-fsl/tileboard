"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createTask } from "@/lib/tasks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
}

export default function AddTaskModal({ isOpen, onClose, selectedDate, onOfflineSubmit }: AddTaskModalProps & { onOfflineSubmit?: () => void }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"small" | "medium" | "big">("small");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Initial check
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Fire and forget for offline to avoid blocking
      const promise = createTask({
        userId: user.uid,
        title,
        priority,
        category,
        note,
        date: selectedDate,
      });

      if (!isOffline) {
        await promise;
      } else {
        // If offline, don't wait for promise resolution (it waits for connection)
        // Just trigger the offline submit handler
        onOfflineSubmit?.();
      }
      
      // Reset form
      setTitle("");
      setPriority("small");
      setCategory("");
      setNote("");
      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
      if (!isOffline) {
        alert("Failed to create task. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          {isOffline && (
            <p className="text-sm text-yellow-600 font-medium mt-1">
              You are offline. Task will sync when connection returns.
            </p>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              required
              placeholder="What needs to be done?"
            />
          </div>

          <div className="grid gap-2">
            <Label>Priority</Label>
            <div className="flex gap-2 mt-2">
              {(["small", "medium", "big"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    priority === p
                      ? "bg-black text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  )}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category (Optional)</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              maxLength={30}
              placeholder="e.g. Work, Personal"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={500}
              placeholder="Add details..."
              className="resize-none h-24"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
