"use client"

import Link from "next/link";
import Image from "next/image";
import { Outfit } from "next/font/google";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DarkModeToggle } from "@/app/components/layout/DarkModeToggle";

const logoFont = Outfit({
    subsets: ["latin"],
    weight: ["700"],
});

export default function Header() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md transition-all">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                <Link href="/" className="flex items-center gap-2">
                    {mounted ? (
                        <Image
                            src={isDark ? "/logo-white.png" : "/logo-dark.png"}
                            alt="BuilderLog"
                            width={45}
                            height={45}
                            priority
                            className="object-contain"
                        />
                    ) : (
                        <span className="w-[45px] h-[45px]" />
                    )}
                    <span className={`text-xl font-bold tracking-[0.10em] ${logoFont.className}`}>
                        <span className="text-foreground">BUILDER</span>
                        <span
                            className="text-[#5B7FFF]"
                            style={isDark ? { textShadow: "0 0 10px rgba(91, 127, 255, 0.5), 0 0 20px rgba(91, 127, 255, 0.25)" } : undefined}
                        >
                            LOG
                        </span>
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <DarkModeToggle />
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--primary),0.5)]"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </header>
    );
}