"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { updateTask, completeTask, deleteTask } from "@/lib/tasks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Trash2, Check } from "lucide-react";

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditTaskModal({ task, isOpen, onClose }: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"small" | "medium" | "big">("small");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setCategory(task.category || "");
      setNote(task.note || "");
    }
  }, [task]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    
    setIsSubmitting(true);
    try {
      await updateTask(task.id, {
        title,
        priority,
        category,
        note,
      });
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = async () => {
    if (!task) return;
    if (confirm("Mark this task as completed?")) {
      try {
        await completeTask(task.id);
        onClose();
      } catch (error) {
        console.error("Failed to complete task:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    if (confirm("Are you sure you want to delete this task? This cannot be undone.")) {
      try {
        await deleteTask(task.id);
        onClose();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };



  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              required
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
            <Label htmlFor="edit-category">Category</Label>
            <Input
              id="edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              maxLength={30}
              placeholder="None"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-note">Note</Label>
            <Textarea
              id="edit-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={500}
              className="resize-none h-24"
            />
          </div>

          <DialogFooter className="flex justify-between items-center sm:justify-between w-full mt-4">
             <div className="flex gap-2">
              <Button 
                type="button" 
                variant="destructive" 
                size="icon"
                onClick={handleDelete}
                title="Delete Task"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {task.status !== "completed" && (
                <Button 
                  type="button" 
                  variant="secondary" 
                  size="icon"
                  onClick={handleComplete}
                  title="Mark Complete"
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
             </div>
             <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Save Changes
              </Button>
             </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
