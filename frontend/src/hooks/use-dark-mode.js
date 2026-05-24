import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kerjaai-theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("kerjaai-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("kerjaai-theme", "light");
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);
  return { isDark, toggle };
}
