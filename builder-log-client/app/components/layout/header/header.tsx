"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Menu } from "lucide-react";

const routeNames: Record<string, string> = {
  "/timeline": "Timeline",
  "/insights": "Insights",
  "/projects": "Projects",
  "/settings": "Settings",
};

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const pageName = routeNames[pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Home</span>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium text-foreground">{pageName}</span>
      </div>
    </header>
  );
}