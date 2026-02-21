"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate, addDays, getTodayDateString } from "@/lib/utils";

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
    <div className="flex items-center justify-center gap-6 py-2">

      <button
        onClick={handlePrev}
        className="p-1 rounded-md hover:bg-black/[0.04] transition-colors duration-150"
        aria-label="Previous Day"
      >
        <ChevronLeft className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="flex flex-col items-center min-w-[180px]">
        <h2 className="text-[15px] font-[450] tracking-tight text-foreground">
          {formatDate(selectedDate)}
        </h2>

        {!isToday && (
          <button
            onClick={handleToday}
            className="text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            Back to Today
          </button>
        )}
      </div>

      <button
        onClick={handleNext}
        className="p-1 rounded-md hover:bg-black/[0.04] transition-colors duration-150"
        aria-label="Next Day"
      >
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </button>

    </div>
  );
}

