"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
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
import LinkifiedText from "./LinkifiedText";
import { getSpatialOrigin, clearSpatialOrigin } from "@/lib/spatialContinuity";

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
  const [isEditingNote, setIsEditingNote] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const origin = getSpatialOrigin();
    const modal = modalRef.current;

    if (!origin || !modal) return;

    const modalRect = modal.getBoundingClientRect();

    const dx = origin.rect.left - modalRect.left;
    const dy = origin.rect.top - modalRect.top;
    const scale = origin.rect.width / modalRect.width;

    modal.style.transformOrigin = "top left";
    modal.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    modal.style.opacity = "0";

    const backdrop = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement;
    if (backdrop) {
      backdrop.style.opacity = "0";
      backdrop.style.transition = "none";
    }

    if (origin.element) {
      origin.element.style.opacity = "0.92";
      origin.element.style.transition = "opacity 120ms ease-out";
    }

    requestAnimationFrame(() => {
      modal.style.transition =
        "transform 180ms cubic-bezier(0.2,0,0,1), opacity 180ms cubic-bezier(0.2,0,0,1)";
      modal.style.transform = "translate(0,0) scale(1)";
      modal.style.opacity = "1";

      if (backdrop) {
        backdrop.style.transition = "opacity 180ms cubic-bezier(0.2, 0, 0, 1)";
        backdrop.style.opacity = "1";
      }
    });

  }, [isOpen]);

  const handleClose = () => {
    const modal = modalRef.current;
    const origin = getSpatialOrigin();

    if (modal && origin) {
      const modalRect = modal.getBoundingClientRect();
      const dx = origin.rect.left - modalRect.left;
      const dy = origin.rect.top - modalRect.top;
      const scale = origin.rect.width / modalRect.width;

      modal.style.transition = "transform 160ms cubic-bezier(0.4, 0, 1, 1), opacity 160ms cubic-bezier(0.4, 0, 1, 1)";
      modal.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      modal.style.opacity = "0";

      const backdrop = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement;
      if (backdrop) {
        backdrop.style.transition = "opacity 160ms cubic-bezier(0.4, 0, 1, 1)";
        backdrop.style.opacity = "0";
      }

      if (origin.element) {
        origin.element.style.opacity = "1";
      }

      setTimeout(() => {
        clearSpatialOrigin();
        onClose();
      }, 160);
    } else if (modal) {
      modal.style.transition =
        "transform 140ms cubic-bezier(0.2,0,0,1), opacity 140ms cubic-bezier(0.2,0,0,1)";
      modal.style.transform = "scale(0.98)";
      modal.style.opacity = "0";
      setTimeout(() => {
        clearSpatialOrigin();
        onClose();
      }, 140);
    } else {
      clearSpatialOrigin();
      onClose();
    }
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setCategory(task.category || "");
      setNote(task.note || "");
      setIsEditingNote(false);
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
      handleClose();
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
        handleClose();
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
        handleClose();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };



  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent ref={modalRef} className="sm:max-w-[425px] rounded-[6px] border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] bg-background px-5 pt-5 pb-4">
        <DialogHeader>
          <DialogTitle className="font-[500] tracking-tight text-[18px] text-foreground">Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="grid gap-4 py-4">
          <div className="mt-3 gap-1">
            <Label htmlFor="edit-title" className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              required
              autoFocus
              className="text-[16px] font-[450] tracking-tight text-gray-900 placeholder:text-gray-400 border-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 transition-all duration-150 ease-out"
            />
          </div>

          <div className="mt-3 gap-1">
            <Label className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">Priority</Label>
            <div className="flex gap-2 mt-1">
              {(["small", "medium", "big"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-[6px] transition-all duration-150 ease-out active:scale-[0.97]",
                    priority === p
                      ? "bg-foreground text-background border border-transparent"
                      : "bg-muted/50 text-muted-foreground border border-black/[0.06] hover:bg-muted hover:text-gray-900"
                  )}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 gap-1">
            <Label htmlFor="edit-category" className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">Category</Label>
            <Input
              id="edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              maxLength={30}
              placeholder="None"
              className="text-[16px] font-[450] tracking-tight text-gray-900 placeholder:text-gray-400 border-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 transition-all duration-150 ease-out"
            />
          </div>

          <div className="mt-3 gap-1">
            <Label htmlFor="edit-note" className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">Note</Label>
            {isEditingNote ? (
              <Textarea
                id="edit-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={() => setIsEditingNote(false)}
                maxLength={500}
                autoFocus
                className="resize-none h-24 text-[16px] font-[450] tracking-tight text-gray-900 placeholder:text-gray-400 border-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 transition-all duration-150 ease-out"
              />
            ) : (
              <div 
                onClick={() => setIsEditingNote(true)}
                className="h-24 px-3 py-2 text-[16px] font-[450] tracking-tight text-gray-900 cursor-text whitespace-pre-wrap overflow-y-auto"
              >
                <LinkifiedText text={note} />
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between items-center sm:justify-between w-full mt-4">
             <div className="flex gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={handleDelete}
                title="Delete Task"
                className="text-destructive hover:bg-destructive/10 transition-colors duration-150 ease-out"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {task.status !== "completed" && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={handleComplete}
                  title="Mark Complete"
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
             </div>
             <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={handleClose} disabled={isSubmitting} className="text-gray-500 hover:text-gray-900 rounded-[6px] px-4 py-2 font-medium">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#111827] text-white hover:opacity-90 active:scale-[0.98] rounded-[6px] px-4 py-2 font-medium">
                Save Changes
              </Button>
             </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
