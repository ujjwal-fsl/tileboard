// src/contexts/ThemeContext.tsx

import React, { createContext, useEffect, useMemo, useState } from "react";

/**
 * Appearance settings – how the UI should determine light/dark mode.
 */
export type AppearanceSetting = "system" | "light" | "dark";
/**
 * Visual style options – the two approved style families.
 */
export type VisualStyleOption = "pastel" | "pop";

export interface ThemeContextProps {
  /** Current appearance setting */
  appearanceSetting: AppearanceSetting;
  /** Change appearance setting */
  setAppearanceSetting: (setting: AppearanceSetting) => void;
  /** Resolved concrete mode: "light" or "dark" */
  resolvedMode: "light" | "dark";
  /** Current visual style */
  visualStyle: VisualStyleOption;
  /** Change visual style */
  setVisualStyle: (style: VisualStyleOption) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * ThemeProvider – tiny context that only manages global user preferences.
 * No design tokens, colors, borders, etc. are stored here.
 * All styling is derived later in the appearance‑resolution pipeline.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ---------- Appearance ----------
  const getInitialAppearance = (): AppearanceSetting => {
    const stored = localStorage.getItem("appearanceSetting");
    if (stored === "system" || stored === "light" || stored === "dark") {
      return stored as AppearanceSetting;
    }
    return "system"; // default
  };

  const [appearanceSetting, setAppearanceSettingState] = useState<AppearanceSetting>(
    getInitialAppearance()
  );

  // Resolve concrete mode. If system, follow media query.
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">(() => {
    if (appearanceSetting !== "system") return appearanceSetting;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Keep media‑query listener in sync when we are in "system" mode.
  useEffect(() => {
    if (appearanceSetting !== "system") return undefined;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setResolvedMode(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    // Initial sync (in case the preference changed before this effect ran)
    setResolvedMode(mq.matches ? "dark" : "light");
    return () => {
      mq.removeEventListener("change", handler);
    };
  }, [appearanceSetting]);

  const setAppearanceSetting = (setting: AppearanceSetting) => {
    localStorage.setItem("appearanceSetting", setting);
    setAppearanceSettingState(setting);
    if (setting !== "system") {
      setResolvedMode(setting);
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedMode(isDark ? "dark" : "light");
    }
  };

  // ---------- Visual Style ----------
  const getInitialVisualStyle = (): VisualStyleOption => {
    const stored = localStorage.getItem("visualStyle");
    if (stored === "pastel" || stored === "pop") {
      return stored as VisualStyleOption;
    }
    return "pastel"; // default
  };

  const [visualStyle, setVisualStyleState] = useState<VisualStyleOption>(
    getInitialVisualStyle()
  );

  const setVisualStyle = (style: VisualStyleOption) => {
    localStorage.setItem("visualStyle", style);
    setVisualStyleState(style);
  };

  // Memoize the context value to avoid unnecessary rerenders of consumers.
  const contextValue = useMemo(
    () => ({
      appearanceSetting,
      setAppearanceSetting,
      resolvedMode,
      visualStyle,
      setVisualStyle,
    }),
    [appearanceSetting, resolvedMode, visualStyle]
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
