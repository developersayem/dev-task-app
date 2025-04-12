"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeCom() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full scale-110 relative"
    >
      {!isDark ? (
        <Moon className="h-[1.5rem] w-[1.5rem] transition-all" />
      ) : (
        <Sun className="h-[1.5rem] w-[1.5rem] transition-all" />
      )}
    </Button>
  );
}
