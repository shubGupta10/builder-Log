"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function DarkModeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-[90px] h-[26px]" />
    }

    const isDark = theme === "dark" || resolvedTheme === "dark"

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <div className="flex items-center gap-2 select-none">
            <span
                onClick={() => setTheme("light")}
                className={cn(
                    "text-[10px] uppercase font-bold cursor-pointer transition-colors duration-300",
                    !isDark ? "text-slate-800" : "text-slate-500 opacity-60"
                )}
            >
                Light
            </span>

            <button
                onClick={toggleTheme}
                className={cn(
                    "relative inline-flex h-[26px] w-[50px] shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-500 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
                    isDark ? "bg-[#25283d] border-[#383c53]" : "bg-[#7e9bfb] border-[#93afff]"
                )}
                role="switch"
                aria-checked={isDark}
            >
                <span className="sr-only">Toggle theme</span>

                <span
                    className={cn(
                        "absolute inset-0 overflow-hidden rounded-full transition-opacity duration-500",
                        isDark ? "opacity-100" : "opacity-0"
                    )}
                >
                    <span
                        className="absolute left-[5px] top-[5px] h-[4px] w-[4px] bg-white"
                        style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
                    />
                    <span
                        className="absolute left-[16px] top-[10px] h-[3px] w-[3px] bg-white"
                        style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
                    />
                    <span className="absolute left-[12px] top-[4px] h-[1.5px] w-[1.5px] rounded-full bg-white" />
                    <span className="absolute left-[8px] top-[14px] h-[1.5px] w-[1.5px] rounded-full bg-white" />
                </span>

                {/* Track Graphics - Clouds/Dots for Light Mode */}
                <span
                    className={cn(
                        "absolute inset-0 overflow-hidden rounded-full transition-opacity duration-500",
                        !isDark ? "opacity-100" : "opacity-0"
                    )}
                >
                    <span className="absolute right-[8px] top-[5px] h-[6px] w-[6px] rounded-full bg-white" />
                    <span className="absolute right-[15px] top-[12px] h-[3px] w-[3px] rounded-full bg-white" />
                </span>

                {/* The Thumb */}
                <span
                    className={cn(
                        "pointer-events-none relative inline-block h-[20px] w-[20px] transform rounded-full transition-all duration-500 ease-in-out z-10",
                        isDark
                            ? "translate-x-[25px] bg-transparent shadow-[inset_-5.5px_-2px_0_0_white]"
                            : "translate-x-[1px] bg-white shadow-sm"
                    )}
                />
            </button>

            <span
                onClick={() => setTheme("dark")}
                className={cn(
                    "text-[10px] uppercase font-bold cursor-pointer transition-colors duration-300",
                    isDark ? "text-white" : "text-slate-500 opacity-60"
                )}
            >
                Dark
            </span>
        </div>
    )
}
