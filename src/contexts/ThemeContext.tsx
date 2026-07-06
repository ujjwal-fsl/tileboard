// src/contexts/ThemeContext.tsx

"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import { themes } from "@/lib/themes";
import type { VisualStyleDefinition } from "@/lib/themes";

/**
 * Appearance settings – how the UI should determine light/dark mode.
 */
export type AppearanceSetting = "light" | "dark";

export interface ThemeContextProps {
  /** Current appearance setting */
  appearanceSetting: AppearanceSetting;
  /** Change appearance setting */
  setAppearanceSetting: (setting: AppearanceSetting) => void;
  /** Resolved concrete mode: "light" or "dark" */
  resolvedMode: "light" | "dark";
  /** Current visual style definition */
  activeVisualStyle: VisualStyleDefinition;
  /** Change visual style by ID */
  setActiveVisualStyleId: (styleId: "pastel" | "pop") => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * ThemeProvider – tiny context that only manages global user preferences.
 * No design tokens, colors, borders, etc. are stored here.
 * All styling is derived later in the appearance‑resolution pipeline.
 *
 * This provider is **SSR‑safe**: any access to `window`, `localStorage`, or
 * `matchMedia` is guarded by `typeof window !== "undefined"`.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ---------- Appearance ----------
  const getInitialAppearance = (): AppearanceSetting => {
    if (typeof window === "undefined") return "light"; // default during SSR
    const stored = window.localStorage.getItem("tileboard.appearance");
    if (stored === "light" || stored === "dark") {
      return stored as AppearanceSetting;
    }
    return "light"; // default
  };

  const [appearanceSetting, setAppearanceSettingState] = useState<AppearanceSetting>(
    getInitialAppearance()
  );

  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">(
    appearanceSetting
  );

  const setAppearanceSetting = (setting: AppearanceSetting) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tileboard.appearance", setting);
    }
    setAppearanceSettingState(setting);
    setResolvedMode(setting);
  };

  // Apply the resolved theme to the document root for CSS‑driven theming.
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (resolvedMode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      document.documentElement.dataset.theme = resolvedMode;
    }
  }, [resolvedMode]);

  // ---------- Visual Style ----------
  const getInitialVisualStyleId = (): "pastel" | "pop" => {
    if (typeof window === "undefined") return "pastel"; // default during SSR
    const stored = window.localStorage.getItem("tileboard.visualStyle");
    if (stored === "pastel" || stored === "pop") {
      return stored as "pastel" | "pop";
    }
    return "pastel"; // default
  };

  const [visualStyleId, setVisualStyleIdState] = useState<"pastel" | "pop">(
    getInitialVisualStyleId()
  );

  const activeVisualStyle = useMemo(() => {
    return themes[visualStyleId];
  }, [visualStyleId]);

  const setActiveVisualStyleId = (styleId: "pastel" | "pop") => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tileboard.visualStyle", styleId);
    }
    setVisualStyleIdState(styleId);
  };

  // Memoize the context value to avoid unnecessary rerenders of consumers.
  const contextValue = useMemo(
    () => ({
      appearanceSetting,
      setAppearanceSetting,
      resolvedMode,
      activeVisualStyle,
      setActiveVisualStyleId,
    }),
    [appearanceSetting, resolvedMode, activeVisualStyle]
  );

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
};

/**
 * Hook for consuming the ThemeContext.
 * Throws a clear error if used outside of ThemeProvider.
 */
export const useTheme = (): ThemeContextProps => {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};
