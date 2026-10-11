"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * Appearance settings – how the UI should determine light/dark mode.
 */
export type AppearanceSetting = "system" | "light" | "dark";

/**
 * Visual style options.
 */
export type VisualStyleId = "pastel" | "pop";

export interface VisualStyleDefinition {
  id: VisualStyleId;
  name: string;
  [key: string]: any;
}

const DEFAULT_VISUAL_STYLES: Record<VisualStyleId, VisualStyleDefinition> = {
  pastel: { id: "pastel", name: "Pastel" },
  pop: { id: "pop", name: "Pop" },
};

export interface ThemeContextProps {
  /** Current appearance setting: "system", "light", or "dark" */
  appearanceSetting: AppearanceSetting;
  /** Update appearance setting */
  setAppearanceSetting: (setting: AppearanceSetting) => void;
  /** Resolved concrete mode applied to document: "light" or "dark" */
  resolvedMode: "light" | "dark";
  /** Current active visual style definition */
  activeVisualStyle: VisualStyleDefinition;
  /** Change active visual style by ID */
  setActiveVisualStyleId: (styleId: VisualStyleId) => void;
  /** Backwards compatibility alias for visual style */
  visualStyle: VisualStyleId;
  /** Backwards compatibility setter */
  setVisualStyle: (style: VisualStyleId) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * ThemeProvider – manages global appearance and theme preferences.
 * SSR-safe: guards window and localStorage access.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ---------- Appearance Setting ----------
  const getInitialAppearance = (): AppearanceSetting => {
    if (typeof window === "undefined") return "light";
    try {
      const stored =
        window.localStorage.getItem("tileboard.appearance") ||
        window.localStorage.getItem("appearanceSetting");
      if (stored === "system" || stored === "light" || stored === "dark") {
        return stored as AppearanceSetting;
      }
    } catch {
      // Ignore localStorage read errors
    }
    return "light";
  };

  const [appearanceSetting, setAppearanceSettingState] = useState<AppearanceSetting>(
    getInitialAppearance
  );

  // ---------- Concrete Mode Resolution ----------
  const resolveConcreteMode = (setting: AppearanceSetting): "light" | "dark" => {
    if (setting === "system") {
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      return "light";
    }
    return setting;
  };

  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">(() =>
    resolveConcreteMode(appearanceSetting)
  );

  // Sync mode and listen for system preference changes when in "system" mode
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (appearanceSetting === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const updateSystemMode = (e: MediaQueryListEvent | MediaQueryList) => {
        setResolvedMode(e.matches ? "dark" : "light");
      };

      updateSystemMode(mq);

      const handler = (e: MediaQueryListEvent) => updateSystemMode(e);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      setResolvedMode(appearanceSetting);
    }
  }, [appearanceSetting]);

  // Apply theme class and data-theme to document element
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (resolvedMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.dataset.theme = resolvedMode;
  }, [resolvedMode]);

  const setAppearanceSetting = (setting: AppearanceSetting) => {
    setAppearanceSettingState(setting);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("tileboard.appearance", setting);
        window.localStorage.setItem("appearanceSetting", setting);
      } catch {
        // Ignore localStorage write errors
      }
    }
    setResolvedMode(resolveConcreteMode(setting));
  };

  // ---------- Visual Style ----------
  const getInitialVisualStyleId = (): VisualStyleId => {
    if (typeof window === "undefined") return "pastel";
    try {
      const stored =
        window.localStorage.getItem("tileboard.visualStyle") ||
        window.localStorage.getItem("visualStyle");
      if (stored === "pastel" || stored === "pop") {
        return stored as VisualStyleId;
      }
    } catch {
      // Ignore localStorage read errors
    }
    return "pastel";
  };

  const [visualStyleId, setVisualStyleIdState] = useState<VisualStyleId>(
    getInitialVisualStyleId
  );

  const activeVisualStyle = useMemo(() => {
    return DEFAULT_VISUAL_STYLES[visualStyleId] || DEFAULT_VISUAL_STYLES.pastel;
  }, [visualStyleId]);

  const setActiveVisualStyleId = (styleId: VisualStyleId) => {
    setVisualStyleIdState(styleId);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("tileboard.visualStyle", styleId);
        window.localStorage.setItem("visualStyle", styleId);
      } catch {
        // Ignore localStorage write errors
      }
    }
  };

  const contextValue = useMemo<ThemeContextProps>(
    () => ({
      appearanceSetting,
      setAppearanceSetting,
      resolvedMode,
      activeVisualStyle,
      setActiveVisualStyleId,
      visualStyle: visualStyleId,
      setVisualStyle: setActiveVisualStyleId,
    }),
    [appearanceSetting, resolvedMode, activeVisualStyle, visualStyleId]
  );

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
};

/**
 * Hook for consuming ThemeContext.
 */
export const useTheme = (): ThemeContextProps => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};

export default ThemeContext;
