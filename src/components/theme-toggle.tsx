"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

function systemPrefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  return systemPrefersDark() ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    setTheme(currentTheme());
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ak-theme", next);
    } catch {
      // التخزين المحلي قد يكون محظورًا؛ التجاهل آمن.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="تبديل السمة بين الفاتح والداكن"
      className="grid size-9 place-items-center rounded-md border border-border bg-card text-foreground hover:bg-muted"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

// سكربت يُحقن في <head> قبل الرسم لمنع وميض السمة.
export const themeInitScript = `(function(){try{var t=localStorage.getItem('ak-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;
