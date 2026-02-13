"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { formatDate, addDays, getTodayDateString, cn } from "@/lib/utils";

interface DateNavProps {
  selectedDate: string;
  onDateChange: (newDate: string) => void;
}

export default function DateNav({ selectedDate, onDateChange }: DateNavProps) {
  const today = getTodayDateString();
  const isToday = selectedDate === today;

  const handlePrev = () => {
    onDateChange(addDays(selectedDate, -1));
  };

  const handleNext = () => {
    onDateChange(addDays(selectedDate, 1));
  };

  const handleToday = () => {
    onDateChange(today);
  };

  return (
    <div className="flex items-center justify-between bg-card text-card-foreground p-1 rounded-lg border shadow-sm w-full max-w-md mx-auto my-4">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handlePrev}
        title="Previous Day"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex flex-col items-center">
        <h2 className="text-sm font-semibold sm:text-base">
          {formatDate(selectedDate)}
        </h2>
        {!isToday && (
          <button 
            onClick={handleToday}
            className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5"
          >
            Back to Today
          </button>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleNext}
          title="Next Day"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
