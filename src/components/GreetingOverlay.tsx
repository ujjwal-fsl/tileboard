"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface GreetingOverlayProps {
  greeting: {
    line1: string;
    line2: string;
  };
  onFinish: () => void;
}

type Phase = "entering" | "holding" | "exiting";

export default function GreetingOverlay({ greeting, onFinish }: GreetingOverlayProps) {
  const [phase, setPhase] = useState<Phase>("entering");
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [textY, setTextY] = useState(4);
  const exitingRef = useRef(false);

  const startExit = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setPhase("exiting");
  }, []);

  // Phase: entering
  useEffect(() => {
    if (phase !== "entering") return;

    // Overlay fade in immediately
    requestAnimationFrame(() => {
      setOverlayOpacity(1);
    });

    // Text fade in after 50ms delay
    const textTimer = setTimeout(() => {
      setTextOpacity(1);
      setTextY(0);
    }, 50);

    // Transition to holding after 250ms (150ms overlay + buffer)
    const holdTimer = setTimeout(() => {
      setPhase("holding");
    }, 250);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(holdTimer);
    };
  }, [phase]);

  // Phase: holding
  useEffect(() => {
    if (phase !== "holding") return;

    const timer = setTimeout(() => {
      startExit();
    }, 1200);

    return () => clearTimeout(timer);
  }, [phase, startExit]);

  // Phase: exiting
  useEffect(() => {
    if (phase !== "exiting") return;

    setOverlayOpacity(0);
    setTextOpacity(0);

    const timer = setTimeout(() => {
      onFinish();
    }, 300);

    return () => clearTimeout(timer);
  }, [phase, onFinish]);

  // Scroll dismiss
  useEffect(() => {
    const handleScroll = () => startExit();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startExit]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out"
      style={{
        opacity: overlayOpacity,
        pointerEvents: phase === "exiting" ? "none" : "auto",
      }}
      onClick={startExit}
    >
      <div
        className="flex flex-col items-center text-center transition-all duration-200 ease-out"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <span className="text-[22px] font-medium text-white tracking-tight">
          {greeting.line1}
        </span>
        <span className="text-[14px] text-white/60 mt-[4px]">
          {greeting.line2}
        </span>
      </div>
    </div>
  );
}
